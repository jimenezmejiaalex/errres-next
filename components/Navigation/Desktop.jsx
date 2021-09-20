import Link from 'next/link'

function Desktop() {
  return (
    <ul className="text-center space-x-6 flex flex-row">
      <li className="cursor-pointer text-2xl text-eden hover:text-leather border-line-top-menu h-20 flex items-center">
        <Link href="/">
          <a className=" p-4">Inicio</a>
        </Link>
      </li>
      <li className="cursor-pointer text-2xl text-eden hover:text-leather border-line-top-menu h-20 flex items-center">
        <Link href="/tienda">
          <a className=" p-4">Tienda</a>
        </Link>
      </li>
      <li className="cursor-pointer text-2xl text-eden hover:text-leather border-line-top-menu h-20 flex items-center">
        <Link href="/blog">
          <a className=" p-4">Blog</a>
        </Link>
      </li>
      <li className="cursor-pointer text-2xl text-eden hover:text-leather border-line-top-menu h-20 flex items-center">
        <Link href="/informacion">
          <a className=" p-4">Información</a>
        </Link>
      </li>
    </ul>
  )
}

export default Desktop
