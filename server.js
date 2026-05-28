const express = require ("express");
const cors = require ("cors");
// const bodyParser = require ("body-parser");
const mongoose = require ("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/choirDB";

mongoose.connect(MONGO_URI)
  .then(()=> console.log("Connected to MongoDB"))
  .catch(error => console.error("Error connecting to MongoDB:", error));

  const choirSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    phone: String,
    dateofbirth: Date,
    gender: String,
    maritalStatus: String,
    state: String,
    LGA: String,
    yearsOfExperience: String,
    yearandmonthOfJoining: String,
    position: String,
    readmusic: String,
    playinstrument: String,
    specifyinstrument: String,
    baptized: String,
    churchunit: String,
    healthcondition: String,
    favouritehymn: String,
    vocalPart: String,
    status: String,
    message: String,
    confirmed:{type: Boolean, default: false}
    
  })

  const Choristers = mongoose.model("Choristers",choirSchema);

  app.post("/api/choristers", async (req, res) => {
    try {
        const choristerData = req.body;
        const newChorister = new Choristers(choristerData);
        await newChorister.save();
        res.status(201).json({ message: "Chorister data saved successfully" });
    }
    catch (error) {
        console.error("Error saving chorister data:", error);
        res.status(500).json({ message: "Failed to save chorister data" });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

