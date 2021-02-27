import React, { useState } from 'react';
import Table from '../components/Table';
import styles from '../styles/pages/DataTable.module.scss';

const DataTable = ({ data }) => {

  const [selected, setSelected] = useState(0);
  const labels = ["Events", "Stats", "Points of Interest"];

  return(
    <div className={styles.body}>

      <div className={styles.navbar}>
        {labels.map((label, index) => (
          <div 
            key={index}
            onClick={() => setSelected(index)}
            className={selected == index ? styles.selected : ""}
          >
            {label}
          </div>
        ))}
      </div>

      <div className={styles.search}>
      </div>

      <div className={styles.table}>
        {CONFIG.map((v, i) => (
          <Table 
            key={i}
            config={v.columns} 
            data={data[v.field]}
            visible={selected == i}
          />
        ))}

      </div>

    </div>
  );
}

//configuration metadata for charts
const CONFIG = [
  {
    columns: [{
      id: "0",
      Header: "",
      columns: [
        { Header: "Year", accessor: "year" },
        { Header: "Month", accessor: "month" },
        { Header: "Date", accessor: "day" },
        { Header: "Day", accessor: "weekday" },
        { Header: "Time", accessor: "hour" },
        { Header: "Location", accessor: "name" }
      ]
    }],
    field: "all_events"
  },

  {
    columns: [{
      id: "1",
      Header: "",
      columns: [
        { Header: "Year", accessor: "year" },
        { Header: "Month", accessor: "month" },
        { Header: "Date", accessor: "day" },
        { Header: "Day", accessor: "weekday" },
        { Header: "Time", accessor: "hour" },
        { Header: "Impressions", accessor: "impressions" },
        { Header: "Clicks", accessor: "clicks" },
        { Header: "Revenue ($)", accessor: "revenue" }
      ]
    }],
    field: "stats_hourly"
  },

  {
    columns: [{
      id: "2",
      Header: "",
      columns: [
        { Header: "ID", accessor: "poi_id" },
        { Header: "Name", accessor: "name" }
      ]
    }],
    field: "poi"
  },
]

export default DataTable;

