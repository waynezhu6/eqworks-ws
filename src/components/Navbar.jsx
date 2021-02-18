import React from 'react';
import styles from '../styles/components/Navbar.module.scss';
import { useHistory } from 'react-router-dom';

const Navbar = () => {

  let history = useHistory();

  return (
    <div className={styles.body}>
      <div className={styles.title}>EQ Works - Work Sample</div>
      <div className={styles.subtitle}>Product Developer 2a - Frontend Track</div>

      <div 
        className={styles.label} 
        onClick={() => history.push("/visualizations")}
      >
        Visualizations
      </div>

      <div 
        className={styles.label} 
        onClick={() => history.push("/datatable")}
      >
        Data Table
      </div>

      <div 
        className={styles.label} 
        onClick={() => history.push("/map")}
      >
        Map
      </div>

    </div>
  );
}

export default Navbar;