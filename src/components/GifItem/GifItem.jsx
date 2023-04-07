import { useDispatch } from "react-redux";

function GifItem({ gif }) {
    const dispatch = useDispatch();

    const onFavorite = () => {
        // need to get this to the server, so use a saga
        dispatch({
            type: 'CREATE_FAVORITE',
            payload: gif
        });
    }

    return (
        <li>
            <img src={gif.image_url} />
            <button onClick={onFavorite}>❤️‍🔥</button>
        </li>
    )
}

export default GifItem;