import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import GifItem from '../GifItem/GifItem';

function Search() {
    const dispatch = useDispatch();
    const [searchInput, setSearchInput] = useState('');
    const gifList = useSelector(store => store.gifList);

    const onSearch = (evt) => {
        evt.preventDefault();

        dispatch({
            type: 'SEARCH_FOR_GIFS',
            payload: searchInput
        });
    }

    return (
        <>
            <h1>Find a GIF 🔍</h1>

            <form onSubmit={onSearch}>
                <input 
                    type="text" 
                    value={searchInput}
                    onChange={evt => setSearchInput(evt.target.value)}
                />
                <input type="submit" value="Find that gif 👁️" />
            </form>

            <h2>Results</h2>
            <ul>
                {gifList.map(item => (
                    <GifItem
                        key={item.image_url}
                        gif={item}
                    />
                ))}
            </ul>
        </>
    )
}

export default Search;