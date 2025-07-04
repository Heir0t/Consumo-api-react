import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import MovieCard from "../components/MovieCard";

import "./MovieGrid.css";

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {
  const [topMovies, setTopMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  let selectedCategory = null;
  try {
    const context = useOutletContext();
    selectedCategory = context?.selectedCategory;
  } catch (error) {
    console.log("Contexto não disponível, usando valor padrão");
  }

  console.log("Contexto recebido:", { selectedCategory });

  const getMovies = async (url) => {
    try {
      setLoading(true);
      console.log("Fazendo requisição para:", url);
      const res = await fetch(url);
      const data = await res.json();
      console.log("Dados recebidos:", data);
      setTopMovies(data.results || []);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
      setTopMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let url;
    
    if (selectedCategory && selectedCategory !== null) {
      url = `https://api.themoviedb.org/3/discover/movie?${apiKey}&with_genres=${selectedCategory}&sort_by=popularity.desc`;
    } else {
      url = `https://api.themoviedb.org/3/movie/top_rated?${apiKey}`;
    }
    
    console.log("URL da requisição:", url);
    console.log("Categoria selecionada:", selectedCategory);
    getMovies(url);
  }, [selectedCategory]);

  const getTitle = () => {
    if (selectedCategory && selectedCategory !== null) {
      const categoryMap = {
        28: 'Ação',
        12: 'Aventura',
        16: 'Animação',
        35: 'Comédia',
        80: 'Crime',
        99: 'Documentário',
        18: 'Drama',
        10751: 'Família',
        14: 'Fantasia',
        36: 'História',
        27: 'Terror',
        10402: 'Música',
        9648: 'Mistério',
        10749: 'Romance',
        878: 'Ficção Científica',
        10770: 'Cinema TV',
        53: 'Thriller',
        10752: 'Guerra',
        37: 'Faroeste'
      };
      return `Filmes de ${categoryMap[selectedCategory] || 'Categoria'}:`;
    }
    return "Melhores filmes:";
  };

  if (loading) {
    return (
      <div className="container">
        <h2 className="title">Carregando filmes...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="title">{getTitle()}</h2>
      <div className="movies-container">
        {topMovies.length > 0 ? (
          topMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <p>Nenhum filme encontrado para esta categoria.</p>
        )}
      </div>
    </div>
  );
};

export default Home;