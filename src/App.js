import React, { useEffect, useCallback } from "react";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { CreateContainer, Header, MainContainer } from "./Components";
import { useStateValue } from "./context/StateProvider";
import { getAllFoodItems } from "./utils/firebaseFunctions";
import { actionType } from "./context/reducer";

const App = () => {
  const [{ foodItems }, dispatch] = useStateValue();

  const fetchData = useCallback(async () => {
    try {
      const data = await getAllFoodItems();
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
      console.log(data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  });

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AnimatePresence mode="wait" initial={false} presenceAffectsLayout>
      <div className="w-screen h-auto flex flex-col bg-primary">
        <Header />

        <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
          <Routes>
            <Route path="/*" element={<MainContainer />} />
            <Route path="/createItem" element={<CreateContainer />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
};

export default App;
