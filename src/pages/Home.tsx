import React, {useCallback, useEffect, useRef} from "react";
import {useSelector} from "react-redux";
import {Link, useNavigate} from 'react-router-dom';

import qs from 'qs';

import {setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice";
import Categories from "../components/Categories";
import {Skeleton} from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import {list, SortPopup} from '../components/Sort';
import {fetchPizzas, SearchPizzaParams} from "../redux/slices/pizzaSlice";
import {RootState, useAppDispatch} from "../redux/store";

const Home: React.FC = () => {
    // const navigate = useNavigate();
    const dispatch = useAppDispatch();
    // const isMounted = useRef(false);

    const {categoryId, sort, currentPage, searchValue} = useSelector((state: RootState) => state.filter);

    const {items, status} = useSelector((state: RootState) => state.pizza);
    const sortType = sort.sortProperty;

    const onChangeCategory = useCallback((id: number) => {
        dispatch(setCategoryId(id));
    }, []);

    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page));
    }

    const getPizzas = async () => {
        const order = sortType.includes('-') ? 'asc' : 'desc';
        const sortBy = sortType.replace('-', '');
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        await dispatch(fetchPizzas({
            order,
            sortBy,
            category,
            search,
            currentPage: String(currentPage)
        }));
    }

    // useEffect(() => {
    //     if(window.location.search) {
    //         const params= qs.parse(window.location.search.substring(1));
    //
    //         const sort = list.find(obj => obj.sortProperty === params.sortProperty)
    //
    //         dispatch(
    //             setFilters({
    //                 ...params,
    //                 sort
    //             })
    //         );
    //         // isSearch.current = true;
    //     }
    //     // eslint-disable-next-line
    // }, [])

    useEffect(() => {
        window.scrollTo(0, 0);

        getPizzas();
    }, [categoryId, sortType, searchValue, currentPage]);

    // useEffect(() => {
    //     if(isMounted.current) {
    //         const queryString = qs.stringify({
    //             sortProperty: sort.sortProperty,
    //             categoryId,
    //             currentPage
    //         })
    //
    //         navigate(`?${queryString}`)
    //     }
    //     isMounted.current = true;
    //     // eslint-disable-next-line
    // }, [categoryId, sortType, searchValue, currentPage]);

    const pizzas = items.map((pizza: any) => <PizzaBlock key={pizza.id} {...pizza}/>);

    return (
        <>
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={onChangeCategory}/>
                <SortPopup value={sort}/>
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