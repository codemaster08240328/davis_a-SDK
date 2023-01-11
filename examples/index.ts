import { configure, getMovies, getMovieById, getQuote } from "../src";

const TEST_API_KEY = 'J-KmFrZ99kInGrFaLX86';

configure(TEST_API_KEY);

async function main() {
  const movies = await getMovies<{docs: Array<{_id: string}>}>();
  console.log('movies ----->', movies);

  const firstMovie = await getMovieById(movies?.docs[0]._id)
  console.log('first movie ----->', firstMovie);

  const quote = await getQuote(movies?.docs[0]._id);
  console.log('quote ----->', quote);
}

main();