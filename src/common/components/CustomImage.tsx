import Image from "next/image";

type Props = {
  imageUrl: string | null;
  width?: string | number;
  height?: string | number;
};

export default function CustomImage({
  imageUrl,
  width = 80,
  height = 80,
}: Props) {
  return (
    <Image
      className="rounded-md"
      src={imageUrl != null ? imageUrl : "/assets/svg/image_placeholder.svg"}
      width={width}
      height={height}
      objectFit="cover"
      alt=""
    />
  );
}
