import {useState} from "react";

function Categories() {
    const [activeCategory, setActiveCategory] = useState(0);
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

    return (
        <div className="categories">
            <ul>
                { categories.map((category, key) => {
                    return  <li onClick={() => setActiveCategory(key)}
                               className={ key === activeCategory ? "active" : "" }
                               key={key}>{ category }
                            </li>
                }) }
            </ul>
        </div>
    )
}

export default Categories;