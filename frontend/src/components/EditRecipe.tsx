
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import type {Ingredient} from "../Ingredient.ts";
import {UnitsList} from "../UnitsList.ts";
import type {RecipeDto} from "../RecipeDto.ts";
import axios from "axios";
import RecipeForm from "../pages/RecipeForm.tsx";
import type {Recipe} from "../Recipe.ts";

export default function EditRecipe() {

    const { id } = useParams()

    const [recipe, setRecipe] = useState<Recipe|null>(null)

    const [title, setTitle] = useState<string>("")
    const [cookingTime, setCookingTime] = useState<number>(0)
    const [imageUrl, setImageUrl] = useState<string>("")
    const [ingredients, setIngredients] = useState<Ingredient[]>([{name: "", quantity:0, unit:UnitsList.GRAM}])
    const [recipeText, setRecipeText] = useState<string>("")

    const routeTo = useNavigate()

    function getRecipeById() {
        axios.get(`/api/recipes/${id}`)
            .then(response => {
                console.log("API Response:", response.data); // see actual shape
                setRecipe(response.data);
                alert(response.data.title); // ✅ alert inside .then
            })
            .catch((error) => console.log("Function: getRecipeById. ERROR: " + error))
    }

    useEffect(() => {
        console.log(id);
        getRecipeById()
    }, [id]);

    if (!recipe)
    {
        return "loading recipe ... "

    }

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
            {recipe ? <h1>{recipe.title}</h1> : <p>Loading...</p>}
        </>
    )
}