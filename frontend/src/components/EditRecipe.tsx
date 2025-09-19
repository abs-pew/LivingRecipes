
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import RecipeForm from "../pages/RecipeForm.tsx";
import type {Recipe} from "../Recipe.ts";

type Props = {
    getAllRecipes: () => void
}
export default function EditRecipe(props:Readonly<Props>) {

    const { id } = useParams()
    const [recipe, setRecipe] = useState<Recipe|null>(null)
    const isEditMode:boolean = true

    function getRecipeById() {
        axios.get(`/api/recipes/${id}`)
            .then(response => setRecipe(response.data))
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

    return (
        <>
            <RecipeForm
                recipe={recipe}
                isEditMode={isEditMode}
                getAllRecipes={props.getAllRecipes}
            />
        </>
    )
}