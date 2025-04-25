import express from "express";
import morgan from "morgan";
import mysql from "mysql2/promise";
import {router} from "./routes/patientroutes.js";
import { postPatient } from "./controllers/patientController.js";
import { appointmentRouter } from "./routes/appointmentroutes.js";


const PORT = process.env.PORT || 3000;

export const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "astraeiaaaa",
    database: "clinic_db",
});

const app = express();

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });

app.use(morgan('dev'));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
// app.set("views", "./views")

//Index / All Patients Page
app.get('/', (req, res) => {
    res.redirect('/patient');
});
  
  //Add patient page
app.get('/patient/add', (req, res) => {
    res.render('add', {title: 'Add Patient'})
});

app.post("/patient/add", async (req, res) => {
  const { id, firstName, middleName, lastName, contact } = req.body;

  try {
      await postPatient(id, firstName, middleName, lastName, contact);
      res.redirect("/");
  } catch (err) {
      console.error("Failed to add patient:", err);
      res.status(500).send("Error adding patient.");
  }
});

// Add schedule page
app.get('/schedule/appointment', (req, res) => {
  res.render('schedule', {title: 'Schedule Appointment'})
});
  
  //Blog Routes
app.use('/patient', router);

app.use("/schedule", appointmentRouter);
  
  // 404 page
app.use((req, res) => {
    res.status(404).render('404', {title: '404'})
});