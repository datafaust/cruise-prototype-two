//LIBRARIES
import React, { Component } from 'react';
import Leaf from './Leaf';
import classes from './app.module.css';
import Navigator from './Navigator';
import Pop from './Pop';
import { Container, Row, Col, Form, Alert } from 'react-bootstrap';
import Switch from "react-input-switch";

import { Button, Image } from 'react-bootstrap';

//IMAGES
import loc from "./assets/target.png"

//UTIL IMPORTS
import { compare, calculateDistance } from './util';


//import Simple from './Simple'

//DATA
import geojson from "./assets/data/hh_2020112300_2020120623_Saturday_02.geojson";
import geojson2 from "./assets/data/hh_2020112300_2020120623_Saturday_03.geojson";

var L = require('leaflet')

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
      position: null,
      geojson: null,
      data: [],
      loading: true,
      open: true,
      showModal: false,
      initialWeekday: 'Monday',
      initialHour: '06:00 AM',
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
        { id: 0, hour: "12:00 AM" },
        { id: 1, hour: "01:00 AM" },
        { id: 2, hour: "02:00 AM" },
        { id: 3, hour: "03:00 AM" },
        { id: 4, hour: "04:00 AM" },
        { id: 5, hour: "05:00 AM" },
        { id: 6, hour: "06:00 AM" },
        { id: 7, hour: "07:00 AM" }
      ]
    };
    this.handleWeekday = this.handleWeekday.bind(this);
    this.handleHour = this.handleHour.bind(this);
  }

  async componentDidMount() {

    //REQUEST LOCATION
    await this.getCurrentLocation();

    //LOAD AND FILTER TOP 5 SPOTS NEAR USER
    await this.rankSpots();

    //SET CURRENT GEOJSON
    await this.fetchData();

    //set modal run after two seconds
    setTimeout(() => {
      this.setState({
        showModal: false
      });
    }, 2500)


  }


  // componentDidUpdate () {
  //   if(this.state.data.length != 0) {
  //     this.calculateInspections();
  //   }
  //  }

  //HANDLE WEEKDAY CHANGE
  handleWeekday(event) {
    console.log(event.target.value)
    //console.log(this.state.routingNum);
    this.setState({
      initialWeekday: event.target.value,
      loading: true,
      data: [],
    });

    //swap out file
    this.fetchData();
  }

  //HANDLE HOUR CHANGE
  handleHour(event) {
    console.log(event.target.value)
    //console.log(this.state.routingNum);
    this.setState({
      initialHour: event.target.value,
      loading: true,
      data: []
    });

    //swap out file
    this.fetchData();

  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }




  LoadingMessage = () => {
    return (
      <div className={classes.splash_screen}>
        <div className={classes.loader}></div>
      </div>
    );
  }


  closeModal = () => {
    this.setState({ showModal: false })
  }

  openModal = () => {
    this.setState({ showModal: true })
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal })
  }

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

      //  setTimeout(() => {
      //    this.map.leafletElement.setView(new L.LatLng(position.coords.latitude, position.coords.longitude), this.props.viewPort.zoom);
      //  }, 100)

    });
  }


  rankSpots = async () => {
    let spots = [];
    await fetch(`${geojson}`)
      .then((response) => response.json())
      .then((geojson) => {
        geojson.features.map(feature => {
          spots.push(
            {
              "id": feature.properties.index_right,
              "latitude": this.state.userLocation[0],
              "longitude": this.state.userLocation[1]
            }
          )
        })
      })
    this.setState({ spots: spots.sort(compare).slice(0, 5) })
    return spots
  }

  //SWAP FILES AS EXAMPLE
  fetchData = () => {

    if(this.state.loaded === 1) {

      fetch(
        "https://raw.githack.com/datafaust/raw/main/cruise-prototype/hh_2020112300_2020120623_Saturday_02.geojson"
      )
        .then((response) => response.json())
        .then((geojson) => {
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





  // filterByIds = (ids) => {
  //   return futures => ids.includes(feature.properties.index_right)
  // }

  //FILTER GEOJSON
  // sliceGeo = async () => {
  //   let ids = [1, 2, 3, 4, 5]
  //   let filtered = await L.geoJson(geojson, { filter: this.filterByIds(ids) }).addTo(map);
  //   console.log("filtered:", filtered)
  //   return filtered
  // }

  toggle = () => {
    if (this.state.toggle === 1) {
      this.setState({ toggle: 0 })
    } else {
      this.setState({ toggle: 1 })
    }
  }



  //inspection_date >= '${this.state.dateInput}'& 
  // https://data.cityofnewyork.us/resource/p937-wjvj.json?$where=inspection_date >= '2019-10-10T12:00:00' 

  render() {

    return (
      <div >
        {!this.state.loading ?
          this.LoadingMessage() :
          <Container fluid="md"  >
            <Navigator />

            {/* <Pop
              title={"Loacing"}
              summary={"Reloading map based on your location..."}
              showModal={this.state.showModal}
              closeModal={this.closeModal}
            />  */}


            {/** FILTERS */}
            <Row
              style={{ marginLeft: '1%', marginTop: '1%', marginRight: '1%' }}
            >
              <Col>
                {this.state.weekdays && <Form>
                  <Form.Group controlId="weekday_select">
                    <Form.Label>Choose a weekday:</Form.Label>
                    <Form.Control as="select" value={this.state.initialWeekday} onChange={this.handleWeekday}>
                      {this.state.weekdays.map((weekday, i) => <option key={weekday.id} value={weekday.id}>{weekday.day}</option>)})
                  </Form.Control>
                  </Form.Group>
                </Form>

                }
              </Col>
              <Col>
                {this.state.hours && <Form>
                  <Form.Group controlId="hour_select">
                    <Form.Label>Choose an Hour:</Form.Label>
                    <Form.Control as="select" value={this.state.initialHour} onChange={this.handleHour}>
                      {this.state.hours.map((hour, i) => <option key={hour.id} value={hour.id}>{hour.hour}</option>)})
                  </Form.Control>
                  </Form.Group>
                </Form>

                }
              </Col>

            </Row>



            {/** MAP */}
            <div>
              {this.state.geojson && <Leaf
                data={this.state.data}
                getCurrentLocation={this.getCurrentLocation}
                viewPort={this.state.viewPort}
                geojson={this.state.geojson}
                showModal={this.state.showModal}
                closeModal={this.closeModal}
                toggleModal = {this.toggleModal}
              />}
            </div>

          </Container>
        }
      </div>

    );
  }
}

export default App;


/**
 *  let spots = null;
        if (this.state.spots) {
            spots = (
                <div>
                    {
                        this.state.spots.map((spot, i) => {
                            return <div key={i}>
                                <div>
                                  <p>{
                                      spot.id
                                    }</p>
                                </div>
                            </div>
                        })
                    }
                </div>
            )
        }




 */


//   {/** MAP CONTROLS */}
//   <Row>
//   <Col>

//     <Switch 
//       value={this.state.toggle} 
//       onChange={this.toggle} 
//       style={{width:"10%", height: "50%"}}
//     />

//   </Col>
//   <Col>
//     <Image
//       style={{backgroundColor:'white'}}
//       src={loc}
//       width="50"
//       height="50"
//       onClick={this.props.getCurrentLocation}
//     />
//   </Col>
// </Row>

/**
 *  if (this.state.loading === 1) {
      let data = await
        fetch(
          "https://raw.githack.com/datafaust/raw/main/cruise-prototype/hh_2020112300_2020120623_Saturday_02.geojson"
        )
          .then((response) => response.json())
          .then((geojson) => {
            return geojson
          })

      console.log("my_data: ", geojson)
      this.setState({ geojson: data, loading: 1 })
      return data

    } else {

      let data = await
        fetch(
          "https://raw.githack.com/datafaust/raw/main/cruise-prototype/hh_2020112300_2020120623_Saturday_03.geojson"
        )
          .then((response) => response.json())
          .then((geojson) => {
            return geojson
          })

      this.setState({ geojson: data, loading: 2 })
      return data


    }
 */