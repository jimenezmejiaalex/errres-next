function PurchaseSummary({ products, envio, total }) {
    return (
        <div className="space-y-2 bg-white p-4 rounded shadow w-full lg:max-w-lg">
            <h2 className=" text-2xl py-4 pt-0 ">Tu pedido</h2>
            <div className=" overflow-hidden">
                <table className=" flex-col flex-no-wrap table-auto w-full leading-normal">
                    <thead className="uppercase text-xs font-semibold text-gray-600 bg-gray-200">
                        <tr className="table-row">
                            <th className="text-left p-2">
                                <p>Producto</p>
                            </th>
                            <th className="text-left p-2">
                                <p>Subtotal</p>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="flex-1 sm:flex-none">
                        {
                            products.map(
                                ({ title, price }) => (
                                    <tr className=" p-2 hover:bg-gray-100 table-row flex-col flex-no-wrap">
                                        <td className="p-2">
                                            <p className="truncate ...">{title}</p>
                                        </td>
                                        <td className="p-2">
                                            <p className="truncate ...">{`₡ ${parseInt(price)}`}</p>
                                        </td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
                <table className="table flex-col flex-no-wrap table-auto w-full leading-normal">
                    <thead className="uppercase text-xs font-semibold text-gray-600 bg-gray-200">
                        <tr className="table-row">
                            <th className="text-left p-2">
                                <p>Envio</p>
                            </th>
                            <th className="text-left p-2">
                                <p>{`₡ ${parseInt(envio)}`}</p>
                            </th>
                        </tr>
                    </thead>
                    {/* <thead className="uppercase text-xs font-semibold text-gray-600 bg-gray-200">
                        <tr className="table-row">
                            <th className="text-left p-2">
                                <p>Producto</p>
                            </th>
                            <th className="text-left p-2">
                                <p>Subtotal</p>
                            </th>
                        </tr>
                    </thead> */}
                    <tr className=" p-2 text-lg font-bold hover:bg-gray-100 table-row flex-col flex-no-wrap">
                        <td className="p-2">
                            <p className="truncate ..">Total</p>
                        </td>
                        <td className="p-2">
                            <p className="truncate ...">{`₡ ${parseInt(total)}`}</p>
                        </td>
                    </tr>
                </table>
            </div>
        </div>

    )
}

export default PurchaseSummary
