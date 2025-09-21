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
import {YesNoConfirmationDialog} from "./YesNoConfirmationDialog.tsx";

type Props = {
    recipe?:Recipe
    isEditMode?:boolean
    getAllRecipes: () => void
}

export default function RecipeForm(props:Readonly<Props>) {

    const [title, setTitle] = useState<string>("")
    const [cookingTime, setCookingTime] = useState<number>(15)
    const [imageUrl, setImageUrl] = useState<string>("")
    const [ingredients, setIngredients] = useState<Ingredient[]>([{name: "", quantity:1, unit:UnitsList.GRAM}])
    const [recipeText, setRecipeText] = useState<string>("")
    const [confirmationPrompt, setConfirmationPrompt] = useState<boolean>(false)

    const routeTo = useNavigate()

    const [imagePreview, setImagePreview] = useState<string|null>(null)

    // Load existing recipe into state if in edit mode
    useEffect(() => {
        if (props.isEditMode && props.recipe) {
            setTitle(props.recipe.title)
            setCookingTime(props.recipe.cookingTime)
            setIngredients(props.recipe.ingredients)
            setRecipeText(props.recipe.recipeText)
            setImageUrl(props.recipe.image)
            if (props.recipe.image) {
                setImagePreview("/" + imageUrl)
            }
        }
    }, [props.isEditMode, props.recipe])

    function handleCancelAction() {
        routeTo("/recipes")
    }


    function sendDataToDatabase(){
        const recipeDto: RecipeDto = {
            title: title,
            cookingTime: cookingTime,
            ingredients: ingredients,
            recipeText: recipeText,
            image: imageUrl
        }

        if (props.isEditMode && props.recipe) {
            console.log(props.recipe.id)
            axios.put(`../api/recipes/${props.recipe.id}`, recipeDto, {
                headers: { "Content-Type": "application/json" }})
                .then(()=>console.log("Recipe updated successfully."))
                .then(() => props.getAllRecipes())
                .catch((error) => console.log("Function: sendToDatabase. ERROR: " + error))
        } else
        {
            axios.post("api/recipes", recipeDto)
                .then(()=>console.log("New recipe has been successfully added."))
                .then(() => props.getAllRecipes())
                .catch((error) => console.log("Function: sendToDatabase. ERROR: " + error))
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
                   <p><strong> Cooking Time (minutes): </strong>
                       <input
                           placeholder={"Est. cooking/backing time ..."}
                           required={true}
                           value={cookingTime}
                           type={"number"}
                           onChange={(e) => {
                               const value = Number(e.target.value);
                               if (value >= 1 || e.target.value === "") {
                                   setCookingTime(value);
                               }
                           }}
                       />
                   </p>
               </label>

               <IngredientsSubform ingredients={ingredients}
                                   setIngredients={setIngredients}
               />
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

               <div>
                   <label>
                       Image:
                   </label>
                   {/* Hidden file input */}
                   <input
                       type="file"
                       id="fileUpload"
                       style={{ display: "none" }}
                       accept={"image/*"}
                       onChange={handleImageFile}
                   />

                   {/* Custom styled label acts as button */}

                       <label
                           htmlFor="fileUpload"
                           style={{backgroundColor: "whitesmoke", color: "darkslateblue",  fontSize: "16px", fontFamily: "serif", cursor: "pointer", marginLeft: "5px",  marginRight: "5px", padding: "6px", display: "inline-block"}}
                       >
                           Browse File
                       </label>
               </div>

               {(imagePreview &&
                   <p><img src={imagePreview} alt="No uploaded image" width={"150px"} height={"150px"}/></p>
               )}

               <div style={{ display: "flex", justifyContent: "flex-end" }}>
                   <button
                       style={{
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
                   <button
                       style={{
                           padding: "6px 12px",
                           backgroundColor: "#3498db",
                           color: "#fff",
                           border: "none",
                           borderRadius: "4px",
                           cursor: "pointer",
                           fontSize: "15px",
                           marginLeft: "4px"
                       }}
                       type="button"
                       onClick={() => setConfirmationPrompt(true)}
                   >
                       Cancel
                   </button>
                   {confirmationPrompt &&
                       <YesNoConfirmationDialog
                           setConfirmationPrompt={setConfirmationPrompt}
                           actionHandle={handleCancelAction}
                           messagePrompt={"All unsaved changes will be lost. Are you sure you to cancel?"}
                       />}

               </div>
           </form>
       </>
    );
}
