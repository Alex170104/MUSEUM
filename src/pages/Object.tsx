import { useLocation } from "react-router-dom";

function Produit() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query");

    return (
        <div>
            <h1>Page Produit</h1>
            <p>Recherche effectuée pour : {query}</p>
        </div>
    );
}

export default Produit;