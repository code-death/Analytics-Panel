import { useState } from 'react';
import  {DateRangePicker} from 'rsuite'
import { fetchData } from '../api/FetchData';
import { useDispatch } from 'react-redux';
import { updateData, updateAppData } from '../features/dataSlice';

const DatePicker = () => {
  const [value, setValue] = useState([
    new Date('2021-05-01'),
    new Date('2021-05-03'),
  ])
  const dispatch = useDispatch()

  return (
    <DateRangePicker
    format='dd-MMM-yyyy'
    value={value}
    onChange={e => {
      window.sessionStorage.setItem('datakey', {data: [], app: []})
      fetchData(e[0], e[1]).then(value => {
        dispatch(updateData(value.data))
        dispatch(updateAppData(value.app))
      })
      setValue(e)
    }}
    appearance="default"
    style={{ width: 230 }} />
  );
};

export default DatePicker;
