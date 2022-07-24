import {Routes, Route} from "react-router-dom";
import {createContext, useState} from "react";

import Header from "./components/Header";
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';

import './scss/app.scss';

export const searchContext = createContext(undefined);

function App() {
    const [searchValue, setSearchValue] = useState('')

    return (
        <div className="wrapper">
        <searchContext.Provider value={{searchValue, setSearchValue}}>
            <Header/>
            <div className="content">
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/cart" element={<Cart/>} />
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </div>
            </div>
        </searchContext.Provider>
        </div>
    );
}

export default App;
