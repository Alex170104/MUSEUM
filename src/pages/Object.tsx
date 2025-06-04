import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import "./Object.css";

function Produit() {
    const {id} = useParams<{ id: string }>();
    const [productData, setProductData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(
                    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
                );
                const data = await response.json();
                setProductData(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProductData();
    }, [id]);

    const handleSearch = (query: string) => {
        console.log("Recherche effectuée :", query);
    };

    if (isLoading) {
        return (
            <div className="skeleton-container">
                <div className="skeleton-title"></div>
                <div className="skeleton-image"></div>
                <div className="skeleton-details"></div>
            </div>
        );
    }

    if (!productData) {
        return <p>Chargement des informations...</p>;
    }

    return (
        <div className="product-page">
            <SearchBar onSearch={handleSearch}/>
            <div className="product-container">
                <h1 className="product-title">{productData.title || "Titre inconnu"}</h1>
                {productData.primaryImage && (
                    <div>
                        <img
                            src={productData.primaryImage}
                            alt={productData.title}
                            className="product-image"
                        />
                        <a
                            href={productData.primaryImage}
                            target="_blank"
                            rel="noopener noreferrer"
                            download={`${productData.title || "image"}.jpg`}
                            className="download-button"
                        >
                            <span className="material-icons">zoom_in</span>
                        </a>
                    </div>
                )}
                <div className="product-details">
                    <p><strong>Département :</strong> {productData.department || "Non spécifié"}</p>
                    <p><strong>Période :</strong> {productData.period || "Non spécifiée"}</p>
                    <p><strong>Auteur :</strong> {productData.artistDisplayName || "Inconnu"}</p>
                </div>
            </div>
        </div>
    );
}

export default Produit;