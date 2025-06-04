function Footer() {
    return (
        <footer style={{ backgroundColor: "#333", color: "#fff", padding: "20px", textAlign: "center" }}>
            <p>&copy; {new Date().getFullYear()} MET Museum. Tous droits réservés.</p>
        </footer>
    );
}

export default Footer;