import React, { useState, useEffect } from 'react';
import movieTrailer from 'movie-trailer';
import MovieDetail from '../../components/browse/MovieDetail';
import './MovieList.css';

const base_url = 'https://image.tmdb.org/t/p/original';
const movies_limit = 10;

function MovieList({ title, fetchUrl, isLargeRow }) {
	const [movies, setMovies] = useState([]);
	const [trailerUrl, setTrailerUrl] = useState('');
	const [selectedMovie, setSelectedMovie] = useState(null);

	useEffect(() => {
		async function fetchData() {
			const myHeaders = new Headers();
			myHeaders.append("Authorization", "RYoOcWM4JW");

			const requestOptions = {
				method: "GET",
				headers: myHeaders,
				redirect: "follow"
			};
			fetch(fetchUrl, requestOptions)
				.then((response) => response.json())
				.then((item) => setMovies(item.results))
				.catch((error) => console.error(error));
		}
		fetchData();
	}, [fetchUrl]);

	const handleClick = (movie) => {
		if (selectedMovie && selectedMovie.id === movie.id) {
			setSelectedMovie(null);
			setTrailerUrl('');
		} else {
			setSelectedMovie(movie);
			movieTrailer(movie.title || '')
				.then((url) => {
					const urlParams = new URLSearchParams(new URL(url).search);
					setTrailerUrl(urlParams.get('v'));
				})
				.catch((error) => console.log(error));
		}
	};



	return (
		<div className='row'>
			<h2 className="movie-list-title">{title}</h2>
			<div className='row_posters sc2'>
				{movies.map((movie) => {
					return (
						<img
							key={movie.id}
							onClick={() => handleClick(movie)}
							className={`row_poster ${isLargeRow && 'row_posterLarge'}`}
							src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path
								}`}
							alt={movie.name}
						/>
					);
				})}
			</div>
			<div style={{ padding: '40px' }}>
				{selectedMovie && <MovieDetail movieData={selectedMovie} movieTrailer={trailerUrl} />}
			</div>
		</div>
	);
}

export default MovieList;
