
import type {Recipe} from "../Recipe.ts";
import RecipeCard from "./RecipeCard.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import SearchBar from "../pages/SearchBar.tsx";

export default function RecipeCatalog() {

    const [recipes, setRecipes] = useState<Recipe[]>()
    const [searchString, setSearchString] = useState<string>("")


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

    const filteredRecipes: Recipe[] = recipes
        .filter(recipe =>
            (recipe.title.toLowerCase().includes(searchString.toLowerCase()) ||
                recipe.recipeText.toLowerCase().includes(searchString.toLowerCase()))
        )

    return (
        <>
            <SearchBar searchString={searchString} setSearchString={setSearchString}/>

            {
                filteredRecipes.length === 0
                    ? <p> No matching recipes found for {searchString}.</p>
                    : filteredRecipes.map(
                        (recipe: Recipe) => <RecipeCard key={recipe.id} recipe={recipe}/>
                    )
            }
        </>
    );
}

