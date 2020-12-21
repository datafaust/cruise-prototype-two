import { getDistance } from "geolib";
 
 //FUNCTION: SORT
 export const compare = ( a, b ) => {
    if ( a.distance < b.distance ){
      return -1;
    }
    if ( a.distance > b.distance ){
      return 1;
    }
    return 0;
  }
  
  //FUNCTION: CALCULATES DISTANCE
  export const calculateDistance = (start_x,start_y, end_x,end_y) => {
    try {
      let distance = getDistance(
        {
          latitude: start_x,
          longitude: start_y,
        },
        {
          latitude: end_x,
          longitude: end_y,
        },
        //(accuracy = 100)
      );
      //console.log('distanceFromCourt: ',distance)
      //checkin(distance);
        return(distance);  
      } catch (error) {
      console.log(error)
    }
  }

  //FUNCTION: SORT GEOJSON
  const sortGeo = (data) => {
    
  }

  