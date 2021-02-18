import React from 'react';
import Chart from '../components/Chart';
import EventsChart from '../components/EventsChart';
import styles from '../styles/pages/Visualizations.module.scss';

const Visualizations = ({ data }) => {

  return(
    <div className={styles.body}>

      <div className={styles.hint}>
        Hint: scroll in on charts to view higher resolution data.
        Click and drag to move viewport.
      </div>

      <div className={styles.charts}>
        <Chart
          dataZoomedIn={data.stats_hourly}
          dataZoomedOut={data.stats_daily}
          title="Daily Impressions"
          field="impressions"
          label="Impressions"
          max={3000000}
          maxZoom={180000}
        />     

        <Chart
          dataZoomedIn={data.stats_hourly}
          dataZoomedOut={data.stats_daily}
          title="Daily Revenue"
          field="revenue"
          label="Revenue"
          max={14000}
          maxZoom={1000}
        />

        <Chart
          dataZoomedIn={data.stats_hourly}
          dataZoomedOut={data.stats_daily}
          title="Daily Clicks"
          field="clicks"
          label="Clicks"
          max={4000}
          maxZoom={350}
        />

        <Chart
          dataZoomedIn={data.events_hourly}
          dataZoomedOut={data.events_daily}
          title="Daily Events"
          field="events"
          label="Events"
          max={80}
          maxZoom={20}
        />
      </div>


    </div>
  );
}

const CONFIG = {

}

export default Visualizations;