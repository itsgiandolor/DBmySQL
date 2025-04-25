import express from "express";
import morgan from "morgan";
import mysql from "mysql2/promise";
import { router } from "./routes/patientroutes.js";
import { appointmentRouter } from "./routes/appointmentroutes.js";
import { postPatient } from "./controllers/patientController.js";

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

// Index / All Patients Page
app.get('/', (req, res) => {
  res.redirect('/patient');
});

// Use the patient and appointment routers
app.use('/patient', router);
app.use('/appointments', appointmentRouter); 

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
