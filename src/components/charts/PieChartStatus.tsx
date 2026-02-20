import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Pendentes", value: 3 },
  { name: "Concluídos", value: 12 },
  { name: "Cancelados", value: 1 },
];

const COLORS = ["#fbbf24", "#34d399", "#f87171"];

export default function PieChartStatus() {
  return (
    <div className="bg-white/20 backdrop-blur-md p-6 rounded-xl shadow-xl border border-white/30">
      <h3 className="text-xl font-bold mb-4">Status dos eventos</h3>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={90}
            fill="#8884d8"
            label
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}