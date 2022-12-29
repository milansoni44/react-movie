import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { API_URL } from './context';

const SingleMovie = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState("");

    const getMovie = async (url) => {
        setIsLoading(true);
        try {
            const res = await fetch(url);
            const data = await res.json();

            if (data.Response === 'True') {
                console.log(data);
                setIsLoading(false);
                setMovie(data);
            }
            else {
                setMovie([]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        let timerOut = setTimeout(function(){
            getMovie(`${API_URL}&i=${id}`);
        }, 800);

        return () => clearTimeout(timerOut);
    }, [id]);

    if( isLoading )
    {
        return(
            <div className='movie-section'>
                <div className='loading'>Loading...</div>
            </div>
        )
    }
    return (
        <section className='movie-section'>
            <div className='movie-card'>
                <figure>
                    <img src={movie.Poster} alt={id} />
                </figure>
                <div className='card-content'>
                    Movie Name: <p className='title'>{movie.Title}</p>
                    Actors: <p className='title'>{movie.Actors}</p>
                    Director: <p className='title'>{movie.Director}</p>
                    Awards: <p className='title'>{movie.Awards}</p>
                    Box Office: <p className='title'>{movie.BoxOffice}</p>
                    Genre: <p className='title'>{movie.Genre}</p>
                    Released: <p className='title'>{movie.Released}</p>
                </div>
            </div>
        </section>
    )
}

export default SingleMovie