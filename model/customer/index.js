const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  aid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article'
  },
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  time: {
    type: Date,
  },
  content: {
    type: String
  }
})

const Customer = mongoose.model('Customer', customerSchema)

module.exports = {
  Customer
}