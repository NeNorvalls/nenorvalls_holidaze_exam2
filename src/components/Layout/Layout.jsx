import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Container from 'react-bootstrap/Container'

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main>
        <Container>
          <div>{children}</div>
        </Container>
      </main>
      <Footer />
    </div>
  )
}

export default Layout
