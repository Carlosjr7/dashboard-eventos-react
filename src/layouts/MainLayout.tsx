import type { Props } from "./Props";
import { Link } from "react-router-dom";

export function MainLayout({ children }: Props) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Eventos</h1>

       <nav className="space-y-3">
         <Link to="/" className="block text-gray-700 hover:text-blue-600">Dashboard</Link>
         <Link to="/eventos" className="block text-gray-700 hover:text-blue-600">Eventos</Link>
         <Link to="/clientes" className="block text-gray-700 hover:text-blue-600">Clientes</Link>
         <Link to="/configuracoes" className="block text-gray-700 hover:text-blue-600">Configurações</Link>
</nav>
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}