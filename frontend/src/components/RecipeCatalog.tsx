
import type {Recipe} from "../Recipe.ts";
import RecipeCard from "./RecipeCard.tsx";
import {useState} from "react";
import SearchBar from "../pages/SearchBar.tsx";

type Props = {
    recipes: Recipe[]
    getAllRecipes: () => void
}
export default function RecipeCatalog(props:Readonly<Props>) {

    const [searchString, setSearchString] = useState<string>("")

    if (!props.recipes)
    {
        return "loading recipes ..."
    }

    const filteredRecipes: Recipe[] = props.recipes
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
                        (recipe: Recipe) => <RecipeCard
                                                        key={recipe.id}
                                                        recipe={recipe}
                                                        getAllRecipes={props.getAllRecipes} />
                    )
            }
        </>
    );
}

