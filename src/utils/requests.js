
const http = "http://ass1-movie-backend.onrender.com//api/movies";
const requests = {
	fetchTrending: `${http}/trending`,
	fetchNetflixOriginals: `${http}/listMovieTv`,
	fetchTopRated: `${http}/top-rate`,
	fetchActionMovies: `${http}/discover?genre=28`,
	fetchComedyMovies: `${http}/discover?genre=35`,
	fetchHorrorMovies: `${http}/discover?genre=27`,
	fetchRomanceMovies: `${http}/discover?genre=10749`,
	fetchDocumentaries: `${http}/discover?genre=99`,
	fetchSearch: `${http}/search`,
};

export default requests;
