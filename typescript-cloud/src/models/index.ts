import User from "./user.model";
import Movie from "./movie.model";
import Character from "./character.model";
import FavoriteList from "./favoriteList.model";
import Cart from "./cart.model";
import CartItem from "./cartItem.model";
import Author from "./author.model";
import LeadCharacter from "./LeadCharacter.model";
import Genre from "./genre.model";
import Review from "./review.model";
import Director from "./director.model";

// Relations User
User.hasOne(FavoriteList, {
  foreignKey: "userId",
  as: "favoriteList",
});

User.hasMany(Cart, {
  foreignKey: "userId",
  as: "carts",
});

// Relation User-Review
User.hasMany(Review, {
  foreignKey: "userId",
  as: "reviews",
});

Review.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

// Relations Movie
Movie.hasMany(Character, {
  foreignKey: "movieId",
  as: "characters",
});

// Relation Movie-Genre
Movie.belongsTo(Genre, {
  foreignKey: "genreId",
  as: "genre",
});

Genre.hasMany(Movie, {
  foreignKey: "genreId",
  as: "movies",
});

// Relation Movie-Director
Movie.belongsTo(Director, {
  foreignKey: "directorId",
  as: "director",
});

Director.hasMany(Movie, {
  foreignKey: "directorId",
  as: "movies",
});

// Relation Movie-Review
Movie.hasMany(Review, {
  foreignKey: "movieId",
  as: "reviews",
});

Review.belongsTo(Movie, {
  foreignKey: "movieId",
  as: "movie",
});

// Relations Character
Character.belongsTo(Movie, {
  foreignKey: "movieId",
  as: "movie",
});

// Relations FavoriteList
FavoriteList.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

FavoriteList.belongsToMany(Movie, {
  through: "favorite_list_movies",
  foreignKey: "favoriteListId",
  otherKey: "movieId",
  as: "movies",
  timestamps: true,
});

Movie.belongsToMany(FavoriteList, {
  through: "favorite_list_movies",
  foreignKey: "movieId",
  otherKey: "favoriteListId",
  as: "favoriteLists",
  timestamps: true,
});

// Relations Cart
Cart.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

Cart.hasMany(CartItem, {
  foreignKey: "cartId",
  as: "items",
});

// Relations CartItem
CartItem.belongsTo(Cart, {
  foreignKey: "cartId",
  as: "cart",
});

CartItem.belongsTo(Movie, {
  foreignKey: "movieId",
  as: "movie",
});

export {
  User,
  Movie,
  Character,
  FavoriteList,
  Cart,
  CartItem,
  Author,
  LeadCharacter,
  Genre,
  Review,
  Director,
};
