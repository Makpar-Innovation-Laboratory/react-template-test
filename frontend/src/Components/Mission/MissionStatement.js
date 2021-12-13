import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.css';
import MissionCard from './MissionCard'

function MissionStatement() {
    return (
        <div
            className="d-flex flex-column background-light "
            style={{ width: "100%", minHeight: "95vh" }}
        >
           
            <Row xs={2} md={4} lg={6}>
                <Col>
                    <h3>Mission</h3>
                </Col>
                <Col>
                    <h3>Lorem ipsum dolor sit amet</h3>
                </Col>
            </Row>
            <MissionCard></MissionCard>
        </div>
    )
}

export default MissionStatement
