/* eslint-disable no-unused-vars */
const listingsRouter = require('express').Router();
const Listing = require('../models/listing');

listingsRouter.get('/', (req, res) => {
  Listing.find({}).then((listings) => {
    res.json(listings.map((listing) => listing.toJSON()));
  });
});

listingsRouter.get('/:id', (req, res, next) => {
  Listing.findById(req.params.id)
    .then((listing) => {
      if (Listing) {
        res.json(listing.toJSON());
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

listingsRouter.delete('/:id', (req, res, next) => {
  Listing.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

const generateID = Math.ceil(Math.random() * 100);

listingsRouter.post('/', (req, res, next) => {
  const { body } = req;
  if (!body.content === undefined) {
    return res.status(400).send('Error: content missing');
  }

  const listing = new Listing({
    id: body.id,
    user_id: body.user_id,
    user_name: body.user_name,
    user_type: body.user_type,
    item_name: body.item_name,
    item_image: body.item_image,
    item_description: body.item_description,
    item_location: body.item_location,
    item_reserved: body.item_reserved,
    item_reserved_person: body.item_reserved_person ? body.item_reserved_person : "nil",
    item_reserved_person_email: body.item_reserved_person_email ?  body.item_reserved_person_email : "nil"
  });

  listing.save()
    .then((savedContact) => {
      res.json(savedContact.toJSON());
    })
    .catch((error) => next(error));
});

listingsRouter.put('/:id', (req, res, next) => {
  const { body } = req;

  const listing = {
    id: body.id,
    user_id: body.user_id,
    user_name: body.user_name,
    user_type: body.user_type,
    item_name: body.item_name,
    item_image: body.item_image,
    item_description: body.item_description,
    item_location: body.item_location,
    item_reserved: body.item_reserved,
    item_reserved_person: body.item_reserved_person ? body.item_reserved_person : "nil",
    item_reserved_person_email: body.item_reserved_person_email ?  body.item_reserved_person_email : "nil"
  };



  Listing.findby(req.params.id, listing, { new: true })
    .then((updatedListing) => {
      res.json(updatedListing.toJSON());
    })
    .catch((error) => next(error));
});

module.exports = listingsRouter;
