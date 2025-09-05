
import type {Recipe} from "../Recipe.ts";
import RecipeCard from "./RecipeCard.tsx";
import {useEffect, useState} from "react";
import axios from "axios";

export default function RecipeCatalog() {

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
            {
                recipes.map(
                    (recipe:Recipe)=> <RecipeCard key={recipe.id} recipe={recipe}/>
                )
            }
        </>
    );
}

