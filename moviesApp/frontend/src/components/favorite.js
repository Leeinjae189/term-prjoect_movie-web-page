import "./favorite.css";
import Axios from "axios";
import { useState } from "react"



const Favorite = ({ poster, title, year, id, rating, setListOfFavorites, }) => {

    
    const [userRating, setUserRating] = useState(rating);

    const deleteFavorite = (id) => {
        Axios.delete(`http://localhost:3001/delete/${id}`).then(() => {
          // axios로 흥미목록에서 삭제
          setListOfFavorites((prevFavorites) => prevFavorites.filter((favorite) => favorite._id !== id));
        });
      };

      const rateMovie = event => {
        setUserRating(event.target.value);
        updateRating(title, event.target.value);
      };
    
      const updateRating = (title, rating) => {
        fetch("http://localhost:3001/updateRating", {
          method: "POST",
          body: JSON.stringify({
            title: title,
            rating: rating,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
           
          });
      };



  
  return (
      <div className="card">
          <img  src={poster} alt="Poster" className='card-img-top' />
          <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{year}</p>
          </div>
          <div className="card-body">
              <label for="rating">당신의 평가: </label>
              <select id="rating" value={userRating} onChange={rateMovie}>
                <option hidden></option>
                <option>나쁨</option>
                <option>보통</option>
                <option>좋음</option>
                <option>매우 좋음</option>
              </select>
          </div>
          <button onClick={() => {deleteFavorite(id)}}>흥미목록에서 제거</button>
      </div>
  );
};


export default Favorite;