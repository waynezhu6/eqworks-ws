const API_ADDRESS = "https://oval-peppermint-mink.glitch.me/api";

const getAllApiData = async() => {
  return {
    "events_daily": await getDailyEvents(),
    "events_hourly": await getHourlyEvents(),
    "stats_daily": await getDailyStats(),
    "stats_hourly": await getHourlyStats(),
    "poi": await getPOI()
  };
}

const getEndpoint = async(endpoint) => {
  let res = await fetch(API_ADDRESS + endpoint)
    .then(res => res.json());
  return res;
}

const getDailyEvents = async() => {
  return await getEndpoint("/events/daily");
}

const getHourlyEvents = async() => {
  return await getEndpoint("/events/hourly");
}

const getDailyStats = async() => {
  return await getEndpoint("/stats/daily");
}

const getHourlyStats = async() => {
  return await getEndpoint("/stats/hourly");
}

const getPOI = async() => {
  return await getEndpoint("/poi");
}

export { 
  getAllApiData, 
  getDailyEvents,
  getHourlyEvents,
  getDailyStats,
  getHourlyStats,
  getPOI
};