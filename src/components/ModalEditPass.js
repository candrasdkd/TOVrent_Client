import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {
  resetStateAction,
  updatePasswordAction,
} from "../redux/actionCreators/user";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

function EditPassword({ show, close, id, token }) {
  const reduxUser = useSelector((reduxState) => reduxState.user);
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmNewPassword, setConfirmNewPassword] = React.useState("");
  const [showMessage, setShowMessage] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const onSubmit = () => {
    if (oldPassword.length < 1) {
      setShowMessage(true);
      return setErrorMessage("Old password is required");
    }
    if (oldPassword.length < 6) {
      setShowMessage(true);
      return setErrorMessage("Old password must have 6 or more characters!");
    }
    if (newPassword.length < 1) {
      setShowMessage(true);
      return setErrorMessage("New password is required");
    }
    if (newPassword.length < 6) {
      setShowMessage(true);
      return setErrorMessage("New password must have 6 or more characters!");
    }
    if (confirmNewPassword.length < 1) {
      setShowMessage(true);
      return setErrorMessage("Confirm new password is required");
    }
    if (newPassword !== confirmNewPassword) {
      setShowMessage(true);
      return setErrorMessage("New password not match");
    }
    Swal.fire({
      title: "Do you want to save the changes?",
      confirmButtonColor: "#198754",
      showDenyButton: true,
      showCancelButton: false,
      denyButtonText: `Don't save`,
      confirmButtonText: "Save",
      icon: "question",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed && newPassword === confirmNewPassword) {
        const body = {
          oldPass: oldPassword,
          newPass: newPassword,
        };
        dispatch(updatePasswordAction(id, body, token));
      } else if (result.isDenied) {
        close();
        setShowMessage(false);
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };
  
  const errorHandler = () => {
    if (
      showMessage === true &&
      (oldPassword === "" || oldPassword.length < 6)
    ) {
      return "error-password";
    }
    if (reduxUser.status === 404) {
      return "error-password";
    } else {
      return "old-password";
    }
  };

  React.useEffect(() => {
    if (reduxUser.isFulfilled === true) {
      Swal.fire({
        icon: "success",
        title: "Update password success",
        position: "top-start",
        timer: 2000,
        toast: true,
        showConfirmButton: false,
      });
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setShowMessage(false);
      close();
      return dispatch(resetStateAction());
    }
    if (reduxUser.status === 404) {
      setShowMessage(true);
      return setErrorMessage("Old password is wrong");
    }
    // if (showMessage === true) {
    //   return dispatch(resetStateAction());
    // }
  }, [close, dispatch, reduxUser.isFulfilled, reduxUser.status]);
  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Password
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showMessage && (
          <div className="rounded fw-bold fs-5 text-center text-danger">
            {errorMessage}
          </div>
        )}
        <div className={errorHandler()}>
          <h5>Old Password :</h5>
          <input
            type="password"
            placeholder="Input your old password"
            style={{ color: "black" }}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div
          className={
            (showMessage === true &&
              (newPassword === "" || newPassword.length < 6)) ||
            newPassword !== confirmNewPassword
              ? "error-password"
              : "new-password"
          }
        >
          <h5>New Password :</h5>
          <input
            type="password"
            placeholder="Input your new password"
            style={{ color: "black" }}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div
          className={
            showMessage === true &&
            (confirmNewPassword === "" || newPassword !== confirmNewPassword)
              ? "error-password"
              : "new-password"
          }
        >
          <h5>Confirm New Password :</h5>
          <input
            type="password"
            placeholder="Input your new password again"
            style={{ color: "black" }}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="close-modal"
          onClick={() => {
            close();
            setShowMessage(false);
            dispatch(resetStateAction());
          }}
        >
          Cancel
        </Button>
        <Button
          className="submit-modal"
          onClick={onSubmit}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditPassword;
