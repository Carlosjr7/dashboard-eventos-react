import BarChartEvents from "../components/charts/BarChartEvents";
import LineChartClients from "../components/charts/LineChartClients";
import PieChartStatus from "../components/charts/PieChartStatus";

export default function Dashboard(){
  return(
    <div className="p-8 space-y-10">
      <h2 className="text-3x1 font-bold">Dashboard</h2>

      {/* Graficos */}
      <div className=" grid grid-cols-1 lg:grid-cols-3 gap-6">
        <BarChartEvents/>
        <LineChartClients/>
        <PieChartStatus/>
      </div>
    </div>
  );
}