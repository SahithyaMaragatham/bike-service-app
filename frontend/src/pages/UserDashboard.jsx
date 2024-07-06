import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Appbar from "../component/Appbar";

const UserDashboard = () => {
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const location = useLocation();
  const userId = location.state?.userId;

  useEffect(() => {
    if (userId) {
      fetchServices();
      fetchBookings();
    }
  }, [userId]);

  const fetchServices = async () => {
    try {
      const response = await axios.get(
        "https://bike-service-app-ahz1.onrender.com/api/services"
      );
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
      setError("Failed to fetch services.");
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        `https://bike-service-app-ahz1.onrender.com/api/bookings/user/${userId}`
      );
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setError("Failed to fetch bookings.");
    }
  };

  const handleBookService = async (serviceId) => {
    try {
      const bookingDate = new Date().toISOString();
      await axios.post(
        "https://bike-service-app-ahz1.onrender.com/api/bookings",
        {
          userId,
          serviceId,
          date: bookingDate,
        }
      );
      fetchBookings(); // Refresh bookings after successful booking
    } catch (error) {
      console.error("Error booking service:", error);
      setError("Failed to book service.");
    }
  };

  return (
    <div>
      <Appbar></Appbar>
      <h1>User Dashboard</h1>
      <div>
        <div>
          <h2>Available Services</h2>
          {services.length === 0 ? (
            <p>No services available</p>
          ) : (
            <ul>
              {services.map((service) => (
                <li key={service.id}>
                  {service.name} - {service.description} - ${service.price}
                  <button onClick={() => handleBookService(service.id)}>
                    Book
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <h2>Previous Bookings</h2>
          {bookings.length === 0 ? (
            <p>No previous bookings</p>
          ) : (
            <ul>
              {bookings.map((booking) => (
                <li key={booking.id}>
                  Service: {booking.Service.name}, Date:{" "}
                  {new Date(booking.date).toLocaleString()}, Status:{" "}
                  {booking.status}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
