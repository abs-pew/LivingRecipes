import {Route, Routes} from "react-router-dom";
import Home from "../pages/Home.tsx";
import RecipeCatalog from "../components/RecipeCatalog.tsx";
import AddNewRecipe from "../components/AddNewRecipe.tsx";

export default function RoutingPaths() {
    return (
        <>
            <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/recipes"} element={<RecipeCatalog/>}/>
                <Route path={"/new_recipe"} element={<AddNewRecipe/>}/>
            </Routes>
        </>
    );
}