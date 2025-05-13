import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.tsx";
import Introduction from "./components/Introduction/Introduction.tsx";
import Gallery from "./components/Gallery/Gallery.tsx";
import SearchBar from "./components/SearchBar/SearchBar";
import Produit from "./pages/Object.tsx";

function App() {
    const handleSearch = (query: string) => {
        console.log("Recherche :", query);
    };

    return (
        <Router>
            <Header />
            <main>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <SearchBar onSearch={handleSearch} />
                                <Introduction />
                                <Gallery />
                            </>
                        }
                    />
                    <Route path="/produit" element={<Produit />} />
                </Routes>
            </main>

        </Router>
    );
}

export default App;
