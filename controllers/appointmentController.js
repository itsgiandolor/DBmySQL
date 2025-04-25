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

        res.redirect("/"); // or redirect to a confirmation page
    } catch (error) {
        console.error("Error inserting appointment:", error);
        res.status(500).send("Error scheduling appointment.");
    }
};
