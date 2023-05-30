import React, { useState } from 'react'

const UpdateAvatarModal = ({ onClose, onSave }) => {
  const [avatar, setAvatar] = useState('')

  const handleAvatarChange = (event) => {
    setAvatar(event.target.value)
  }

  const handleSave = () => {
    onSave(avatar)
  }

  return (
    <div>
      <h2>Update Avatar</h2>
      <input type="url" value={avatar} onChange={handleAvatarChange} />
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  )
}

export default UpdateAvatarModal
