import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";

const FullPizza: React.FC = () => {
    const [pizza, setPizza] = useState<{
        imageUrl: string;
        title: string;
        price: number;
    }>();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchPizza() {
            try {
                const {data} = await axios.get(`https://62d437c0cd960e45d4552a2b.mockapi.io/items/${id}`);
                setPizza(data);
            }
            catch (error) {
                alert('Такой пиццы нет');
                navigate('/');
            }
        }

        fetchPizza();
    }, []);

    if (!pizza) {
        return <>Loading...</>
    }

    return (
        <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}} className="container">
            <img style={{width: '50%', height: '50%'}} src={pizza.imageUrl} alt={pizza.title}></img>
            <h1>{pizza.title}</h1>
            <div>{pizza.price} Руб.</div>
        </div>
    )
}

export default FullPizza;