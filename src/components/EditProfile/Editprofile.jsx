import React, { useState } from 'react'

const EditProfileModal = ({ name, email, onClose, onSave }) => {
  const [newName, setNewName] = useState(name)
  const [newEmail, setNewEmail] = useState(email)

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleEmailChange = (event) => {
    setNewEmail(event.target.value)
  }

  const handleSave = () => {
    onSave(newName, newEmail)
  }

  return (
    <div>
      <h2>Edit Profile</h2>
      <label>Name:</label>
      <input type="text" value={newName} onChange={handleNameChange} />
      <label>Email:</label>
      <input type="text" value={newEmail} onChange={handleEmailChange} />
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  )
}

export default EditProfileModal
