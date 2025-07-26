import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router

export function Footer() {
  return (
    <>
      {" "}
      <footer class="footer">
        <div class="union">
          <div class="footer-logo">
            <div class="ft-tt">
              <div class="ft-logo">
                <img
                  src="./images/dblogo.png"
                  alt="Debre Birhan University Logo"
                />
              </div>
              <div class="ft-text">
                <p>
                  <span>Student Union</span>
                  <br />
                  Debre Birhan University
                </p>
              </div>
            </div>
            <div class="footer-text">
              <p>
                Empowering students through leadership, service, and academic
                excellence at Debre Birhan University
              </p>
            </div>
            <div class="footer-link">
              <a href="">
                <i class="fab fa-telegram"></i>
              </a>
              <a href="">
                <i class="fab fa-facebook"></i>
              </a>
              <a href="">
                <i class="fab fa-whatsapp"></i>
              </a>
              <a href="">
                <i class="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
        <div class="links">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Events</a>
            </li>
            <li>
              <a href="#">News</a>
            </li>
            <li>
              <a href="#">Clubs</a>
            </li>
            <li>
              <a href="#">Resources</a>
            </li>
          </ul>
        </div>
        <div class="service">
          <h4>Services</h4>
          <ul>
            <li>Academic Support</li>
            <li>Counseling</li>
            <li>Housing</li>
            <li>Financial Aid</li>
            <li>Career Services</li>
          </ul>
        </div>
        <div class="contacts">
          <h4>Contact Us</h4>
          <ul>
            <li>
              <i class="fas fa-map-marker-alt"></i>
              <span>DBU inside left to cafe road</span>
            </li>
            <li>
              <i class="fa fa-envelope"></i>
              <span>studentunion@dbu.edu.et</span>
            </li>
            <li>
              <i class="fa fa-phone"></i>
              <span>+251940414243</span>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}
