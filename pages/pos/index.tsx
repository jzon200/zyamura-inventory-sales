import { ReactElement } from "react";

const PointOfSales = () => {
  return <div>PointOfSales</div>;
};

PointOfSales.getLayout = function getLayout(page: ReactElement) {
  return <div className="bg-blue-500 h-screen">{page}</div>;
};

export default PointOfSales;
