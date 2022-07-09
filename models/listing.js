
const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  id: String,
  user_id: {
    type: String,
    minlength: 5,
    required: true,
  },
  user_name: {
    type: String,
    minlength: 3,
    required: true,
  },
  user_type: {
    type: String,
    minlength: 3,
    required: true,
  },
  item_name: {
    type: String,
    required: true,
  },
  item_image: {
    type: String,
  },
  item_description: {
    type: String,
    required: true,
  },
  item_location: {
    type: String,
    required: true,
  },
  item_reserved: {
    type: Boolean,
  },
  item_reserved_person: {
    type: String,
  },
  item_reserved_person_email: {
    type: String,
  },
});

listingSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Listing', listingSchema);
