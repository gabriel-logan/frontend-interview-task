import { IoStarHalfSharp, IoStarOutline, IoStarSharp } from "react-icons/io5";

export default function RatingStars({
  rating,
  size = 20,
  color = "#b7b742",
}: {
  rating: number;
  size?: number;
  color?: string;
}) {
  return (
    <span className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => {
        if (rating >= star) {
          return <IoStarSharp key={star} color={color} size={size} />;
        } else if (rating >= star - 0.5) {
          return <IoStarHalfSharp key={star} color={color} size={size} />;
        } else {
          return <IoStarOutline key={star} color={color} size={size} />;
        }
      })}
    </span>
  );
}
