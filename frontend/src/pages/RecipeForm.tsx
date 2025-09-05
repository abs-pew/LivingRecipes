import type {FormEvent} from "react";

type Props = {
    setTitle:(title:string) => void
    setCookingTime:(cookingTime:number) => void
    sendDataToDatabase:() => void
}

export default function RecipeForm(props:Readonly<Props>) {

    function handleSubmit(event:FormEvent<HTMLFormElement>) {
        event.preventDefault()
        props.sendDataToDatabase()
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
                           placeholder={"Enter recipe title ..."}
                           type={"number"}
                           required={true}/>
                   </p>
               </label>

               <button type={"submit"}> Save Recipe </button>

           </form>
       </>
    );
}
