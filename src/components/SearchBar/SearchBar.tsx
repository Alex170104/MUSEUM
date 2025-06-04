import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<{ id: number; title: string; image: string }[]>([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const navigate = useNavigate();
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (query.trim() !== "") {
                setShowResults(true);
            }
        }, 1000);

        return () => clearTimeout(timeout);
    }, [query]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (overlayRef.current && !overlayRef.current.contains(event.target as Node)) {
                setIsPopupOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        setShowResults(false);
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
            const objectIDs = data.objectIDs?.slice(0, 5) || [];

            const detailedResults = await Promise.all(
                objectIDs.map(async (id: number) => {
                    const objectResponse = await fetch(
                        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
                    );
                    const objectData = await objectResponse.json();
                    return {
                        id: objectData.objectID,
                        title: objectData.title || "Titre inconnu",
                        image: objectData.primaryImageSmall || "",
                    };
                })
            );

            setResults(detailedResults);
            onSearch(searchQuery);
        } catch (error) {
            console.error("Erreur lors de l'appel à l'API :", error);
        }
    };

    const handleResultClick = (id: number) => {
        navigate(`/produit/${id}`);
        setIsPopupOpen(false);
        setQuery("");
        setShowResults(false);
    };

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <>
            {/* Barre de recherche sur la page de base */}
            <div className="search-bar" onClick={togglePopup}>
                <input
                    type="text"
                    placeholder="Rechercher..."
                    value={query}
                    onChange={handleInputChange}
                />
            </div>

            {/* Overlay avec l'input et les résultats */}
            {isPopupOpen && (
                <div className="overlay">
                    <div className="search-container" ref={overlayRef}>
                        <button className="close-button" onClick={closePopup}>
                            &times;
                        </button>
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            value={query}
                            onChange={handleInputChange}
                            className="search-input"
                        />
                        {showResults && (
                            <div className="search-results-popup">
                                <ul>
                                    {results.map((result) => (
                                        <li key={result.id} onClick={() => handleResultClick(result.id)}>
                                            {result.image && (
                                                <img
                                                    src={result.image}
                                                    alt={result.title}
                                                    style={{ width: "50px", marginRight: "10px" }}
                                                />
                                            )}
                                            {result.title}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default SearchBar;