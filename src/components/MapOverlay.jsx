import React, { useState } from 'react';
import DatePicker from 'react-date-picker';
import moment from 'moment';
import styles from '../styles/components/MapOverlay.module.scss';

const MapOverlay = ({ selected, results, from, to, setDates }) => {

  let numEvents = selected.name ? results[selected.name].length + " events in range" : "";
  let recent = selected.name ? "Last: " + moment(results[selected.name][0].date).format("MMMM Do, YYYY - h A") : "";

  return(
    <div className={styles.body}>

      <div className={styles.filter}>
        <div className={styles.title}>
          Filter Events
        </div>
        <div className={styles.picker}>
          <span>From: </span> 
          <DatePicker 
            onChange={(d) => setDates(d, true)} 
            value={from}
            maxDate={to}
          />
        </div>
        <div className={styles.picker}>
          <span>To: </span> 
          <DatePicker 
            onChange={(d) => setDates(d, false)} 
            value={to}
            minDate={from}
          />
        </div>

        <div className={styles.name}>
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
