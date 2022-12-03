import React, { useState, useEffect, useRef } from 'react'
import { useMap } from 'react-leaflet';
import L from 'leaflet'
import { RoutingMachine } from "../RoutingMachine/RoutingMachine";

export function LocationMarker({gotoLoc, getRoutingInfo, handleLocationFound}) {
    const [position, setPosition] = useState(null);
    const placeLocation = gotoLoc;
    const map = useMap();
    
    useEffect(() => {
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        handleLocationFound()
      });
    }, [map]);
    
    return(
        (position === null || placeLocation === [0,0]) ? null : (
            <RoutingMachine position={position} placeLocation={gotoLoc} getRoutingInfo={getRoutingInfo}/>
          )
      
    )
  }