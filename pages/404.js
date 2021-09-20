import Link from 'next/link'
import Button from '../components/Button'

export default function Custom404() {
  return (
    <main className=" my-40 text-center mx-8 md:mx-12 lg:mx-32 xl:mx-56 flex flex-col items-center">
      <h1 className="text-eden text-6xl">404 - Error</h1>
      <div className=" w-64">
        <Link href="/">
          <a>
            <Button text="Regresar a Inicio" />
          </a>
        </Link>
      </div>
    </main>
  )
}
