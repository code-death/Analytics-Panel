const changeDateFormat = (date) => {
  return (
    date.getFullYear() +
    "-" +
    ("0" + date.getMonth()).slice(-2) +
    "-" +
    ("0" + date.getDate()).slice(-2)
  );
};

export const fetchData = async (startDate, endDate) => {
    if (!startDate && !endDate) {
      try {
        const responseData = await fetch("https://go-dev.greedygame.com/v3/dummy/report?startDate=2021-05-01&endDate=2021-05-03")
        const responseAppData = await fetch("https://go-dev.greedygame.com/v3/dummy/apps")
        const data = await responseData.json();
      const app = await responseAppData.json();
      return {data, app}
      } catch (e) {
        return e
      }
    } else {
      try {
        const sd = changeDateFormat(startDate);
      const ed = changeDateFormat(endDate);

      const url = `https://go-dev.greedygame.com/v3/dummy/report?startDate=${sd}&endDate=${ed}`;
      const responseData = await fetch(url)
      const responseAppData = await fetch("https://go-dev.greedygame.com/v3/dummy/apps")

      const data = await responseData.json();
      const app = await responseAppData.json();
      return {data, app}
      } catch (e) {
        return e
      }
    }
};


