import React from 'react'
import './CoroplethMap.css'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import { useMap, useMapEvent } from 'react-leaflet/hooks'
import healthsites from '../../assets/data/healthsites.json'
import L from 'leaflet'

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
            
        };
    }
    const onEachRegion = (feature, layer) =>{
        const countryName = feature.properties.nb_hopitaux; 
        const name = feature.properties['Regions.Nom_Region']
        layer.bindPopup(`${name}\n Nombre d'hopitaux: ${countryName}`);
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
          url="https://api.mapbox.com/styles/v1/nafissa1809/clba1nbmd000s14pidvnzn2fx/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibmFmaXNzYTE4MDkiLCJhIjoiY2xiYTFtZDJkMTBlZjNxcWh1aHdwbnp0aCJ9.OBCk9K8H_5L_JfgvBgT8jQ"
        />
        <MyMap/>
      </MapContainer>
  )
}

export default CoroplethMap