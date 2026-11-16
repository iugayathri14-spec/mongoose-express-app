import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
const app = express();
app.use(express.json());

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME;

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, { dbName: DB_NAME })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Problem while connecting MongoDB", err));

// Schema + Model
const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  director: String,
  category: { type: String, required: true },
  year: { type: Number, required: true },
});
const Movie = mongoose.model("Movie", movieSchema);

// CREATE
app.post("/api/v1/movies", (req, res) => {
  const newMovie = req.body;
  Movie.create(req.body)
    .then((result) =>
      res.status(201).json({ message: "Movie created successfully", data: result })
    )
    .catch((err) =>{
      err.message =  "Movie creation failed";
      throw err; 
    });
});

// READ ALL (optional ?category=Action)
app.get("/api/v1/movies", (req, res) => {
  const { category } = req.query;
  const query = category ? { category } : {};
  Movie.find(query)
    .then((result) =>{
      res.status(200).json({ message: "Movies retrieved successfully", data: result });
    })
    .catch((err) =>{
      err.message =  "Movie retrieval failed";
      throw err; 
    });
});

// READ ONE
app.get("/api/v1/movies/:id", (req, res) => {
  const id = req.params.id;
  Movie.findById(id)
    .then((result) => {
        if(!result) {
          res.status(404).json({message:"Movie not found"});
        }else{
          res.status(200).json({ message: "Movie retrieved successfully", data: result });
        }
    })
    .catch((err) =>{
      err.message = "Movie retrieval failed"; 
      throw err;
    });
});

// UPDATE
app.put("/api/v1/movies/:id", (req, res) => {
  const {id} =  req.params;
  const updatedMovie = req.body;
  Movie.findByIdAndUpdate(id, updatedMovie , { create : true })
    .then((result) => {
      if (result) {
        res.status(200).json({ message: "Movie updated successfully", data: result });
      } else {
        res.status(404).json({ message: "Movie not updated" });
      }
    })
    .catch((err) =>{
      err.message = "Movie updating failed"; 
      throw err;
    });
});

// DELETE
app.delete("/api/v1/movies/:id", (req, res) => {
  const {id} = req.params;
  Movie.findByIdAndDelete(id)
    .then((result) => {
      if (result) {
        res.status(200).json({ message: "Movie deleted successfully", data: result });
      } else {
        res.status(404).json({ message: "Movie not found" });
      }
    })
    .catch((err) =>{
      err.message =  "Movie delete failed";
      throw err;
    });
});

// ROOT
app.get("/", (req, res) => {
  res.status(200).json({ message: "Movie API server running" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});