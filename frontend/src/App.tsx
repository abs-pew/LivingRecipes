import './App.css'
import NavigationLinks from "./navigation/NavigationLinks.tsx";
import RoutingPaths from "./navigation/RoutingPaths.tsx";
import {useEffect, useState} from "react";
import type {Recipe} from "./Recipe.ts";
import axios from "axios";

export default function App() {

    const [recipes, setRecipes] = useState<Recipe[]>()

    function getAllRecipes() {
        axios.get("api/recipes")
            .then(Response => setRecipes(Response.data))
            .catch((error) => console.log("Function: getAllRecipes. ERROR: " + error))
    }

    useEffect(() => {
        getAllRecipes()
    }, []);

  return (
      <>
          <div className="grid">
              <div className={"window-pane top"}>
                  <h1> Recipes & Recipes </h1>
              </div>
              <div className={"window-pane left"}>
                  <NavigationLinks/>
              </div>
              <div className={"window-pane right"}>
                  <RoutingPaths recipes={recipes}
                                getAllRecipes={getAllRecipes}/>
              </div>
          </div>
      </>
  )
}

