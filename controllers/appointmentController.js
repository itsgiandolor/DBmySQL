import { db } from "../server.js";

export const renderScheduleForm = (req, res) => {
    res.render("../views/schedule", { title: "Schedule Appointment" });
};

export const submitAppointment = async (req, res) => {
    const { concern, appointment_date, amount_due, contact_no, patient, labResults } = req.body;

    try {
        const [result] = await db.execute(
            `INSERT INTO appointment (concern, appointment_date, amount_due, contact_no, patient, labResults)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [concern, appointment_date, amount_due, contact_no, patient, labResults || null]
        );

        res.redirect("/appointments"); 
    } catch (error) {
        console.error("Error inserting appointment:", error);
        res.status(500).send("Error scheduling appointment.");
    }
};

export const getAppointments = async (req, res) => {

    try {
        const [appointments] = await db.execute("SELECT * FROM appointment");

        res.render("appointments", { appointments, title: "Appointments" });
    } catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).send("Error fetching appointments.");
    }
};

// Function to get a single appointment's details by ID
export const getAppointmentDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const [appointment] = await db.execute("SELECT * FROM appointment WHERE id = ?", [id]);
        if (appointment.length > 0) {
            res.render("appointmentDetails", { appointment: appointment[0], title: "Appointment Details" });
        } else {
            res.status(404).send("Appointment not found.");
        }
    } catch (error) {
        console.error("Error fetching appointment details:", error);
        res.status(500).send("Error fetching appointment details.");
    }
};

export const deleteAppointment = async (req, res) => {
    const appointmentId = req.params.id;

    try {
        await db.execute('DELETE FROM appointment WHERE id = ?', [appointmentId]);
        res.json({ redirect: '/appointments' });
    } catch (error) {
        console.error("Error deleting appointment:", error);
        res.status(500).send("Error deleting appointment.");
    }
};
