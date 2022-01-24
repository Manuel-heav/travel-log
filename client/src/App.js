import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';
import  { listLogEntries } from './API'
const App = ()=> {
  const [logEntries, setLogEntries] = useState([]);

  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 3
  });

  useEffect(() => {
    ( async() => {
        const logEntries = await listLogEntries();
        setLogEntries(logEntries)
      }
    )();
    listLogEntries();
  }, []);

  return (
    <ReactMapGL
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      {...viewport}
      mapStyle="mapbox://styles/manuelheav/ckyt1d4jbe7tm14lehhmc033h"
      onViewportChange={nextViewport => setViewport(nextViewport)}
    >
      {logEntries.map(entry => (
          <Marker key ={entry._id}latitude={entry.latitude} longitude={entry.longitude} offsetLeft={-12} offsetTop={-24}>
         <svg viewBox="0 0 24 24" width="24" height="24" 
         stroke="currentColor"
          stroke-width="2"
           fill="none"
           className="marker"
            stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
        </Marker>
      ))}
      </ReactMapGL>
  );
}

export default App;