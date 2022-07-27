function Categories({value, onClickCategory}) {
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
}

export default Categories;