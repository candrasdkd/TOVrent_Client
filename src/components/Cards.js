import { Link } from "react-router-dom";

function Card({ link, picture, title, subtitle }) {
  return (
    <Link
      to={link ? link : "#"}
      className={"card-image col-3 d-flex align-items-end mb-5 ms-5 me-5"}
      style={{ backgroundImage: `url(${picture})`, backgroundColor: "grey" }}
    >
      <div className="name-card-text">
        <div className="card-title fw-bolder">{title}</div>
        <div className="card-subtitle">{subtitle}</div>
      </div>
    </Link>
  );
}
export default Card;
