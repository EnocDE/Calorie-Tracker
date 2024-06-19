import { useMemo } from "react";
import useActivity from "../hooks/useActivity";
import CalorieDisplay from "./CalorieDisplay";

export default function CalorieTracker() {
  const {
    state: { activities },
  } = useActivity();

  // Contadores
  const caloriesConsumed = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 1 ? total + activity.calories : total,
        0
      ),
    [activities]
  );

  const caloriesBurned = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 2 ? total + activity.calories : total,
        0
      ),
    [activities]
  );

  const netCalories = useMemo(
    () => caloriesConsumed - caloriesBurned,
    [caloriesBurned, caloriesConsumed]
  );

  return (
    <>
      <h2 className="text-4xl font-black text-white text-center">
        Resumen de calorias
      </h2>

      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <CalorieDisplay text={"Consumidas"} calories={caloriesConsumed} />
        <CalorieDisplay text={"Ejercicio"} calories={caloriesBurned} />
        <CalorieDisplay text={"Totales"} calories={netCalories} />
      </div>
    </>
  );
}
