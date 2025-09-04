
import type {Recipe} from "../Recipe.ts";
import RecipeCard from "./RecipeCard.tsx";

type Props = {
    recipes: Recipe[],
}
export default function RecipeCatalog(props:Props) {
    return (
        <>
            {
                props.recipes.map(
                    (recipe:Recipe)=> <RecipeCard key={recipe.id} recipe={recipe}/>
                )
            }
        </>
    );
}

