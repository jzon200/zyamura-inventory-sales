import CircularProgress from "@mui/material/CircularProgress";
import { FC } from "react";

type Props = {
  size?: number;
};

const CircularProgressCentered: FC = ({ size = 64 }: Props) => {
  return (
    <div className="grid place-items-center h-screen">
      <CircularProgress size={size} />
    </div>
  );
};

export default CircularProgressCentered;
