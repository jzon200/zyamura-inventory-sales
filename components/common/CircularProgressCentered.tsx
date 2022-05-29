import CircularProgress from "@mui/material/CircularProgress";

type Props = {
  className?: string;
  size?: number;
  color?: "primary" | "inherit";
};

const CircularProgressCentered = ({
  size = 64,
  className,
  color = "primary",
}: Props) => {
  return (
    <div className={`grid place-items-center h-full ${className}`}>
      <CircularProgress size={size} color={color} />
    </div>
  );
};

export default CircularProgressCentered;
