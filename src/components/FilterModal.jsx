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
        array: filterElements(),
        element: requiredElement[0].heading,
      })
    );
  };

  const handleReset = () => {
    setValue([0, Number.POSITIVE_INFINITY]);
    dispatch(updateFilterState(requiredElement[0].heading));
    dispatch(
      updateFilterRange([
        requiredElement[0].heading,
        0,
        Number.POSITIVE_INFINITY,
      ])
    );
    dispatch(
      filterElementOut({
        array: filterElements(),
        element: requiredElement[0].heading,
      })
    );
  };

  const filterElements = () => {
    const filteredRows = [];
    data.data.map((child, i) => {
      if (
        child[requiredElement[0].item] >=
          (max_value_Object[requiredElement[0].item] * value[0]) / 100 &&
        child[requiredElement[0].item] <=
          (max_value_Object[requiredElement[0].item] * value[1]) / 100
      ) {
        filteredRows.push(i);
      }
    });
    return filteredRows;
  };

  if (
    requiredElement[0].heading !== "Date" &&
    requiredElement[0].heading !== "App"
  ) {
    innerContent = (
      <>
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
      </>
    );
  } else {
    innerContent = (
      <>
        <input
          className="search"
          type="text"
          name=""
          id=""
          placeholder="search"
        />
        {appData.data.map((child, i) => {
          return (<div className="cover" key={i}>
            <div className="itemSelector">{child.app_name}</div>
            <span className="subTitle">{child.app_id}</span>
          </div>)
        })}
      </>
    );
  }

  return (
    <>
      <div className="modal">{innerContent}</div>
    </>
  );
};

export default FilterModal;
