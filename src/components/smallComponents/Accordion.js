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


  return (
    <Accordion defaultActiveKey={props.showAccordian} className={classes.mainMenu}>
      <Card style={{ padding: 10, backgroundColor: '#ffffff78' }}>
        <Accordion.Toggle as={Card.Header} eventKey="0" style={{ padding: 10, backgroundColor: '#3f4042ba' }} onClick={() => setOpened(!opened)}>
          <text style={{ color: 'beige', fontWeight: 'bolder' }}>Croozer </text>
          <text style={{ color: 'beige' }}>: NYC TLC Driver Assistance -> Filters </text>
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
                  <Dropdown.Item eventKey="1" onClick={() => testingSmthFin('Monday')}>Monday</Dropdown.Item>
                  <Dropdown.Item eventKey="2" onClick={() => testingSmthFin('Tuesday')}>Tuesday</Dropdown.Item>
                  <Dropdown.Item eventKey="3" onClick={() => testingSmthFin('Wednesday')}>Wednesday</Dropdown.Item>

                  <Dropdown.Item eventKey="4" onClick={() => testingSmthFin('Thursday')}>Thursday</Dropdown.Item>
                  <Dropdown.Item eventKey="5" onClick={() => testingSmthFin('Friday')}>Friday</Dropdown.Item>
                  <Dropdown.Item eventKey="6" onClick={() => testingSmthFin('Saturday')}>Saturday</Dropdown.Item>
                  <Dropdown.Item eventKey="7" onClick={() => testingSmthFin('Sunday')}>Sunday</Dropdown.Item>
                </DropdownButton>





              </ListGroup.Item>
              <ListGroup.Item><TimePickerView handleTimer={handleTimer} /></ListGroup.Item>

            </ListGroup>

          </Card.Body>
        </Accordion.Collapse>
        <Accordion.Collapse eventKey="0">
         
          <Card.Body style={{ padding: 10, backgroundColor: 'white', marginTop: 10, borderRadius: '3%' }}>
            <Card.Title style={{textAlign: "center"}}>Top 5 Hotspots</Card.Title>
            <ListGroup>
              <ListGroup.Item 
                onClick={props.sliceGeo} 
                style={{ backgroundColor: props.checked ? '#90EE90' : 'White' }} 
              >Citywide
              {
                props.checked ?
                <Image
                  style={{marginLeft: '50%'}} 
                  src={checked} 
                  width="20"
                  height="20"
                /> : <div></div>
              }      
              </ListGroup.Item>
              <ListGroup.Item >Midtown</ListGroup.Item>
              <ListGroup.Item>Queens</ListGroup.Item>
              <ListGroup.Item>Brooklyn</ListGroup.Item>
              <ListGroup.Item>Bronx</ListGroup.Item>
              <ListGroup.Item>Staten Island</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Accordion.Collapse>
      </Card>

    </Accordion>
  )
}

export default MainMenu