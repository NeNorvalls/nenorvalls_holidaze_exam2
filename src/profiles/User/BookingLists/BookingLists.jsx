import React, { useState, useEffect } from 'react'

const BookingList = () => {
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken')

        const response = await fetch(
          'https://api.noroff.dev/api/v1/holidaze/bookings',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        const data = await response.json()
        setBookings(data)
      } catch (error) {
        console.error('Error:', error)
      }
    }

    fetchBookings()
  }, [])

  const BookingListCard = ({ booking }) => {
    return (
      <div>
        <h3>Booking ID: {booking.id}</h3>
        <p>Customer: {booking.customer}</p>
        <p>Check-in: {booking.checkIn}</p>
        <p>Check-out: {booking.checkOut}</p>
        <p>Room: {booking.room}</p>
      </div>
    )
  }

  return (
    <div>
      <h2>Bookings</h2>
      {Array.isArray(bookings) &&
        bookings.map((booking) => (
          <BookingListCard key={booking.id} booking={booking} />
        ))}
    </div>
  )
}

export default BookingList
