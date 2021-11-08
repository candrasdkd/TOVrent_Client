import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import backIcon from "../assets/img/icon/arrow-left.png";
import cameraIcon from "../assets/img/icon/camera-icon.png";
import io from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import { useSelector } from "react-redux";

const ChatDetail = () => {
  const url = process.env.REACT_APP_BASE_URL;
  const authRedux = useSelector((state) => state.auth);
  const [userId] = useState(authRedux.authInfo.userId);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  // const [senderId, setsenderId] = useState([]);
  // const [recepientId, setrecepientId] = useState([]);

  const socket = io.connect(url);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        author: userId,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
    return () => {
      socket.off("receive_message", (data) => {
        setMessageList((list) => [...list, data]);
      });
    };
  }, [socket]);
  return (
    <div>
      <Header />
      <main className="chat-window">
        <div className="d-flex reservation-title align-items-center">
          <Link to="/">
            <img src={backIcon} alt="" />
          </Link>
          <div className="profile-photo chat-detail-profile-icon"></div>
          <span>Rental 1</span>
        </div>
        <div className="chat-body">
          <ScrollToBottom className="message-container">
            {messageList.map((messageContent, index) => {
              return (
                <div
                  className="message"
                  id={userId === authRedux.authInfo.userId ? "you" : "other"}
                  key={index}
                >
                  <div>
                    <div className="message-content">
                      <p>{messageContent.message}</p>
                    </div>
                    <div className="message-meta">
                      <p id="time">{messageContent.time} </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </ScrollToBottom>
        </div>
        <section className="chat-section">
          <div className="chat-form mt-5">
            <input
              id="chatMessage"
              name="chatMessage"
              placeholder="Type a message"
              autoComplete="off"
              type="text"
              value={currentMessage}
              onChange={(event) => {
                setCurrentMessage(event.target.value);
              }}
              onKeyPress={(event) => {
                event.key === "Enter" && sendMessage();
              }}
            />
          </div>
          <button>
            <img alt="" src={cameraIcon} />
          </button>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ChatDetail;
