
import type {Recipe} from "../Recipe.ts";

type Props = {
    recipe: Recipe
}

export default function RecipeCard(props: Readonly<Props>) {
    return (
        <div className={"recipe-card"}>
                <h2> {props.recipe.title} </h2>
                <div><strong>Cooking Time: </strong> {props.recipe.cookingTime} minutes</div>
                <div><strong>Category: </strong> {props.recipe.category} </div>
                <div><strong>Ingredients: </strong>
                        <ul>
                                {props.recipe.ingredients.map(ingredient =>
                                    <li key={ingredient.name}> {ingredient.name} - {ingredient.quantity} {ingredient.unit}</li>
                                )}
                        </ul>
                </div>
                <div><strong>Recipe: </strong> {props.recipe.recipeText} </div>
                <div><img src={props.recipe.image} alt={props.recipe.title} width={"200px"} height={"200px"}/></div>
        </div>
)
}
