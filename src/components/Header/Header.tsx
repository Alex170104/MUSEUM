import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
    const navigate = useNavigate();

    return (
        <header>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
            <button
                onClick={() => navigate('/')}
                style={{ display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'white' }}
                aria-label="Aller à l'accueil"
            >
                <span className="material-icons">home</span>
                <span style={{ marginLeft: 8 }}>Accueil</span>
            </button>
            <h1 className="header-title">MET Museum</h1>
            <button className="search-button" onClick={() => navigate('/search')}>
                <span className="material-icons">search</span>
                <span>Recherche</span>
            </button>
        </header>
    );
}

export default Header;