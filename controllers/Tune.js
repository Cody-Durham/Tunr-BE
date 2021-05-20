// CREATE A NEW EXPRESS ROUTE
const router = require("express").Router();

const { Router } = require("express");
//IMPORT OUR MODEL
const Tune = require("../models/Tune");

// SEED DATA FOR SEED ROUTE
const todoSeed = [
  {title: "No Clue",
    artist: "Sia",
    time: 00,
    done: false}
];

// ROUTES (async, since database actions are asynchronous)

// Seed Route for Seeding Database
router.get("/seed", async (req, res) => {
  // try block for catching errors
  try {
    // remove all places from database
    await Tune.remove({});
    // add the seed data to the database
    await Tune.create(todoSeed);
    // get full list of places to confirm seeding worked
    const tunes = await Tune.find({});
    // return full list of places as JSON
    res.json(tunes);
  } catch (error) {
    // return error as JSON with an error status
    res.status(400).json(error);
  }
});

//GET Route for ALL 
router.get("/", async (req, res) => {
  try {
  res.json(await Tune.find({}));
}
catch (error) {
  // return error as JSON with an error status
  res.status(400).json(error);
}
});

// CREATE Route
router.post("/", async (req, res) => {
  try {
    // pass the request body to create a new place in the database
    const newTune = await Tune.create(req.body);
    // send newly created place back as JSON
    res.json(newTune);
  } catch (error) {
    // return error as JSON with an error status
    res.status(400).json(error);
  }
});

// update Route
router.put("/:id", async (req, res) => {
  try {
    // pass the request body to update and existing place in the database
    const updatedTune = await Tune.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    // send newly updated place back as JSON
    res.json(updatedTune);
  } catch (error) {
    // return error as JSON with an error status
    res.status(400).json(error);
  }
});

// update Route
router.delete("/:id", async (req, res) => {
  try {
    // delete existing place in the database
    const deletedTune = await Tune.findByIdAndRemove(req.params.id);
    // send delete place back as JSON
    res.json(deletedTune);
  } catch (error) {
    // return error as JSON with an error status
    res.status(400).json(error);
  }
});

// export the router which has all our routes registered to it
module.exports = router;