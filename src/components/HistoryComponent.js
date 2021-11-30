import React from "react";
import arrow from "../assets/img/icon/arrow-left.png";
import { withRouter } from "react-router-dom";
import Loader from "react-loader-spinner";
const url = process.env.REACT_APP_BASE_URL;
function HistoryComponent({
  id,
  vehicleName,
  rentStart,
  rentFinish,
  price,
  image,
  transactionStatus,
  authLevel,
  history,
}) {
  if (transactionStatus === 1 && authLevel === 3)
    return (
      <div className="d-flex history-item align-items-center">
        <div
          className="d-flex flex-grow-7 align-items-center"
          onClick={() => history.push(`/payment/${id}`)}
        >
          <div className="flex-fill">
            Please finish your payment for {vehicleName}
          </div>
          <img alt="" className="flip-image" src={arrow}></img>
        </div>
        <div className="d-flex justify-content-center history-checkbox">
          <input
            className="form-check-input"
            type="radio"
            value={id}
            name="delete"
          />
        </div>
      </div>
    );
  if (transactionStatus === 2 && authLevel === 3)
    return (
      <div className="d-flex history-item align-items-center">
        <div
          className="d-flex flex-grow-7 align-items-center"
          onClick={() => history.push(`/transaction-history/${id}`)}
        >
          <div className="flex-fill">
            Waiting Approve Confirm Payment {vehicleName}
          </div>
          <img alt="" className="flip-image" src={arrow}></img>
        </div>
        <div className="d-flex justify-content-center history-checkbox">
          <input
            className="form-check-input"
            type="radio"
            value={id}
            name="delete"
          />
        </div>
      </div>
    );
  if (transactionStatus === 2 && authLevel !== 3)
    return (
      <div className="d-flex history-item align-items-center">
        <div className="d-flex flex-grow-7 align-items-center">
          <div
            className="flex-fill"
            onClick={() => history.push(`/payment/${id}`)}
          >
            Confirm Payment For {vehicleName}
          </div>
          <img alt="" className="flip-image" src={arrow}></img>
        </div>
        <div className="d-flex justify-content-center history-checkbox">
          <input
            className="form-check-input"
            type="radio"
            value={id}
            name="delete"
          />
        </div>
      </div>
    );
  if (transactionStatus === 3)
    return (
      <div>
        <div className="d-flex history-item align-items-center">
          <div className="d-flex flex-grow-7 align-items-center">
            <div className="flex-fill">Your payment has been confirmed!</div>
          </div>
          <div className="d-flex justify-content-center history-checkbox"></div>
        </div>
        <div
          className="d-flex history-item align-items-center"
          id={"history" + id}
        >
          <div
            className="d-flex flex-grow-7 history-item-row "
            onClick={() => history.push(`/transaction-history/${id}`)}
          >
            {!image.split(",")[0] && (
              <Loader type="TailSpin" color="#ffcd61" height={80} width={80} />
            )}
            <div
              className="history-test"
              style={{
                backgroundImage: `url(${url}${image.split(",")[0]})`,
                backgroundPosition: "center",
              }}
            />
            <div className="d-flex flex-column history-detail">
              <div className="history-item-title">{vehicleName}</div>
              <p className="">{rentStart + " to " + rentFinish}</p>
              <div className="prepayment-price">Prepayment : Rp. {price}</div>
              <div
                className={
                  transactionStatus === 3
                    ? "history-status-true"
                    : "history-status-false"
                }
              >
                {transactionStatus === 3 ? "In used" : "Has been Returned"}
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center history-checkbox">
            <input
              className="form-check-input"
              type="radio"
              value={id}
              id={"select" + id}
              name="delete"
            />
          </div>
        </div>
      </div>
    );
  else return "";
}
export default withRouter(HistoryComponent);
