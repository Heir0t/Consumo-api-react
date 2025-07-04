import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiCameraMovie, BiSearchAlt2, BiChevronDown } from "react-icons/bi";

import "./Navbar.css";

const CategoryDropdown = ({ onCategorySelect, selectedCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [genres, setGenres] = useState([]);
  const dropdownRef = useRef(null);

  const movieGenres = [
    { id: 28, name: 'Ação' },
    { id: 12, name: 'Aventura' },
    { id: 16, name: 'Animação' },
    { id: 35, name: 'Comédia' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentário' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Família' },
    { id: 14, name: 'Fantasia' },
    { id: 36, name: 'História' },
    { id: 27, name: 'Terror' },
    { id: 10402, name: 'Música' },
    { id: 9648, name: 'Mistério' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Ficção Científica' },
    { id: 10770, name: 'Cinema TV' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'Guerra' },
    { id: 37, name: 'Faroeste' }
  ];

  useEffect(() => {
    setGenres([{ id: null, name: 'Todas as Categorias' }, ...movieGenres]);
  }, []);

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCategorySelect = (genre) => {
    onCategorySelect(genre);
    setIsOpen(false);
  };

  const getSelectedGenreName = () => {
    if (!selectedCategory) return 'Categorias';
    const genre = genres.find(g => g.id === selectedCategory);
    return genre ? genre.name : 'Categorias';
  };

  return (
    <div className="category-dropdown" ref={dropdownRef}>
      <button
        type="button"
        className="dropdown-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <BiCameraMovie />
        <span>{getSelectedGenreName()}</span>
        <BiChevronDown className={`chevron ${isOpen ? 'open' : ''}`} />
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          {genres.map((genre) => (
            <button
              key={genre.id || 'all'}
              type="button"
              onClick={() => handleCategorySelect(genre)}
              className={`dropdown-item ${selectedCategory === genre.id ? 'selected' : ''}`}
            >
              {genre.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const Navbar = ({ onCategorySelect, selectedCategory }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!search) return;

    navigate(`/search?q=${search}`, { replace: true });
    setSearch("");
  };

  return (
    <nav id="navbar">
      <h2>
        <Link to="/">
          <img src="/public/logo-reactMocies.png" alt="reactLogo" id="mainLogo" /> React Movies
        </Link>
      </h2>

      <CategoryDropdown 
        onCategorySelect={onCategorySelect}
        selectedCategory={selectedCategory}
      />

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Busque um filme"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <button type="submit">
          <BiSearchAlt2 />
        </button>
      </form>
    </nav>
  );
};

export default Navbar;