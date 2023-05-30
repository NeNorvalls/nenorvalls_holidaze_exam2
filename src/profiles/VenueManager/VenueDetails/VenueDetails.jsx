import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const VenueDetails = ({ selectedVenue, handleGoBackClick }) => {
  return (
    <Container>
      <Row>
        <Col>
          <h2>{selectedVenue.name}</h2>
          {selectedVenue.media && selectedVenue.media.length > 0 && (
            <img src={selectedVenue.media[0]} alt={selectedVenue.name} />
          )}
        </Col>
        <Col>
          <div>
            <h3>{selectedVenue.name}</h3>
            <p>{selectedVenue.description}</p>
            <p>Price: {selectedVenue.price} NOK per night</p>
            <p>Contact: {selectedVenue.contactEmail}</p>
            <p>Max Guests: {selectedVenue.maxGuests}</p>
            <p>Rating: {selectedVenue.rating}</p>
            <p>Meta:</p>
            <ul>
              <li>Wifi: {selectedVenue.meta.wifi ? 'Yes' : 'No'}</li>
              <li>Parking: {selectedVenue.meta.parking ? 'Yes' : 'No'}</li>
              <li>Breakfast: {selectedVenue.meta.breakfast ? 'Yes' : 'No'}</li>
              <li>Pets: {selectedVenue.meta.pets ? 'Yes' : 'No'}</li>
            </ul>
            <p>Location:</p>
            <ul>
              <li>Address: {selectedVenue.location.address}</li>
              <li>City: {selectedVenue.location.city}</li>
              <li>Zip: {selectedVenue.location.zip}</li>
              <li>Country: {selectedVenue.location.country}</li>
              <li>Continent: {selectedVenue.location.continent}</li>
              <li>Latitude: {selectedVenue.location.lat}</li>
              <li>Longitude: {selectedVenue.location.lng}</li>
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default VenueDetails
