import axios from "axios";

export default async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const userData = await axios.get(`${process.env.SERVER}/users/${username}`);
        if (userData.data.length !== 0) {
            res.status(400).json({ status: 'error', error: 'El usuario ya existe' });
        }
        const userDataEmail = await axios.get(`${process.env.SERVER}/users/email/${email}`);
        if (userDataEmail.data.length !== 0) {
            res.status(400).json({ status: 'error', error: 'El correo ya existe' });
        }
        const { status, statusText } = await axios.post(`${process.env.ORIGIN}/user/register?_format=json`,
            {
                name: { value: username },
                mail: { value: email },
                pass: { value: password }
            },
        );
        if (status === 200 && statusText === 'OK') {
            res.status(200).json({ success: true, });
        }
    } catch (error) {
        console.error(error);
    }
}