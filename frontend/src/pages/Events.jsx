// import { useState, useEffect } from "react";
// import axios from "axios";

// const API_URL = "http://localhost:5002/events"; // Event Service URL

// const Events = () => {
//   const [events, setEvents] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await axios.get(API_URL);
//         setEvents(response.data);
//       } catch (err) {
//         setError("❌ Failed to load events");
//         console.error("Error fetching events:", err);
//       }
//     };

//     fetchEvents();
//   }, []);

//   return (
//     <div className="container mt-5">
//       <h2>Available Events</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <div className="row">
//         {events.length > 0 ? (
//           events.map(event => (
//             <div key={event._id} className="col-md-4 mb-3">
//               <div className="card">
//                 <div className="card-body">
//                   <h5 className="card-title">{event.title}</h5>
//                   <p className="card-text">{event.description}</p>
//                   <p className="card-text"><strong>Date:</strong> {new Date(event.date).toDateString()}</p>
//                   <p className="card-text"><strong>Location:</strong> {event.location}</p>
//                   <p className="card-text"><strong>Price:</strong> ${event.price}</p>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No events available.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Events;







import { useState, useEffect } from "react";
import axios from "axios";

const EVENT_API_URL = "http://localhost:5002/events";  // Event Service
const BOOKING_API_URL = "http://localhost:5003/bookings";  // Booking Service

const Events = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [bookingMessage, setBookingMessage] = useState("");

  // Retrieve userId from localStorage
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(EVENT_API_URL);
        setEvents(response.data);
      } catch (err) {
        setError("❌ Failed to load events");
        console.error("Error fetching events:", err);
      }
    };

    fetchEvents();
  }, []);

  // Function to book an event
  const handleBookEvent = async (eventId) => {
    if (!userId) {
      setBookingMessage("⚠️ You must be logged in to book an event.");
      return;
    }

    try {
      const response = await axios.post(BOOKING_API_URL, {
        userId,  // Use userId from localStorage
        eventId,
        status: "confirmed",
        paymentStatus: "unpaid",
      });

      setBookingMessage(`✅ Booking successful for Event ID: ${eventId}`);
      console.log("Booking Success:", response.data);
    } catch (err) {
      setBookingMessage("❌ Booking failed. Please try again.");
      console.error("Error booking event:", err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Available Events</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {bookingMessage && <p style={{ color: "blue" }}>{bookingMessage}</p>}
      
      <div className="row">
        {events.length > 0 ? (
          events.map(event => (
            <div key={event._id} className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{event.title}</h5>
                  <p className="card-text">{event.description}</p>
                  <p className="card-text"><strong>Date:</strong> {new Date(event.date).toDateString()}</p>
                  <p className="card-text"><strong>Location:</strong> {event.location}</p>
                  <p className="card-text"><strong>Price:</strong> ${event.price}</p>

                  {/* Book Now Button */}
                  <button
                    className="btn btn-primary mt-2"
                    onClick={() => handleBookEvent(event._id)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No events available.</p>
        )}
      </div>
    </div>
  );
};

export default Events;
