import React from "react";

type Props = {
  title: string;
  className?: string;
};

const SectionTitle = ({ title, className }: Props) => {
  return <div className={`text-3xl text-[#AAA683] ${className}`}>{title}</div>;
};

export default SectionTitle;
