import React, {useEffect, useRef} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from 'react-router-dom';

import qs from 'qs';

import {setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice";
import Categories from "../components/Categories";
import {Sort} from "../components/Sort";
import {Skeleton} from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import {list} from '../components/Sort';
import {fetchPizzas} from "../redux/slices/pizzaSlice";

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const isSearch = useRef(false);
    const isMounted = useRef(false);

    const {categoryId, sort, currentPage, searchValue} = useSelector(state => state.filter);
    const {items, status} = useSelector(state => state.pizza);
    const sortType = sort.sortProperty;

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id));
    }

    const onChangePage = (page) => {
        dispatch(setCurrentPage(page));
    }

    const getPizzas = async () => {
        const order = sortType.includes('-') ? 'asc' : 'desc';
        const sortBy = sortType.replace('-', '');
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        dispatch(fetchPizzas({
            order,
            sortBy,
            category,
            search,
            currentPage
        }));
    }

    useEffect(() => {
        if(window.location.search) {
            const params= qs.parse(window.location.search.substring(1));

            const sort = list.find(obj => obj.sortProperty === params.sortProperty)

            dispatch(
                setFilters({
                    ...params,
                    sort
                })
            );
            // isSearch.current = true;
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0);

        // if(!isSearch.current) {
        getPizzas();
        // }

        // isSearch.current = false;
        // eslint-disable-next-line
    }, [categoryId, sortType, searchValue, currentPage]);

    useEffect(() => {
        if(isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage
            })

            navigate(`?${queryString}`)
        }
        isMounted.current = true;
        // eslint-disable-next-line
    }, [categoryId, sortType, searchValue, currentPage]);

    const pizzas = items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza}/>);

    return (
        <>
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={onChangeCategory}/>
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {
                status === 'error' ? <div>Не удалось загрузить товар<span>😕</span></div> :
                <div className="content__items">
                    { status === 'loading'
                        ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
                        : pizzas
                    }
                </div>
            }
            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </>
    )
}

export default Home;