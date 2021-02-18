import React, { useState } from 'react';
import Table from '../components/Table';
import { generateEvents, generateStats } from '../lib/utils';
import styles from '../styles/pages/DataTable.module.scss';

const DataTable = (props) => {

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
            data={v.data(props.data)}
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
    data: (d) => generateEvents(d)
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
        { Header: "Revenue", accessor: "revenue" }
      ]
    }],
    data: (d) => generateStats(d)
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
    data: (d) => d.poi
  },
]

export default DataTable;

