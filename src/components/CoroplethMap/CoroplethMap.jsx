import React from 'react'
import './CoroplethMap.css'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import { useMap, useMapEvent } from 'react-leaflet/hooks'
import healthsites from '../../assets/data/healthsites.json'
import L from 'leaflet'
import { ImportantDevices } from '@mui/icons-material'

function MyMap() {
    function getColor(d) {
        return d <= 7 ? '#ffffcc' :
               d <= 13  ? '#c2e699' :
               d <= 20  ? '#78c679' :
               '#238443'; 
    }
    function style(feature) {
        return {
            fillColor: getColor(feature.properties.nb_hopitaux),
            fillOpacity: 0.5,
            weight: 2           
        };
    }
    const onEachRegion = (feature, layer) =>{
        const nb_hopitaux = feature.properties.nb_hopitaux; 
        const name = feature.properties['Regions.Nom_Region']
        layer.bindPopup('<div style="display: flex; flex-direction: column; align-items:center;"><h4 style="font-size:1rem;text-transform:capitalize;">'
        +name+'</h4>'+'<h5 style="font-size:1rem;">'+nb_hopitaux+'<span> hopitaux</span></h5></div>');
        layer.on('mouseover', function() { layer.openPopup(); }); 
        layer.on('mouseout', function() { layer.closePopup(); });  
      }
    const map = useMap()
    L.geoJson(healthsites, {style:style, 
        onEachFeature:(layer, feature) => onEachRegion(layer, feature)
    }).addTo(map);
    return null
  }
const CoroplethMap = () => {
  return (
        <MapContainer className="map_container" center={[29,-9]} zoom={5} scrollWheelZoom={true}>
        <TileLayer
          url="https://api.mapbox.com/styles/v1/nafissa1809/clbcvdaxm002914o0nj4d8kc0/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibmFmaXNzYTE4MDkiLCJhIjoiY2xiYTFtZDJkMTBlZjNxcWh1aHdwbnp0aCJ9.OBCk9K8H_5L_JfgvBgT8jQ"
        />
        <MyMap/>
        <img className="legende" src={require('../../assets/photos/legende.png')}/>
      </MapContainer>
  )
}

export default CoroplethMap