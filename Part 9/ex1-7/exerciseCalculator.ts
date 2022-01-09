interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  exercises: Array<number>,
  targetPerDay: number
): Result => {
  const result = {
    periodLength: exercises.length,
    trainingDays: exercises.filter((ex) => ex > 0).length,
    success: false,
    rating: 0,
    ratingDescription: "",
    target: targetPerDay,
    average: Number(
      (exercises.reduce((total, a) => total + a) / exercises.length).toFixed(2)
    ),
  };
  if (result.average < targetPerDay / 2) {
    result.success = false;
    result.rating = 1;
    result.ratingDescription = "need to exercise more";
  } else if (
    result.average >= targetPerDay / 2 &&
    result.average < targetPerDay
  ) {
    result.success = false;
    result.rating = 2;
    result.ratingDescription = "not too bad but could be better";
  } else if (result.average >= targetPerDay) {
    result.success = true;
    result.rating = 3;
    result.ratingDescription = "enough exercise hours achieved!";
  }

  return result;
};

export interface ExercisesValues {
  target: number;
  exercises: Array<number>;
}

const parseExArguments = (args: Array<string>): ExercisesValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  const exercises = [];
  for (let i = 2; i < args.length; i++) {
    if (isNaN(Number(args[i]))) {
      throw new Error("Provided values were not numbers!");
    }
    if (i !== 2) {
      exercises.push(Number(args[i]));
    }
  }
  return {
    target: Number(args[2]),
    exercises,
  };
};

try {
  const { target, exercises } = parseExArguments(process.argv);
  console.log(calculateExercises(exercises, target));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
