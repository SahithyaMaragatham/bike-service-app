import React, { useState, useEffect } from "react";
import axios from "axios";
import Appbar from "../component/Appbar";

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
      "https://bike-service-app-ahz1.onrender.com/api/services/${editService.id}",
      editService
    );
    fetchServices();
    setEditService(null);
  };

  const handleDeleteService = async (id) => {
    await axios.delete(
      "https://bike-service-app-ahz1.onrender.com/api/services/${id}"
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
      <Appbar />
      <div className="container mt-5">
        <h1 className="text-center mb-4">Admin Dashboard</h1>
        <div className="row">
          <div className="col-md-6 mb-4">
            <h2>Services</h2>
            <ul className="list-group">
              {services.map((service) => (
                <li key={service.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="mb-1">{service.name}</h5>
                    <p className="mb-1">{service.description}</p>
                    <small>${service.price}</small>
                  </div>
                  <div>
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => setEditService(service)}>Edit</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteService(service.id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <h3>Add Service</h3>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Name"
                value={newService.name}
                onChange={(e) =>
                  setNewService({ ...newService, name: e.target.value })
                }
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Description"
                value={newService.description}
                onChange={(e) =>
                  setNewService({ ...newService, description: e.target.value })
                }
              />
              <input
                type="number"
                className="form-control mb-2"
                placeholder="Price"
                value={newService.price}
                onChange={(e) =>
                  setNewService({ ...newService, price: e.target.value })
                }
              />
              <button className="btn btn-primary" onClick={handleAddService}>Add</button>
            </div>
            {editService && (
              <div className="mt-4">
                <h3>Edit Service</h3>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Name"
                  value={editService.name}
                  onChange={(e) =>
                    setEditService({ ...editService, name: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Description"
                  value={editService.description}
                  onChange={(e) =>
                    setEditService({ ...editService, description: e.target.value })
                  }
                />
                <input
                  type="number"
                  className="form-control mb-2"
                  placeholder="Price"
                  value={editService.price}
                  onChange={(e) =>
                    setEditService({ ...editService, price: e.target.value })
                  }
                />
                <button className="btn btn-primary" onClick={handleEditService}>Save</button>
              </div>
            )}
          </div>
          <div className="col-md-6">
            <h2>Bookings</h2>
            <ul className="list-group">
              {bookings.map((booking) => (
                <li key={booking.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="mb-1">User: {booking.User.username}</h5>
                    <p className="mb-1">Service: {booking.Service.name}</p>
                    <p className="mb-1">Date: {new Date(booking.date).toLocaleString()}</p>
                    <small>Status: {booking.status}</small>
                  </div>
                  <div>
                    <button className="btn btn-sm btn-outline-success me-2" onClick={() => handleUpdateBookingStatus(booking.id, "ready for delivery")}>
                      Mark as Ready for Delivery
                    </button>
                    <button className="btn btn-sm btn-outline-success" onClick={() => handleUpdateBookingStatus(booking.id, "completed")}>
                      Mark as Completed
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
