import React, {Suspense} from "react";
import {Routes, Route} from "react-router-dom";

import Header from "./components/Header";
import Home from './pages/Home';
import NotFound from './pages/NotFound';

import './scss/app.scss';

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'));
const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */ './components/FullPizza'));

function App() {

    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route
                            path="/cart"
                            element={
                                <Suspense fallback={<div>Идет загрузка корзины...</div>}>
                                    <Cart />
                                </Suspense>
                            }
                        />
                        <Route
                            path="/pizza/:id"
                            element={
                                <Suspense fallback={<div>Идет загрузка...</div>}>
                                    <FullPizza />
                                </Suspense>
                            }
                        />
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;
