import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [editService, setEditService] = useState(null);

  useEffect(() => {
    fetchServices();
    fetchBookings();
  }, []);

  const fetchServices = async () => {
    const response = await axios.get(
      "https://bike-service-app-ahz1.onrender.com/api/services"
    );
    setServices(response.data);
  };

  const fetchBookings = async () => {
    const response = await axios.get(
      "https://bike-service-app-ahz1.onrender.com/api/bookings"
    );
    setBookings(response.data);
  };

  const handleAddService = async () => {
    await axios.post(
      "https://bike-service-app-ahz1.onrender.com/api/services",
      newService
    );
    fetchServices();
    setNewService({ name: "", description: "", price: "" });
  };

  const handleEditService = async () => {
    await axios.put(
      `https://bike-service-app-ahz1.onrender.com/api/services/${editService.id}`,
      editService
    );
    fetchServices();
    setEditService(null);
  };

  const handleDeleteService = async (id) => {
    await axios.delete(
      `https://bike-service-app-ahz1.onrender.com/api/services/${id}`
    );
    fetchServices();
  };

  const handleUpdateBookingStatus = async (bookingId, status) => {
    await axios.put(
      "https://bike-service-app-ahz1.onrender.com/api/bookings/status",
      { bookingId, status }
    );
    fetchBookings();
  };

  return (
    <div>
      <div>
        <h1>Services</h1>
        <ul>
          {services.map((service) => (
            <li key={service.id}>
              {service.name} - {service.description} - ${service.price}
              <button onClick={() => setEditService(service)}>Edit</button>
              <button onClick={() => handleDeleteService(service.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
        <div>
          <h2>Add Service</h2>
          <input
            type="text"
            placeholder="Name"
            value={newService.name}
            onChange={(e) =>
              setNewService({ ...newService, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Description"
            value={newService.description}
            onChange={(e) =>
              setNewService({ ...newService, description: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Price"
            value={newService.price}
            onChange={(e) =>
              setNewService({ ...newService, price: e.target.value })
            }
          />
          <button onClick={handleAddService}>Add</button>
        </div>
        {editService && (
          <div>
            <h2>Edit Service</h2>
            <input
              type="text"
              placeholder="Name"
              value={editService.name}
              onChange={(e) =>
                setEditService({ ...editService, name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Description"
              value={editService.description}
              onChange={(e) =>
                setEditService({ ...editService, description: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Price"
              value={editService.price}
              onChange={(e) =>
                setEditService({ ...editService, price: e.target.value })
              }
            />
            <button onClick={handleEditService}>Save</button>
          </div>
        )}
      </div>
      <div>
        <h1>Bookings</h1>
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id}>
              User: {booking.User.username}, Service: {booking.Service.name},
              Date: {new Date(booking.date).toLocaleString()}, Status:{" "}
              {booking.status}
              <button
                onClick={() =>
                  handleUpdateBookingStatus(booking.id, "ready for delivery")
                }
              >
                Mark as Ready for Delivery
              </button>
              <button
                onClick={() =>
                  handleUpdateBookingStatus(booking.id, "completed")
                }
              >
                Mark as Completed
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
