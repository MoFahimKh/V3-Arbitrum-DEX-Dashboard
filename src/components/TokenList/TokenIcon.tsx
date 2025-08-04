import { TOKEN_ICON_URL } from "@/config/constants";
import React from "react";

type TokenIconProps = {
  address: string;
  name: string;
  alt?: string;
  className?: string;
};

export const TokenIcon: React.FC<TokenIconProps> = ({
  address,
  name,
  alt,
  className,
}) => {
  const [imgError, setImgError] = React.useState(false);

  if (!address || !name) return null;

  const colors = [
    "bg-teal-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-yellow-500",
    "bg-orange-500",
    "bg-green-500",
    "bg-gray-500",
  ];
  const colorIndex =
    address.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) %
    colors.length;

  return imgError ? (
    <div
      className={`flex items-center justify-center rounded-full ${colors[colorIndex]} text-white font-medium`}
      style={{ width: 20, height: 20, fontSize: 12, userSelect: "none" }}
    >
      {name[0].toUpperCase()}
    </div>
  ) : (
    <img
      src={TOKEN_ICON_URL(address)}
      alt={alt || name}
      width={20}
      height={20}
      className={`rounded-full object-cover ${className || ""}`}
      onError={() => setImgError(true)}
      style={{ width: 20, height: 20 }}
      loading="lazy"
    />
  );
};
