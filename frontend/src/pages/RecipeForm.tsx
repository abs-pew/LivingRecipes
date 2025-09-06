import {type FormEvent, useState} from "react";
import * as React from "react";
import IngredientsSubform from "./IngredientsSubform.tsx";
import type {Ingredient} from "../Ingredient.ts";

type Props = {
    setTitle:(title:string) => void
    setCookingTime:(cookingTime:number) => void
    setImageUrl: (imageUrl:string) => void
    ingredients: Ingredient[]
    setIngredients: (ingredients:Ingredient[]) => void
    sendDataToDatabase:() => void
}

export default function RecipeForm(props:Readonly<Props>) {


    const [imagePreview, setImagePreview] = useState(null)

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

               <button type={"submit"}> Save Recipe </button>

           </form>
       </>
    );
}
