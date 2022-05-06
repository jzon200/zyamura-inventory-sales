type Props = {
  title: string;
  className?: string;
};

const TitleHeader = ({ title, className }: Props) => {
  return (
    <div className={`text-3xl text-[#AAA683] select-none ${className}`}>
      {title}
    </div>
  );
};

export default TitleHeader;
