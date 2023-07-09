import { useEffect, useState } from 'react';
import  {DateRangePicker} from 'rsuite'
import { fetchData } from '../api/FetchData';
import { useDispatch, useSelector } from 'react-redux';
import { updateData, updateAppData, updateDates } from '../features/dataSlice';

const DatePicker = () => {
  const dates = useSelector(state => state.data.value.dates)

  const [value, setValue] = useState([
    new Date(dates[0]),
    new Date(dates[1]),
  ])

  useEffect(() => {
    setValue([new Date(dates[0]), new Date(dates[1]),])
  }, [dates])

  const dispatch = useDispatch()

  const converter = (date) => {
    return (
      date.getFullYear() +
      "-" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + date.getDate()).slice(-2)
    );
  }

  return (
    <DateRangePicker
    format='dd-MMM-yyyy'
    value={value}
    onChange={e => {
      fetchData(converter(e[0]), converter(e[1])).then(value => {
        dispatch(updateData(value.data))
        dispatch(updateAppData(value.app))
        dispatch(updateDates([converter(e[0]), converter(e[1])]))
      })
      setValue(e)
    }}
    appearance="default"
    style={{ width: 230 }} />
  );
};

export default DatePicker;
