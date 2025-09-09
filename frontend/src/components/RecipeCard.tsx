
import type {Recipe} from "../Recipe.ts";
import {useNavigate} from "react-router-dom";

type Props = {
    recipe: Recipe
}

export default function RecipeCard(props: Readonly<Props>) {

    const routTo = useNavigate()

    function handleRecipeEdit(){
        routTo(`/edit/${props.recipe.id}`)
    }
    return (
        <div className={"recipe-card"}>
            <button
                style={{
                    margin: "10px",         // all sides
                    marginLeft: "50px",     // specific side
                    padding: "6px 12px",
                    backgroundColor: "#3498db",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                }}
                type="button"
                onClick={handleRecipeEdit}
            >
                Edit Recipe
            </button>

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
                <div><strong>Recipe Instructions: </strong>
                    <div dangerouslySetInnerHTML={{ __html: props.recipe.recipeText }} /> </div>
                <div><img src={props.recipe.image} alt={props.recipe.title} width={"200px"} height={"200px"}/></div>
        </div>
)
}
