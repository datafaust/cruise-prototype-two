//LIBRARIES
import React, { Component } from 'react';
import Leaf from './components/Leaf';


//UTIL IMPORTS
//import { compare } from './util';



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      toggle: 0,
      viewPort: {
        height: "100vh",
        width: "100vw",
        latitude: 40.7510,
        longitude: -73.9688,
        zoom: 11
      },
      loaded: 1,
      userLocation: false,
      spots: false,
      geojson: null,
      showModal: false,
      initialWeekday: 'Monday',
      initialHour: '06:00',
      checked: false,
      showAccordian: "1",
      weekdays: [
        { id: 0, day: "Monday" },
        { id: 1, day: "Tuesday" },
        { id: 2, day: "Wednesday" },
        { id: 3, day: "Thursday" },
        { id: 4, day: "Friday" },
        { id: 5, day: "Saturday" },
        { id: 6, day: "Sunday" }
      ],
      hours: [
        { id: 0, hour: "12:00" },
        { id: 1, hour: "01:00" },
        { id: 2, hour: "02:00" },
        { id: 3, hour: "03:00" },
        { id: 4, hour: "04:00" },
        { id: 5, hour: "05:00" },
        { id: 6, hour: "06:00" },
        { id: 7, hour: "07:00" }
      ]
    };
    //this.handleWeekday = this.handleWeekday.bind(this);
    //this.handleHour = this.handleHour.bind(this);
  }

  async componentDidMount() {

    //REQUEST LOCATION
    await this.getCurrentLocation();

    //LOAD AND FILTER TOP 5 SPOTS NEAR USER
    //await this.rankSpots();

    //FETCH INITIAL GEOJSON
    this.fetchData();

  }


  //MAP REFERENCE
  setRef = (ref) => {
    this.map = ref;
  }

  //HANDLE WEEKDAY CHANGE
  testingSmth =(x)=> {
    
    //console.log(this.state.routingNum);
    this.setState({
      initialWeekday: x,
      loading: true
    });

    //swap out file
    this.fetchData();
  }

  //HANDLE HOUR CHANGE
  testingTimerZero =(x)=> {
    
    //console.log(this.state.routingNum);
    this.setState({
      initialHour: x,
      loading: true
    });

    //swap out file
    this.fetchData();

  }

  //TOGGLE MODAL
  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal })
  }


  //GET USER LOCATION
  getCurrentLocation = async () => {
    console.log("attempting to get user location ...")
    navigator.geolocation.getCurrentPosition(position => {

      console.log('user is at', [position.coords.latitude, position.coords.longitude]);

      let newViewPort = {
        height: "100vh",
        width: "100vw",
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        zoom: 14
      };

      this.setState({ viewPort: newViewPort });

      // setTimeout(() => {
      //   this.map.leafletElement.setView(new L.LatLng(position.coords.latitude, position.coords.longitude), this.state.viewPort.zoom);
      // }, 1000)

    });
  }


  //SWAP FILES AS EXAMPLE
  fetchData = () => {
    //MAP SHOULD CLEAR EVERYTIME NEW DATA IS FETCHED
    if(this.state.loaded === 1) {
      
      fetch(
        "https://raw.githack.com/datafaust/raw/main/cruise-prototype/hh_2020112300_2020120623_Saturday_02.geojson"
      )
        .then((response) => response.json())
        .then((geojson) => {
          console.log(geojson)
          this.setState({ geojson, loaded: 2 });
        });

    } else {
      fetch(
        "https://raw.githack.com/datafaust/raw/main/cruise-prototype/hh_2020112300_2020120623_Saturday_03.geojson"
      )
        .then((response) => response.json())
        .then((geojson) => {
          this.setState({ geojson, loaded: 1 });
        });
    } 
  };


  sortArrayofObjects = (property, order) => {
    var sortOrder = order === "asc" ? 1 : -1;
    return function (a, b) {
      var result = (a['properties'][property] < b['properties'][property]) ? -1 : (a['properties'][property] > b['properties'][property]) ? 1 : 0;
      return result * sortOrder;
    };
  };
  
  sliceGeo = async () => {
    const rearrangedFeatures = await this.state.geojson["features"]
      .sort(this.sortArrayofObjects("DIFF", "desc"))
      //.slice(0, 5); //ascending

      // let newViewPort = {
      //   height: "100vh",
      //   width: "100vw",
      //   latitude: 40.7128,
      //   longitude: -74.0060,
      //   zoom: 11
      // };

     this.setState({ 
       //geojson: rearrangedFeatures,
       checked: !this.state.checked
       //viewPort: newViewPort 
      });
    
    console.log(rearrangedFeatures);
  };
  

  render() {

    return (
      
          <div>
            {/** MAP */}
            <div>
              {this.state.geojson && <Leaf
                setRef={this.setRef}
                getCurrentLocation={this.getCurrentLocation}
                viewPort={this.state.viewPort}
                geojson={this.state.geojson}
                showModal={this.state.showModal}
                toggleModal ={this.toggleModal}
                testingSmth = {this.testingSmth}
                testingTimerZero = {this.testingTimerZero}
                sliceGeo={this.sliceGeo}
                checked={this.state.checked}
                showAccordian={this.state.showAccordian}
              />}
            </div>
          </div>
    );
  }
}

export default App;
