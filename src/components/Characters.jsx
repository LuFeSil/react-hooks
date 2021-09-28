import { useState, useReducer, useMemo, useRef, useCallback } from 'react'

import CharacterCard from './CharacterCard';
import Search from './Search';
import useCharacters from '../hooks/useCaracters';

const initialState = {
    favorites: []
}

const API = 'https://rickandmortyapi.com/api/character/';

const favoriteReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_FAVORITES':
            return {
                ...state,
                favorites: [...state.favorites, action.payload]
            }
        case 'REMOVE_FROM_FAVORITES':
            return {
                ...state,
                favorites: [...state.favorites.filter(favorite => favorite !== action.payload)]
            }
        default:
            return state;
    }
}

const Characters = () => {

    const [favorites, dispatch] = useReducer(favoriteReducer, initialState);
    const [search, setSearch] = useState('');
    const searchInput = useRef(null);

    const characters = useCharacters(API);

    const addFavorite = favorite => {
        dispatch({ type: 'ADD_TO_FAVORITES', payload: favorite });
    }

    const deleteFavorite = favorite => {
        dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: favorite });
    }

    const wasListed = character => {
        const characterId = character.id
        const characterListed = favorites.favorites.find(favorite => favorite.id === characterId)
        return !!characterListed
    }

    const handleSearch = useCallback(() => {
        setSearch(searchInput.current.value);
    }, []);

    const filteredCharacters = useMemo(
        () => characters.filter(user => {
            return user.name.toLowerCase().includes(search.toLowerCase())
        }),
        [characters, search]);

    return (
        <div className="Characters">

            <h2>Personajes favoritos</h2>
            {
                favorites.favorites.length > 0
                    ?
                    favorites.favorites.map(favorite => (
                        <CharacterCard
                            key={favorite.id}
                            {...favorite}
                            isFavorite
                            handleClick={() => deleteFavorite(favorite)} />
                    ))
                    :
                    <CharacterCard wasListed />
            }

            <Search search={search} searchInput={searchInput} handleSearch={handleSearch} />

            <h2>Lista de personajes</h2>
            {filteredCharacters.map(character => (
                favorites.favorites.length > 0
                    ?
                    wasListed(character)
                        ?
                        <CharacterCard
                            key={character.id}
                            {...character}
                            wasListed
                            handleClick={() => addFavorite(character)} />
                        :
                        <CharacterCard
                            key={character.id}
                            {...character}
                            handleClick={() => addFavorite(character)} />
                    :
                    <CharacterCard
                        key={character.id}
                        {...character}
                        handleClick={() => addFavorite(character)} />
            ))}
        </div>
    );
}

export default Characters;