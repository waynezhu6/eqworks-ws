import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import ReactMapGL, { FlyToInterpolator, Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import useSupercluster from 'use-supercluster';
import { generateEvents, generatePoints } from '../lib/utils';
import MapOverlay from '../components/MapOverlay';
import styles from '../styles/pages/Map.module.scss';

const Map = (props) => {

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

  let markers = generatePoints(props.data.poi);
  let events = generateEvents(props.data);

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

  console.log(clusters);

  return (
    <div style={{flex: 1}}>

      <MapOverlay/>

      <ReactMapGL
        {...viewport}
        minZoom={1}
        maxZoom={16}
        onViewportChange={nextViewport => setViewport(nextViewport)}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
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
                  *{p.properties.point_count}
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
                <div className={styles.marker}>
                  {p.name}
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