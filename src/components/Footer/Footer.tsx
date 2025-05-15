function Footer() {
    return (
        <footer style={{ backgroundColor: "#333", color: "#fff", padding: "20px", textAlign: "center" }}>
            <p>&copy; 2023 Mon Application. Tous droits réservés.</p>
            <p>
                <a href="/contact" style={{ color: "#fff", textDecoration: "none" }}>Contact</a> |
                <a href="/about" style={{ color: "#fff", textDecoration: "none" }}>À propos</a>
            </p>
        </footer>
    );
}

export default Footer;