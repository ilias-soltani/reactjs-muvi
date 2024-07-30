import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar.jsx";
import Main from "./Pages/Main.jsx";
import Search from "./Pages/Search.jsx";
import Popular from "./Pages/Popular.jsx";
import TopRated from "./Pages/TopRated.jsx";
import Upcoming from "./Pages/Upcoming.jsx";
import Movie from "./Pages/Movie.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import "./App.scss";

function App() {
  const [query, setQuery] = useState("");

  useEffect(() => {
    console.log(query);
  }, [query]);

  return (
    <>
      <BrowserRouter>
        <NavBar setQuery={setQuery} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/search" element={<Search query={query} />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/toprated" element={<TopRated />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
