import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import {useSelector, useDispatch} from "react-redux";

import {setCategoryId, setCurrentPage} from "../redux/slices/filterSlice";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import {Skeleton} from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import {searchContext} from "../App";

const Home = () => {
    const dispatch = useDispatch();
    const {categoryId, sort, currentPage} = useSelector(state => state.filter);
    const sortType = sort.sortProperty;
    const {searchValue} = useContext(searchContext);
    const [pizzaList, setPizzaList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id));
    }

    const onChangePage = (page) => {
        dispatch(setCurrentPage(page));
    }

    useEffect(() => {
        setIsLoading(true);

        const order = sortType.includes('-') ? 'asc' : 'desc';
        const sortBy = sortType.replace('-', '');
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        axios.get(
            `https://62d437c0cd960e45d4552a2b.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
        ).then(res => {
            setPizzaList(res.data);
            setIsLoading(false);
        });
        window.scrollTo(0, 0);
    }, [categoryId, sortType, searchValue, currentPage]);

    const pizzas = pizzaList.map((pizza) => <PizzaBlock key={pizza.id} {...pizza}/>);

    return (
        <>
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={onChangeCategory}/>
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                { isLoading
                    ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
                    : pizzas
                }
            </div>
            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </>
    )
}

export default Home;