import express from "express";
import EventsController from "../controllers/events.js";
import LocationsController from "../controllers/locations.js";

const router = express.Router();

router.get("/events", EventsController.getEvents);
router.get("/events/:eventId", EventsController.getEventById);
router.get("/locations", LocationsController.getLocations);
router.get("/locations/:locationId", LocationsController.getLocationById);

export default router;