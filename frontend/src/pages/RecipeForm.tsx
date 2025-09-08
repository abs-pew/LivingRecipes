import {type FormEvent, useState} from "react";
import * as React from "react";
import IngredientsSubform from "./IngredientsSubform.tsx";
import type {Ingredient} from "../Ingredient.ts";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

type Props = {
    setTitle:(title:string) => void
    setCookingTime:(cookingTime:number|string) => void
    setImageUrl:(imageUrl:string) => void
    ingredients:Ingredient[]
    setIngredients:(ingredients:Ingredient[]) => void
    recipeText:string
    setRecipeText:(recipeText:string) => void
    sendDataToDatabase:() => void
}

export default function RecipeForm(props:Readonly<Props>) {


    const [imagePreview, setImagePreview] = useState<string|null>(null)

    function handleSubmit(event:FormEvent<HTMLFormElement>) {
        event.preventDefault()
        props.sendDataToDatabase()
    }

    function handleImageFile(event: React.ChangeEvent<HTMLInputElement>) {
        const imageFile = event.target.files[0]
        if (imageFile)
        {
            props.setImageUrl(imageFile.name)
            setImagePreview(URL.createObjectURL(imageFile))
        } else
        {
            /* this will remove the preview if it is cancelled */
            props.setImageUrl("")
            setImagePreview(null)
        }
    }

    return (
       <>
           <form onSubmit={handleSubmit}>
               <label >
                   <p><strong> Title: </strong>
                       <input
                           onChange={event => props.setTitle(event.target.value)}
                           placeholder={"Enter recipe title ..."}
                           required={true}/>
                   </p>
               </label>

               <label>
                   <p><strong> Cooking Time: </strong>
                       <input
                           onChange={event => props.setCookingTime(event.target.value)}
                           placeholder={"Est. cooking/backing time ..."}
                           type={"number"}
                           required={true}/>
                   </p>
               </label>

               <IngredientsSubform ingredients={props.ingredients} setIngredients={props.setIngredients}/>
               <p></p>

               <div style={{ marginBottom: "12px", marginTop: "12px" }}>
                   <p><label> <strong> Recipe Instructions: </strong> </label></p>
                   <CKEditor
                       editor={ClassicEditor}
                       config={{
                           placeholder: "Type your recipe instructions here ..." }}
                       data={props.recipeText}
                       onChange={(event, editor) => {
                           const data = editor.getData();
                           props.setRecipeText(data);
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
                       Save Recipe
                   </button>
               </div>

           </form>
       </>
    );
}
