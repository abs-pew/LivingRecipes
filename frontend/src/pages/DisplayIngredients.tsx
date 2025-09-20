import type {Ingredient} from "../Ingredient.ts";
import {UnitsLabels, UnitsList} from "../UnitsList.ts";

type Props = {
    ingredients: Ingredient[]
}
export default function DisplayIngredients(props:Readonly<Props>) {

    return (
        <>
            <table className={"ingredients-table"}>
                <thead>
                <tr>
                    <th style={{ textAlign:"center", borderBottom: "2px solid black", padding: "6px" }}> Name</th>
                    <th style={{ textAlign:"center", borderBottom: "2px solid black", padding: "6px" }}> Qty</th>
                    <th style={{ textAlign:"center", borderBottom: "2px solid black", padding: "6px" }}> Unit</th>
                </tr>
                </thead>

                <tbody style={{fontWeight:"normal"}}>
                {props.ingredients.map((ingredient:Ingredient, index:number) =>
                    (
                        <tr key={index}>
                            <td style={{textAlign:"center", padding: "2px"}}>
                                {ingredient.name}
                            </td>
                            <td style={{textAlign:"center", padding: "2px"}}>
                                {ingredient.quantity}
                            </td>
                            <td style={{textAlign:"center", padding: "2px"}}>
                                {UnitsLabels[ingredient.unit as UnitsList]}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </>
    );
}
