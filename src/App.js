import React from "react";
import FaceRecognisation from "./components/faceRecognisation/Main.jsx";
import FCRegistration from "./components/faceRecognisation/Registration.jsx";
import FCRecognisation from "./components/faceRecognisation/Recognisation.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Queue from "./Queue.jsx";
import TicketDetails from "./components/ticketDetail/TicketDetails.jsx";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FaceRecognisation />} />{" "}
        <Route path="/face-register" element={<FCRegistration />} />{" "}
        <Route path="/face-recognisation" element={<FCRecognisation />} />{" "}
        <Route path="/queue/:id" element={<Queue />} />{" "}
        <Route path="/ticketgenerate/:id" element={<TicketDetails />} />{" "}
      </Routes>{" "}
    </BrowserRouter>
  );
};

export default App;
