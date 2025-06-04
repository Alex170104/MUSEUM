import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";

function Search() {
    const [query, setQuery] = useState("");
    const [departmentName, setDepartmentName] = useState("");
    const [dateBegin, setDateBegin] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    const [author, setAuthor] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const fetchDepartmentId = async (name: string): Promise<string | null> => {
        try {
            const response = await fetch(
                "https://collectionapi.metmuseum.org/public/collection/v1/departments"
            );
            const data = await response.json();
            const department = data.departments.find(
                (dept: { departmentId: string; displayName: string }) =>
                    dept.displayName.toLowerCase() === name.toLowerCase()
            );
            return department ? department.departmentId : null;
        } catch (error) {
            console.error("Erreur lors de la récupération des départements :", error);
            return null;
        }
    };

    const handleSearch = async () => {
        setIsLoading(true);
        try {
            let departmentId = "";
            if (departmentName) {
                departmentId = await fetchDepartmentId(departmentName) || "";
            }

            let searchUrl = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${query}`;
            if (departmentId) searchUrl += `&departmentId=${departmentId}`;
            if (dateBegin) searchUrl += `&dateBegin=${dateBegin}`;
            if (dateEnd) searchUrl += `&dateEnd=${dateEnd}`;
            if (author) searchUrl += `&artistOrCulture=${author}`;

            const response = await fetch(searchUrl);
            const data = await response.json();
            const objectIDs = data.objectIDs || [];

            const detailedResults = await Promise.all(
                objectIDs.slice(0, 50).map(async (id) => {
                    const objectResponse = await fetch(
                        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
                    );
                    return await objectResponse.json();
                })
            );

            setResults(detailedResults);
        } catch (error) {
            console.error("Erreur lors de la recherche :", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleExampleClick = (field: string, value: string) => {
        if (field === "query") setQuery(value);
        if (field === "departmentName") setDepartmentName(value);
        if (field === "author") setAuthor(value);
    };

    return (
        <div className="search-page">
            <h1>Recherche Avancée</h1>
            <div className="examples">
                <p>Exemples :</p>
                <button onClick={() => handleExampleClick("query", "Nature morte")}>Nature morte</button>
                <button onClick={() => handleExampleClick("author", "Paul Cézanne")}>Paul Cézanne</button>
                <button onClick={() => handleExampleClick("author", "Van Gogh")}>Van Gogh</button>
                <button onClick={() => handleExampleClick("departmentName", "European Paintings")}>European Paintings</button>
            </div>
            <div className="search-form">
                <input
                    type="text"
                    placeholder="Titre"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Nom du département"
                    value={departmentName}
                    onChange={(e) => setDepartmentName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Date de début"
                    value={dateBegin}
                    onChange={(e) => setDateBegin(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Date de fin"
                    value={dateEnd}
                    onChange={(e) => setDateEnd(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Auteur"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
                <button onClick={handleSearch} disabled={isLoading}>
                    {isLoading ? "Recherche en cours..." : "Rechercher"}
                </button>
            </div>
            {isLoading && (
                <div className="loader-container">
                    <div className="loader"></div>
                </div>
            )}
            <div className="search-results">
                {results.length > 0 ? (
                    <ul>
                        {results.map((object) => (
                            <li
                                key={object.objectID}
                                onClick={() => navigate(`/produit/${object.objectID}`)}
                                style={{ cursor: "pointer" }}
                            >
                                {object.primaryImageSmall && (
                                    <img
                                        src={object.primaryImageSmall}
                                        alt={object.title}
                                        style={{ maxWidth: "200px", marginBottom: "1rem" }}
                                    />
                                )}
                                <p><strong>Nom:</strong> {object.title || "Non disponible"}</p>
                                <p><strong>Auteur:</strong> {object.artistDisplayName || "Non disponible"}</p>
                                <p><strong>Date de parution:</strong> {object.objectDate || "Non disponible"}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Aucun résultat trouvé.</p>
                )}
            </div>
        </div>
    );
}

export default Search;