const express = require("express");
const router = express.Router();
const driverController = require("../controllers/managerController");

//Gets all stations in the Database
router.get("/stations", driverController.getStations);

//Gets all stations in the Database
router.post("/trips", driverController.getTrips);

//Create trips using { mssn (Manager SSN), price, date, dssn (Driver SSN), estimatedtime, destinationStation (ID of Destination Station)}
router.post("/create-trips", driverController.createTrip);

//Gets all the drivers for the manager using { mssn (Manager ssn) }
router.post("/drivers", driverController.getDrivers);

//Gets all Private Trips in the Database
router.get("/private-trips", driverController.getPrivateTrips);

//Fire a Driver using { mssn (Manager ssn), dssn }
router.post("/fire", driverController.fireDriver);

//Hire a Driver using { mssn (Manager ssn), dssn, shift, salary }
router.post("/hire", driverController.hireDriver);

//Update a salary of a Driver using { mssn, dssn, newSalary }
router.put("/update-salary", driverController.updateDriverSalary);

// get avaible drivers

// Update Price

// Update Destination

// 

module.exports = router;
