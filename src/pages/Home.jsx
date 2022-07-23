import React, {useState,useEffect} from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import {Skeleton} from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";

const Home = () => {
    const [pizzaList, setPizzaList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categoryId, setCategoryId] = useState(0);
    const [sort, setSort] = useState({
        name: 'популярности', sortProperty: 'rating'
    });

    useEffect(() => {
        setIsLoading(true);

        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const sortBy = sort.sortProperty.replace('-', '');
        const category = categoryId > 0 ? `category=${categoryId}` : '';

        fetch(`https://62d437c0cd960e45d4552a2b.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`)
            .then((res) => res.json())
            .then((list) => {
                setPizzaList(list);
                setIsLoading(false);
            });
        window.scrollTo(0, 0);
    }, [categoryId, sort]);

    return (
        <>
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={(id) => setCategoryId(id)}/>
                <Sort value={sort} onChangeSort={(i) => setSort(i)}/>
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