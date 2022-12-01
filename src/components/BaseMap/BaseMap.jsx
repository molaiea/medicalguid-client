import React from "react";
import { MapContainer, TileLayer, Rectangle, Marker } from 'react-leaflet'
import { useMap, useMapEvent } from 'react-leaflet/hooks'
import { useEventHandlers } from '@react-leaflet/core'
import { useState, useMemo, useCallback } from "react";
import MarkerClusterGroup from '@changey/react-leaflet-markercluster';
import L from 'leaflet'
import "@changey/react-leaflet-markercluster/dist/styles.min.css";
import './BaseMap.css'
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
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
  
  function MinimapControl({ position, zoom, data }) {
    const parentMap = useMap()
    const mapZoom = zoom || 0
    // data.map((category)=>{
      
    // });
    // Memoize the minimap so it's not affected by position changes
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

 export default function BaseMap({data}) {
    var icon_size = [25, 25]
    var icon_clinics = L.icon({
      iconUrl: require('../../assets/icons/clinics.png'),
      iconSize:     icon_size, // size of the icon
    });
    var icon_pharmas = L.icon({
      iconUrl: require('../../assets/icons/pharmas.png'),
      iconSize:     icon_size, // size of the icon
    });
    var icon_dentists = L.icon({
      iconUrl: require('../../assets/icons/dentists.png'),
      iconSize:     icon_size, // size of the icon
    });
    var icon_labos = L.icon({
      iconUrl: require('../../assets/icons/laboratoires.png'),
      iconSize:     icon_size, // size of the icon
    });
    var icon_opticians = L.icon({
      iconUrl: require('../../assets/icons/opticiens.png'),
      iconSize:     icon_size, // size of the icon
    });
    var icon_transfusion = L.icon({
      iconUrl: require('../../assets/icons/transfusion.png'),
      iconSize:     icon_size, // size of the icon
    });
    var icons_array = [icon_clinics, icon_pharmas, icon_dentists, icon_labos, icon_opticians, icon_transfusion]
    return (
      <MapContainer className="map_container" center={[33.9724816,-6.7464094]} zoom={11} scrollWheelZoom={true}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data.map(item=>{
          return (<MarkerClusterGroup key={data.indexOf(item)}>
            {item.map(e=>{
              return (<Marker icon={icons_array[data.indexOf(item)]} key={item.indexOf(e)} position={[e.lat, e.lng]} />)
            })}
        </MarkerClusterGroup>)
        })}
        <MinimapControl data={data} position="topright" />
      </MapContainer>
    )
  }