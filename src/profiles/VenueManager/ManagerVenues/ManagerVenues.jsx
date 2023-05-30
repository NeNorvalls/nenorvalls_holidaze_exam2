import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'

const ManagerVenues = () => {
  const [venues, setVenues] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedVenue, setSelectedVenue] = useState(null)
  const venuesPerPage = 12

  useEffect(() => {
    async function fetchVenues() {
      try {
        const response = await axios.get(
          'https://api.noroff.dev/api/v1/venueManager/venues?_media=true',
        )
        setVenues(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchVenues()
  }, [])

  const indexOfLastVenue = currentPage * venuesPerPage
  const indexOfFirstVenue = indexOfLastVenue - venuesPerPage
  const currentVenues = venues.slice(indexOfFirstVenue, indexOfLastVenue)

  const totalPages = Math.ceil(venues.length / venuesPerPage)

  function handlePreviousClick() {
    setCurrentPage(currentPage - 1)
  }

  function handleNextClick() {
    setCurrentPage(currentPage + 1)
  }

  function handleViewDetailsClick(venue) {
    setSelectedVenue(venue)
  }

  function handleGoBackClick() {
    setSelectedVenue(null)
  }

  return (
    <Container>
      <h1>Venues</h1>
      {selectedVenue ? (
        <div>
          <h2>{selectedVenue.name}</h2>
          {selectedVenue.media && selectedVenue.media.length > 0 && (
            <img src={selectedVenue.media[0]} alt={selectedVenue.name} />
          )}
          <div>
            <h3>Description:</h3>
            <p>{selectedVenue.description}</p>
            <h3>Price:</h3>
            <p>{selectedVenue.price} NOK per night</p>
            <h3>Contact:</h3>
            <p>{selectedVenue.contactEmail}</p>
            <h3>Max Guests:</h3>
            <p>{selectedVenue.maxGuests}</p>
            <h3>Rating:</h3>
            <p>{selectedVenue.rating}</p>
            <h3>Meta:</h3>
            <ul>
              <li>Wifi: {selectedVenue.meta.wifi ? 'Yes' : 'No'}</li>
              <li>Parking: {selectedVenue.meta.parking ? 'Yes' : 'No'}</li>
              <li>Breakfast: {selectedVenue.meta.breakfast ? 'Yes' : 'No'}</li>
              <li>Pets: {selectedVenue.meta.pets ? 'Yes' : 'No'}</li>
            </ul>
            <h3>Location:</h3>
            <ul>
              <li>Address: {selectedVenue.location.address}</li>
              <li>City: {selectedVenue.location.city}</li>
              <li>Zip: {selectedVenue.location.zip}</li>
              <li>Country: {selectedVenue.location.country}</li>
              <li>Continent: {selectedVenue.location.continent}</li>
              <li>Latitude: {selectedVenue.location.lat}</li>
              <li>Longitude: {selectedVenue.location.lng}</li>
            </ul>
            <Button onClick={handleGoBackClick}>Go Back</Button>
          </div>
        </div>
      ) : (
        <>
          <Row>
            {currentVenues.map((venue) => (
              <Col key={venue.id} sm={6} md={4} lg={3}>
                <Card>
                  {venue.media && venue.media.length > 0 && (
                    <Card.Img
                      variant="top"
                      src={venue.media[0]}
                      alt={venue.name}
                    />
                  )}
                  <Card.Body>
                    <Card.Title>{venue.name}</Card.Title>
                    <Card.Text>{venue.description}</Card.Text>
                    <Button onClick={() => handleViewDetailsClick(venue)}>
                      View Details
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <div className="button-container">
            {' '}
            {currentPage > 1 && (
              <Button onClick={handlePreviousClick}>Previous</Button>
            )}
            {currentPage < totalPages && (
              <Button onClick={handleNextClick}>Next</Button>
            )}
          </div>
        </>
      )}
    </Container>
  )
}

export default ManagerVenues
