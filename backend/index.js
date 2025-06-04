const { MongoClient } = require("mongodb");
const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
const { mockStations } = require("./mockData");

const uri =
  "mongodb+srv://admin:admin@evcharger.haehege.mongodb.net/?retryWrites=true&w=majority&appName=EVCharger";
const port = 5000;

const app = express();
app.use(cors());
app.use(express.json());

const client = new MongoClient(uri);

// Firebase Admin SDK Setup
const serviceAccount = require("./ServiceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function run() {
  try {
    await client.connect();
    const usercollection = client.db("database").collection("users");
    const stationcollection = client.db("database").collection("data");
    const updatedStationcollection = client.db("database").collection("updated_stations");

    // Check if email is registered (via Firebase)
    app.post("/check-email", async (req, res) => {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }
      try {
        await admin.auth().getUserByEmail(email);
        res.json({ registered: true });
      } catch (error) {
        if (error.code === "auth/user-not-found") {
          res.json({ registered: false });
        } else {
          console.error("Error checking email:", error);
          res.status(500).json({ error: "Internal Server Error" });
        }
      }
    });

    // Register a new user in MongoDB
    app.post("/register", async (req, res) => {
      try {
        const user = req.body;
        const existingUser = await usercollection.findOne({
          email: user.email,
        });
        if (existingUser) {
          return res
            .status(400)
            .json({ error: "User with this email already exists" });
        }
        const result = await usercollection.insertOne(user);
        res.status(201).json(result);
      } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    // Fetch a user by email
    app.get("/loggedinuser", async (req, res) => {
      try {
        const email = req.query.email;
        if (!email) {
          return res.status(400).json({ error: "Email is required" });
        }
        const user = await usercollection.find({ email }).toArray();
        res.json(user);
      } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    // Fetch all stations from MongoDB updated_stations collection
    app.get("/api/stations/mongodb", async (req, res) => {
      try {
        const stations = await updatedStationcollection.find().toArray();
        const parsedStations = stations.map((station) => ({
          ...station,
          latitude: parseFloat(station.latitude),
          longitude: parseFloat(station.longitude),
          powerOutput: parseFloat(station.powerOutput),
        }));
        res.json(parsedStations);
      } catch (error) {
        console.error("Error fetching stations:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    // Add a new charging station
    app.post("/api/stations", async (req, res) => {
      try {
        const station = req.body;
        console.log("Adding new station:", station);
        
        if (
          !station.name ||
          !station.address ||
          !station.city ||
          !station.state ||
          !station.zipCode
        ) {
          return res.status(400).json({ error: "Required fields are missing" });
        }
        
        const validatedStation = {
          ...station,
          latitude: parseFloat(station.latitude),
          longitude: parseFloat(station.longitude),
          powerOutput: parseFloat(station.powerOutput),
          createdAt: new Date().toISOString(),
          lastUpdated: new Date().toISOString(),
        };
        
        if (
          isNaN(validatedStation.latitude) ||
          isNaN(validatedStation.longitude)
        ) {
          return res
            .status(400)
            .json({ error: "Invalid latitude or longitude" });
        }
        if (
          isNaN(validatedStation.powerOutput) ||
          validatedStation.powerOutput <= 0
        ) {
          return res.status(400).json({ error: "Invalid power output" });
        }
        
        const existingStation = await updatedStationcollection.findOne({
          id: station.id,
        });
        if (existingStation) {
          return res
            .status(400)
            .json({ error: "Station with this ID already exists" });
        }
        
        const result = await updatedStationcollection.insertOne(validatedStation);
        console.log("Station added successfully:", validatedStation);
        res.status(201).json({ ...validatedStation, _id: result.insertedId });
      } catch (error) {
        console.error("Error adding station:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    // Update a charging station
    app.put("/api/stations/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const station = req.body;
        
        console.log("Updating station with ID:", id);
        console.log("Update data:", station);

        if (
          !station.name ||
          !station.address ||
          !station.city ||
          !station.state ||
          !station.zipCode
        ) {
          console.log("Validation failed: Required fields missing");
          return res.status(400).json({ error: "Required fields are missing" });
        }

        const { _id, ...stationWithoutId } = station;
        const validatedStation = {
          ...stationWithoutId,
          latitude: parseFloat(station.latitude),
          longitude: parseFloat(station.longitude),
          powerOutput: parseFloat(station.powerOutput),
          lastUpdated: new Date().toISOString(),
        };

        console.log("Validated station data:", validatedStation);

        if (
          isNaN(validatedStation.latitude) ||
          isNaN(validatedStation.longitude)
        ) {
          console.log("Validation failed: Invalid coordinates");
          return res
            .status(400)
            .json({ error: "Invalid latitude or longitude" });
        }
        if (
          isNaN(validatedStation.powerOutput) ||
          validatedStation.powerOutput <= 0
        ) {
          console.log("Validation failed: Invalid power output");
          return res.status(400).json({ error: "Invalid power output" });
        }

        const existingStation = await updatedStationcollection.findOne({ id: id });
        console.log("Existing station found:", existingStation ? "Yes" : "No");
        
        if (!existingStation) {
          console.log("Station not found with ID:", id);
          return res.status(404).json({ error: "Station not found" });
        }

        const result = await updatedStationcollection.updateOne(
          { id: id },
          { $set: validatedStation }
        );

        console.log("Update result:", result);

        if (result.matchedCount === 0) {
          console.log("No station matched for update");
          return res.status(404).json({ error: "Station not found" });
        }

        console.log("Station updated successfully");
        res.status(200).json({ ...validatedStation, id });
      } catch (error) {
        console.error("Error updating station:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    // Delete a charging station
    app.delete("/api/stations/:id", async (req, res) => {
      try {
        const { id } = req.params;
        console.log("Deleting station with ID:", id);

        const result = await updatedStationcollection.deleteOne({ id });
        console.log("Delete result:", result);

        if (result.deletedCount === 0) {
          return res.status(404).json({ error: "Station not found" });
        }

        res.status(200).json({ message: "Station deleted successfully" });
      } catch (error) {
        console.error("Error deleting station:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    // New endpoint to reset mock data
    app.post("/api/stations/reset", async (req, res) => {
      try {
        // Clear existing stations
        await updatedStationcollection.deleteMany({});
        console.log("Cleared existing stations from updated_stations collection");

        // Insert new mock stations
        await updatedStationcollection.insertMany(mockStations);
        console.log("Inserted new mock stations");

        res.status(200).json({ message: "Mock data reset successfully" });
      } catch (error) {
        console.error("Error resetting mock data:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    // Insert data into updated_stations collection
    const data = await updatedStationcollection.countDocuments();
    if (data === 0) {
      await updatedStationcollection.insertMany(mockStations);
      console.log("Inserted initial mock data into updated_stations collection.");
    }

    console.log("Connected to MongoDB successfully");

  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

run().catch(console.dir);

// Root check endpoint
app.get("/", (req, res) => {
  res.send("EV Charger is working");
});

app.listen(port, () => {
  console.log(`EV Charger Application is working on port ${port}`);
});