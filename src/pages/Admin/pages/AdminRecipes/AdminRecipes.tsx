import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminRecipesNav from "./components/AdminRecipesNav/AdminRecipesNav";

function AdminRecipes() {
  const { key } = useLocation();
  return (
    <div className="d-flex flex-column flex-fill">
      <h4 className="mb-10">Gestion des recettes</h4>
      <div className="flex-fill d-flex flex-column">
        <AdminRecipesNav></AdminRecipesNav>
        <div className="flex-fill d-flex flex-column">
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet key={key} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default AdminRecipes;
