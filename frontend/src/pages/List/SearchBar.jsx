

function SearchBar({ searchText, handleChange }) {
    
    return (
        <div className="search-bar-container">
            <input className="search-bar" type="search" value={searchText} onChange={handleChange} placeholder="Search" />
        </div>
    )
}


export default SearchBar;