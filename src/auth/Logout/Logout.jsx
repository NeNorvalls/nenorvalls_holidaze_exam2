import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './Logout.css'

const Logout = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.clear()
    navigate('/')
  }

  return (
    <Container>
      <h2>Are you sure you want to log out?</h2>
      <Button variant="primary" onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  )
}

export default Logout
