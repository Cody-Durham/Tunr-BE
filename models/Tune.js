// Import Mongoose
const mongoose = require("mongoose");

// Pull Schema and model from mongoose
const Schema = mongoose.Schema;
const model = mongoose.model;

// Create Place Schema
const tuneSchema = new Schema({
    title: String,
    artist: String,
    time: Number,
    done: { type: Boolean, default: false }
}, {
    timestamps: true
});

// Create our Model Object
const Tune = model("Tune", tuneSchema);

// Export our Model Object
module.exports = Tune;