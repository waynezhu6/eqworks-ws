import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import useSupercluster from 'use-supercluster';
import MapOverlay from '../components/MapOverlay';
import getEventsInRange from '../lib/map';
import styles from '../styles/pages/Map.module.scss';

import ReactMapGL, { FlyToInterpolator, Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const Map = ({ data }) => {

  const map = useRef();
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    longitude: -79.3971,
    latitude: 43.6597,
    zoom: 8
  });

  useEffect(() => {
    const updateSize = () => setViewport(viewport);
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize)
  }, []);

  const [selected, setSelected] = useState({});
  const [from, setFrom] = useState(new Date("12/31/2016"));
  const [to, setTo] = useState(new Date("02/01/2017"));
  const [results, setResults] = useState(getEventsInRange(data, from, to));
  let markers = data.markers;

  const bounds = map.current
    ? map.current
        .getMap()
        .getBounds()
        .toArray()
        .flat()
    : [];

  const { clusters, supercluster } = useSupercluster({
    points: markers,
    bounds,
    zoom: viewport.zoom,
    options: { radius: 75, maxZoom: 16 },
  });

  const setDates = (date, isFrom) => {
    if(isFrom){
      setFrom(date);
      setResults(getEventsInRange(data, date, to));
    }
    else{
      setTo(date);
      setResults(getEventsInRange(data, from, date));
    }
  }

  return (
    <div className={styles.body}>

      <MapOverlay 
        selected={selected}
        results={results}
        from={from}
        to={to}
        setDates={setDates}
      />

      <ReactMapGL
        {...viewport}
        minZoom={1}
        maxZoom={16}
        onViewportChange={nextViewport => setViewport(nextViewport)}
        mapboxApiAccessToken={"pk.eyJ1Ijoid2F5bmV6IiwiYSI6ImNrbDdmN3BtcTJteWsyb3BsNGt0YmpnZmYifQ.A-To5_8sa_6FqSTUW5TG1g"}
        ref={map}
      >
        {clusters.map((p, index) => {
          
          let [lon, lat] = p.geometry.coordinates;
          let isCluster = p.properties.cluster;

          if(isCluster){
            return (
              <Marker 
                key={index}
                longitude={lon}
                latitude={lat}
              >
                <div 
                  className={styles.cluster}
                  onClick={() => {
                    let zoom = supercluster.getClusterExpansionZoom(p.id);
                    setViewport({
                      ...viewport,
                      latitude: lat,
                      longitude: lon,
                      zoom,
                      transitionInterpolator: new FlyToInterpolator({
                        speed: 1,
                        curve: 3,
                      }),
                      transitionDuration: "auto"
                    });
                  }}
                >
                  *{p.properties.point_count} Locations
                </div>
              </Marker>
            );
          }
          else{
            return(
              <Marker 
                key={index}
                longitude={lon}
                latitude={lat}
              >
                <div 
                  className={styles.marker}
                  onClick={() => {
                    setSelected(p);
                  }}
                >
                  {p.name} - {results[p.name].length}
                </div>
              </Marker>
            );
          }
        })}
      </ReactMapGL>
    </div>

  );
}

export default Map;