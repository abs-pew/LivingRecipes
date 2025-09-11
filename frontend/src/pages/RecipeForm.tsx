import {type FormEvent, useEffect, useState} from "react";
import * as React from "react";
import IngredientsSubform from "./IngredientsSubform.tsx";
import type {Ingredient} from "../Ingredient.ts";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import type {Recipe} from "../Recipe.ts";
import {UnitsList} from "../UnitsList.ts";
import {useNavigate} from "react-router-dom";
import type {RecipeDto} from "../RecipeDto.ts";
import axios from "axios";

type Props = {
    recipe?:Recipe
    isEditMode?:boolean
}

export default function RecipeForm(props:Readonly<Props>) {

    const [title, setTitle] = useState<string>("")
    const [cookingTime, setCookingTime] = useState<number>(0)
    const [imageUrl, setImageUrl] = useState<string>("")
    const [ingredients, setIngredients] = useState<Ingredient[]>([{name: "", quantity:0, unit:UnitsList.GRAM}])
    const [recipeText, setRecipeText] = useState<string>("")

    const routeTo = useNavigate()

    const [imagePreview, setImagePreview] = useState<string|null>(null)

    // Load existing recipe into state if in edit mode
    useEffect(() => {
        if (props.isEditMode && props.recipe) {
            setTitle(props.recipe.title)
            setCookingTime(props.recipe.cookingTime)
            setIngredients(props.recipe.ingredients)
            setRecipeText(props.recipe.recipeText)
            if (props.recipe.image) {
                setImageUrl(props.recipe.image)
                setImagePreview(props.recipe.image) // existing image URL
            }
        }
    }, [props.isEditMode, props.recipe])


    function sendDataToDatabase(){
        const recipeDto: RecipeDto = {
            title: title,
            cookingTime: cookingTime,
            ingredients: ingredients,
            recipeText: recipeText,
            image: "/images/" + imageUrl
        }

        if (props.isEditMode && props.recipe) {
            console.log(props.recipe.id)
            axios.put(`../api/recipes/${props.recipe.id}`, recipeDto, {
                headers: { "Content-Type": "application/json" }})
                .then(()=>console.log("Recipe updated successfully."))
                .catch((error) => console.log("Function: sendToDatabase. ERROR: " + error))
            alert("Recipe updated successfully.")
        } else
        {
            axios.post("api/recipes", recipeDto)
                .then(()=>console.log("New recipe has been successfully added."))
                .then(()=>alert(recipeDto.image))
                .catch((error) => console.log("Function: sendToDatabase. ERROR: " + error))
            alert("Recipe is successfully saved.")
        }
        routeTo("/recipes")
    }


    function handleSubmit(event:FormEvent<HTMLFormElement>) {
        event.preventDefault()
        sendDataToDatabase()
    }

    function handleImageFile(event: React.ChangeEvent<HTMLInputElement>) {
        const imageFile = event.target.files[0]
        if (imageFile)
        {
            setImageUrl(imageFile.name)
            setImagePreview(URL.createObjectURL(imageFile))
        } else
        {
            /* this will remove the preview if it is cancelled */
            setImageUrl("")
            setImagePreview(null)
        }
    }

    return (
       <>
           <form onSubmit={handleSubmit}>
               <label >
                   <p><strong> Title: </strong>
                       <input
                           placeholder={"Enter recipe title ..."}
                           required={true}
                           value={title}
                           onChange={event => setTitle((event.target.value))}
                         />
                   </p>
               </label>

               <label>
                   <p><strong> Cooking Time: </strong>
                       <input
                           placeholder={"Est. cooking/backing time ..."}
                           required={true}
                           value={cookingTime}
                           type={"number"}
                           onChange={event => setCookingTime(event.target.value)}
                       />
                   </p>
               </label>

               <IngredientsSubform ingredients={ingredients}
                                   setIngredients={setIngredients}
                                   recipe={props.recipe}
                                   isEditMode={props.isEditMode}/>
               <p></p>

               <div style={{ marginBottom: "12px", marginTop: "12px" }}>
                   <p><label> <strong> Recipe Instructions: </strong> </label></p>
                   <CKEditor
                       required={true}
                       editor={ClassicEditor}
                       data={recipeText}
                       config={{
                           placeholder: "Type your recipe instructions here ..."}}
                       onChange={(event, editor) => {
                           const data = editor.getData();
                           setRecipeText(data);
                       }}
                   />
               </div>

               <label>
                   <p><strong> Image : </strong>
                       <input
                           onChange={handleImageFile}
                           accept={"image/*"}
                           type={"file"}
                           />
                   </p>
               </label>
               {imagePreview && (
                   <p><img src={imagePreview} alt="Selected" width={"200px"} height={"200px"}/></p>
               )}

               <div style={{ display: "flex", justifyContent: "flex-end" }}>
                   <button
                       style={{
                           margin: "10px",         // all sides
                           marginLeft: "50px",     // specific side
                           padding: "6px 12px",
                           backgroundColor: "#3498db",
                           color: "#fff",
                           border: "none",
                           borderRadius: "4px",
                           cursor: "pointer",
                           fontSize: "15px"
                       }}
                   >
                       {props.isEditMode ? "Update Recipe" : "Save Recipe"}
                   </button>
               </div>

           </form>
       </>
    );
}
