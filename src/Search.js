import React from 'react'
import { useGlovalContext } from './context';

const Search = () => {
    const {query, setQuery, isError} = useGlovalContext();

    return(
        <section className='search-section'>
            <h2>Search your favourite Movie</h2>
            <form action="#" onSubmit={(e) => e.preventDefault()}>
                <div>
                    <input type="text" placeholder='Search Here' value={query} onChange={(e)=>setQuery(e.target.value)} />
                </div>
            </form>
            <div className='card-error'>
                <p>{isError.show && isError.msg}</p>
            </div>
        </section>
    );
}

export default Search;