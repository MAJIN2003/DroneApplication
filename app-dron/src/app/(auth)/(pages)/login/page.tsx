import Image from "next/image";
import Link from "next/link";
import FormLogin from "../../components/FormLogin";

export default function LoginPage() {
  return (
    <div className="w-full max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-md ">
      <div className="px-10 py-9">
        <h2 className="text-3xl font-bold text-center text-gray-700">
          Gestión Reportes UAV
        </h2>

        <div className="flex justify-center mx-auto mt-4">
          <Image
            src="/images/logo.png"
            className="w-auto h-28 sm:h-40"
            width={500}
            height={500}
            alt="Logo"
          />
        </div>

        <h3 className="mt-3 text-xl font-medium text-center text-gray-600 ">
          Inicio de sesión
        </h3>

        <FormLogin />
      </div>

      <div className="flex items-center justify-center py-4 text-center bg-gray-50">
        <span className="text-sm text-gray-600 ">Eres nuevo? </span>
        <Link
          href="/register"
          className="mx-2 text-sm font-bold text-blue-500 hover:underline"
        >
          Registrarse
        </Link>
      </div>
    </div>
  );
}
