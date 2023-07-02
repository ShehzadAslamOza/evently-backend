const asyncHandler = require("express-async-handler");

const Event = require("../models/Event");
const User = require("../models/User");

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getAllEvents = asyncHandler(async (req, res) => {
  const events = await Event.find();

  res.status(200).json(events);
});

const getMyEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({ user: req.user._id });

  res.status(200).json(events);
});

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setEvent = asyncHandler(async (req, res) => {
  const { title, description, location, city, date, time } = req.body;

  if (!title || !description || !location || !city || !date || !time) {
    res.status(400);
    throw new Error("Please provide all fields");
  }

  const event = await Event.create({
    user: req.user._id,
    title,
    description,
    location,
    city,
    date,
    time,
  });

  res.status(200).json(event);
});

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(400);
    throw new Error("Goal not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the goal user
  if (event.user.toString() !== req.user._id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedEvent);
});

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById({ _id: req.params.id });
  console.log(req.params.id);
  if (!event) {
    res.status(400);
    throw new Error("Goal not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the goal user
  if (event.user.toString() !== req.user._id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await Event.deleteOne({ _id: req.params.id });

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getAllEvents,
  setEvent,
  updateEvent,
  deleteEvent,
  getMyEvents,
};
