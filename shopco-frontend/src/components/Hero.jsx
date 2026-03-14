import React from "react";
import "../styles/hero.css";

function Hero() {
  return (
    <section className="hero py-5">
      <div className="container">
        <div className="row align-items-center">

          {/* TEXT */}
          <div className="col-lg-6 col-md-6 text-center text-md-start mb-4 mb-md-0 hero-text">
            <h1 className="hero-title">
              FIND CLOTHES <br />
              THAT MATCHES <br />
              YOUR STYLE
            </h1>

            <p className="mt-3">
              Browse through our diverse range of meticulously crafted garments,
              designed to bring out your individuality and cater to your sense of
              style.
            </p>

            <button className="btn btn-dark px-4 py-2 mt-3 shop-btn" onClick={() => {
              window.location.href = "/products";
            }}>
              Shop Now
            </button>

            <div className="stats d-flex justify-content-center justify-content-md-start gap-4 mt-4 flex-wrap">
              <div className="stat-item text-center text-md-start">
                <h3>200+</h3>
                <p>International Brands</p>
              </div>
              <div className="stat-item text-center text-md-start">
                <h3>2,000+</h3>
                <p>High-Quality Products</p>
              </div>
              <div className="stat-item text-center text-md-start">
                <h3>30,000+</h3>
                <p>Happy Customers</p>
              </div>
            </div>
          </div>

          {/* IMAGE */}
          <div className="col-lg-6 col-md-6 text-center hero-image-wrapper">
            <img
              src="/hero-img.png"
              alt="model"
              className="img-fluid hero-image"
            />
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;
