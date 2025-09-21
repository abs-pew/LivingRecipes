type Props = {
    searchString: string
    setSearchString: (searchString: string) => void
    recipeCount: number
}

export default function SearchBar(props:Readonly<Props>) {

    return(
        <div className={"search-bar"}>
            <button
                style={{color: "GrayText", marginRight: "5px", padding: "6px", display: "inline-block"}}
                type={"button"}
                onClick={
                    () => ""
                }
            >
                {props.recipeCount}
            </button>

            <input
                style={{width: "430px", padding: "6px", display: "inline-block"}}
                placeholder={"Search for recipes here ... "}
                value={props.searchString}
                onChange={(event =>
                    props.setSearchString(event.target.value))}
            />

            <button
                style={{marginLeft: "5px", padding: "6px", display: "inline-block"}}
                type={"button"}
                onClick={
                    () => props.setSearchString("")
                }
            >
                Clear Search
            </button>
        </div>
        )


}