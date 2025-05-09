import "./SearchBar.css"
function SearchBar({value, onChange}) {
    return(
        <div className="search-bar-container">
            <input
                type="text"
                placeholder="Поиск по таблице..."
                value = {value}
                className="search-bar"
                onChange = {(e) => onChange(e.target.value)}
             />
        </div>
    )
}

export default SearchBar;