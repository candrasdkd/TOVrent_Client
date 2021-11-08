import { Link } from "react-router-dom";
import twtLogo from "../assets/img/icon/social-media-icon/Vector-twitter.png";
import fbLogo from "../assets/img/icon/social-media-icon/Vector-facebook.png";
import igIcon from "../assets/img/icon/social-media-icon/Group-instagram.png";
import LinkedInLogo from "../assets/img/icon/social-media-icon/Group-linkedin.png";
import ytIcon from "../assets/img/icon/social-media-icon/Vector-youtube.png";

function Footer() {
  return (
    <>
      <footer>
        <div className="d-flex bd-highlight mb-3 footer-flex">
          <div className="bd-highlight footer-column px-0">
            <svg height="3em" width="3em">
              <circle
                cx="1.5em"
                cy="1.5em"
                r="1em"
                stroke="white"
                strokeWidth="3"
                fill="#393939"
              />
              <circle
                cx="1.5em"
                cy="1.5em"
                r=".4em"
                stroke="white"
                strokeWidth="3"
                fill="orange"
              />
            </svg>
            <p>
              Plan and book your perfect trip with expert advice, travel tips
              for vehicle information from us
            </p>
            <p>©2020 Vehicle Rental Center. All rights reserved</p>
          </div>
          <div className="d-flex footer-column-2 justify-content-between">
            <div className="bd-highlight footer-column">
              <p className="fw-bold mb-3">Destinations</p>
              <p>
                <a className="footer-text" href="link">
                  Bali
                </a>
              </p>
              <p>
                <a className="footer-text" href="link">
                  Yogyakarta
                </a>
              </p>
              <p>
                <a className="footer-text" href="link">
                  Jakarta
                </a>
              </p>
              <p>
                <a className="footer-text" href="link">
                  Kalimantan
                </a>
              </p>
              <p>
                <a className="footer-text" href="link">
                  Malang
                </a>
              </p>
            </div>
            <div className="bd-highlight footer-column footer-column-margin">
              <p className="fw-bold mb-3">Vehicles</p>
              <p>
                <a className="footer-text" href="link">
                  Bike
                </a>
              </p>
              <p>
                <a className="footer-text" href="link">
                  Cars
                </a>
              </p>
              <p>
                <a className="footer-text" href="link">
                  Motorbike
                </a>
              </p>
              <p>
                <a className="footer-text" href="link">
                  Return Times
                </a>
              </p>
              <p>
                <a className="footer-text" href="link">
                  FAQs
                </a>
              </p>
            </div>
            <div className="bd-highlight footer-column">
              <p className="fw-bold mb-3">Interests</p>
              <p>
                <a className="footer-text" href="link">
                  Adventure
                </a>
              </p>
              <p>
                <a className="footer-text" href="link">
                  Travel
                </a>
              </p>
              <p>
                <a className="footer-text" href="link">
                  Art and Culture
                </a>
              </p>
              <p>
                <a className="footer-text" href="link">
                  Wildlife and Nature
                </a>
              </p>
              <p>
                <a className="footer-text" href="link">
                  Family Holidays
                </a>
              </p>
              <p>
                <a className="footer-text" href="link">
                  Culinary Trip
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="footer-line"></div>
        <div className="d-flex flex-row mb-3 justify-content-center social-media">
          <Link to="#">
            <img src={twtLogo} className="mx-3" alt="" />
          </Link>
          <Link to="#">
            <img src={fbLogo} className="mx-3" alt="" />
          </Link>
          <Link to="#">
            <img src={igIcon} className="mx-3" alt="" />
          </Link>
          <Link to="#">
            <img src={LinkedInLogo} className="mx-3" alt="" />
          </Link>
          <Link to="#">
            <img src={ytIcon} className="mx-3" alt="" />
          </Link>
        </div>
      </footer>
    </>
  );
}

export default Footer;
