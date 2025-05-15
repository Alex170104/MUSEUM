import {useParams} from "react-router-dom";

function Produit() {
    const {id} = useParams<{id:string}>();
    console.log(id);


    return (
        <div>
            <h1>Page Produit</h1>
            <p>Recherche effectuée pour: {id}</p>
        </div>
    );
}

export default Produit;