import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FavoriteItem from "../FavoriteItem/FavoriteItem";

function Favorites() {
    const dispatch = useDispatch();
    const gifList = useSelector(store => store.gifList);

    useEffect(() => {
        dispatch({
            type: 'FETCH_FAVORITES'
        });
        dispatch({
            type: 'FETCH_CATEGORIES'
        });
    }, []);

    return (
        <>
            <h1>Your Favs ❤️‍🔥</h1>
            <ul>
                {gifList.map(gif => (
                    <FavoriteItem gif={gif} key={gif.id} />
                ))}
            </ul>
        </>
    )
}

export default Favorites;