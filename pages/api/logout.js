import axios from "axios";

export default async (req, res) => {
    try {
        axios.defaults.withCredentials = true;
        const { status, statusText } = await axios.get(`${process.env.ORIGIN}/user/logout?_format=json&token=logout_token`);
        if (status === 200 && statusText === 'OK') {
            res.status(200).json({ success: true, });
        } else {
            res.status(400).json({ status: 'error', error: 'Error de servidor al salir de la cuenta' });
        }
    } catch (error) {
        console.error(error)
    }
}