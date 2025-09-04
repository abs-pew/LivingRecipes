import {Route, Routes} from "react-router-dom";
import Home from "../pages/Home.tsx";
import RecipeCatalog from "../components/RecipeCatalog.tsx";
import type {Recipe} from "../Recipe.ts";
import AddNewRecipe from "../components/AddNewRecipe.tsx";

type Props = {
    recipes: Recipe[]
}

export default function RoutingPaths(props : Readonly<Props>) {
    return (
        <>
            <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/recipes"} element={<RecipeCatalog recipes={props.recipes}/>}/>
                <Route path={"/new_recipe"} element={<AddNewRecipe/>}/>
            </Routes>
        </>
    );
}