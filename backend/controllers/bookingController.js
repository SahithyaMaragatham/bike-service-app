"use strict";

const db = require("../models");
const { Booking, User, Service } = db;
const { sendMail } = require("../utils/mailer");

exports.createBooking = async (req, res) => {
  const { userId, serviceId, date } = req.body;
  try {
    const booking = await Booking.create({ userId, serviceId, date });
    const user = await User.findByPk(userId);
    const service = await Service.findByPk(serviceId);

    await sendMail(
      user.email,
      "New Booking",
      `Booking details: User: ${user.email}, Service: ${service.name}, Date: ${date}`
    );

    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateBookingStatus = async (req, res) => {
  const { bookingId, status } = req.body;
  try {
    const booking = await Booking.findByPk(bookingId);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    booking.status = status;
    await booking.save();

    if (status === "ready for delivery") {
      const user = await User.findByPk(booking.userId);
      sendMail(
        user.email,
        "Bike Ready for Delivery",
        `Your bike is ready for delivery. Booking details: Date: ${booking.date}, Service: ${booking.serviceId}`
      );
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [User, Service],
    });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getBookingDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findByPk(id, {
      include: [User, Service],
    });
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getBookingsByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const bookings = await Booking.findAll({
      where: { userId },
      include: [Service],
    });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
