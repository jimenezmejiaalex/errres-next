import Link from 'next/link'

function Item({id, image, title, author, date}) {
    return (
        <Link href={`/blog/${id}`}>
            <div className="pb-5 border-b-2 border-current cursor-pointer w-full md:w-64">
                <img className="w-full h-64 md:h-48 mb-3 object-cover object-center" src={image} alt={title}/>
                <h2 className="text-2xl font-semibold mt-5 mb-2 text-eden border-b-0 hover:border-b-2">{title}</h2>
                <p className="uppercase text-xs font-normal text-leather">{`POR: ${author} | ${date}`}</p>
            </div>
        </Link>
    )
}

export default Item
