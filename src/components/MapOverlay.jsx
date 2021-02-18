import React, { useState } from 'react';
import DatePicker from 'react-date-picker';
import styles from '../styles/components/MapOverlay.module.scss';

const MapOverlay = ({ selected, results }) => {

  const [from, setFrom] = useState(new Date("01/01/2017"));
  const [to, setTo] = useState(new Date());

  let numEvents = selected.name ? results[selected.name].length + " events in range" : "";
  let recent = selected.name ? results[selected.name][0].date : "";

  return(
    <div className={styles.body}>

      <div className={styles.filter}>
        <div className={styles.title}>
          Filter Events
        </div>
        <div className={styles.picker}>
          <span>From: </span> 
          <DatePicker 
            onChange={setFrom} 
            value={from}
            maxDate={to}
          />
        </div>
        <div className={styles.picker}>
          <span>To: </span> 
          <DatePicker 
            onChange={setTo} 
            value={to}
            minDate={from}
          />
        </div>
      </div>

      <div className={styles.display}>
        <div className={styles.title}>
          {selected.name}
        </div>
        <div className={styles.field}>
          {numEvents}
        </div>
        <div className={styles.field}>
          {recent}
        </div>

      </div>

    </div>
  );
}

export default MapOverlay;
