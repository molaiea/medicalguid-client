import React from "react";
import { MapContainer, TileLayer, Rectangle, Marker, Circle } from 'react-leaflet'
import { useMap, useMapEvent } from 'react-leaflet/hooks'
import { useEventHandlers } from '@react-leaflet/core'
import { useState, useMemo, useCallback } from "react";
import MarkerClusterGroup from '@changey/react-leaflet-markercluster';
import L, { geoJSON } from 'leaflet'
import "@changey/react-leaflet-markercluster/dist/styles.min.css";
import './BaseMap.css'
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { LocationMarker } from "../LocationMarker/LocationMarker";
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

const POSITION_CLASSES = {
    bottomleft: 'leaflet-bottom leaflet-left',
    bottomright: 'leaflet-bottom leaflet-right',
    topleft: 'leaflet-top leaflet-left',
    topright: 'leaflet-top leaflet-right',
  }
  
  const BOUNDS_STYLE = { weight: 1 }
  
  function MinimapBounds({ parentMap, zoom }) {
    const minimap = useMap()
  
    // Clicking a point on the minimap sets the parent's map center
    const onClick = useCallback(
      (e) => {
        parentMap.setView(e.latlng, parentMap.getZoom())
      },
      [parentMap],
    )
    useMapEvent('click', onClick)
  
    // Keep track of bounds in state to trigger renders
    const [bounds, setBounds] = useState(parentMap.getBounds())
    const onChange = useCallback(() => {
      setBounds(parentMap.getBounds())
      // Update the minimap's view to match the parent map's center and zoom
      minimap.setView(parentMap.getCenter(), zoom)
    }, [minimap, parentMap, zoom])
  
    // Listen to events on the parent map
    const handlers = useMemo(() => ({ move: onChange, zoom: onChange }), [])
    useEventHandlers({ instance: parentMap }, handlers)
  
    return <Rectangle bounds={bounds} pathOptions={BOUNDS_STYLE} />
  }
  
  function MinimapControl({ position, zoom}) {
    const parentMap = useMap()
    const mapZoom = zoom || 0
    const minimap = useMemo(
      () => (
        <MapContainer
          style={{ height: 80, width: 80 }}
          center={parentMap.getCenter()}
          zoom={mapZoom}
          dragging={false}
          doubleClickZoom={false}
          scrollWheelZoom={false}
          attributionControl={false}
          zoomControl={false}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MinimapBounds parentMap={parentMap} zoom={mapZoom} />
        </MapContainer>
      ),
      [],
    )
        
    const positionClass =
      (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright
    return (
      <div className={positionClass}>
        <div className="leaflet-control leaflet-bar">{minimap}</div>
      </div>
    )
  }

 export default function BaseMap({data, handleMarkerClick, showRouting, gotoLoc, getRoutingInfo, handleLocationFound, search_center, bufferRadius, userPosition}) {
  const centermap = search_center.length != 0 ? search_center : [34, -6]  
  const zoommap = search_center.length != 0 ? 18 : 10

  return (
      <MapContainer className="map_container" center={[33.9594653,-6.8528503]} zoom={11} scrollWheelZoom={true}>
        <TileLayer
          url="https://api.mapbox.com/styles/v1/nafissa1809/clba1nbmd000s14pidvnzn2fx/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibmFmaXNzYTE4MDkiLCJhIjoiY2xiYTFtZDJkMTBlZjNxcWh1aHdwbnp0aCJ9.OBCk9K8H_5L_JfgvBgT8jQ"
        />
        {data.map(item=>{
          return (<MarkerClusterGroup key={data.indexOf(item)}>
            {item.data.map(e=>{
              return (<Marker icon={item.icon} key={item.data.indexOf(e)} 
              position={[e.lat, e.lng]}
              eventHandlers={{
                click: (i) => {
                  handleMarkerClick(e)
                },
              }} />)
            })}
        </MarkerClusterGroup>)
        })}
        {showRouting ? <LocationMarker gotoLoc={gotoLoc} getRoutingInfo={getRoutingInfo} 
        handleLocationFound={handleLocationFound}/> : <></>}
        {bufferRadius != 0 ? <Circle center={userPosition} radius={bufferRadius} /> : <></>}
        <MinimapControl zoom={10} position="topright"/>
      </MapContainer>
    )
  }