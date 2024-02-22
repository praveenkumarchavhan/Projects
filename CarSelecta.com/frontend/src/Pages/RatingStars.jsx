import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

function RatingStars({ rating }) {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating - filledStars >= 0.5;
  const emptyStars = hasHalfStar ? 4 - filledStars : 5 - filledStars;
  const stars = [];

  for (let i = 0; i < filledStars; i++) {
    stars.push(<FaStar key={i} style={{color:'orange', fontSize:'16px', marginRight:'3px'}}/>);
  }

  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key={filledStars} style={{ fontSize:'16px', marginRight:'3px'}} className="half-star" />);
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <FaRegStar
      style={{ fontSize:'16px', marginRight:'3px'}}
        key={i + filledStars + (hasHalfStar ? 1 : 0)}
        className="empty-star"
      />
    );
  }

  return <div className="star-rating">{stars}</div>;
}
export default RatingStars;
