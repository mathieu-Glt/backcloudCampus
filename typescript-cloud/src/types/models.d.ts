import { Model, Optional } from "sequelize";

// User
export interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
  isVerified: boolean;
  verificationToken: string | null;
  resetPasswordToken: string | null;
  resetPasswordExpires: Date | null;
  passwordChangedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type UserCreationAttributes = Omit<UserAttributes, "id">;
export type UserInstance = UserAttributes;

// Movie
export interface MovieAttributes {
  id: number;
  title: string;
  slug: string;
  description: string;
  releaseDate: Date;
  duration: number;
  directorId: number;
  genreId: number;
  posterUrl?: string;
  trailerUrl?: string;
  rating?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface MovieCreationAttributes
  extends Optional<
    MovieAttributes,
    | "id"
    | "posterUrl"
    | "trailerUrl"
    | "rating"
    | "createdAt"
    | "updatedAt"
    | "deletedAt"
  > {}

export interface MovieInstance
  extends Model<MovieAttributes, MovieCreationAttributes>,
    MovieAttributes {}

// Character
export interface CharacterAttributes {
  id: number;
  name: string;
  description: string;
  movieId: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface CharacterCreationAttributes
  extends Optional<
    CharacterAttributes,
    "id" | "createdAt" | "updatedAt" | "deletedAt"
  > {}

export interface CharacterInstance
  extends Model<CharacterAttributes, CharacterCreationAttributes>,
    CharacterAttributes {}

// FavoriteList
export interface FavoriteListAttributes {
  id: number;
  userId: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface FavoriteListCreationAttributes
  extends Optional<
    FavoriteListAttributes,
    "id" | "createdAt" | "updatedAt" | "deletedAt"
  > {}

export interface FavoriteListInstance
  extends Model<FavoriteListAttributes, FavoriteListCreationAttributes>,
    FavoriteListAttributes {}

// Cart
export interface CartAttributes {
  id: number;
  userId: number;
  status: "active" | "completed" | "abandoned";
  totalAmount: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface CartCreationAttributes
  extends Optional<
    CartAttributes,
    "id" | "totalAmount" | "createdAt" | "updatedAt" | "deletedAt"
  > {}

export interface CartInstance
  extends Model<CartAttributes, CartCreationAttributes>,
    CartAttributes {}

// CartItem
export interface CartItemAttributes {
  id: number;
  cartId: number;
  movieId: number;
  quantity: number;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface CartItemCreationAttributes
  extends Optional<
    CartItemAttributes,
    "id" | "createdAt" | "updatedAt" | "deletedAt"
  > {}

export interface CartItemInstance
  extends Model<CartItemAttributes, CartItemCreationAttributes>,
    CartItemAttributes {}

// Author
export interface AuthorAttributes {
  id: number;
  firstName: string;
  lastName: string;
  biography?: string;
  birthDate?: Date;
  deathDate?: Date;
  nationality?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface AuthorCreationAttributes
  extends Omit<
    AuthorAttributes,
    "id" | "createdAt" | "updatedAt" | "deletedAt"
  > {}

export interface AuthorInstance
  extends Model<AuthorAttributes, AuthorCreationAttributes>,
    AuthorAttributes {}

// LeadCharacter
export interface LeadCharacterAttributes {
  id: number;
  name: string;
  description: string;
  role: string;
  movieId: number;
  actorName: string;
  characterImage?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface LeadCharacterCreationAttributes
  extends Omit<
    LeadCharacterAttributes,
    "id" | "createdAt" | "updatedAt" | "deletedAt"
  > {}

export interface LeadCharacterInstance
  extends Model<LeadCharacterAttributes, LeadCharacterCreationAttributes>,
    LeadCharacterAttributes {}

// Genre
export interface GenreAttributes {
  id: number;
  name: string;
  description: string;
  iconUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface GenreCreationAttributes
  extends Omit<
    GenreAttributes,
    "id" | "createdAt" | "updatedAt" | "deletedAt"
  > {}

export interface GenreInstance
  extends Model<GenreAttributes, GenreCreationAttributes>,
    GenreAttributes {}

// Review
export interface ReviewAttributes {
  id: number;
  userId: number;
  movieId: number;
  rating: number;
  comment: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface ReviewCreationAttributes
  extends Omit<
    ReviewAttributes,
    "id" | "createdAt" | "updatedAt" | "deletedAt"
  > {}

export interface ReviewInstance
  extends Model<ReviewAttributes, ReviewCreationAttributes>,
    ReviewAttributes {}

// Director
export interface DirectorAttributes {
  id: number;
  firstName: string;
  lastName: string;
  biography: string;
  birthDate: Date;
  nationality: string;
  photoUrl?: string;
  awards?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface DirectorCreationAttributes
  extends Omit<
    DirectorAttributes,
    "id" | "createdAt" | "updatedAt" | "deletedAt"
  > {}

export interface DirectorInstance
  extends Model<DirectorAttributes, DirectorCreationAttributes>,
    DirectorAttributes {}
