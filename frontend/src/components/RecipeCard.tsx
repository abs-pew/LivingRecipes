
import type {Recipe} from "../Recipe.ts";

type Props = {
    recipe: Recipe
}

export default function RecipeCard(props: Readonly<Props>) {
    return (
        <div className={"recipe-card"}>
            <h4> {props.recipe.title} </h4>
            <p><strong>Cooking Time: </strong> {props.recipe.cookingTime} minutes</p>
            <p><strong>Category: </strong> {props.recipe.category} </p>
            <p><strong>Ingredients: </strong>
            <ul>
                {props.recipe.ingredients.map(ingredient =>
                    <li> {ingredient.name} - {ingredient.quantity} {ingredient.unit}</li>
                )}
            </ul>
            </p>
            <p><strong>Recipe: </strong> {props.recipe.recipeText} </p>
            <p> <img src="/images/butter_chicken.jpeg" alt={props.recipe.title}/> </p>
</div>
)
}
