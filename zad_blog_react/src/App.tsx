import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Categories from "./pages/Categories";
import "./styles/styles.scss";

const categories = ["Technologia", "Podróże", "Kulinaria", "Zdrowie", "Biznes"];

const posts = [
  { title: "Nowinki technologiczne 2025", category: "Technologia" },
  { title: "Najpiękniejsze miejsca w Europie", category: "Podróże" },
  { title: "Przepis na idealne ciasto czekoladowe", category: "Kulinaria" },
  { title: "Jak dbać o zdrowie psychiczne?", category: "Zdrowie" },
  { title: "Trendy w biznesie na przyszły rok", category: "Biznes" }
];

const App = () => {
  return (
    <Router>
      <div className="app">
        <nav>
          <ul>
            <li><Link to="/">Strona Główna</Link></li>
            <li><Link to="/post">Strona Wpisu</Link></li>
            <li><Link to="/categories">Lista Kategorii</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/post" element={<Post posts={posts} />} />
          <Route path="/categories" element={<Categories categories={categories} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
