
function Header() {
    return (
        <header>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
            <button
                onClick={() => window.location.href = '/'}
                style={{ display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                aria-label="Aller à l'accueil"
            >
                <span className="material-icons">home</span>
                <span style={{ marginLeft: 8 }}>Accueil</span>
            </button>
        </header>
    );
}

export default Header;
