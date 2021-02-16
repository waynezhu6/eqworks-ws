const toCartesian = (data) => {
  return data.map((v) => ({
    name: v.name,
    x: Math.cos(v.lat) * Math.cos(v.lon),
    y: Math.cos(v.lat) * Math.sin(v.lon),
    z = Math.sin(v.lat)
  }));
}

const generateMarkers = (data, step) => {
  let arr = toCartesian(data);

}