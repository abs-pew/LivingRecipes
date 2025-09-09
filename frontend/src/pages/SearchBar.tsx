type Props = {
    searchString: string
    setSearchString: (searchString: string) => void
}

export default function SearchBar(props:Readonly<Props>) {

    return(
        <div className={"search-bar"}>
            <input
                style={{width: "87%", padding: "6px", display: "inline-block"}}
                placeholder={"Search for recipes here ..."}
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