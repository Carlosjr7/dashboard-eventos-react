import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer} from "recharts";

const data =[
    { nome: "Jan", eventos: 8},
    { nome: "Fev", eventos: 12},
    { nome: "Mar", eventos: 5},
    { nome: "Abr", eventos: 10},
    { nome: "Mai", eventos: 7},
    { nome: "Jun", eventos: 15},
];

export default function BarChartEvents() {
    return (
        <div className="bg-white/20 backdrop-blur-md p-6 rounded-x1 shadow-x1 border border-white/30">
            <h3 className="text-x1 font-bold mb-4">Eventos por mês</h3>

            <ResponsiveContainer width="100%" height={250}>
               <BarChart data={data}>
               <XAxis stroke="#000"/>
               <YAxis stroke="#000"/>
               <Tooltip />
               <Bar dataKey="eventos" fill="#60a5fa" radius={[6, 6, 0, 0]} />
               </BarChart>
            </ResponsiveContainer>
        </div>
    );
}