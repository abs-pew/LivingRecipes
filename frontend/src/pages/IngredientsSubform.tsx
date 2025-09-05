import {useState} from "react";
import type {Ingredient} from "../Ingredient.ts";

export default function IngredientsSubform() {

    const [ingredients, setIngredients] = useState([{name: "", quantity:0, unit:"GRAM"}])

    const addIngredient = () => {
        /*
        ... is Spread operator: Line of code following means:
        Take all the current elements from the ingredients array.
        Spread (copy) them into a new array.
        Then add the new object { name: "", quantity: "", unit: "" } at the end.
        */
        setIngredients([...ingredients, {name: "", quantity:0, unit:"GRAM"}])
    }

    const removeIngredient = (index) => {
        /*
        We need to remove ingredient record with provided index parameter.
        Line of code following means:
            _ → The first parameter of .filter() is the current item, but we don’t use it,
                so we name it _ (a convention for “unused variable”).
            idx → The second parameter is the current item’s index in the array.
            idx !== index → Keep the ingredient only if its index is not equal to the one we want to remove.
         */
        setIngredients(ingredients.filter((_, idx) => index !== idx))
    }

    {/* Updates a specific field in a specific ingredient based in passed index and field */}
    const updateIngredients =
        (index, fieldName, value) => {
        const updatedIngredients = [...ingredients]
            updatedIngredients [index][fieldName] = value
            setIngredients(updatedIngredients)
    }

    return (
        <>
            <p><strong> Ingredients: </strong> </p>
            <table>
                <thead>
                <tr>
                    <th> Name</th>
                    <th> Quantity</th>
                    <th> Unit</th>
                    <th> Action</th>
                </tr>
                </thead>

                <tbody>
                {ingredients.map((ingredient, index) =>
                    (
                        <tr key={index}>
                            <td>
                                <input
                                placeholder={"Ingredient name ..."}
                                type={"text"}
                                value={ingredient.name}
                                onChange={(event) =>
                                updateIngredients(index, "name", event.target.value)}/>
                            </td>
                            <td>
                                <input
                                    placeholder={"Ingredient quantity ..."}
                                    type={"text"}
                                    value={ingredient.quantity}
                                    onChange={(event) =>
                                        updateIngredients(index, "quantity", event.target.value)}/>
                            </td>
                            <td>
                                <input
                                    placeholder={"Ingredient unit ..."}
                                    type={"text"}
                                    value={ingredient.unit}
                                    onChange={(event) =>
                                        updateIngredients(index, "unit", event.target.value)}/>
                            </td>
                            <td>
                                <button
                                    type="button"
                                    onClick={() => removeIngredient(index)}
                                >
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button
                type="button"
                onClick={addIngredient}
            >
                + Add Ingredient
            </button>
        </>
    );
}
