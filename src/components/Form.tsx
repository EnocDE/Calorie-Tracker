import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { categories } from "../data/categories";
import useActivity from "../hooks/useActivity";
import type { Activity } from "../types";

const initialState: Activity = {
  id: uuidv4(),
  category: 1,
  name: "",
  calories: 0,
};

export default function Form() {
  const {
    state: { activeId, activities },
    dispatch,
  } = useActivity();

  const [activity, setActivity] = useState<Activity>(initialState);

  useEffect(() => {
    if (activeId) {
      const selectedActivity = activities.filter(
        (stateActivity) => stateActivity.id === activeId
      )[0];
      setActivity(selectedActivity);
    }
  }, [activeId, activities]);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const isNumberField = ["category", "calories"].includes(e.target.id);
    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value,
    });
  }

  function isValidActivity() {
    const { name, calories } = activity;
    return name.trim() !== "" && calories > 0;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch({ type: "save-activity", payload: { newActivity: activity } });
    setActivity({ ...initialState, id: uuidv4() });
  }

  return (
    <form
      className="space-y-5 shadow bg-white p-10 rounded-lg"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">
          Categoria:{" "}
        </label>
        <select
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          id="category"
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map((categoriesItem) => (
            <option key={categoriesItem.id} value={categoriesItem.id}>
              {categoriesItem.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">
          Actividad:{" "}
        </label>
        <input
          className="border border-slate-300 p-2 rounded-lg"
          type="text"
          id="name"
          placeholder="Ej. Comida, Juego de Naranja, Ensalada, Ejercicio, Pesas, Correr"
          value={activity.name}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">
          Calorias:{" "}
        </label>
        <input
          className="border border-slate-300 p-2 rounded-lg"
          type="number"
          id="calories"
          placeholder="Ej. 600, 300, 1000"
          value={activity.calories}
          onChange={handleChange}
        />
      </div>

      <input
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold text-white cursor-pointer transition-colors disabled:opacity-10"
        type="submit"
        value={activity.category === 1 ? "Guardar Comida" : "Guardar Ejercicio"}
        disabled={!isValidActivity()}
      />
    </form>
  );
}
