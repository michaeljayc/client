import React, {useState, useEffect} from 'react'

const SearchBar = () =>  {

    const [keyword, setKeyword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(keyword)
    }

    const handleOnChange = (event) => {
        setKeyword(event.target.value);
    }

    useEffect( () => {

    }, [])

    return (
        <form className="d-flex" onSubmit={handleSubmit}>
            <input className="form-control me-2" type="search" 
                placeholder="Search" 
                aria-label="Search" 
                name='keyword'
                value={keyword}
                onChange={handleOnChange}/>
            <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
    );
};

export default SearchBar