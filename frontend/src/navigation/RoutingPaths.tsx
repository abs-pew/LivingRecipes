import {Route, Routes} from "react-router-dom";
import Home from "../pages/Home.tsx";
import RecipeCatalog from "../components/RecipeCatalog.tsx";
import EditRecipe from "../components/EditRecipe.tsx";
import RecipeForm from "../pages/RecipeForm.tsx";

export default function RoutingPaths() {

    return (
        <>
            <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/recipes"} element={<RecipeCatalog/>}/>
                <Route path={"/new_recipe"} element={<RecipeForm/>}/>
                <Route path={"/edit/:id"} element={<EditRecipe/>}/>
            </Routes>
        </>
    );
}