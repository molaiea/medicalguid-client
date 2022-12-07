import "leaflet-routing-machine"
import { createControlComponent } from "@react-leaflet/core";
import L from 'leaflet'
import './RoutingMachine.css'
  const createRoutineMachineLayer = ({position, placeLocation, getRoutingInfo}) => {
    L.Marker.prototype.options.icon = L.icon({
      iconUrl: require("../../assets/pin.png"),
      iconSize: [35, 35]  
    });
    
    const instance = L.Routing.control({
      waypoints: [
        position,
        placeLocation
      ],
      lineOptions: {
        styles: [
          {
            color: "blue",
            opacity: 0.8,
            weight: 3
          }
        ]
      },
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: false,
      showAlternatives: false
    });

    // var distance= document.getElementsByClassName('leaflet-routing-alt')[0].children[1].childNodes[0].data.split(",")[0];
    // var eta= document.getElementsByClassName('leaflet-routing-alt')[0].children[1].childNodes[0].data.split(",")[1];
    getRoutingInfo()
    return instance;
  };

 export const RoutingMachine = createControlComponent(createRoutineMachineLayer);

