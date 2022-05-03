import CircularProgress from "@mui/material/CircularProgress";
import { FC } from "react";

type Props = {
  className?: string;
  size?: number;
};

const CircularProgressCentered: FC<Props> = ({
  size = 64,
  className,
}: Props) => {
  return (
    <div className={`grid place-items-center ${className}`}>
      <CircularProgress size={size} />
    </div>
  );
};

export default CircularProgressCentered;
