const express = require("express");

const router = express.Router();

const {
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  addEvent,
} = require("../controllers/eventController");

router.get("/", getAllEvents), router.get("/:id", getEventById);
router.post("/", addEvent);
router.delete("/:id", deleteEvent);
router.patch("/:id", updateEvent);

module.exports = router;
