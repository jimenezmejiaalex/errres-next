import Link from "next/link";

function Thumbnail({image, title, body, id}) {
    return (
        <div className="flex flex-col md:flex-row lg:space-x-6">
            <img className="md:max-w-lg md:max-h-sm w-full h-full object-cover object-center p-4" src={image} alt={title}/>
            <div className="text-center md:text-left py-4">
                <h2 className="text-2xl font-medium text-eden pb-4">{title}</h2>
                <div className="text-leather py-4" dangerouslySetInnerHTML={{__html: body}}></div>
                <div>
                    <button type="button"
                            className="border border-eden bg-eden text-base lg:text-xl text-white rounded-md px-4 py-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
                        >
                            <Link href={`/blog/${id}`}>
                                Leer Más
                            </Link>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Thumbnail
