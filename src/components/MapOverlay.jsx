import React, { useState } from 'react';
import DatePicker from 'react-date-picker';
import styles from '../styles/components/MapOverlay.module.scss';

const MapOverlay = () => {

  const [from, setFrom] = useState(new Date("01/01/2017"));
  const [to, setTo] = useState(new Date());

  return(
    <div className={styles.body}>
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
  )
}

export default MapOverlay;
