import React, { useState } from "react";
import "../styles/Userprofile.css";

const UserProfile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    profilePic: "https://i.pinimg.com/474x/25/1c/e1/251ce139d8c07cbcc9daeca832851719.jpg", // Default profile pic
  });

  const [isEditing, setIsEditing] = useState(false);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle profile picture change
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
    setIsEditing(false);
  };

  return (
    <div className="user-profile-container">
      <div className="user-profile-header">
        <h1>User Profile</h1>
      </div>

      {/* Profile Picture Section */}
      <div className="profile-pic-section">
        <div className="profile-pic-container">
          {/* Make the profile picture clickable to open file upload dialog */}
          <img 
            src={formData.profilePic} 
            alt="Profile" 
            className="profile-pic" 
            onClick={() => document.getElementById('fileInput').click()} // Open file input on click
          />
          {/* Hidden file input for uploading profile picture */}
          <input 
            type="file" 
            id="fileInput" 
            accept="image/*" 
            style={{ display: "none" }} 
            onChange={handleProfilePicChange} 
          />
        </div>
      </div>

      {/* Form for User Information */}
      <form className="profile-form" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            disabled={!isEditing}
            placeholder="Enter your first name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            disabled={!isEditing}
            placeholder="Enter your last name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            disabled={!isEditing}
            placeholder="Enter your phone number"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            disabled={!isEditing}
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            disabled={!isEditing}
            placeholder="Enter your address"
          />
        </div>

        {/* Save changes button */}
        {isEditing ? (
          <button type="submit" className="save-changes-button">Save Changes</button>
        ) : (
          <button type="button" className="edit-button" onClick={() => setIsEditing(true)}>
            Edit Profile
          </button>
        )}
      </form>
    </div>
  );
};

export default UserProfile;
