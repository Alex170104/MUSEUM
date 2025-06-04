import './App.css';
import {BrowserRouter as Router, Routes, Route, Outlet} from "react-router-dom";
import Header from "./components/Header/Header.tsx";
import Introduction from "./components/Introduction/Introduction.tsx";
import Gallery from "./components/Gallery/Gallery.tsx";
import SearchBar from "./components/SearchBar/SearchBar";
import Produit from "./pages/Object.tsx";
import Search from "./pages/Search.tsx";
import Footer from "./components/Footer/Footer.tsx";
import Text from "./components/Text/Text.tsx";

function App() {
    const handleSearch = (query: string) => {
        console.log("Recherche :", query);
    };

    return (
        <Router>

            <main>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <Header />
                                <Outlet />
                            </>
                        }>
                        <Route index element={
                            <>
                                <Text />
                                <SearchBar onSearch={handleSearch} />
                                <Introduction />
                                <Gallery />
                            </>
                        } />

                        <Route path="/produit/:id" element={<Produit />} />
                        <Route path="/search" element={<Search />} />
                    </Route>

                </Routes>
            </main>
            <Footer />

        </Router>
    );
}

export default App;
