
import {useNavigate, useParams} from "react-router-dom";

export default function EditRecipe() {

    const { id } = useParams();

    const routeTo = useNavigate()

    return (
        <>
            {alert(id)}

        </>
    )
}