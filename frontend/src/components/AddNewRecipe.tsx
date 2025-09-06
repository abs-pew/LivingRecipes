import RecipeForm from "../pages/RecipeForm.tsx";
import {useState} from "react";
import axios from "axios";
import type {RecipeDto} from "../RecipeDto.ts";
import {useNavigate} from "react-router-dom";
import type {Ingredient} from "../Ingredient.ts";

export default function AddNewRecipe() {

    const [title, setTitle] = useState<string>("")
    const [cookingTime, setCookingTime] = useState<number>(0)
    const [imageUrl, setImageUrl] = useState<string>("")
    const [ingredients, setIngredients] = useState<Ingredient[]>([{name: "", quantity:0, unit:"GRAM"}])
    const [recipeText, setRecipeText] = useState<string>("")

    const routeTo = useNavigate()

    function sendDataToDatabase(){
        const recipeDto: RecipeDto = {
            title: title,
            cookingTime: cookingTime,
            ingredients: ingredients,
            recipeText: recipeText,
            image: "/images/" + imageUrl
        }

        axios.post("api/recipes", recipeDto)
            .then(()=>alert(recipeDto.image))
            .catch((error) => console.log("Function: sendToDatabase. ERROR: " + error))
        alert("Recipe is successfully saved.")
        routeTo("/recipes")
    }

    return (
        <>
            <RecipeForm
                setTitle={setTitle}
                setCookingTime={setCookingTime}
                setImageUrl={setImageUrl}
                ingredients={ingredients}
                setIngredients={setIngredients}
                recipeText={recipeText}
                setRecipeText={setRecipeText}
                sendDataToDatabase={sendDataToDatabase}
            />
        </>
    )
}