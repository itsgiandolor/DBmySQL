import express from "express";
export const appointmentRouter = express.Router();

import {
    renderScheduleForm,
    submitAppointment,
    getAppointments,
    getAppointmentDetails,
    deleteAppointment
} from "../controllers/appointmentController.js";

appointmentRouter.get("/schedule", renderScheduleForm);

appointmentRouter.post("/schedule", submitAppointment);

appointmentRouter.get('/', getAppointments);

appointmentRouter.get('/:id', getAppointmentDetails);

appointmentRouter.delete('/delete/:id', deleteAppointment);