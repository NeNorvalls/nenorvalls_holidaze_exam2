import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const CreateVenue = ({ addVenue }) => {
  const [showModal, setShowModal] = useState(false)
  const [venueData, setVenueData] = useState({
    name: '',
    description: '',
    media: [],
    price: 0,
    maxGuests: 0,
    rating: 0,
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
    location: {
      address: '',
      city: '',
      zip: '',
      country: '',
      continent: '',
      lat: 0,
      lng: 0,
    },
  })
  const [venueCreated, setVenueCreated] = useState(false)

  useEffect(() => {
    fetchVenueData()
  }, [])

  const fetchVenueData = async () => {
    try {
      const response = await fetch(
        'https://api.noroff.dev/api/v1/holidaze/venues',
      )
      const data = await response.json()
      // Handle the fetched data here
      console.log(data)
    } catch (error) {
      // Handle the error here
      console.error(error)
    }
  }

  const handleOpenModal = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setVenueData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target
    setVenueData((prevState) => ({
      ...prevState,
      meta: {
        ...prevState.meta,
        [name]: checked,
      },
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // Add validation logic if needed
    if (typeof addVenue === 'function') {
      addVenue(venueData)
    }
    setShowModal(false)
    setVenueCreated(true)
    localStorage.setItem('venueData', JSON.stringify(venueData))
  }

  const handleMediaChange = (event) => {
    const { value } = event.target
    const media = value.split(',').map((url) => url.trim())
    setVenueData((prevState) => ({
      ...prevState,
      media,
    }))
  }

  return (
    <div>
      <Button variant="primary" onClick={handleOpenModal}>
        Add Venue
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Venue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={venueData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>Description:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={venueData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formMedia">
              <Form.Label>Media:</Form.Label>
              <Form.Control
                type="text"
                name="media"
                value={venueData.media.join(', ')}
                onChange={handleMediaChange}
              />
              <Form.Text className="text-muted">
                Separate media URLs with commas.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formPrice">
              <Form.Label>Price:</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={venueData.price}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formMaxGuests">
              <Form.Label>Max Guests:</Form.Label>
              <Form.Control
                type="number"
                name="maxGuests"
                value={venueData.maxGuests}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formRating">
              <Form.Label>Rating:</Form.Label>
              <Form.Control
                type="number"
                name="rating"
                value={venueData.rating}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formWifi">
              <Form.Check
                type="checkbox"
                name="wifi"
                label="Wifi"
                checked={venueData.meta.wifi}
                onChange={handleCheckboxChange}
              />
            </Form.Group>

            <Form.Group controlId="formParking">
              <Form.Check
                type="checkbox"
                name="parking"
                label="Parking"
                checked={venueData.meta.parking}
                onChange={handleCheckboxChange}
              />
            </Form.Group>

            <Form.Group controlId="formBreakfast">
              <Form.Check
                type="checkbox"
                name="breakfast"
                label="Breakfast"
                checked={venueData.meta.breakfast}
                onChange={handleCheckboxChange}
              />
            </Form.Group>

            <Form.Group controlId="formPets">
              <Form.Check
                type="checkbox"
                name="pets"
                label="Pets"
                checked={venueData.meta.pets}
                onChange={handleCheckboxChange}
              />
            </Form.Group>

            <Form.Group controlId="formAddress">
              <Form.Label>Address:</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={venueData.location.address}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formCity">
              <Form.Label>City:</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={venueData.location.city}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formZip">
              <Form.Label>Zip:</Form.Label>
              <Form.Control
                type="text"
                name="zip"
                value={venueData.location.zip}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formCountry">
              <Form.Label>Country:</Form.Label>
              <Form.Control
                type="text"
                name="country"
                value={venueData.location.country}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formContinent">
              <Form.Label>Continent:</Form.Label>
              <Form.Control
                type="text"
                name="continent"
                value={venueData.location.continent}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formLatitude">
              <Form.Label>Latitude:</Form.Label>
              <Form.Control
                type="number"
                name="lat"
                value={venueData.location.lat}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formLongitude">
              <Form.Label>Longitude:</Form.Label>
              <Form.Control
                type="number"
                name="lng"
                value={venueData.location.lng}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Create
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {venueCreated && (
        <Modal show={venueCreated} onHide={() => setVenueCreated(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Venue Created</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Venue created successfully!</p>
            {/* Display venue details or any other confirmation message */}
            <p>Name: {venueData.name}</p>
            <p>Description: {venueData.description}</p>
            <img
              src={venueData.media}
              className="img-fluid"
              style={{ width: '200px', height: '150px' }}
              alt="Venue"
            />
            <p>Price: {venueData.price}</p>
            <p>Max Guests: {venueData.maxGuests}</p>
            <p>Rating: {venueData.rating}</p>
            <p>Wifi: {venueData.meta.wifi ? 'Yes' : 'No'}</p>
            <p>Parking: {venueData.meta.parking ? 'Yes' : 'No'}</p>
            <p>Breakfast: {venueData.meta.breakfast ? 'Yes' : 'No'}</p>
            <p>Pets: {venueData.meta.pets ? 'Yes' : 'No'}</p>
            <p>Address: {venueData.location.address}</p>
            <p>City: {venueData.location.city}</p>
            <p>Zip: {venueData.location.zip}</p>
            <p>Country: {venueData.location.country}</p>
            <p>Continent: {venueData.location.continent}</p>
            <p>Latitude: {venueData.location.lat}</p>
            <p>Longitude: {venueData.location.lng}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setVenueCreated(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  )
}

export default CreateVenue
