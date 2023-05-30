import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import VenueDetails from '../../profiles/VenueManager/VenueDetails/VenueDetails'
import { Container, Form, Button } from 'react-bootstrap'

const Search = ({ handleAddVenue }) => {
  const [query, setQuery] = useState('')
  const [venues, setVenues] = useState([])
  const [selectedVenue, setSelectedVenue] = useState(null)
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const handleInputChange = (event) => {
    setQuery(event.target.value)
  }

  const fetchVenues = (query) => {
    const url = `https://api.noroff.dev/api/v1/holidaze/venues?q=${query}`
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setVenues(data)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  const handleVenueClick = (venue) => {
    setSelectedVenue(venue)
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setSelectedVenue(null)
    setModalIsOpen(false)
  }

  useEffect(() => {
    if (query.trim() !== '') {
      fetchVenues(query)
    } else {
      setVenues([])
    }
  }, [query])

  const renderVenues = () => {
    if (venues.length === 0) {
      return <p>No venues found.</p>
    }

    return venues.map((venue) => (
      <div key={venue.id} onClick={() => handleVenueClick(venue)}>
        <h3>{venue.name}</h3>
        <p>ID: {venue.id}</p>
      </div>
    ))
  }

  return (
    <Container>
      <Form>
        <Form.Group controlId="search">
          <Form.Label>Search by ID or Venue Name:</Form.Label>
          <Form.Control
            type="text"
            value={query}
            onChange={handleInputChange}
          />
        </Form.Group>
      </Form>

      <div>{renderVenues()}</div>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        {selectedVenue && (
          <>
            <VenueDetails
              selectedVenue={selectedVenue}
              handleGoBackClick={closeModal}
              handleAddVenue={handleAddVenue}
            />
          </>
        )}
        <Button variant="primary" onClick={closeModal}>
          Close
        </Button>
      </Modal>
    </Container>
  )
}

export default Search
