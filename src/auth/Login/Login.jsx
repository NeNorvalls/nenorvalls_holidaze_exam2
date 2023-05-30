import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Alert } from 'react-bootstrap'
import axios from 'axios'

const Login = () => {
  return (
    <div className="container d-flex flex-column align-items-center">
      <div className="my-4 container-sm">
        <h2>Venue Manager Login</h2>
        <VenueManagerLogin />
      </div>
      <div className="my-4 container-sm">
        <h2>User Login</h2>
        <UserLogin />
      </div>
      <p>
        Not registered yet? <Link to="/register">Register here</Link>.
      </p>
    </div>
  )
}

const VenueManagerLogin = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [errorMessage, setErrorMessage] = React.useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await axios.post(
        'https://api.noroff.dev/api/v1/holidaze/auth/login',
        {
          email,
          password,
        },
      )

      const { accessToken, name, avatar, role } = response.data
      localStorage.setItem('email', email)
      localStorage.setItem('isLoggedIn', true)
      localStorage.setItem('name', name)
      localStorage.setItem('avatar', avatar)
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('role', role)

      alert('You have successfully logged in!')
      window.location = '/venue-manager-profile'
    } catch (error) {
      setErrorMessage('Invalid email or password')
    }
  }

  React.useEffect(() => {
    const storedEmail = localStorage.getItem('email')
    const storedPassword = localStorage.getItem('password')
    const storedRole = localStorage.getItem('role')

    if (storedEmail && storedPassword) {
      setEmail(storedEmail)
      setPassword(storedPassword)
    }

    if (storedRole) {
    }
  }, [])

  return (
    <Form onSubmit={handleSubmit}>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Form.Group controlId="venueManagerEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="venueManagerPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        style={{ margin: '10px 0', borderRadius: '0.25rem' }}
      >
        Venue Manager Login
      </Button>
    </Form>
  )
}

const UserLogin = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [errorMessage, setErrorMessage] = React.useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await axios.post(
        'https://api.noroff.dev/api/v1/holidaze/auth/login',
        {
          email,
          password,
        },
      )

      const { accessToken, name, avatar, role } = response.data

      localStorage.setItem('email', email)
      localStorage.setItem('isLoggedIn', true)
      localStorage.setItem('name', name)
      localStorage.setItem('avatar', avatar)
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('role', role)

      alert('You have successfully logged in!')
      window.location = '/user-profile'
    } catch (error) {
      setErrorMessage('Invalid email or password')
    }
  }

  React.useEffect(() => {
    const storedEmail = localStorage.getItem('email')
    const storedPassword = localStorage.getItem('password')
    const storedRole = localStorage.getItem('role')

    if (storedEmail && storedPassword) {
      setEmail(storedEmail)
      setPassword(storedPassword)
    }

    if (storedRole) {
    }
  }, [])

  return (
    <Form onSubmit={handleSubmit}>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Form.Group controlId="userEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="userPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        style={{ margin: '10px 0', borderRadius: '0.25rem' }}
      >
        User Login
      </Button>
    </Form>
  )
}

export default Login
