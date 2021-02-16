import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import './App.scss';
import styles from './styles/App.module.scss';
import Navbar from './components/Navbar';
import DataTable from './components/DataTable';
import Map from './components/Map';
import { getAllApiData } from './lib/api';
import { generateEvents, formatDates } from './lib/utils';

const App = () => {

  //store api data here
  const [data, setData] = useState({
    "events_daily": [],
    "events_hourly": [],
    "stats_daily": [],
    "stats_hourly": [],
    "poi": []
  });

  useEffect(() => {
    const getData = async() => {
      setData(await getAllApiData());
    }
    getData();

  }, []);

  console.log(generateEvents(data));


  return (
    <div className={styles.body}>
      <Router>
        <Navbar/>

        <Switch>

          <Route path="/visualizations">
            <DataTable data={data}/>
          </Route>

          <Route path="/datatable"></Route>

          <Route path="/map">
            <Map data={data.poi}/>
          </Route>

          <Redirect to="/map"/>

        </Switch>
      </Router>
    </div>
  );

}

export default App;
