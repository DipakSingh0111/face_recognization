import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./TicketDetails.css";
import { useNavigate } from "react-router-dom";

const TicketDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const baseUrl = "https://qwaiting.com/restapi";
  const restApiKey = "fe14a6-00d1ae-8126d0-bfe34b-0fdd9a";

  // ticket Details
  const ticketDetailData = async (ticketId) => {
    try {
      // Create a FormData object
      const formData = new FormData();
      formData.append("ticketId", ticketId);

      const headers = {
        "Content-Type": "multipart/form-data",
        "rest-api-key": restApiKey,
      };
      const response = await axios.post(
        `${baseUrl}/ticket_detail/${id}`,
        formData,
        { headers }
      );

      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log(error);
      console.error("There was an error fetching the data!", error);
    }
  };
  useEffect(() => {
    // 2226940
    ticketDetailData(id);
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!data.ticket) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div class="container">
        <div class="header">
          <div>
            <img
              src="https://qwaiting.com/images/logo/1691999247.png"
              alt="Image"
              width="100"
              style={{ margin: "0 auto" }}
            />
            <div class="title">{data.name}</div>
          </div>
        </div>
        <div class="queue-info">Queue No.</div>
        <div class="highlight">{data.ticket.Call.token}</div>
        <div class="queue-info">Arrived: {data.ticket.Call.created}</div>
        <div class="title">{data.ticket.Cat1.name}</div>
        {data.ticket?.Cat2?.name && (
          <div class="title">{data.ticket.Cat2.name}</div>
        )}
        {data.ticket?.Cat3?.name && (
          <div class="title">{data.ticket.Cat3.name}</div>
        )}

        <div class="queue-info">
          You are {data.ticket.Call.queue_count} in the queue.
        </div>
        {/* <div class="queue-info">Your Estimated waiting time is 0 Min.</div> */}
        {/* <hr style="width: 50%;" /> */}
        <div>
          <div class="button">Thank you</div>
          <button class="button" onClick={() => navigate("/")}>
            Home
          </button>
          {/* <div class="button" onclick="window.print()">Print</div> */}
        </div>
      </div>
    </>
  );
};

export default TicketDetails;
