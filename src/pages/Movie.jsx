import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  BsGraphUp,
  BsWallet2,
  BsHourglassSplit,
  BsFillFileEarmarkTextFill,
} from "react-icons/bs";

import MovieCard from "../components/MovieCard";

import "./Movie.css";

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getMovie = async (url) => {
    try {
      setLoading(true);
      setError(null);
      console.log("Fazendo requisição para:", url);
      
      const res = await fetch(url);
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      console.log("Dados do filme recebidos:", data);
      setMovie(data);
    } catch (error) {
      console.error("Erro ao buscar filme:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (number) => {
    if (!number || number === 0) return "Não informado";
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  useEffect(() => {
    if (id) {
      const movieUrl = `${moviesURL}movie/${id}?${apiKey}`;
      console.log("URL construída:", movieUrl);
      getMovie(movieUrl);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="movie-page">
        <div className="container">
          <h2>Carregando detalhes do filme...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="movie-page">
        <div className="container">
          <h2>Erro ao carregar filme</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="movie-page">
        <div className="container">
          <h2>Filme não encontrado</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-page">
      <MovieCard movie={movie} showLink={false} />
      
      {movie.tagline && (
        <p className="tagline">{movie.tagline}</p>
      )}
      
      <div className="info">
        <h3>
          <BsWallet2 /> Orçamento:
        </h3>
        <p>{formatCurrency(movie.budget)}</p>
      </div>
      
      <div className="info">
        <h3>
          <BsGraphUp /> Receita:
        </h3>
        <p>{formatCurrency(movie.revenue)}</p>
      </div>
      
      <div className="info">
        <h3>
          <BsHourglassSplit /> Duração:
        </h3>
        <p>{movie.runtime ? `${movie.runtime} minutos` : "Não informado"}</p>
      </div>
      
      <div className="info description">
        <h3>
          <BsFillFileEarmarkTextFill /> Descrição:
        </h3>
        <p>{movie.overview || "Descrição não disponível"}</p>
      </div>
    </div>
  );
};

export default Movie;