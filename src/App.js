import React, { useEffect, useState } from 'react';
import {
  HashRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import './App.scss';
import styles from './styles/App.module.scss';
import Navbar from './components/Navbar';
import DataTable from './pages/DataTable';
import Map from './pages/Map';
import { getAllApiData } from './lib/api';
import BounceLoader from 'react-spinners/BounceLoader';
import Visualizations from './pages/Visualizations';
import { generateEvents, generatePoints, generateStats, mergeDateHour, sort } from './lib/utils';

const App = () => {

  //store api data here
  const [data, setData] = useState(null);

  useEffect(() => {
    // fetch data on first load
    const getData = async() => {
      let res = await getAllApiData();
      generateEvents(res);
      generateStats(res);
      generatePoints(res);
      mergeDateHour(res);
      sort(res);
      setData(res);
      console.log(res);
    }
    getData();
  }, []);

  return (
    <HashRouter>
      <div className={styles.body}>
        {data ? 
          <>
            <Navbar/>
            <div className={styles.placeholder}/>
            <Switch>
              <Route path="/visualizations"><Visualizations data={data}/></Route>
              <Route path="/datatable"><DataTable data={data}/></Route>
              <Route path="/map"><Map data={data}/></Route>
              <Redirect to="/visualizations"/>
            </Switch>
          </>

        :

          <BounceLoader 
            size={60}
            css={{ margin: "auto", transform: "translateY(30vh)" }}
            color={"#959595"}
          />
        }
      </div>
    </HashRouter>
  );

}

export default App;
