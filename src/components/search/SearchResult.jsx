import React, { useState, useEffect } from 'react';

import requests from '../../utils/requests';

import './SearchResult.css';

const base_url = 'https://image.tmdb.org/t/p/original';

const SearchResult = ({ query }) => {
	const [movies, setMovies] = useState([]);

	const url = `${requests.fetchSearch}`;

	useEffect(() => {
		async function fetchData() {
			const myHeaders = new Headers();
			myHeaders.append("Authorization", "RYoOcWM4JW");
			myHeaders.append("Content-Type", "application/json");

			const raw = JSON.stringify({
				"keyword": query
			});

			const requestOptions = {
				method: "POST",
				headers: myHeaders,
				body: raw,
				redirect: "follow"
			};

			fetch(url, requestOptions)
				.then((response) => response.json())
				.then((item) => setMovies(item.results))
				.catch((error) => console.error(error));
		}

		if (query) {
			fetchData();
		} else {
			setMovies([]);
		}
	}, [url, query]);

	return (
		<div className='row'>
			<h2>Search Result</h2>
			<div className='row_posters search-resul-container sc2'>
				{movies.map((movie) => {
					return (
						<img
							key={movie.id}
							className={`row_poster row_posterLarge`}
							src={`${base_url}${movie.poster_path}`}
							alt={movie.name}
						/>
					);
				})}
			</div>
		</div>
	)
};

export default SearchResult;
