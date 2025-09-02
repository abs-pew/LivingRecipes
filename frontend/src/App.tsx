
import './App.css'
import {useEffect, useState} from "react";
import type {Recipe} from "./Recipe.ts";
import axios from "axios";
import RecipeCard from "./RecipeCard.tsx";

export default function App() {

    const [recipes, setRecipes] = useState<Recipe[]>()

    function getAllRecipes() {
        axios.get("api/recipes")
            .then(Response => setRecipes(Response.data))
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
              <div className={"window-pane top"}> Recipes & Recipes </div>

              <div className={"window-pane left"}>
                  Welcome
              </div>
              <div className={"window-pane right"}>
                  {
                      recipes.map(
                          (recipe:Recipe)=> <RecipeCard key={recipe.id} recipe={recipe}/>
                      )
                  }
              </div>
          </div>

      </>
  )
}

