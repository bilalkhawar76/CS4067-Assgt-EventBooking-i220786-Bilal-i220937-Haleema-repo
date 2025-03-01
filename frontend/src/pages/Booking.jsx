// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Booking = () => {
//   const [bookings, setBookings] = useState([]);
//   const [formData, setFormData] = useState({ userId: "", eventId: "", status: "pending", paymentStatus: "unpaid" });

//   // Fetch all bookings
//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const res = await axios.get("http://localhost:5003/bookings");
//         setBookings(res.data);
//       } catch (error) {
//         console.error("Error fetching bookings:", error);
//       }
//     };
//     fetchBookings();
//   }, []);

//   // Handle input change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Create a new booking
//   const createBooking = async () => {
//     try {
//       await axios.post("http://localhost:5003/bookings", formData);
//       setFormData({ userId: "", eventId: "", status: "pending", paymentStatus: "unpaid" });
//       window.location.reload(); // Refresh to see the new booking
//     } catch (error) {
//       console.error("Error creating booking:", error);
//     }
//   };

//   // Delete a booking
//   const deleteBooking = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5003/bookings/${id}`);
//       setBookings(bookings.filter((booking) => booking.id !== id));
//     } catch (error) {
//       console.error("Error deleting booking:", error);
//     }
//   };

//   return (
//     <div className="p-6 max-w-2xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Booking Management</h2>

//       {/* Booking Form */}
//       <div className="mb-4">
//         <input type="text" name="userId" placeholder="User ID" value={formData.userId} onChange={handleChange} className="border p-2 rounded mr-2" />
//         <input type="text" name="eventId" placeholder="Event ID" value={formData.eventId} onChange={handleChange} className="border p-2 rounded mr-2" />
//         <button onClick={createBooking} className="bg-blue-500 text-white px-4 py-2 rounded">Create Booking</button>
//       </div>

//       {/* Booking List */}
//       <ul className="space-y-3">
//         {bookings.map((booking) => (
//           <li key={booking.id} className="border p-3 rounded flex justify-between items-center">
//             <div>
//               <p><strong>User ID:</strong> {booking.userId}</p>
//               <p><strong>Event ID:</strong> {booking.eventId}</p>
//               <p><strong>Status:</strong> {booking.status}</p>
//               <p><strong>Payment:</strong> {booking.paymentStatus}</p>
//             </div>
//             <button onClick={() => deleteBooking(booking.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Booking;
