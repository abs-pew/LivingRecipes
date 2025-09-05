import RecipeForm from "../pages/RecipeForm.tsx";
import {useState} from "react";
import axios from "axios";
import type {RecipeDto} from "../RecipeDto.ts";
import {useNavigate} from "react-router-dom";

export default function AddNewRecipe() {

    const [title, setTitle] = useState<string>("")
    const [cookingTime, setCookingTime] = useState<number>(0)
    const [imageUrl, setImageUrl] = useState<string>("")

    const routeTo = useNavigate()

    function sendDataToDatabase(){
        const recipeDto: RecipeDto = {
            title: title,
            cookingTime: cookingTime,
            ingredients: [
                { name: "Chicken", quantity: 1000, unit: "GRAM" },
                { name: "butter", quantity: 100, unit: "GRAM" },
                { name: "salt", quantity: 10, unit: "GRAM" }
            ],
            recipeText: "put all ingredients together in a pot and bake them well",
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
                sendDataToDatabase={sendDataToDatabase}
            />


        </>
    )
}