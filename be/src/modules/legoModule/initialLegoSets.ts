export interface LegoSet {
  id: number;
  setNumber: string;
  name: string;
  pieces: number;
  price: number;
  ageRange: string;
  theme: string;
  releaseYear: number;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export const initialLegoSets: LegoSet[] = [
  {
    id: 1,
    setNumber: "75192",
    name: "Millennium Falcon",
    pieces: 7541,
    price: 159.99,
    ageRange: "16+",
    theme: "Star Wars",
    releaseYear: 2017,
    imageUrl: "https://placehold.co/600x400/000000/FFFFFF/png?text=Millennium+Falcon",
    createdAt: new Date("2017-10-01"),
    updatedAt: new Date("2017-10-01")
  },
  {
    id: 2,
    setNumber: "71043",
    name: "Hogwarts Castle",
    pieces: 6020,
    price: 399.99,
    ageRange: "16+",
    theme: "Harry Potter",
    releaseYear: 2018,
    imageUrl: "https://placehold.co/600x400/000000/FFFFFF/png?text=Hogwarts+Castle",
    createdAt: new Date("2018-09-01"),
    updatedAt: new Date("2018-09-01")
  },
  {
    id: 3,
    setNumber: "10294",
    name: "LEGO Creator Expert Titanic",
    pieces: 9090,
    price: 629.99,
    ageRange: "18+",
    theme: "Creator Expert",
    releaseYear: 2021,
    imageUrl: "https://placehold.co/600x400/000000/FFFFFF/png?text=Titanic",
    createdAt: new Date("2021-11-01"),
    updatedAt: new Date("2021-11-01")
  },
  {
    id: 4,
    setNumber: "75313",
    name: "AT-AT",
    pieces: 6785,
    price: 159.99,
    ageRange: "16+",
    theme: "Star Wars",
    releaseYear: 2021,
    imageUrl: "https://placehold.co/600x400/000000/FFFFFF/png?text=AT-AT",
    createdAt: new Date("2021-11-01"),
    updatedAt: new Date("2021-11-01")
  },
  {
    id: 5,
    setNumber: "10276",
    name: "Colosseum",
    pieces: 9036,
    price: 549.99,
    ageRange: "18+",
    theme: "Architecture",
    releaseYear: 2020,
    imageUrl: "https://placehold.co/600x400/000000/FFFFFF/png?text=Colosseum",
    createdAt: new Date("2020-11-01"),
    updatedAt: new Date("2020-11-01")
  }
]; 