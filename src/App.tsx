import { useEffect, useMemo } from "react";
import ActivityList from "./components/ActivityList";
import CalorieTracker from "./components/CalorieTracker";
import Form from "./components/Form";
import useActivity from "./hooks/useActivity";

function App() {
  const {
    state: { activities },
    dispatch,
  } = useActivity();

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(activities));
  }, [activities]);

  const canRestartApp = useMemo(() => activities.length > 0, [activities])

  return (
    <>
      <header className="bg-lime-600 py-3 px-5">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-center text-2xl font-bold text-white">
            Contador de calorias
          </h1>
          <button
            className="bg-gray-800 hover:bg-gray-900 p-2 font-bold text-white cursor-pointer text-lg transition-colors rounded-md disabled:opacity-20"
            onClick={() => dispatch({ type: "restart-app" })}
            disabled={!canRestartApp}
          >
            Reiniciar App
          </button>
        </div>
      </header>
      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form />
        </div>
      </section>

      <section className="bg-gray-800 p-10">
        <div className="max-w-4xl mx-auto">
          <CalorieTracker />
        </div>
      </section>

      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList />
      </section>
    </>
  );
}

export default App;
