import { PieChart, Pie, Sector, Cell,Label } from "recharts";
import { useSwitchThemeContext } from "hooks";
const PieChartDashBoard = ({chartData, percentage}) => {
  const { currentTheme } = useSwitchThemeContext();
  return (
    <PieChart width={220} height={160}>
      	<text x={113} y={75} textAnchor="middle" dominantBaseline="middle" fontSize="24px" fontWeight="600" style={{fill: `${currentTheme === "dark" ? "#ffffff" : "#141414"}`}}>
        	{percentage}<a fontSize="12px" fontWeight="800">%</a>
        </text>
        <text x={110} y={92} textAnchor="middle" dominantBaseline="middle" fontSize="11px" style={{fill: `${currentTheme === "dark" ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.6)"}`}}>Members</text>
      <Pie
        data={chartData}
        cx="50%"
        cy="50%"
        startAngle={270}
        endAngle={-260}
        innerRadius="60%"
        outerRadius="80%"
        stroke="none"
        dataKey="value"
      />
    </PieChart>
  );
};

export default PieChartDashBoard;
