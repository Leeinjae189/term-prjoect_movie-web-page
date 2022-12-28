import { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from "axios";
import Movie from "./components/movie";
import Favorite from "./components/favorite";
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';


function App() {

  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [listOfFavorites, setListOfFavorites] = useState([]);
  const [defaultRating, setDefaultRating] = useState(`Choose here`);
  

  //api를 이용한 크롤링
  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=321f0e9`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);



  useEffect(() => {
    Axios.get("http://localhost:3001/getFavorites").then((response) => {
      setListOfFavorites(response.data);
      console.log(response);

    });
  }, []);

  useEffect(() => {
    // 이 효과는 listOfFavorites 데이터가 변경될 때마다 실행됩니다.(흥미영화 확인용 로그)
    console.log('listOfFavorites data has changed');
  }, [listOfFavorites]);

  useEffect(() => {
    // 이 효과는 defaultRating 값이 변경될 때마다 실행됩니다.
    console.log(`defaultRating has changed to ${defaultRating}`);
  }, [defaultRating]);


  return (
    <div>


      <MovieListHeading heading='영화 평가 사이트' />
      <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className='container-fluid movie-app custom-scrollbar-css'>

        <div className="container-fluid py-2">
          <div className='d-flex flex-row flex-nowrap'>
            {movies.map((movie, index) => <Movie
              poster={movie.Poster}
              title={movie.Title}
              year={movie.Year}
              rating={movie.rating}
              setListOfFavorites={setListOfFavorites}
              listOfFavorites={listOfFavorites}
            />)}
          </div>
        </div>
      </div>


      <MovieListHeading heading='평점 목록' />


      <div className='container-fluid movie-app custom-scrollbar-css'>

        <div className="container-fluid py-2">
          <div className='d-flex flex-row flex-nowrap'>
            {listOfFavorites.map((favorite, index) => <Favorite
              poster={favorite.poster}
              title={favorite.title}
              year={favorite.year}
              rating={favorite.rating}
              id={favorite._id}
              setListOfFavorites={setListOfFavorites}
              listOfFavorites={listOfFavorites}
              defaultRating={defaultRating}
              setDefaultRating={setDefaultRating}
            />)}
          </div>
        </div>
      </div>

    </div>
  );
}


export default App;
