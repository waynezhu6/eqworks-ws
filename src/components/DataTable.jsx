import React, { useState } from 'react';
import styles from '../styles/DataTable.module.scss';

const DataTable = (props) => {

  const [navbarSelected, setNavbarSelected] = useState(0);

  const navbarLabels = ["Daily Events", "Hourly Events", "Daily Stats", "Hourly Stats", "POI"];
  const keys = ["events_daily", "events_hourly", "stats_daily", "stats_hourly", "poi"];

  return(
    <div className={styles.body}>

      <div className={styles.navbar}>
        {navbarLabels.map((label, index) => (
          <div 
            key={index}
            onClick={() => setNavbarSelected(index)}
            className={navbarSelected == index ? styles.selected : ""}
          >
            {label}
          </div>
        ))}
      </div>

      <div className={styles.search}>
      </div>

      <div className={styles.table}>
        {keys.map((key, index) => (
          <Table 
            data={props.data[key]} 
            {...CONFIG[key]}
            visible={index == navbarSelected}
            key={index}
          />
        ))}
      </div>

    </div>
  );
}

const Table = (props) => {

  const {labels, layout, format} = props;
  const data = props.data.sort(props.sortDefault);

  return(
    <div style={props.visible ? {display: "block"} : {display: "none"}}>

      <div className={styles.labels}>
        {labels.map((label, index) => (
          <div
            className={styles.label}
            style={{flex: layout[index]}}
            key={index}
          >
            {label}
          </div>
        ))}
      </div>

      {data.map((value, i) => {
        let cells = format(value);
        return <div key={i} className={styles.row}>
          {cells.map((value, index) => (
            <div 
              className={styles.cell}
              style={{flex: layout[index]}}
              key={`${i}-${index}`}
            >
              {value}
            </div>
          ))}
        </div>
      })}
    </div>
  )
}

const CONFIG = {
  "events_daily": {
    labels: ["Date", "Number of Events"], 
    layout: [1, 1],
    format: (row) => {
      let d = new Date(row.date);
      let o = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return [d.toLocaleDateString("en-US", o), row.events];
    },
    sortDefault: (a, b) => new Date(b.date) - new Date(a.date)
  },

  "events_hourly": {
    labels: ["Date", "Hour", "Number of Events"], 
    layout: [1, 1],
    format: (row) => {
      let d = new Date(row.date);
      let o = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return [d.toLocaleDateString("en-US", o), row.hour, row.events];
    },
    sortDefault: (a, b) => new Date(b.date) - new Date(a.date)
  },

  "stats_daily": {
    labels: ["Date", "Impressions", "Clicks", "Revenue"], 
    layout: [2, 1, 1, 1],
    format: (row) => {
      let d = new Date(row.date);
      let o = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return [d.toLocaleDateString("en-US", o), row.impressions, row.clicks, row.revenue];
    },
    sortDefault: (a, b) => new Date(b.date) - new Date(a.date)
  },

  "stats_hourly": {
    labels: ["Date", "Hour", "Impressions", "Clicks", "Revenue"], 
    layout: [2, 1, 1, 1, 1],
    format: (row) => {
      let d = new Date(row.date);
      let o = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return [d.toLocaleDateString("en-US", o), row.hour, row.impressions, row.clicks, row.revenue];
    },
    sortDefault: (a, b) => new Date(b.date) - new Date(a.date)
  },

  "poi": {
    labels: ["ID", "Name of Location", "Lattitude", "Longitude"], 
    layout: [1, 1, 1, 1],
    format: (row) => {
      return [row.poi_id, row.name, row.lat, row.lon];
    },
    sortDefault: (a, b) => new Date(b.date) - new Date(a.date)
  },
}

export default DataTable;

