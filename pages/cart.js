
import Link from 'next/link';
import { useState } from 'react'
import CartItem from '../components/Cart/CartItem';
import { useAppContext } from '../context/state';
import { useRouter } from 'next/router';

function Cart() {
    const router = useRouter();
    const { cart, general, setOrder, order } = useAppContext();
    const { envioDentroGam, envioFueraGam } = general;
    const [envio, setEnvio] = useState(envioDentroGam);
    const cartLength = cart.length;
    const total = cart.reduce((count, item) => count + parseInt(item.price), 0);
    const handleEnviochange = ({ target }) => setEnvio(target.value);
    const handlePurchase = () => {
        const newOrder = {
            ...order,
            total,
            envio   
        }
        setOrder(newOrder);
        router.push('/compra');
    }
    return (
        <div className="container mx-auto mt-10">
            {
                cart.length === 0 &&
                <div className="text-center my-64">
                    <h4>No tiene ningun producto agregado</h4>
                </div>
            }
            {
                cart.length > 0 &&
                <div className="flex flex-col lg:flex-row shadow-md my-10">
                    <div className="w-full lg:w-3/4 bg-white px-10 py-10">
                        <div className="flex justify-between border-b pb-8">
                            <h1 className="font-semibold text-2xl">Carrito de Compras</h1>
                            <h2 className="font-semibold text-2xl">{`${cartLength} Items`}</h2>
                        </div>
                        <div className="flex mt-10 mb-5">
                            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Detalle de productos</h3>
                            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/3 text-center">Cantidad</h3>
                            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/3 text-center">Total</h3>
                        </div>
                        {cart.map(item => <CartItem key={`cart-item-${item.id}`} {...item} />)}
                        <Link href="/tienda">
                            <a href="#" className="flex font-semibold text-indigo-600 text-sm mt-10">
                                <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
                            Continuar comprando
                        </a>
                        </Link>
                    </div>
                    <div id="summary" className=" w-full lg:w-1/4 px-8 py-10">
                        <h1 className="font-semibold text-2xl border-b pb-8">Detalle de Compra</h1>
                        <div className="flex justify-between mt-10 mb-5">
                            <span className="font-semibold text-sm uppercase">{`Items ${cartLength}`}</span>
                            <span className="font-semibold text-sm">{`₡ ${parseInt(total)}`}</span>
                        </div>
                        <div>
                            <label className="font-medium inline-block mb-3 text-sm uppercase">Envio</label>
                            <select onChange={handleEnviochange} className="block p-2 text-gray-600 w-full text-sm">
                                <option value={envioDentroGam}>{`Dentro del GAM - ₡ ${parseInt(envioDentroGam)}`}</option>
                                <option value={envioFueraGam}>{`Dentro del GAM - ₡ ${parseInt(envioFueraGam)}`}</option>
                            </select>
                        </div>
                        <div className="border-t mt-8">
                            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                                <span>Costo total</span>
                                <span>{`₡ ${parseInt(total) + parseInt(envio)}`}</span>
                            </div>
                            <button onClick={handlePurchase} className="bg-eden font-semibold hover:bg-eden-400 py-3 text-sm text-white uppercase w-full">Comprar</button>
                        </div>
                    </div>
                </div>
            }

        </div>

    )
}

export const getServerSideProps = async (ctx) => {
    return {
        props: {
            data: null
        }
    }
}

export default Cart
