import React from 'react';

function Footer() {
  return (
    <div className="footer">
      <div className="footer-sections">
        <div className="footer-links">
          <h4>Customer Service</h4>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Shipping Info</a></li>
            <li><a href="#">Returns & Refunds</a></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Policies</h4>
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
          </ul>
        </div>

        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#" aria-label="Facebook">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUKGJwdPz0WsEijsQkNlU3vXtNWYvNzkLChQ&s"
                alt="Facebook"
              />
            </a>
            <a href="#" aria-label="Twitter">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/X_icon_2.svg/1024px-X_icon_2.svg.png"
                alt="Twitter"
              />
            </a>
            <a href="#" aria-label="Instagram">
              <img
                src="https://www.freeiconspng.com/uploads/black-instagram-icon-21.png"
                alt="Instagram"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
