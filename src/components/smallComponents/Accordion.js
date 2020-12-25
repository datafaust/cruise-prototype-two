import React, { useState } from 'react';
import { Accordion, Card, ListGroup, DropdownButton, Dropdown, Image } from 'react-bootstrap';
import classes from './accordion.module.css';
import TimePickerView from './TimePicker'
import { FaChevronCircleDown, FaChevronCircleUp } from "react-icons/fa";
import checked from '../../assets/check256.png'


const MainMenu = (props) => {
  const [opened, setOpened] = useState(true);

  const testingSmthFin = (x) => {
    props.testingSmthSec(x)
  }

  const handleTimer = (x) => {
    props.testingTimer(x)
  }

  //TOP 5 SPOTS
  let spots = null;
  if (props.regions) {
    spots = (
      <div>
        {props.regions.map((region, i) => {
          return <div key={i}>
            <ListGroup.Item
              value={region.region}
              style={{ backgroundColor: region.isChecked ? '#90EE90' : 'White' }}
              onClick={(e) => props.handleCheck(region.region, i)}
            >
              {region.region}
              {
                region.isChecked ?
                  <Image
                    style={{ marginLeft: '50%' }}
                    src={checked}
                    width="20"
                    height="20"
                  /> : <div></div>
              }
            </ListGroup.Item>
          </div>
        })}
      </div>
    )
  }


  //WEEKDAY DROPDOWNS
  let dropDown = null;
  if (props.weekdays) {
    dropDown = (
      <div>
        {props.weekdays.map((weekday, i) => {
          return <div key={i}>
            <Dropdown.Item
              onClick={() => testingSmthFin(weekday.day)}
            >
              {weekday.day}
            </Dropdown.Item >
          </div>
        })}
      </div>
    )
  }



  return (
    <Accordion defaultActiveKey={props.showAccordian} className={classes.mainMenu}>
      <Card style={{ padding: 10, backgroundColor: '#ffffff78' }}>
        <Accordion.Toggle as={Card.Header} eventKey="0" style={{ padding: 10, backgroundColor: '#3f4042ba' }} onClick={() => setOpened(!opened)}>
          {/* <text style={{ color: 'beige', fontWeight: 'bolder' }}>Croozer </text> */}
          <text style={{ color: 'beige' }}>NYC TLC Driver Assistance: Filters </text>
          {opened ? <FaChevronCircleUp color='white' /> : <FaChevronCircleDown color='white' />}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body style={{ padding: 10, backgroundColor: 'white', borderRadius: '3%' }}>
            <ListGroup>
              <ListGroup.Item>
                <DropdownButton
                  warning
                  title='Day of Week'
                >
                  {dropDown}
                </DropdownButton>
              </ListGroup.Item>
              <ListGroup.Item><TimePickerView handleTimer={handleTimer} /></ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Accordion.Collapse>
        <Accordion.Collapse eventKey="0">
          <Card.Body style={{ padding: 10, backgroundColor: 'white', marginTop: 10, borderRadius: '3%' }}>
            <Card.Title style={{ textAlign: "center" }}>Top 5 Hotspots</Card.Title>
            <ListGroup>
              {spots}
            </ListGroup>
          </Card.Body>
        </Accordion.Collapse>
      </Card>

    </Accordion>
  )
}

export default MainMenu