
import './App.css'
import {useEffect, useState} from "react";
import type {Recipe} from "./Recipe.ts";
import NavigationLinks from "./navigation/NavigationLinks.tsx";
import axios from "axios";
import RoutingPaths from "./navigation/RoutingPaths.tsx";

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

    if (!recipes)
    {
        return "loading recipes ..."
    }

  return (
      <>
          <div className="grid">
              <div className={"window-pane top"}>
                  Recipes & Recipes
              </div>
              <div className={"window-pane left"}>
                  <NavigationLinks/>
              </div>
              <div className={"window-pane right"}>
                  <RoutingPaths recipes={recipes}/>
              </div>
          </div>
      </>
  )
}

