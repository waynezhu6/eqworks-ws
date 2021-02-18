// utils to shape API data

function generateEvents(data){
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
      ...formatDates(v.date),
      hour: formatHour(v.hour)
    };
  });
  return events.reverse();
}

function generateStats(data){
  if(!data)
    return [];

  let stats_hourly = data.stats_hourly;
  let stats = stats_hourly.map((v) => {
    return { 
      ...v, 
      ...formatDates(v.date),
      hour: formatHour(v.hour),
      revenue: `$${parseInt(v.revenue).toFixed(2)}`
    };
  });
  return stats.reverse();
}

function generatePoints(poi){
  return poi.map((p) => ({
    type: "Feature",
    id: p.poi_id,
    name: p.name,
    properties: {
      cluster: false,
    },
    geometry: { type: "Point", coordinates: [p.lon, p.lat] }
  }));
}

function mergeDateHour(data){
  data.events_hourly.map((v) => {
    let d = new Date(v.date);
    d.setHours(d.getHours() + v.hour)
    v.date = d.toISOString();
  });

  data.stats_hourly.map((v) => {
    let d = new Date(v.date);
    d.setHours(d.getHours() + v.hour)
    v.date = d.toISOString();
  });}

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

export { generateEvents, generateStats, generatePoints, mergeDateHour };