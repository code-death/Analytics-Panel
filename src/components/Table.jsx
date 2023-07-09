import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useSelector, useDispatch } from "react-redux";
import {
  updateFilterState,
  filterElementOut
} from "../features/dataSlice";
import FilterModal from "./FilterModal";
import { useEffect } from "react";

const Table = (props) => {
  const dispatch = useDispatch();
  let state = useSelector((state) => state.data.value);
  let { array, data, appData, rowsToFilter } = state;
  const getMonthName = (monthNumber) => {
    const date = new Date();
    date.setMonth(monthNumber);

    return date.toLocaleString("en-US", {
      month: "long",
    });
  };

useEffect(() => {
  let arr = []
  data.data.forEach((child,i) => {
    arr.push(i)
  })
  dispatch(filterElementOut({array: arr, element: 'Date'}))
}, [data])

  const handleFilterClick = (e) => {
    dispatch(updateFilterState(e.target.value));
  };

  const createColumn = (object, i) => {
    if (object.isActive) {
      return (
        <span key={i}>
          <div className="col">
            <button
              value={object.heading}
              onClick={handleFilterClick}
              className="filterButton"
            ></button>
            <FilterAltIcon className="filterIcon" />
            {array[i].isFilterActive ? <FilterModal /> : null}
            <div className="tableHead">{object.heading}</div>
            {data.data.map((child, index) => {
              if(rowsToFilter.indexOf(index) >= 0) {
              return(<span key={index}>
              <div className="line"></div>
              <div className="row">{printData(object, child)}</div>
            </span>)
              }
            })}
          </div>
        </span>
      );
    }
  };

  const printData = (object, child) => {
    if (object.heading === "App") {
      return appData.data.filter(
        (appChild) => appChild.app_id === child.app_id
      )[0].app_name;
    } else if (object.heading === "Fill Rate") {
      const fillRate = (child.requests / child.responses) * 100;
        return fillRate.toPrecision(4) + "%";
    } else if (object.heading === "CTR") {
        return ((child.clicks / child.impressions) * 100).toPrecision(4) + "%";
    } else if (object.heading === "Revenue") {
        return "$" + child[object.item] ? child[object.item].toPrecision(4) : null;
    } else if (object.heading === "Date") {
      const date = new Date(child[object.item]);
      return (
        date.getDate() +
        " " +
        getMonthName(date.getMonth()) +
        " " +
        date.getFullYear()
      );
    } else {
        return child[object.item];
    }
  };

  return (
    <div className="table">
      {array.map((object, i) => createColumn(object, i))}
    </div>
  );
};

export default Table;
