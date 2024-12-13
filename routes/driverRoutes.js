const express = require("express");
const router = express.Router();
const driverController = require("../controllers/driverController");

// Set estimated time for a trip using { d_ssn (Driver SSN), trip_id, estimated_time }
// works
router.post("/set-estimated-time", driverController.setEstimatedTime);

// Request a change to an assigned trip using { d_ssn (Driver SSN), trip_id, reason }
router.post("/request-trip-change", driverController.requestTripChange);

// Mark attendance for a shift using { d_ssn (Driver SSN), shift_date, status }
// works
router.post("/mark-attendance", driverController.markAttendance);

router.post("/get-trips", driverController.getTrips);

router.post("/get-attendance", driverController.getAttendance);

// Accept or reject a private trip request using { d_ssn (Driver SSN), private_trip_id, action ('accept' or 'reject') }
router.post("/accept-reject-private-trip", driverController.acceptRejectPrivateTrip);

router.post("/get-private-trips", driverController.getPrivateTrips);

router.post("/get-private-status", driverController.getPrivateStatus);
// Request a day off using { d_ssn (Driver SSN), date, reason }
router.post("/request-day-off", driverController.requestDayOff);

router.post("/get-day-off-requests", driverController.getDayOffRequests);

// Report a lost item during a trip using { d_ssn (Driver SSN), trip_id, item_description }
router.post("/report-lost-item", driverController.reportLostItem);

// Driver resignation with { d_ssn (Driver SSN), reason, effective_date }
router.post("/resign", driverController.resignDriver);

module.exports = router;
