import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function FavoriteItem({ gif }) {
    const dispatch = useDispatch();
    const categoryList = useSelector(store => store.categoryList);

    const onSetCategory = (evt) => {
        const category = Number(evt.target.value);

        dispatch({
            type: 'SET_CATEGORY',
            payload: {
                favoriteId: gif.id,
                categoryId: category
            }
        });
    }

    return (
        <li>
            <img src={gif.image_url} />
            <select 
                onChange={onSetCategory}
                value=""
            >
                <option value="" disabled>Select a category</option>
                {categoryList.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
            </select>
        </li>
    )
}

export default FavoriteItem;