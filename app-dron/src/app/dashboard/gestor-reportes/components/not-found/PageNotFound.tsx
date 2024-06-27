import Image from "next/image";
import Link from "next/link";

export const PageNotFound = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row h-full w-full p-10 justify-center items-center align-middle">
      <div className="text-center px-5 mx-5">
        <h2
          className={` antialiased text-6xl sm:text-7xl md:text-8xl lg:text-9xl`}
        >
          404
        </h2>
        <p className="font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
          Whoops! Lo sentimos mucho.
        </p>
        <p className="font-light">
          <span>Puedes regresar a la </span>
          <Link href="/" className="font-normal hover:underline transition-all">
            Pagina anterior
          </Link>
        </p>
      </div>
      <div className="px-5 mx-5">
        <Image
          src="/images/starman_750x750.png"
          alt="Starman"
          className="p-5"
          width={550}
          height={550}
        />
      </div>
    </div>
  );
};
