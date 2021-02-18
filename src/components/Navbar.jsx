import React, { useState } from 'react';
import styles from '../styles/components/Navbar.module.scss';
import { useHistory } from 'react-router-dom';

const Navbar = () => {

  let history = useHistory();
  let [selected, setSelected] = useState(0);

  return (
    <div className={styles.body}>
      <div className={styles.title}>EQ Works - Work Sample</div>
      <div className={styles.subtitle}>Product Developer 2a - Frontend Track</div>

      <div 
        className={selected == 0 ? styles.sLabel : styles.label} 
        onClick={() => {
          setSelected(0);
          history.push("/visualizations");
        }}
      >
        Visualizations
      </div>

      <div 
        className={selected == 1 ? styles.sLabel : styles.label} 
        onClick={() => {
          setSelected(1);
          history.push("/datatable");
        }}
      >
        Data Table
      </div>

      <div 
        className={selected == 2 ? styles.sLabel : styles.label} 
        onClick={() => {
          setSelected(2);
          history.push("/map");
        }}
      >
        Map
      </div>

    </div>
  );
}

export default Navbar;