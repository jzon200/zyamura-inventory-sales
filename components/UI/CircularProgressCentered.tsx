import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { FC } from "react";

const CircularProgressCentered: FC = () => {
  return (
    <div className="grid place-items-center h-screen">
      <CircularProgress />
    </div>
  );
};

export default CircularProgressCentered;
