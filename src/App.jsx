import { Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";

import "./App.css";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  console.log("App renderizando com selectedCategory:", selectedCategory);

  const handleCategorySelect = (genre) => {
    console.log("Categoria selecionada:", genre);
    setSelectedCategory(genre.id);
  };

  return (
    <div className="App">
      <Navbar 
        onCategorySelect={handleCategorySelect}
        selectedCategory={selectedCategory}
      />
      <Outlet context={{ selectedCategory }} />
    </div>
  );
}

export default App;