const express = require("express");
const bookingController = require("../controllers/bookingController");
const router = express.Router();

router.post("/", bookingController.createBooking);
router.put("/status", bookingController.updateBookingStatus);
router.get("/", bookingController.getAllBookings);
router.get("/:id", bookingController.getBookingDetails);
router.get("/user/:userId", bookingController.getBookingsByUser);

module.exports = router;
