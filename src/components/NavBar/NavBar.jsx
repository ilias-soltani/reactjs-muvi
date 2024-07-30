import React, { useState, useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import { BiSearch, BiMenuAltRight } from "react-icons/bi";
import { FaXmark } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

import "./NavBar.scss";

function NavBar({ setQuery }) {
  const [activeSearch, setActiveSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(false);
  const input = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (activeSearch) input.current.focus();
  }, [activeSearch, scrolled]);

  const changeBg = () => {
    if (window.scrollY >= 1) setScrolled(true);
    else setScrolled(false);
  };

  window.addEventListener("scroll", changeBg);

  const searchSubmit = (e) => {
    e.preventDefault();
    const word = input.current.value.toString().trim();
    if (word !== "") {
      closeSearch();
      setQuery(word);
      if (window.location.pathname !== "/search") navigate("/search");
    }
  };

  const closeSearch = () => setActiveSearch(false);

  return (
    <div className={`app-navbar ${scrolled ? "on-scroll" : ""}`}>
      <Container>
        <h1 className="logo flex-center" onClick={closeSearch}>
          <Link to="/">Muvi</Link>
        </h1>

        <div className="content">
          <div className={`search-container ${activeSearch ? "active" : ""}`}>
            <div className="search-icon flex-center">
              <BiSearch onClick={() => setActiveSearch(true)} />
            </div>
            <div className="input-container">
              <form onSubmit={(e) => searchSubmit(e)}>
                <input type="text" className="main-input" ref={input} />
              </form>
            </div>
          </div>

          <div className={`list ${activeMenu ? "active" : ""}`}>
            <div
              className="x-icon flex-center"
              onClick={() => setActiveMenu(false)}
            >
              <FaXmark />
            </div>
            <ul>
              {["Popular", "Top Rated", "Upcoming"].map((item, i) => (
                <li key={i}>
                  <Link
                    onClick={closeSearch}
                    className="flex-center"
                    to={item.replace(/\s+/g, "").toLocaleLowerCase()}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <BiMenuAltRight
            className="toggle"
            onClick={() => setActiveMenu(!activeMenu)}
          />
        </div>
      </Container>
    </div>
  );
}

export default NavBar;
