const express = require("express");
const app = express();
const mongoose = require("mongoose");
const FavoriteModel = require("./models/Favorites");
const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://20181670:20181670@cluster0.hokjdhr.mongodb.net/?retryWrites=true&w=majority"
);

app.get("/getFavorites", (req, res) => {
  FavoriteModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/createFavorite", async (req, res) => {
  const favorite = req.body;
  const newFavorite = new FavoriteModel(favorite);
  await newFavorite.save();

  res.json(favorite);
});

app.post("/updateRating", async (req, res) => {
  const { title, rating } = req.body;

  // 제목을 사용하여 데이터베이스에서 영화 찾기
  const movie = await FavoriteModel.findOne({ title: title });

  // 영화 등급 업데이트
  movie.rating = rating;
  await movie.save();

  res.json({ message: "업데이트 성공" });
});

app.delete('/delete/:id', async (req,res)=> {
  const id = req.params.id
  await FavoriteModel.findByIdAndRemove(id).exec()
  res.send("deleted")
})

app.listen(3001, () => {
  console.log("서버 구동 성공~!");
});


