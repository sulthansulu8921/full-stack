import { useEffect, useRef, useState } from "react";
import "../styles/testimonials.css";

function Testimonials() {
  const scrollRef = useRef(null);
  const [reviews, setReviews] = useState([]);

  const scroll = (direction) => {
    const amount = 360; // wider cards
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // BACKEND READY
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch(() => {
        // FALLBACK DATA (MORE REVIEWS)
        setReviews([
          {
            id: 1,
            name: "Sarah M.",
            rating: 5,
            comment:
              "I'm blown away by the quality and style of the clothes I received from Shop.co.",
            verified: true,
          },
          {
            id: 2,
            name: "Alex K.",
            rating: 5,
            comment:
              "Finding clothes that match my style was difficult until I discovered Shop.co.",
            verified: true,
          },
          {
            id: 3,
            name: "James L.",
            rating: 5,
            comment:
              "The selection is diverse and delivery was super fast. Very impressed!",
            verified: true,
          },
          {
            id: 4,
            name: "Olivia P.",
            rating: 5,
            comment:
              "Fabric quality is amazing and the fit is perfect. Highly recommended.",
            verified: true,
          },
          {
            id: 5,
            name: "Ethan R.",
            rating: 5,
            comment:
              "Great prices, stylish designs, and excellent customer service.",
            verified: true,
          },
          {
            id: 6,
            name: "Sophia W.",
            rating: 5,
            comment:
              "Every time I order, I get compliments on my outfits!",
            verified: true,
          },
          {
            id: 7,
            name: "Daniel T.",
            rating: 5,
            comment:
              "The product looks exactly like the photos. Amazing experience.",
            verified: true,
          },
          {
            id: 8,
            name: "Noah A.",
            rating: 5,
            comment:
              "Premium feel at an affordable price. Will order again!",
            verified: true,
          },
        ]);
      });
  }, []);

  return (
    <section className="testimonials">
      <div className="testimonials-header">
        <h2>OUR HAPPY CUSTOMERS</h2>

        <div className="arrows">
          <button onClick={() => scroll("left")}>←</button>
          <button onClick={() => scroll("right")}>→</button>
        </div>
      </div>

      <div className="testimonials-scroll" ref={scrollRef}>
        <div className="testimonials-cards">
          {reviews.map((review) => (
            <div className="testimonial-card" key={review.id}>
              <div className="stars">{"★".repeat(review.rating)}</div>

              <h4>
                {review.name}
                {review.verified && (
                  <span className="verified"> ●</span>
                )}
              </h4>

              <p>“{review.comment}”</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
