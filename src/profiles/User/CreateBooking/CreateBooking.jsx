import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const CreateBooking = ({ addBooking }) => {
  const [showModal, setShowModal] = useState(false)
  const [bookingData, setBookingData] = useState({
    fromDate: '',
    toDate: '',
    numberOfGuests: 0,
    numberOfOldGuests: 0,
    numberOfYoungGuests: 0,
    bedPreference: '',
  })
  const [bookingCreated, setBookingCreated] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const storedBookingData = localStorage.getItem('bookingData')
    if (storedBookingData) {
      setBookingData(JSON.parse(storedBookingData))
    }
  }, [])

  const handleOpenModal = () => {
    const isLoggedIn = true

    if (isLoggedIn) {
      setShowModal(true)
    } else {
      console.log('User must be logged in to add a booking')
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setPreviewMode(false)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setBookingData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    addBooking(bookingData)
    setShowModal(false)
    setBookingCreated(true)
    localStorage.setItem('bookingData', JSON.stringify(bookingData))
    alert('Booking created successfully!')

    setTimeout(() => {
      navigate('/booking-preview')
    }, 1000)
  }

  const handlePreviewClick = (event) => {
    event.preventDefault()
    setPreviewMode(true)
  }

  return (
    <div>
      <Button variant="primary" onClick={handleOpenModal}>
        Add Booking
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {previewMode ? (
            <div>
              <h4>Booking Details Preview</h4>
              <p>From Date: {bookingData.fromDate}</p>
              <p>To Date: {bookingData.toDate}</p>
              <p>Number of Guests: {bookingData.numberOfGuests}</p>
              <p>Number of Old Guests: {bookingData.numberOfOldGuests}</p>
              <p>Number of Young Guests: {bookingData.numberOfYoungGuests}</p>
              <p>Bed Preference: {bookingData.bedPreference}</p>
            </div>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formFromDate">
                <Form.Label>From Date:</Form.Label>
                <Form.Control
                  type="date"
                  name="fromDate"
                  value={bookingData.fromDate}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formToDate">
                <Form.Label>To Date:</Form.Label>
                <Form.Control
                  type="date"
                  name="toDate"
                  value={bookingData.toDate}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formNumberOfGuests">
                <Form.Label>Number of Guests:</Form.Label>
                <Form.Control
                  type="number"
                  name="numberOfGuests"
                  value={bookingData.numberOfGuests}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formNumberOfOldGuests">
                <Form.Label>Number of Old Guests (18+):</Form.Label>
                <Form.Control
                  type="number"
                  name="numberOfOldGuests"
                  value={bookingData.numberOfOldGuests}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formNumberOfYoungGuests">
                <Form.Label>Number of Young Guests (Below 18):</Form.Label>
                <Form.Control
                  type="number"
                  name="numberOfYoungGuests"
                  value={bookingData.numberOfYoungGuests}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formBedPreference">
                <Form.Label>Bed Preference:</Form.Label>
                <Form.Control
                  as="select"
                  name="bedPreference"
                  value={bookingData.bedPreference}
                  onChange={handleChange}
                >
                  <option value="">Select Bed Preference</option>
                  <option value="family">Family Bed</option>
                  <option value="single">Single Bed</option>
                </Form.Control>
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                onClick={handlePreviewClick}
              >
                Preview
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>

      {bookingCreated && (
        <div>
          <p>Booking created successfully!</p>
        </div>
      )}
    </div>
  )
}

export default CreateBooking
