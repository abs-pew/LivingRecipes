import type {Recipe} from "../Recipe.ts";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useState} from "react";
import DisplayIngredients from "../pages/DisplayIngredients.tsx";
import "./recipe-index.css"
import type {Ingredient} from "../Ingredient.ts";
import {UnitsList} from "../UnitsList.ts";
import {YesNoConfirmationDialog} from "../pages/YesNoConfirmationDialog.tsx";

type Props = {
    recipe: Recipe
    getAllRecipes: () => void
}

export default function RecipeCard(props: Readonly<Props>) {

    const routTo = useNavigate()
    const [isRecipeOpen, setIsRecipeOpen] = useState<boolean>(false)
    const [isIngrOpen, setIsIngrOpen] = useState<boolean>(true)
    const [adjustedIngredients, setAdjustedIngredients]
        = useState<Ingredient[]>([{name: "", quantity:0, unit:UnitsList.GRAM}])
    const [portionFlag, setPortionFlag] = useState<boolean>(false)
    const givenPortionSize : number = 6  /* NOTE: this should be added a field to capture portion size */
    const [newPortionSize, setNewPortionSize] = useState<number>(givenPortionSize)
    const [confirmationPrompt, setConfirmationPrompt] = useState<boolean>(false)

    function handleRecipeEdit(){
        routTo(`/edit/${props.recipe.id}`)
    }

    function handleRecipeDelete(){
        axios.delete("../api/recipes/" + props.recipe.id)
            .then(() => {
                props.getAllRecipes()
            })
            .catch((error) => console.log("Function: handleRecipeDelete. ERROR: " + error))
            .then(() => console.log("Recipe successfully deleted."))
            .then(() => routTo("/recipes"))
    }

    function adjustIngredientsTo(factor:number ) {
        const singlePortionIngredients : Ingredient[]  =
            props.recipe.ingredients
                .map((ingr) =>
                    ({
                        ...ingr,
                        quantity: ingr.quantity / givenPortionSize
                    })
                )

        const adjusted : Ingredient[]  =
            singlePortionIngredients
                .map((ingr) =>
                    ({
                        ...ingr,
                        quantity: (ingr.quantity * factor).toFixed(1)
                    })
                )
        setAdjustedIngredients(adjusted)
        setPortionFlag(true)
        console.log(adjusted)
    }

    return (
        <div className={"recipe-card"}>
            <div className={"recipe-header"}>
                <div className={"recipe-info"}>
                    <h2> {props.recipe.title} </h2>
                    <p><strong>Cooking Time: </strong> {props.recipe.cookingTime} minutes</p>
                    <p><strong>Category: </strong> {props.recipe.category} </p>
                    <p><strong>Portion size for: </strong>  {newPortionSize} persons</p>
                    <div
                        onClick={() => setIsIngrOpen(!isIngrOpen)}
                        onKeyDown={() => setIsIngrOpen(!isIngrOpen)}
                        style={{
                            backgroundColor: "#FFFFFF",
                            padding: "0px",
                            marginTop: "5px",
                            cursor: "pointer",
                            fontWeight: "bold"
                        }}
                    >
                        {isIngrOpen ? "▼" : "▶"} Ingredients

                        {isIngrOpen && (
                            <div  style={{color:"#678293"}}>
                                { portionFlag ?
                                 <DisplayIngredients ingredients={adjustedIngredients}/>
                            :
                                <DisplayIngredients ingredients={props.recipe.ingredients}/>
                            }
                            </div>
                        )}
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", padding: "6px", margin: "10px", alignSelf:"center"}}>
                        <button
                            style={{margin:"3px"}}
                            type="button"
                            disabled={(newPortionSize === 3 * givenPortionSize)}
                            hidden={!isIngrOpen}
                            onClick={() => {
                                setNewPortionSize(newPortionSize + 2)
                                adjustIngredientsTo(newPortionSize + 2)
                            }}
                        >
                             +2  ⬆️
                        </button>

                        <button
                            style={{margin:"3px"}}
                            hidden={!isIngrOpen}
                            disabled={newPortionSize === givenPortionSize}
                            type="button"
                            onClick={() => {
                                setNewPortionSize(givenPortionSize)
                                adjustIngredientsTo(givenPortionSize)
                                setPortionFlag(true)
                            }}
                        >
                            Reset 🔄
                        </button>

                        <button
                            style={{margin:"3px"}}
                            hidden={!isIngrOpen}
                            disabled={(newPortionSize === givenPortionSize/3)}
                            type="button"
                            onClick={() => {
                                setNewPortionSize(newPortionSize - 2)
                                adjustIngredientsTo(newPortionSize - 2)
                            }}
                        >
                          -2  ⬇️
                        </button>

                    </div>
                </div>

                <div className={"recipe-media"}>
                    <img src={props.recipe.image} alt={props.recipe.title}/>
                    <div className={"buttons"}>
                        <button
                            type="button"
                            onClick={handleRecipeEdit}
                        >
                            Edit Recipe
                        </button>

                        <button
                            type="button"
                            onClick={() => setConfirmationPrompt(true)}

                        >
                            Delete Recipe
                        </button>
                        {confirmationPrompt &&
                            <YesNoConfirmationDialog
                                setConfirmationPrompt={setConfirmationPrompt}
                                actionHandle={handleRecipeDelete}
                                messagePrompt={"Are you sure you want to delete this recipe?"}
                            />}
                    </div>
                </div>

            </div>

            <div
                onClick={() => setIsRecipeOpen(!isRecipeOpen)}
                onKeyDown={() => setIsRecipeOpen(!isRecipeOpen)}
                style={{
                    backgroundColor: "#FFFFFF",
                    padding: "5px",
                    cursor: "pointer",
                    fontWeight: "bold"
                }}
            >
                {isRecipeOpen ? "▼" : "▶"} Recipe Instructions
            </div>

            {isRecipeOpen && (<div style= {{
                    backgroundColor: "#FFFFFF",
                    color:"#678293",
                    padding: "8px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    marginLeft: "20px"
                }}>
                <div dangerouslySetInnerHTML={{ __html: props.recipe.recipeText }}/> </div>
            )}

        </div>
)
}
