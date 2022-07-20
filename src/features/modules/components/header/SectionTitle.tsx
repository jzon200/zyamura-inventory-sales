type Props = {
  title: string;
  className?: string;
};

export default function SectionTitle({ title, className }: Props) {
  return <div className={`text-3xl text-[#AAA683] ${className}`}>{title}</div>;
}
