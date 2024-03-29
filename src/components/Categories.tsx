import React, {memo} from "react";

type CategoriesProps = {
    value: number;
    onClickCategory: (i: number) => void;
};

const Categories: React.FC<CategoriesProps> = memo(({value, onClickCategory}) => {
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

    return (
        <div className="categories">
            <ul>
                { categories.map((category, key) => {
                    return  <li onClick={() => onClickCategory(key)}
                                className={ key === value ? "active" : "" }
                                key={key}>
                        { category }
                    </li>
                }) }
            </ul>
        </div>
    )
});

export default Categories;