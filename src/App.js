//LIBRARIES
import React, { Component } from 'react';
import Leaf from './components/Leaf';
import classes from './app.module.css';
import Navigator from './components/smallComponents/Navigator';
import { Container, Row, Col, Form } from 'react-bootstrap';


//UTIL IMPORTS
//import { compare } from './util';

//EXTRAS
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
      geojson: null,
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
    //await this.rankSpots();

    //FETCH INITIAL GEOJSON
    this.fetchData();

  }

  //MAP REFERENCE
  setRef = (ref) => {
    this.map = ref;
  }

  //HANDLE WEEKDAY CHANGE
  handleWeekday(event) {
    console.log(event.target.value)
    //console.log(this.state.routingNum);
    this.setState({
      initialWeekday: event.target.value,
      loading: true
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

      setTimeout(() => {
        this.map.leafletElement.setView(new L.LatLng(position.coords.latitude, position.coords.longitude), this.state.viewPort.zoom);
      }, 1000)

    });
  }


  // rankSpots = async () => {
  //   let spots = [];
  //   await fetch(`${geojson}`)
  //     .then((response) => response.json())
  //     .then((geojson) => {
  //       geojson.features.map(feature => {
  //         spots.push(
  //           {
  //             "id": feature.properties.index_right,
  //             "latitude": this.state.userLocation[0],
  //             "longitude": this.state.userLocation[1]
  //           }
  //         )
  //       })
  //     })
  //   this.setState({ spots: spots.sort(compare).slice(0, 5) })
  //   return spots
  // }

  //SWAP FILES AS EXAMPLE
  fetchData = () => {
    //MAP SHOULD CLEAR EVERYTIME NEW DATA IS FETCHED
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


  geoFilter = (feature) => {
    let ids = [0, 1, 5, 6];
    return ids.includes(feature.properties.index_right)
  };

  // sliceGeo = async (geojson) => {
  //   let res = await L.geoJson(geojson, { filter: this.geoFilter }).addTo(map);
  //   console.log('res', res)
  // }



  render() {

    return (
      
          <Container fluid="md"  >
            <Navigator />

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
                setRef={this.setRef}
                getCurrentLocation={this.getCurrentLocation}
                viewPort={this.state.viewPort}
                geojson={this.state.geojson}
                showModal={this.state.showModal}
                toggleModal ={this.toggleModal}
              />}
            </div>

          </Container>


    );
  }
}

export default App;


/**
 * LoadingMessage = () => {
    return (
      <div className={classes.splash_screen}>
        <div className={classes.loader}></div>
      </div>
    );
  }
 */