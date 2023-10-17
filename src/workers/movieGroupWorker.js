function movieGroupWorker(e) {
  // eslint-disable-next-line no-restricted-globals
  self.onmessage = function (e) {
    const data = e.data;

    // If data isn't an array, check for the undesired property
    if (!Array.isArray(data)) {
      if (data.source === "react-devtools-bridge") {
        postMessage(["bay", "bye", "gulegule"]);
        return;
      }
    } else {
      // If it is an array, then process the movies array
      const groupedMovies = data.reduce(
        (acc, movie) => {
          if (!acc[movie.Year]) {
            acc[movie.Year] = [];
          }
          acc[movie.Year].push(movie);
          return acc;
        },
        {}
      );
      postMessage(groupedMovies);
    }
  };
}
export default movieGroupWorker;

