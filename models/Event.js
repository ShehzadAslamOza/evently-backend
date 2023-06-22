const mongoose = require('mongoose')

const eventSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Please add a Title value'],
    },
    description: {
      type: String,
      required: [true, 'Please add a descripton value'],
    },
    location: {
      type: String,
      required: [true, 'Please add a location value'],
    },
    city: {
      type: String,
      required: [true, 'Please add a city value'],
    },
    date: {
      type: String,
      required: [true, 'Please add a date value'],
    },
    time: {
      type: String,
      required: [true, 'Please add a time value'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Event', eventSchema)
