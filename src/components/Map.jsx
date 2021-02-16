import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

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

  let markers = props.data;
  //console.log(markers);

  return (
    <div style={{flex: 1}}>
      <ReactMapGL
        {...viewport}
        minZoom={1}
        maxZoom={20}
        onViewportChange={nextViewport => setViewport(nextViewport)}
        mapboxApiAccessToken={"pk.eyJ1Ijoid2F5bmV6IiwiYSI6ImNrbDdmN3BtcTJteWsyb3BsNGt0YmpnZmYifQ.A-To5_8sa_6FqSTUW5TG1g"}
        ref={map}
        onResize={() => {}}
      >
        {markers.map((marker, index) => (
          <Marker
            longitude={marker.lon}
            latitude={marker.lat}
            key={index}
          >
            <div style={{fontSize: 16}}>
              {marker.name}
            </div>
          </Marker>
        ))}
      </ReactMapGL>
    </div>

  );
}

export default Map;