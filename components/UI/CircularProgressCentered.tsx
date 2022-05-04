import CircularProgress from "@mui/material/CircularProgress";

type Props = {
  className?: string;
  size?: number;
};

const CircularProgressCentered = ({ size = 64, className }: Props) => {
  return (
    <div className={`grid place-items-center ${className}`}>
      <CircularProgress size={size} />
    </div>
  );
};

export default CircularProgressCentered;
