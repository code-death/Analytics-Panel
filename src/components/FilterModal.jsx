import { useSelector, useDispatch } from "react-redux";
import {
  updateFilterRange,
  updateFilterState,
  filterElementOut,
} from "../features/dataSlice";
import { RangeSlider } from "rsuite";
import { useState, useEffect } from "react";

const FilterModal = (props) => {
  const { array, data, appData } = useSelector((state) => state.data.value);
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
  const [selectedApps, setSelectedApps] = useState(appData.data)

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

  const handleAppSelect = () => {

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
          placeholder="search"
        />
        {selectedApps.map((child, i) => {
          return (<div className="cover" key={i}>
            <div onClick={handleAppSelect} className="itemSelector">{child.app_name}</div>
            <span className="subTitle">{child.app_id}</span>
          </div>)
        })}
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
