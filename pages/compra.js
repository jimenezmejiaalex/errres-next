import axios from "axios";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/state";
import PaypalButton from '../components/PaypalButton'
import UserInfoForm from "../components/UserInfoForm";
import PurchaseSummary from "../components/PurchaseSummary";
import TransferForm from "../components/TransferForm";
import RadioButton from "../components/RadioButton";
import { PAYPAL, TRANSFER } from "../lib/consts";
import { useRouter } from 'next/router';

function Compra() {
    const router = useRouter();
    const { cart, general, order } = useAppContext();
    const { total, envio } = order;
    const [loading, setLoading] = useState(false);
    const [orderTitle, setOrderTitle] = useState(null);
    const [files, setFiles] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const handleOrderApprove = async (details) => {
        const { user, userToken } = parseCookies();
        setLoading(true);
        document.documentElement.style.opacity = '0.5';
        setOrderTitle(details.id);
        document.documentElement.style.opacity = '1';
        setLoading(false);
    }
    const handleFileUpdate = (value) => {
        setFiles(value);
    }
    const handleIDReferenceUpdate = (value) => {
        setOrderTitle(value)
    }
    const handleUserInfoUpdate = (value) => {
        setUserInfo(value);
    }
    const completeOrder = async () => {
        const { user, userToken } = parseCookies();
        setLoading(true);
        document.documentElement.style.opacity = '0.5';
        const body = {
            id: order.id,
            cart,
            username: user,
            title: orderTitle,
            description: order.description,
            token: userToken,
        }
        const { data } = await axios.patch('/api/order', body);
        console.log(data);
        document.documentElement.style.opacity = '1';
        setLoading(false);
    }
    const [paymentMethod, setPaymentMethod] = useState(TRANSFER);
    const handlePaymentChange = (value) => setPaymentMethod(value);
    useEffect(() => {
        if (!total || !envio) {
            router.push('/');
        }
    }, [router, total, envio]);
    if (!total || !envio) return null;
    return (
        <div className="mx-8 md:mx-12 lg:mx-32 xl:mx-56">
            {loading && <Loading />}
            <div className="flex flex-col lg:flex-row w-full lg:space-x-4">
                <UserInfoForm setUserInfo={handleUserInfoUpdate} />
                <div className="w-full lg:max-w-lg">
                    <PurchaseSummary products={order.products} envio={envio} total={total} />
                    <div className="space-x-4 justify-between bg-white p-4 rounded shadow">
                        <div className="flex space-x-4 justify-between p-4">
                            <RadioButton
                                handleOnclick={handlePaymentChange}
                                value={TRANSFER}
                                title="Transferencia"
                                active={paymentMethod === TRANSFER} />
                            <RadioButton
                                handleOnclick={handlePaymentChange}
                                value={PAYPAL}
                                title="Paypal"
                                active={paymentMethod === PAYPAL} />
                        </div>
                        <div>
                            {paymentMethod === TRANSFER && <TransferForm setFile={handleFileUpdate} setReference={handleIDReferenceUpdate} />}
                            {paymentMethod === PAYPAL && <PaypalButton orderApprove={handleOrderApprove} total={parseInt(total) + parseInt(envio)} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = async (ctx) => {
    // if (!data) {
    //     return {
    //       redirect: {
    //         destination: '/',
    //         permanent: false,
    //       },
    //     }
    // }
    return {
        props: {
            data: null
        }
    }
}

export default Compra
