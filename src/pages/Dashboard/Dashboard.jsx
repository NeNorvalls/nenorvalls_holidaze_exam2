import React from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Venues from '../../pages/Venues/Venues'
import SearchBar from '../../components/Search/Search'

function Dashboard() {
  return (
    <Container>
      <h1
        style={{ textAlign: 'center', marginTop: '3rem', marginBottom: '1rem' }}
      >
        Welcome to Holidaze
      </h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Link to="/login">
          <Button
            variant="primary"
            style={{ margin: '0 0.5rem', backgroundColor: 'brown' }}
          >
            Login
          </Button>
        </Link>
        <Link to="/register">
          <Button
            variant="secondary"
            style={{ margin: '0 0.5rem', backgroundColor: 'brown' }}
          >
            Register
          </Button>
        </Link>
      </div>

      <div
        className="content-container"
        style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}
      >
        <SearchBar />
      </div>

      <div className="content-container">
        <Venues />
      </div>
    </Container>
  )
}

export default Dashboard
