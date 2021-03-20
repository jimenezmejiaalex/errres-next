import { useState } from 'react'
import countries from '../context/countries.json'
import { DEFAULT_COUNTRY } from '../lib/consts';
function UserInfoForm({setUserInfo}) {
    const [country, setCountry] = useState(DEFAULT_COUNTRY.code);
    const [userInfoState, setUserInfoState] = useState({});
    const handleOnchangeInfo = ({target})=> {
        const {name, value} = target;
        setUserInfoState({
            ...userInfoState,
            [name] : value
        });
        setUserInfo(userInfoState);
    }
    return (
        <>
            <form className="w-full lg:max-w-lg">
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-2xl py-4 pt-0">Dirección de Envío</h2>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                Nombre <span className=" text-red-600">*</span>
                            </label>
                            <input onChange={handleOnchangeInfo} value={userInfoState.name||''} name="name" required className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Nombre" />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Apellido <span className=" text-red-600">*</span>
                            </label>
                            <input onChange={handleOnchangeInfo} value={userInfoState.lastName||''} name="lastName" required className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Apellido" />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                                Correo <span className=" text-red-600">*</span>
                            </label>
                            <input onChange={handleOnchangeInfo} value={userInfoState.email||''} name="email" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="email" type="email" placeholder="Correo" />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                                País / Región <span className=" text-red-600">*</span>
                            </label>
                            <select onChange={handleOnchangeInfo} value={userInfoState.country||country} name="country" id={country} className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                {countries.map(({ name, code }) => <option key={`country-option-${code}`} value={code} >{name}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                                Dirección de la calle <span className=" text-red-600">*</span>
                            </label>
                            <input onChange={handleOnchangeInfo} value={userInfoState.address1||''} name="address1" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="calle-direccion" type="text" placeholder="Número de la casa y nombre de la calle" />
                            <input onChange={handleOnchangeInfo} value={userInfoState.address2||''} name="address2" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="calle-aparteamento" type="text" placeholder="Apartamento, habitación, etc. (opcional)" />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                                Localidad / Ciudad <span className=" text-red-600">*</span>
                            </label>
                            <input onChange={handleOnchangeInfo} value={userInfoState.city||''} name="city" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="localidad" type="text" />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                                Región / Provincia <span className=" text-red-600">*</span>
                            </label>
                            <input onChange={handleOnchangeInfo} value={userInfoState.region||''} name="region" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="provincia" type="text" />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                                Teléfono  <span className=" text-red-600">*</span>
                            </label>
                            <input onChange={handleOnchangeInfo} value={userInfoState.phoneNumber||''} name="phoneNumber" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="telefono" type="tel" />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                                Notas del pedido (opcional)
                            </label>
                            <textarea onChange={handleOnchangeInfo} value={userInfoState.notes||''} name="notes" className=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none" id="notas" defaultValue={""} placeholder="Notas sobre tu pedido, por ejemplo, notas especiales para la entrega." />
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default UserInfoForm
