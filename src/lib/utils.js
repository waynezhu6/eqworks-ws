// utils to shape API data

const generateEvents = (data) => {
  //first split events_hourly into individual events
  //then assign a random poi to each events

  //repeat for stats
  let poi = data.poi;
  let num_poi = data.poi.length;

  let events_hourly = data.events_hourly;
  let events = events_hourly.map((v) => {
    let i = rand(0, num_poi);
    let res = { 
      ...v, 
      ...poi[i],
      ...formatDates(v.date),
      hour: formatHour(v.hour)
    };
    delete res.events;
    return res;
  });
  return events;
}

const formatDates = (date) => {
  let d = new Date(date);
  return {
    year: d.toLocaleString("en-US", { year: 'numeric' }),
    month: d.toLocaleString("en-US", { month: 'long' }),
    day: d.toLocaleString("en-US", { day: 'numeric' }),
    weekday: d.toLocaleString("en-US", { weekday: 'long' })
  }
}

const formatHour = (hour) => {
  let suffix = hour < 12 ? "PM" : "AM";
  let time = (hour % 12) || 12;
  return `${time}${suffix}`;
}

const generateStats = (data) => {
  // todo...
  let poi = data.poi;
  let num_poi = data.poi.length;

  let events_hourly = data.events_hourly;
  let events = events_hourly.map((v) => {
    let i = rand(0, num_poi);
    return {
      ...v,
      ...poi[i]
    }
  });
  return events;
}

const rand = (min, max) => {
  // return a random number between [min, max)
  return Math.floor(Math.random() * (max - min) + min);
}

export { generateEvents, formatDates };