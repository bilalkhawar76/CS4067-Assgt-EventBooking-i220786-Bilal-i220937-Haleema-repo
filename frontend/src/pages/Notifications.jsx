// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Notifications = () => {
//   const [notifications, setNotifications] = useState([]);

//   // Fetch notifications
//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const res = await axios.get("http://localhost:5004/notifications");
//         setNotifications(res.data);
//       } catch (error) {
//         console.error("Error fetching notifications:", error);
//       }
//     };
//     fetchNotifications();
//   }, []);

//   return (
//     <div className="p-6 max-w-xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Notifications</h2>
//       <ul className="space-y-3">
//         {notifications.map((notification, index) => (
//           <li key={index} className="border p-3 rounded">
//             <p><strong>User ID:</strong> {notification.userId}</p>
//             <p><strong>Event ID:</strong> {notification.eventId}</p>
//             <p><strong>Message:</strong> {notification.message}</p>
//             <p className="text-sm text-gray-500">{new Date(notification.createdAt).toLocaleString()}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Notifications;
