import {HashRouter as Router, Routes, Route} from 'react-router-dom';
import Header from "./components/Header/Header.tsx";
import CatsPage from "./pages/CatsPage/CatsPage.tsx";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage.tsx";
import './index.module.scss';

function App() {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/" element={<CatsPage/>}/>
                <Route path="/favorites" element={<FavoritesPage/>}/>
            </Routes>
        </Router>
    );
}

export default App;
