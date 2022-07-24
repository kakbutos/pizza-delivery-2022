import React, {useState, useEffect, useContext} from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import {Skeleton} from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import {searchContext} from "../App";

const Home = () => {
    const {searchValue} = useContext(searchContext);
    const [pizzaList, setPizzaList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categoryId, setCategoryId] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [sort, setSort] = useState({
        name: 'популярности', sortProperty: 'rating'
    });

    useEffect(() => {
        setIsLoading(true);

        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const sortBy = sort.sortProperty.replace('-', '');
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        fetch(`https://62d437c0cd960e45d4552a2b.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
            .then((res) => res.json())
            .then((list) => {
                setPizzaList(list);
                setIsLoading(false);
            });
        window.scrollTo(0, 0);
    }, [categoryId, sort, searchValue, currentPage]);

    const pizzas = pizzaList.map((pizza) => <PizzaBlock key={pizza.id} {...pizza}/>);

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
                    : pizzas
                }
            </div>
            <Pagination onChangePage={number => setCurrentPage(number)}/>
        </>
    )
}

export default Home;