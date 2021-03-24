import axios from "axios";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/state";
import PaypalButton from '../components/PaypalButton'
import UserInfoForm from "../components/UserInfoForm";
import PurchaseSummary from "../components/PurchaseSummary";
import TransferForm from "../components/TransferForm";
import RadioButton from "../components/RadioButton";
import { FILL_EVERY_FIELDS, PAYPAL, SERVER_ERROR, TRANSFER } from "../lib/consts";
import { useRouter } from 'next/router';
import Button from "../components/Button";
import Loading from "../components/Loading";
import { getBinaryFromFile, getReceiptID } from "../lib/utils";
import ErrorMessage from "../components/ErrorMessage";
import Steps from "../components/Steps/Steps";
import useSEO from "../lib/useSEO";
import Head from "next/head";
import SEO from "../components/SEO";

function Compra() {
    const router = useRouter();
    const { cart, order } = useAppContext();
    const { total, envio } = order;
    const [loading, setLoading] = useState(false);
    const [orderTitle, setOrderTitle] = useState(null);
    const [files, setFiles] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [errorMessage, setErrorMessage] = useState(false);
    const [step, setStep] = useState(1);
    const [stepsCompleted, setStepsCompleted] = useState([]);
    const [error, setError] = useState(FILL_EVERY_FIELDS);
    const handleOrderApprove = async (details) => {
        setLoading(true);
        document.documentElement.style.opacity = '0.5';
        setOrderTitle(details.id);
        addStepCompleted(2);
        document.documentElement.style.opacity = '1';
        setLoading(false);
    }
    const handleFileUpdate = (value) => {
        setFiles(value);
        if (orderTitle && paymentMethod === TRANSFER && value) {
            addStepCompleted(2);
        } else removeStepCompleted(2);
    }
    const handleIDReferenceUpdate = (value) => {
        setOrderTitle(value);
        if (files && paymentMethod === TRANSFER && value.length) {
            addStepCompleted(2);
        } else removeStepCompleted(2);
    }
    const handleUserInfoUpdate = (value) => {
        setUserInfo(value);
        if (isUserInfoCompleted()) {
            addStepCompleted(1);
        } else removeStepCompleted(1)
    }
    const getFileInfo = async () => {
        if (files) {
            const binary = await getBinaryFromFile(files);
            const { data } = await axios.post(
                `${process.env.NEXT_PUBLIC_ORIGIN}/file/upload/node/orders/field_voucher?_format=json`,
                binary,
                {
                    headers: {
                        'Content-Type': 'application/octet-stream',
                        'Content-Disposition': `file; filename="${files.name}"`
                    },
                    auth: {
                        username: process.env.NEXT_PUBLIC_API_USER,
                        password: process.env.NEXT_PUBLIC_API_PASS,
                    }
                });
            return data;
        } else return files;
    }
    const addStepCompleted = (stepNumber) => {
        const newStepsCompleted = new Set([...stepsCompleted, stepNumber]);
        setStepsCompleted([...newStepsCompleted]);
    }
    const removeStepCompleted = (stepNumber) => {
        setStepsCompleted(stepsCompleted.filter(n => n !== stepNumber));
    }
    const isUserInfoCompleted = () => {
        if (!userInfo) return false;
        const {
            name,
            lastName,
            email,
            country,
            address1,
            address2,
            city,
            region,
            phoneNumber
        } = userInfo;
        return name && lastName && email && country && address1 &&
            address2 && city && region && phoneNumber
    }

    const completeOrder = async () => {
        if (!userInfo) {
            setErrorMessage(true);
            return;
        };
        if (!isUserInfoCompleted()) {
            setErrorMessage(true);
            return;
        } else setErrorMessage(false)
        const {
            name,
            lastName,
            email,
            country,
            address1,
            address2,
            city,
            region,
            phoneNumber,
            notes
        } = userInfo;
        const { user, userToken } = parseCookies();
        setLoading(true);
        document.documentElement.style.opacity = '0.5';
        const fileReference = await getFileInfo();
        const purchase = {
            ...userInfo,
            receipt: fileReference ? getReceiptID(fileReference) : null,
            referenceID: orderTitle,
            paymentMethod
        }
        const description = `
        <p>${order.description} </p>\n
        <p>Tipo de pago: ${paymentMethod} </p>
        <p>Nombre: ${name} ${lastName} </p>\n
        <p>Correo: ${email} </p>\n
        <p>Pais: ${country} </p>\n
        <p>Dirrecion: ${address1}, ${address2} </p>\n
        <p>Ciudad: ${city} </p>\n
        <p>Provincia: ${region} </p>\n
        <p>Telefono: ${phoneNumber} </p>\n
        <p>Notas: ${notes} </p>\n
        `;
        const body = {
            id: order.id,
            cart,
            username: user,
            title: order.title,
            description,
            token: userToken,
            purchaseInfo: purchase,
        }
        try {
            const { data } = await axios.patch('/api/order', body);
            window.location.href = `${window.location.origin}/gracias`
        } catch (error) {
            setError(SERVER_ERROR);
            setErrorMessage(true);
        }
    }
    const [paymentMethod, setPaymentMethod] = useState(TRANSFER);
    const handlePaymentChange = (value) => {
        setPaymentMethod(value);
        removeStepCompleted(2);
        setFiles(null);
        setOrderTitle(null);
    };
    useEffect(() => {
        if (!total || !envio) {
            router.push('/');
        }
    }, [router, total, envio]);
    if (!total || !envio) return null;
    const seoInfo = useSEO('compra');
    return (
        <main className="mx-8 md:mx-12 lg:mx-32 xl:mx-56">
            <Head>
                <SEO
                    title={seoInfo.title}
                    description={seoInfo.description}
                    imageUrl={seoInfo.image}
                    url={seoInfo.url}
                />
            </Head>
            {loading && <Loading />}
            <div className="flex flex-col w-full">
                <Steps currentStep={step} setCurrentStep={setStep} stepsCompleted={stepsCompleted} />
                <div className={`${step === 1 ? 'block' : 'hidden'}`}>
                    <UserInfoForm setUserInfo={handleUserInfoUpdate} />
                </div>
                <div className={`w-full py-4 ${step === 2 ? 'block' : 'hidden'}`}>
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
            <div className={`py-4 ${step === 3 ? 'block' : 'hidden'}`}>
                <PurchaseSummary products={order.products} envio={envio} total={total} />
                <Button text={'Finalizar Compra'} click={completeOrder} />
                {errorMessage && <ErrorMessage error={error} />}
            </div>
        </main>
    )
}

export const getServerSideProps = async (ctx) => {
    return {
        props: {
            data: null
        }
    }
}

export default Compra
