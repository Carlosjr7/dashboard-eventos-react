import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { mes: "Jan", clientes: 10 },
  { mes: "Fev", clientes: 18 },
  { mes: "Mar", clientes: 25 },
  { mes: "Abr", clientes: 30 },
  { mes: "Mai", clientes: 40 },
  { mes: "Jun", clientes: 48 },
];

export default function LineChartClients() {
  return (
    <div className="bg-white/20 backdrop-blur-md p-6 rounded-xl shadow-xl border border-white/30">
      <h3 className="text-xl font-bold mb-4">Clientes cadastrados</h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="mes" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="clientes"
            stroke="#34d399"
            strokeWidth={3}
            dot={{ r: 5, fill: "#34d399" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}