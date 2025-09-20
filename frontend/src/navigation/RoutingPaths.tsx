import {Route, Routes} from "react-router-dom";
import Home from "../pages/Home.tsx";
import RecipeCatalog from "../components/RecipeCatalog.tsx";
import EditRecipe from "../components/EditRecipe.tsx";
import RecipeForm from "../pages/RecipeForm.tsx";
import type {Recipe} from "../Recipe.ts";

type Props = {
    recipes : Recipe[]
    getAllRecipes: () => void
}
export default function RoutingPaths(props:Readonly<Props>) {

    return (
        <>
            <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/recipes"} element={<RecipeCatalog
                                                    recipes={props.recipes}
                                                    getAllRecipes={props.getAllRecipes}/>}
                />
                <Route path={"/new_recipe"} element={<RecipeForm
                                                    getAllRecipes={props.getAllRecipes}/>}
                />
                <Route path={"/edit/:id"} element={<EditRecipe
                                                    getAllRecipes={props.getAllRecipes}/>}
                />
            </Routes>
        </>
    );
}