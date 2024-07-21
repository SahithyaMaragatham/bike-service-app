import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Appbar from "../component/Appbar";
import { URL } from "../constants";

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
      const response = await axios.get(`${URL}/api/services`);
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
      setError("Failed to fetch services.");
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`${URL}/api/bookings/user/${userId}`);
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setError("Failed to fetch bookings.");
    }
  };

  const handleBookService = async (serviceId) => {
    try {
      const bookingDate = new Date().toISOString();
      await axios.post(`${URL}/api/bookings`, {
        userId,
        serviceId,
        date: bookingDate,
      });
      fetchBookings();
    } catch (error) {
      console.error("Error booking service:", error);
      setError("Failed to book service.");
    }
  };

  return (
    <div>
      <Appbar />
      <div className="container mt-5">
        <h1 className="text-center">User Dashboard</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="row">
          <div className="col-md-6 mb-4">
            <h2>Available Services</h2>
            {services.length === 0 ? (
              <p>No services available</p>
            ) : (
              <div className="list-group">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className="list-group-item flex-column align-items-start"
                  >
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">{service.name}</h5>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleBookService(service.id)}
                      >
                        Book
                      </button>
                    </div>
                    <p className="mb-1">{service.description}</p>
                    <small>${service.price}</small>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="col-md-6">
            <h2>Previous Bookings</h2>
            {bookings.length === 0 ? (
              <p>No previous bookings</p>
            ) : (
              <div className="list-group">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="list-group-item flex-column align-items-start"
                  >
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">Service: {booking.Service.name}</h5>
                    </div>
                    <p className="mb-1">
                      Date: {new Date(booking.date).toLocaleString()}
                    </p>
                    <small>Status: {booking.status}</small>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
