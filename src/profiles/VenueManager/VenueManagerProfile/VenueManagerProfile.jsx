import React, { useEffect, useState } from 'react'
import axios from 'axios'
import UpdateAvatarModal from '../../../features/UpdateAvatarModal/UpdateAvatarModal'
import EditProfileModal from '../../../features/EditProfileModal/EditProfileModal'
import UserProfileVenues from '../UserProfileVenues/UserProfileVenues'
import CreateBooking from '../CreateBooking/CreateBooking'

const VenueManagerProfile = () => {
  const [profileData, setProfileData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showUpdateAvatarModal, setShowUpdateAvatarModal] = useState(false)
  const [showEditProfileModal, setShowEditProfileModal] = useState(false)

  useEffect(() => {
    const fetchProfileData = async () => {
      const name = localStorage.getItem('name')
      const email = localStorage.getItem('email')
      const avatar = localStorage.getItem('avatar')
      const accessToken = localStorage.getItem('accessToken')

      if (name && email) {
        try {
          const profileResponse = await axios.get(
            `https://api.noroff.dev/api/v1/holidaze/profiles/${name}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            },
          )

          setProfileData({ ...profileResponse.data, avatar })
          setIsLoading(false)
        } catch (error) {
          setError('An error occurred while fetching profile data.')
          setIsLoading(false)
        }
      }
    }

    fetchProfileData()
  }, [])

  const handleUpdateAvatar = () => {
    setShowUpdateAvatarModal(true)
  }

  const handleEditProfile = () => {
    setShowEditProfileModal(true)
  }

  const handleSaveAvatar = (newAvatar) => {
    setProfileData((prevData) => ({
      ...prevData,
      avatar: newAvatar,
    }))
    setShowUpdateAvatarModal(false)
  }

  const handleSaveProfile = (newName, newEmail) => {
    setProfileData((prevData) => ({
      ...prevData,
      name: newName,
      email: newEmail,
    }))
    setShowEditProfileModal(false)
  }

  const handleBooking = (venue) => {
    // Handle booking logic here
    console.log('Booked venue:', venue)
  }

  return (
    <div>
      <h2>UserProfile</h2>
      {isLoading ? (
        <p>Loading profile data...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : profileData ? (
        <div>
          <div>
            <img src={profileData.avatar} alt="Avatar" />
            <p>Name: {profileData.name}</p>
            <p>Email: {profileData.email}</p>
          </div>
          <button onClick={handleUpdateAvatar}>Update Avatar</button>
          <button onClick={handleEditProfile}>Edit Profile</button>

          {showUpdateAvatarModal && (
            <UpdateAvatarModal
              onClose={() => setShowUpdateAvatarModal(false)}
              onSave={handleSaveAvatar}
            />
          )}

          {showEditProfileModal && (
            <EditProfileModal
              name={profileData.name}
              email={profileData.email}
              onClose={() => setShowEditProfileModal(false)}
              onSave={handleSaveProfile}
            />
          )}

          <UserProfileVenues
            selectedVenue={profileData.selectedVenue}
            handleBooking={handleBooking}
          />

          {/* Add the CreateBooking component */}
          {profileData.selectedVenue && (
            <CreateBooking
              venue={profileData.selectedVenue}
              onBookingComplete={() => {
                console.log('Booking completed')
              }}
            />
          )}
        </div>
      ) : (
        <p>No profile data found.</p>
      )}
    </div>
  )
}

export default VenueManagerProfile
