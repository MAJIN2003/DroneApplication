import NavBar from "@/shared/components/navbar/NavBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="w-full flex-1 flex justify-center bg-gray-100 p-4">
        <div className="container">
        {children}
        </div>
      </main>
    </div>
  );
}
