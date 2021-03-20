import axios from 'axios';
import { parseCookies } from 'nookies';
import React, { useState } from 'react'
import { useAppContext } from '../../context/state'
import order from '../../pages/api/order';
import Loading from '../Loading';

function CartItem({ introImage, title, id, price, image }) {
    const [loading, setLoading] = useState(false);
    const { cart, setCart, order, setOrder, general } = useAppContext();
    const handleDeleteFromCart = async () => {
        const newCart = cart.filter((item) => item.id !== id);
        setLoading(true);
        document.documentElement.style.opacity = '0.5';
        const { user, userToken } = parseCookies();
        const body = {
            cart: newCart,
            username: user,
            title: general.order.title,
            description: general.order.description,
            token: userToken,
            id: order.id
        }
        const { data } = await axios.patch('/api/order', body);
        setOrder(data);
        setCart(newCart);
        document.documentElement.style.opacity = '1';
        setLoading(false);
    }
    return (
        <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
            {loading && <Loading />}
            <div className="flex w-2/5"> {/* product */}
                <div className="w-20">
                    <img className="h-24" src={introImage || image} alt={title} />
                </div>
                <div className="flex flex-col justify-between ml-4 flex-grow">
                    <span className="font-bold text-sm">{title}</span>
                    <a href="#" onClick={handleDeleteFromCart} className="font-semibold hover:text-red-500 text-gray-500 text-xs">Eliminar</a>
                </div>
            </div>
            <div className="flex justify-center w-1/3">
                <h3 className="mx-2 border text-center w-8" >1</h3>
            </div>
            <span className="text-center w-1/3 font-semibold text-sm">{`₡ ${parseInt(price)}`}</span>
        </div>
    )
}

export default CartItem
