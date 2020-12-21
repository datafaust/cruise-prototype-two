import { useEffect } from "react";
import { useLeaflet } from "react-leaflet";
import L from "leaflet";
import "leaflet-choropleth";

function Choro(props) {
  const { map } = useLeaflet();

  useEffect(() => {
    if (Object.keys(props.geojson).length > 0) {
      L.choropleth(props.geojson, {
        valueProperty: "DIFF", // which property in the features to use
        scale: ["white", "red"], // chroma.js scale - include as many as you like
        steps: 5, // number of breaks or steps in range
        mode: "q", // q for quantile, e for equidistant, k for k-means
        //style,
        onEachFeature: function (feature, layer) {
          layer.bindPopup(
            "Total " + feature.properties.DIFF + "<br>" //+
            // feature.properties.incidents.toLocaleString() +
            // " incidents"
          );
        }
      }).addTo(map);
    }
  }, [props.geojson]);

  return null;
}

export default Choro;
















// //import geojson from "./assets/data/hh_2020112300_2020120623_Saturday_03.geojson";
// //import geojson from "./assets/crimes_by_district.geojson";
// //const data = require('./assets/crimes_by_district.json')
// import { useEffect } from 'react';
// import { useLeaflet } from "react-leaflet";
// //import L from "leaflet";
// var L = require('leaflet')
// require('leaflet-choropleth')


// function Choro(props) {
//     const { map } = useLeaflet();
  
//     useEffect(() => {
//       // fetch(
//       //   //"https://raw.githubusercontent.com/timwis/leaflet-choropleth/gh-pages/examples/basic/crimes_by_district.geojson"
//       //   `${props.geojson}`  
//       // )
//       //   .then((response) => response.json())
//       //   .then((geojson) => {
//           L.choropleth(props.geojson, {
//             valueProperty: "DIFF", // which property in the features to use
//             scale: ["white", "red"], // chroma.js scale - include as many as you like
//             steps: 5, // number of breaks or steps in range
//             mode: "q", // q for quantile, e for equidistant, k for k-means
//             //style,
//             onEachFeature: function (feature, layer) {
//               layer.bindPopup(
//                 "Total " +
//                   feature.properties.DIFF +
//                   "<br>" //+
//                   // feature.properties.incidents.toLocaleString() +
//                   // " incidents"
//               );
//             }
//           }).addTo(map);
//         //});
//     }, []);
  
//     return null;
//  }

//  export default Choro;