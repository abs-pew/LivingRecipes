import {Link} from "react-router-dom";

export default function NavigationLinks() {

    return(
        <>
            <p><Link to={"/"}> Home </Link></p>
            <p><Link to={"/recipes"}> All Recipes </Link></p>
            <p><Link to={"/new_recipe"}> Add New Recipe </Link></p>
        </>
    )
}