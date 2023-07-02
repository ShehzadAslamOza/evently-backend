const express = require("express");
const router = express.Router();
const {
  getAllEvents,
  setEvent,
  updateEvent,
  deleteEvent,
  getMyEvents,
} = require("../controllers/eventController");

const verifyJWT = require("../middleware/verifyJWT");

router.route("/").get(verifyJWT, getAllEvents).post(verifyJWT, setEvent);
router.route("/myEvents").get(verifyJWT, getMyEvents);
router.route("/:id").delete(verifyJWT, deleteEvent).put(verifyJWT, updateEvent);

module.exports = router;
