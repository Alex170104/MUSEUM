import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<number[]>([]);
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        if (value.trim() === "") {
            setResults([]);
        } else {
            handleSearch(value);
        }
    };

    const handleSearch = async (searchQuery: string) => {
        try {
            const response = await fetch(
                `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${searchQuery}`
            );
            const data = await response.json();
            setResults(data.objectIDs?.slice(0, 5) || []);
            onSearch(searchQuery);
        } catch (error) {
            console.error("Erreur lors de l'appel à l'API :", error);
        }
    };

    const handleResultClick = (id: number) => {
        navigate(`/produit/${id}`);
    };

    return (
        <>
            {/* Barre de recherche sur la page de base */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Rechercher..."
                    value={query}
                    onChange={handleInputChange}
                />
            </div>

            {/* Overlay avec l'input et les résultats */}
            {query && (
                <div className="overlay">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            value={query}
                            onChange={handleInputChange}
                            className="search-input"
                        />
                        <div className="search-results-popup">
                            <ul>
                                {results.map((id) => (
                                    <li key={id} onClick={() => handleResultClick(id)}>
                                        Objet ID: {id}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default SearchBar;