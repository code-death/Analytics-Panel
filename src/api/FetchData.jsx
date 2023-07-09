
export const fetchData = async (startDate, endDate) => {


    if (!startDate && !endDate) {
      try {
        const responseData = await fetch("https://go-dev.greedygame.com/v3/dummy/report?startDate=2021-05-01&endDate=2021-05-03")
        const responseAppData = await fetch("https://go-dev.greedygame.com/v3/dummy/apps")
        const data = await responseData.json();
      const app = await responseAppData.json();
      window.sessionStorage.setItem('datakey', JSON.stringify({data: data, app: app, dates: ['2021-05-01', '2021-05-03']}))
      return {data, app}
      } catch (e) {
        return e
      }
    } else {
      try {
      const url = `https://go-dev.greedygame.com/v3/dummy/report?startDate=${startDate}&endDate=${endDate}`;
      const responseData = await fetch(url)
      const responseAppData = await fetch("https://go-dev.greedygame.com/v3/dummy/apps")

      const data = await responseData.json();
      const app = await responseAppData.json();
      window.sessionStorage.setItem('datakey', JSON.stringify({data: data, app: app, dates: [startDate, endDate]}))
      return {data, app}
      } catch (e) {
        return e
      }
    }
};


