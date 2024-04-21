import React, { useState, useEffect } from 'react';
import './Banner.css';

function Banner() {
	const [movie, setMovie] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const myHeaders = new Headers();
			myHeaders.append("Authorization", "RYoOcWM4JW");

			const requestOptions = {
				method: "GET",
				headers: myHeaders,
				redirect: "follow"
			};

			fetch("http://ass1-movie-backend.onrender.com//api/movies/listMovieTv", requestOptions)
				.then((response) => response.json())
				.then((item) =>
					setMovie(
						item.results[
						Math.floor(Math.random() * item.results.length - 1)
						]
					)
				)
				.catch((error) => console.error(error));

		}
		fetchData();

	}, []);

	// console.log(movie)

	function truncate(str, n) {
		return str?.length > n ? str.substr(0, n - 1) + '...' : str;
	}

	return (
		<header
			className='banner'
			style={{
				backgroundSize: 'cover',
				backgroundImage: `url(
				"https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
				)`,
				backgroundPosition: 'center center',
			}}>
			<div className='banner_contents'>
				<h1 className='banner_title'>
					{movie?.title || movie?.name || movie?.original_name}
				</h1>

				<div className='banner_buttons'>
					<button className='banner_button'>Play</button>
					<button className='banner_button'>My List</button>
				</div>
				<h1 className='banner_description'>
					{truncate(movie?.overview, 150)}
				</h1>
			</div>

			<div className='banner--fadeBottom' />
		</header>
	);
}

export default Banner;
