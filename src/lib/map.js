// utils for formatting data for mapping

function getEventsInRange(data, from, to){
  let results = {}
  data.all_events.map((v) => {
    let d = new Date(v.date);
    if(from <= d && d <= to){
      if(v.name in results)
        results[v.name].push(v);
      else
        results[v.name] = [v];
    }
  });
  return results;
}

export default getEventsInRange;