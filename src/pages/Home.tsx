import React, {useCallback, useEffect} from "react";
import {useSelector} from "react-redux";

import Categories from "../components/Categories";
import {Skeleton} from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import {SortPopup} from '../components/Sort';
import {RootState, useAppDispatch} from "../redux/store";
import {setCategoryId, setCurrentPage} from "../redux/filter/slice";
import {fetchPizzas} from "../redux/pizza/slice";

const Home: React.FC = () => {
    const dispatch = useAppDispatch();

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

    useEffect(() => {
        window.scrollTo(0, 0);

        getPizzas();
    }, [categoryId, sortType, searchValue, currentPage]);

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