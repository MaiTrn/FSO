import express, { json } from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises, ExercisesValues } from "./exerciseCalculator";

const app = express();
app.use(json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});
app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (
    !req.query.height ||
    isNaN(height) ||
    !req.query.weight ||
    isNaN(weight)
  ) {
    res.json({ error: "malformatted parameters" });
  }
  res.json({
    weight,
    height,
    bmi: calculateBmi(height, weight),
  });
});
app.post("/exercises", (req, res) => {
  const { exercises, target } = req.body as ExercisesValues;
  if (!exercises || !target) {
    res.status(404).json({ error: "parameters missing" }).status(404);
  }
  if (isNaN(target) || exercises.some((e) => isNaN(e))) {
    res.status(404).json({ error: "malformatted parameters" });
  }
  if (
    !isNaN(target) &&
    exercises.length > 1 &&
    exercises.every((e) => !isNaN(e))
  ) {
    res.json(calculateExercises(exercises, target));
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
