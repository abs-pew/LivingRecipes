import type {Ingredient} from "../Ingredient.ts";
import ShowAsDropdownList from "../components/ShowAsDropdownList.tsx";
import {UnitsList} from "../UnitsList.ts";

type Props = {
    ingredients: Ingredient[]
    setIngredients: (ingredients:Ingredient[]) => void
}
export default function IngredientsSubform(props:Readonly<Props>) {


    const addIngredient = () => {
        /*
        ... is Spread operator: Line of code following means:
        Take all the current elements from the ingredients array.
        Spread (copy) them into a new array.
        Then add the new object { name: "", quantity: "", unit: "" } at the end.
        */
        props.setIngredients([...props.ingredients, {name: "", quantity:1, unit:UnitsList.GRAM}])
    }

    const removeIngredient = (index:number) => {
        /*
        We need to remove ingredient record with provided index parameter.
        Line of code following means:
            _ → The first parameter of .filter() is the current item, but we don’t use it,
                so we name it _ (a convention for “unused variable”).
            idx → The second parameter is the current item’s index in the array.
            idx !== index → Keep the ingredient only if its index is not equal to the one we want to remove.
         */
        props.setIngredients(props.ingredients.filter((_, idx) => index !== idx))
    }

    {/* Updates a specific field in a specific ingredient based on passed index and field */}
    const updateIngredients =
        (index:number, fieldName:string, value:string|number) => {
        const updatedIngredients:Ingredient[] = [...props.ingredients]
            updatedIngredients [index][fieldName] = value
            props.setIngredients(updatedIngredients)
    }

    return (
        <>
            <strong> Ingredients: </strong>
            <table className={"ingredients-table"}>
                <thead>
                <tr>
                    <th> Name</th>
                    <th> Quantity</th>
                    <th> Unit</th>
                    <th hidden={(props.ingredients.length === 1)}> Action</th>
                </tr>
                </thead>

                <tbody>
                {props.ingredients.map((ingredient:Ingredient, index:number) =>
                    (
                        <tr key={index}>
                            <td>
                                <input
                                placeholder={"Ingredient name ..."}
                                required={true}
                                type={"text"}
                                value={ingredient.name}
                                onChange={(event) =>
                                updateIngredients(index, "name", event.target.value)}/>
                            </td>
                            <td>
                                <input
                                    placeholder={"Ingredient quantity ..."}
                                    required={true}
                                    type={"number"}
                                    value={ingredient.quantity}

                                    onChange={(e) => {
                                        const value = Number(e.target.value);
                                        if (value >= 1 || e.target.value === "") {
                                            updateIngredients(index, "quantity", value)
                                        }
                                    }}
                                    />
                            </td>
                            <td>
                                <ShowAsDropdownList
                                    enumValues={Object.values(UnitsList)}
                                    value={ingredient.unit}
                                    onChange={(newValue:UnitsList) =>
                                        updateIngredients(index, "unit", newValue)}
                                />

                            </td>
                            <td>
                                <button
                                    hidden={(props.ingredients.length === 1)}
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
                style={{
                    margin: "10px",         // all sides
                    marginLeft: "50px",     // specific side
                    padding: "6px 12px",
                    backgroundColor: "#3498db",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                }}
                type="button"
                onClick={addIngredient}
            >
                Next Ingredient
            </button>
        </>
    );
}
