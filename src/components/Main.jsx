import React from "react";
import DatePicker from "./DatePicker";
import TuneIcon from "@mui/icons-material/Tune";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
  updateData,
  updateAppData,
  filterElementOut,
  updateDates,
} from "../features/dataSlice";
import Table from "./Table";
import Sorry from "./Sorry";
import Settings from "./Settings.jsx";
import { fetchData } from "../api/FetchData";

const Main = () => {
  const reduxData = useSelector((state) => state.data.value);
  const dispatch = useDispatch();

  const [error, setError] = useState(false);
  const [settingsOpen, setsettingsOpen] = useState(false);

  const handleSettingsClick = () => {
    setsettingsOpen((prev) => !prev);
  };

  useEffect(() => {
    const sessionData = JSON.parse(window.sessionStorage.getItem("datakey"))

    if (sessionData === null) {
      fetchData().then((value) => {
        if (value instanceof Error) {
          setError(true);
        } else {
          setError(false);
          dispatch(updateData(value.data));
          dispatch(updateAppData(value.app));
        }
      });
    } else {
        dispatch(updateDates(sessionData.dates));
        dispatch(updateData(sessionData.data));
        dispatch(updateAppData(sessionData.app));
    }
  }, []);

  return (
    <div className="main">
      <h1 className="heading">Analytics</h1>
      <div className="options">
        <DatePicker />
        <button onClick={handleSettingsClick} className="border settings">
          <TuneIcon color="primary" />
          Settings
        </button>
      </div>
      {settingsOpen ? <Settings handleClose={handleSettingsClick} /> : null}
      {!error && reduxData.data.data && reduxData.appData.data ? (
        <Table />
      ) : (
        <Sorry />
      )}
    </div>
  );
};

export default Main;
