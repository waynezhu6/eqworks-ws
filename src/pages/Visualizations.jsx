import React from 'react';
import BarChart from '../components/BarChart';
import styles from '../styles/pages/Visualizations.module.scss';

const Visualizations = ({ data }) => {

  console.log(data);

  return(
    <div className={styles.body}>
      <BarChart data={data}/>
      {/* <BarChart data={data.events_daily}/>
      <BarChart data={data.events_daily}/>
      <BarChart data={data.events_daily}/> */}
    </div>
  );
}

const CONFIG = {

}

export default Visualizations;