import "./App.css";
import { useEffect, useState } from "react";
import Movie from "./Movie";
import Filter from "./Filter";
import { motion } from "framer-motion";

function App() {
  const [popular, setPopular] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeGenre, setActiveGenre] = useState(0);

  useEffect(() => {
    fetchPopular();
  }, []);

  const fetchPopular = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=5fb8d04deb454ae30bcd8e7c7b3c3efc&language=en-US&page=1"
    );
    const movies = await data.json();
    setPopular(movies.results);
    setFiltered(movies.results);
  };
  return (
    <div className="App">
      <Filter
        popular={popular}
        setFiltered={setFiltered}
        activeGenre={activeGenre}
        setActiveGenre={setActiveGenre}
      />
      <motion.div
        layout
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        className="popular-movies"
      >
        {filtered?.map((movie, index) => (
          <Movie key={index} movie={movie} />
        ))}
      </motion.div>
    </div>
  );
}

export default App;
