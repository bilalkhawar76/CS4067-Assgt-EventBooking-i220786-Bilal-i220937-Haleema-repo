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











import { useState, useEffect } from "react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const userId = localStorage.getItem("userId"); // Get logged-in user ID

  useEffect(() => {
    fetch("http://localhost:5004/notifications")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Notifications:", data); // Debugging

        // Filter notifications to show only those for the logged-in user
        const userNotifications = data.filter((notification) => notification.userId === userId);
        setNotifications(userNotifications);
      })
      .catch((error) => console.error("Error fetching notifications:", error));
  }, [userId]);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-5">Notifications</h2>
      {notifications.length > 0 ? (
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id} className="p-3 border-b">
              <strong>Message:</strong> {notification.message} <br />
              <strong>Time:</strong> {new Date(notification.createdAt).toLocaleString()}
            </li>
          ))}
        </ul>
      ) : (
        <p>No new notifications.</p>
      )}
    </div>
  );
};

export default Notifications;
