// utils to shape API data

function generateEvents(data){
  // generates mock individual event data
  if(!data)
    return [];

  let poi = data.poi;
  let num_poi = data.poi.length;

  let events_hourly = data.events_hourly;
  let events = events_hourly.map((v) => {
    let i = rand(0, num_poi);
    return { 
      ...v, 
      ...poi[i],
      ...formatDates(v.date)
    };
  });
  data.all_events = events.reverse();
}

function generateStats(data){
  // formats stats data
  if(!data)
    return [];

  let stats_hourly = data.stats_hourly;
  let stats = stats_hourly.map((v) => {
    return { 
      ...v, 
      ...formatDates(v.date),
      revenue: parseInt(v.revenue).toFixed(2)
    };
  });
  data.stats_hourly = stats.reverse();
}

function generatePoints(data){
  // generates point GeoJSON-compliant point data
  let markers = data.poi.map((p) => ({
    type: "Feature",
    id: p.poi_id,
    name: p.name,
    properties: {
      cluster: false,
    },
    geometry: { type: "Point", coordinates: [p.lon, p.lat] }
  }));
  data.markers = markers;
}

function mergeDateHour(data){
  // sets date attribute to correct hour
  data.events_hourly.map((v) => {
    let d = new Date(v.date);
    d.setHours(d.getHours() + v.hour)
    v.date = d.toISOString();
    v.hour = formatHour(v.hour);
  });

  data.stats_hourly.map((v) => {
    let d = new Date(v.date);
    d.setHours(d.getHours() + v.hour)
    v.date = d.toISOString();
    v.hour = formatHour(v.hour);
  });

  data.all_events.map((v) => {
    let d = new Date(v.date);
    d.setHours(d.getHours() + v.hour)
    v.date = d.toISOString();
    v.hour = formatHour(v.hour);
  });
}

function formatDates(date){
  let d = new Date(date);
  return {
    year: d.toLocaleString("en-US", { year: 'numeric' }),
    month: d.toLocaleString("en-US", { month: 'long' }),
    day: d.toLocaleString("en-US", { day: 'numeric' }),
    weekday: d.toLocaleString("en-US", { weekday: 'long' })
  }
}

function formatHour(hour){
  let suffix = hour < 12 ? "PM" : "AM";
  let time = (hour % 12) || 12;
  return `${time}${suffix}`;
}

function rand(min, max){
  // return a random number between [min, max)
  return Math.floor(Math.random() * (max - min) + min);
}

function sort(data){
  // ensures data is chronologically ordered
  data.events_hourly.sort((a, b) => new Date(a.date) - new Date(b.date));
  data.events_daily.sort((a, b) => new Date(a.date) - new Date(b.date));
  data.stats_hourly.sort((a, b) => new Date(a.date) - new Date(b.date));
  data.stats_daily.sort((a, b) => new Date(a.date) - new Date(b.date));
}

export { generateEvents, generateStats, generatePoints, mergeDateHour, sort };