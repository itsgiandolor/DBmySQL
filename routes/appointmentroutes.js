import express from "express";
export const appointmentRouter = express.Router();

import {
    renderScheduleForm,
    submitAppointment
} from "../controllers/appointmentController.js";

appointmentRouter.get("/schedule_appointment", renderScheduleForm);

appointmentRouter.post("/schedule", submitAppointment);
