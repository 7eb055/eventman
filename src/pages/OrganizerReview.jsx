const Reviews = () => {
  const reviews = [
    { id: 1, user: "Alex", rating: 5, comment: "Great event!" },
    { id: 2, user: "Taylor", rating: 4, comment: "Well organized" }
  ];

  return (
    <div className="page">
      <h1>Event Reviews</h1>
      <div className="reviews">
        {reviews.map(review => (
          <div key={review.id} className="review-card">
            <h3>{review.user}</h3>
            <p>Rating: {'★'.repeat(review.rating)}</p>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;