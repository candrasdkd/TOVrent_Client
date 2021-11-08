// import React, { useState } from "react";
// import { withRouter } from "react-router-dom";
// import { getEmailUser } from "../utils/https/Profile";

// function CheckCode(props) {
//   const [email, setEmail] = useState("");
//   const [showMessage, setShowMessage] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const sendEmail = () => {
//     const form = new URLSearchParams();
//     form.append("email", email);
//     getEmailUser(form);
//   };

//   return (
//     <>
//       <input
//         type="text"
//         id="email"
//         name="email"
//         placeholder="Enter your code"
//         onChange={(e) => {
//           setEmail(e.target.value);
//         }}
//       />
//       <input
//         type="text"
//         id="email"
//         name="email"
//         placeholder="Confirm your code"
//         onChange={(e) => {
//           setEmail(e.target.value);
//         }}
//       />
//     </>
//   );
// }

// export default withRouter(CheckCode);
