/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from "express";
import { patientService } from "../services";
import toNew from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getPublicPatientEntries());
});

router.get("/:id", (req, res) => {
  const patient = patientService.findById(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post("/:id/entries", (req, res) => {
  console.log("was here");
  try {
    const newEntry = toNew.toNewEntry(req.body);
    const addedEntry = patientService.addEntry(req.params.id, newEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMsg = "Something went wrong. ";
    if (error instanceof Error) {
      errorMsg += "Error: " + error.message;
    }
    res.status(400).send(errorMsg);
  }
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNew.toNewPatientEntry(req.body);
    const addedPatientEntry = patientService.addPatient(newPatientEntry);
    res.json(addedPatientEntry);
  } catch (error: unknown) {
    let errorMsg = "Something went wrong. ";
    if (error instanceof Error) {
      errorMsg += "Error: " + error.message;
    }
    res.status(400).send(errorMsg);
  }
});

export default router;
