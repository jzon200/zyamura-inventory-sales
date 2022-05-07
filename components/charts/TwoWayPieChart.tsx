import { Label, LabelList, Pie, PieChart, ResponsiveContainer } from "recharts";

const data01 = [
  { name: "Fish", value: 400 },
  { name: "Dogs", value: 300 },
  { name: "Materials", value: 300 },
  { name: "Other", value: 200 },
];
const data02 = [
  { name: "A1", value: 100 },
  { name: "A2", value: 300 },
  { name: "B1", value: 100 },
  { name: "B2", value: 80 },
  { name: "B3", value: 40 },
  { name: "B4", value: 30 },
  { name: "B5", value: 50 },
  { name: "C1", value: 100 },
  { name: "C2", value: 200 },
  { name: "D1", value: 150 },
  { name: "D2", value: 50 },
];

const TwoWayPieChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%" maxHeight={384}>
      <PieChart width={400} height={300}>
        <Pie
          data={data01}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={80}
          stroke="#081830"
          fill="#47D4CA"
        >
          <LabelList
            dataKey="name"
            position="top"
            stroke="#fff"
            strokeWidth={0.75}
          />
        </Pie>
        <Pie
          data={data02}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={95}
          outerRadius={130}
          stroke="#081830"
          fill="#D5639C"
          color="#fff"
          label
          //   label={{ fill: "#fff" }}
        >
          <LabelList
            dataKey="name"
            position="top"
            stroke="#fff"
            strokeWidth={0.75}
          />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default TwoWayPieChart;
