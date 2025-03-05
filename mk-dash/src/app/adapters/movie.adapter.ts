export const movieAdapter = (movies: any) =>
  //we want to map throug all the elements of the array, and transform the names to upper case
  {
    movies.map((movies: any) => movies.result);
  };
