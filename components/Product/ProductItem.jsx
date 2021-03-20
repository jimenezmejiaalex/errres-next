import Link from "next/link"
import AddToCartButton from "./AddToCartButton"

function ProductItem({image, title, id, price, uid, deleteMe}) {
    return (
            <div className="flex flex-col p-4 w-full md:max-w-xs">
                <Link href={`/producto/${id}`}>
                    <div className="cursor-pointer">
                        <img className=" hover:opacity-50 md:max-h-56 md:h-full md:object-cover md:object-center" src={image} alt={title}/>
                        <h2 className="text-lg text-eden py-2">{title}</h2>
                        <span className="text-base font-semibold text-leather">{`₡ ${parseInt(price)}`}</span>
                    </div>
                </Link>
                <AddToCartButton item={{image, title, id, price, uid}} deleteMe={deleteMe}/>
            </div>
    )
}

export default ProductItem
