import RecipeForm from "../pages/RecipeForm.tsx";
import {useState} from "react";
import axios from "axios";
import type {RecipeDto} from "../RecipeDto.ts";
import {useNavigate} from "react-router-dom";

export default function AddNewRecipe() {

    const [title, setTitle] = useState<string>("")
    const [cookingTime, setCookingTime] = useState<number>(0)

    const routeTo = useNavigate()

    function sendDataToDatabase(){
        const recipeDto: RecipeDto = {
            title,
            cookingTime,
            ingredients: [
                { name: "Chicken", quantity: 1000, unit: "GRAM" },
                { name: "butter", quantity: 100, unit: "GRAM" },
                { name: "salt", quantity: 10, unit: "GRAM" }
            ],
            recipeText: "put all ingredients together in a pot and bake them well",
            image: "/images/lentil_soup.jpg"
        };

        axios.post("api/recipes", recipeDto)
            .catch((error) => console.log("Function: sendToDatabase. ERROR: " + error))
        alert("Recipe is successfully saved.")
        routeTo("/recipes")
    }

    return (
        <>
            <RecipeForm
                setTitle={setTitle}
                setCookingTime={setCookingTime}
                sendDataToDatabase={sendDataToDatabase}
            />


        </>
    )
}