import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Form, Button, Alert } from 'react-bootstrap'
import './Register.css';

const API_BASE_URL = 'https://api.noroff.dev/api/v1/holidaze/auth/register'

const Register = () => {
  const [venueManagerName, setVenueManagerName] = useState('')
  const [venueManagerEmail, setVenueManagerEmail] = useState('')
  const [venueManagerAvatar, setVenueManagerAvatar] = useState('')
  const [venueManagerPassword, setVenueManagerPassword] = useState('')
  const [
    venueManagerConfirmPassword,
    setVenueManagerConfirmPassword,
  ] = useState('')
  const [venueManagerErrorMessage, setVenueManagerErrorMessage] = useState('')

  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userConfirmPassword, setUserConfirmPassword] = useState('')
  const [userErrorMessage, setUserErrorMessage] = useState('')

  const handleVenueManagerRegister = async (e) => {
    e.preventDefault()

    if (!venueManagerEmail.endsWith('stud.noroff.no')) {
      setVenueManagerErrorMessage(
        'You must use a stud.noroff.no email address to register as a venue manager.',
      )
      return
    }

    if (venueManagerPassword !== venueManagerConfirmPassword) {
      setVenueManagerErrorMessage('Passwords do not match.')
      return
    }

    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: venueManagerName,
          email: venueManagerEmail,
          avatar: venueManagerAvatar,
          password: venueManagerPassword,
          role: 'venueManager',
        }),
      })

      if (response.ok) {
        localStorage.setItem(
          'registrationData',
          JSON.stringify({
            role: 'venueManager',
            name: venueManagerName,
            email: venueManagerEmail,
            avatar: venueManagerAvatar,
          }),
        )

        alert('You have successfully registered as a venue manager!')
        window.location.href = '/venue-manager' // Redirect to login page
      } else {
        const errorData = await response.json()
        setVenueManagerErrorMessage(errorData.message || 'Registration failed.')
      }
    } catch (error) {
      console.error(error)
      setVenueManagerErrorMessage('An error occurred. Please try again later.')
    }
  }

  const handleUserRegister = async (e) => {
    e.preventDefault()

    if (!userEmail.endsWith('stud.noroff.no')) {
      setUserErrorMessage(
        'You must use a stud.noroff.no email address to register as a user or manager.',
      )
      return
    }

    if (userPassword !== userConfirmPassword) {
      setUserErrorMessage('Passwords do not match.')
      return
    }

    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userName,
          email: userEmail,
          avatar: userAvatar,
          password: userPassword,
          role: 'user',
        }),
      })

      if (response.ok) {
        localStorage.setItem(
          'registrationData',
          JSON.stringify({
            role: 'user',
            name: userName,
            email: userEmail,
            avatar: userAvatar,
          }),
        )

        alert('You have successfully registered as a user!')
        window.location.href = '/UserLogin'
      } else {
        const errorData = await response.json()
        setUserErrorMessage(errorData.message || 'Registration failed.')
      }
    } catch (error) {
      console.error(error)
      setUserErrorMessage('An error occurred. Please try again later.')
    }
  }

  return (
    <Container>
      <div>
        <h1>Venue Manager Registration</h1>
        {venueManagerErrorMessage && (
          <Alert variant="danger">{venueManagerErrorMessage}</Alert>
        )}
        <Alert variant="info">
          Please note: This registration is for venue managers only. If you are
          a user, please register using the User Registration form.
        </Alert>
        <Form onSubmit={handleVenueManagerRegister}>
          <Form.Group controlId="venueManagerName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={venueManagerName}
              onChange={(e) => setVenueManagerName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="venueManagerEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={venueManagerEmail}
              onChange={(e) => setVenueManagerEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="venueManagerAvatar">
            <Form.Label>Avatar</Form.Label>
            <Form.Control
              type="text"
              value={venueManagerAvatar}
              onChange={(e) => setVenueManagerAvatar(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="venueManagerPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={venueManagerPassword}
              onChange={(e) => setVenueManagerPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="venueManagerConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={venueManagerConfirmPassword}
              onChange={(e) => setVenueManagerConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Register as Venue Manager
          </Button>
          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </Form>
      </div>
      <div>
        <h1>User Registration</h1>
        {userErrorMessage && <Alert variant="danger">{userErrorMessage}</Alert>}
        <Alert variant="info">
          Please note: This registration is for users only. If you are a venue
          manager, please register using the Venue Manager Registration form.
        </Alert>
        <Form onSubmit={handleUserRegister}>
          <Form.Group controlId="userName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="userEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="userAvatar">
            <Form.Label>Avatar</Form.Label>
            <Form.Control
              type="text"
              value={userAvatar}
              onChange={(e) => setUserAvatar(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="userPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="userConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={userConfirmPassword}
              onChange={(e) => setUserConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Register as User
          </Button>
          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </Form>
      </div>
    </Container>
  )
}

export default Register
