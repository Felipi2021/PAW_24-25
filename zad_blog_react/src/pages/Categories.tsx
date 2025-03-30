import React from "react";
import "../styles/categories.scss";

interface CategoriesProps {
  categories: string[];
}

const Categories: React.FC<CategoriesProps> = ({ categories }) => {
  return (
    <div className="page categories">
      <h1>Lista Kategorii</h1>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>{category}</li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
