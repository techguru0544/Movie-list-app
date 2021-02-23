import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

// Initial state
const initialState = {
  allMoviesList: [
    {
      title: 'The Matrix',
      rating: 7.5,
      category: 'Action'
    },
    {
      title: 'Focus',
      rating: 6.9,
      category: 'Comedy'
    },
    {
      title: 'The Lazarus Effect',
      rating: 6.4,
      category: 'Thriller'
    },
    {
      title: 'Everly',
      rating: 5.0,
      category: 'Action'
    },
    {
      title: 'Maps to the Stars',
      rating: 7.5,
      category: 'Drama'
    }
  ],
  genreList: [
    {
      selected: false,
      value: ''
    },
    {
      selected: false,
      value: 'Action'
    },
    {
      selected: false,
      value: 'Comedy'
    },
    {
      selected: false,
      value: 'Thriller'
    },
    {
      selected: false,
      value: 'Drama'
    }
  ],
  moviesList: [],
  serachText: "",
  allRatingList: [
    {
      selected: false,
      value: 0
    },
    {
        selected: false,
        value: 1
    },
    {
        selected: false,
        value: 2
    },
    {
        selected: false,
        value: 3
    },
    {
        selected: false,
        value: 4
    },
    {
        selected: false,
        value: 5
    },
    {
        selected: false,
        value: 6
    },
    {
      selected: false,
      value: 7
    },
    {
      selected: false,
      value: 8
    },
    {
      selected: false,
      value: 9
    },
    {
      selected: false,
      value: 10
    },
]
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function filterMovies(movie) {
    dispatch({
      type: 'FILTER_MOVIES',
      payload: movie
    });
  }

  function loadMovies() {
    dispatch({
      type: 'LOAD_MOVIES'      
    });
  }

  function updateSerachText(text) {
    dispatch({
      type: 'UPDATE_SEARCH_TEXT',
      payload: text     
    });
  }

  function updateRatingList(list) {
    dispatch({
      type: 'UPDATE_RATING_LIST',
      payload: list
    })
  }

  function updateGenreList(list) {
    dispatch({
      type: 'UPDATE_GENRE_LIST',
      payload: list
    })
  }

  return (<GlobalContext.Provider value={{
    moviesList: state.moviesList,
    genreList: state.genreList,
    serachText: state.serachText,
    allRatingList: state.allRatingList,
    filterMovies,
    loadMovies,
    updateSerachText,
    updateRatingList,
    updateGenreList
  }}>
    {children}
  </GlobalContext.Provider>);
}