import { useSelector, useDispatch } from "react-redux";
import {
  updateFilterRange,
  updateFilterState,
  filterElementOut,
  updateSelectedApps
} from "../features/dataSlice";
import { RangeSlider } from "rsuite";
import { useState } from "react";

const FilterModal = () => {
  const { array, data, appData, selectedAppsFilter } = useSelector((state) => state.data.value);
  const dispatch = useDispatch();
  const requiredElement = array.filter((child, i) => {
    return child.isFilterActive;
  });

  let innerContent;
  let max_value_Object =
    requiredElement[0].heading === "Fill Rate"
      ? { fill_rate: 100 }
      : requiredElement[0].heading === "CTR"
      ? { ctr: 100 }
      : data.data.reduce((prev, current) => {
          return prev[requiredElement[0].item] >
            current[requiredElement[0].item]
            ? prev
            : current;
        });
  const [value, setValue] = useState([
    (requiredElement[0].filterRange[1] /
      max_value_Object[requiredElement[0].item]) *
      100,
    (requiredElement[0].filterRange[2] /
      max_value_Object[requiredElement[0].item]) *
      100,
  ]);
  const [selectedApps, setSelectedApps] = useState(selectedAppsFilter)
  const [searchValue, setSearchValue] = useState('')
  const [filteredApp, setFilteredApp] = useState(appData.data)

  const handleChange = (e) => {
    setValue(e);
  };

  const handleApply = () => {
    dispatch(updateFilterState(requiredElement[0].heading));
    dispatch(
      updateFilterRange([
        requiredElement[0].heading,
        Math.ceil((max_value_Object[requiredElement[0].item] * value[0]) / 100),
        Math.ceil((max_value_Object[requiredElement[0].item] * value[1]) / 100),
      ])
    );
    dispatch(
      filterElementOut({
        array: filterElements( Math.ceil((max_value_Object[requiredElement[0].item] * value[0]) / 100), Math.ceil((max_value_Object[requiredElement[0].item] * value[1]) / 100), ),
        element: requiredElement[0].heading,
      })
    );
  };

  const handleReset = () => {
    dispatch(updateFilterState(requiredElement[0].heading));
    dispatch(
      updateFilterRange([
        requiredElement[0].heading,
        0,
        Math.ceil(max_value_Object[requiredElement[0].item]),
      ])
    );
    setValue([0, Math.ceil(max_value_Object[requiredElement[0].item])])
    dispatch(
      filterElementOut({
        array: filterElements(0, Math.ceil(max_value_Object[requiredElement[0].item])),
        element: requiredElement[0].heading,
      })
    );
  };

  const filterElements = (a, b) => {
    const filteredRows = [];
    data.data.map((child, i) => {
      if (
        child[requiredElement[0].item] >= a && child[requiredElement[0].item] <= b
      ) {
        filteredRows.push(i);
      }
    });
    return filteredRows;
  };

  const handleInputChange = (e) => {
    setFilteredApp(appData.data)
    setSearchValue(e.target.value)
    const updatedApps = appData.data.filter(child => (
      child.app_name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
    ))
    setFilteredApp(updatedApps)
  }

  const handleSelectAll = () => {
    let updatedApps = [...appData.data]
    if(selectedApps.length === updatedApps.length) {
      updatedApps = []
    }
    setSelectedApps(updatedApps)
    dispatch(updateSelectedApps(updatedApps))
    dispatch(updateFilterState('App'))

  }

  const handleAppSelect = (e) => {
    if(e.target.innerHTML === 'Apply') {
      e.target.value ? dispatch(updateSelectedApps(selectedApps)) : null
      dispatch(updateFilterState('App'))
    } else {
    const updatedApps = [...selectedApps]
    appData.data.map((child, i) => {
      if(child.app_name === e.target.innerHTML) {
        if(updatedApps.indexOf(child) === -1){
          updatedApps.push(child)
        } else {
          updatedApps.splice(updatedApps.indexOf(child), 1)
        }
      }
    })
    setSelectedApps(updatedApps)
    }
  }

  if (
    requiredElement[0].heading !== "Date" &&
    requiredElement[0].heading !== "App"
  ) {
    innerContent = (
      <div className="modal">
        <RangeSlider
          tooltip={false}
          onChange={handleChange}
          value={value}
          defaultValue={[0, value[1]]}
        />
        <div className="rangeValues">
          <span>
            {Math.ceil(
              (max_value_Object[requiredElement[0].item] * value[0]) / 100
            )}
          </span>{" "}
          <span>
            {Math.ceil(
              (max_value_Object[requiredElement[0].item] * value[1]) / 100
            )}
          </span>
        </div>
        <div className="filterButtonGroup">
          <button onClick={handleReset} className="minimal">
            Reset
          </button>
          <button onClick={handleApply} className="primary">
            Apply
          </button>
        </div>
        </div>
    );
  } else if (requiredElement[0].heading === "App") {
    innerContent = (
      <div className="modal">
        <input
          className="search"
          type="text"
          name=""
          id=""
          placeholder="Search"
          value={searchValue}
          onChange={handleInputChange}
        />
        {appData.data.map((child, i) => {
          let selected = ''
          if(selectedApps.indexOf(child) !== -1) {
            selected = ' selected'
          }
          if(filteredApp.indexOf(child) !== -1) {
            return (
              <div onClick={handleAppSelect} className={"cover" + selected} key={child.app_id}>
              <div  className="itemSelector">{child.app_name}</div>
              <span className="subTitle">{child.app_id}</span>
            </div>
            )
          }
        })}
        <div className="buttonGroup">
        <button onClick={handleSelectAll} className="minimal">
            Select All
          </button>
        <button onClick={handleAppSelect} value='apply' className="primary appModalButton">
            Apply
          </button>
        </div>
        </div>
    );
  }

  return (
    <>
        {innerContent}
    </>
  );
};

export default FilterModal;
