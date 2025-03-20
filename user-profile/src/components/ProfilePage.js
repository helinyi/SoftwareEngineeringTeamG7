import React from 'react';

function ProfilePage() {
  return (
    <div className="profile-container">
      {/* Sidebar */}
      <div className="profile-nav">
        <a href="#">Personal Info</a>
        <a href="#">Orders</a>
        <a href="#">Wishlist</a>
        <a href="#">Payment Methods</a>
        <a href="#">Settings</a>
      </div>

      {/* Profile Content */}
      <div className="profile-content">
        <h2>User Profile</h2>
        <div className="profile-image">
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            alt="Profile Picture"
          />
          <br />
          <label htmlFor="profile-pic">Upload Profile Picture</label>
          <input type="file" id="profile-pic" hidden />
        </div>

        <form>
          <div className="form-group">
            <label>First Name</label>
            <input type="text" placeholder="Enter first name" />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input type="text" placeholder="Enter last name" />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter email" />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input type="text" placeholder="Enter phone number" />
          </div>

          <div className="form-group">
            <label>Address</label>
            <input type="text" placeholder="Enter address" />
          </div>

          <button type="submit" className="submit-btn">
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;
