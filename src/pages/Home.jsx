import React, {useState,useEffect} from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import {Skeleton} from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";

const Home = () => {
    const [pizzaList, setPizzaList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('https://62d437c0cd960e45d4552a2b.mockapi.io/items')
            .then((res) => res.json())
            .then((list) => {
                setPizzaList(list);
                setIsLoading(false);
            });
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                { isLoading
                    ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
                    : pizzaList.map((pizza) => <PizzaBlock key={pizza.id} {...pizza}/>)
                }
            </div>
        </>
    )
}

export default Home;