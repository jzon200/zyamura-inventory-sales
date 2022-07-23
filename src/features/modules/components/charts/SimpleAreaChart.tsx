import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Props = {
  data: object[];
};

export default function SimpleAreaChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height="100%" maxHeight={384}>
      <AreaChart
        width={730}
        height={250}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="50%" stopColor="#22C55E" stopOpacity={0.65} />
            <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="5 5" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="Total sales"
          stroke="#22C55E"
          activeDot={{ strokeWidth: 2, r: 6 }}
          strokeWidth={4}
          fillOpacity={1}
          fill="url(#colorPv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
