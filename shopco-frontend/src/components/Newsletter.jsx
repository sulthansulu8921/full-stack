import "../styles/newsletter.css";

function Newsletter() {
  return (
    <section className="newsletter">
      <div className="newsletter-box">
        <h2>
          STAY UP TO DATE ABOUT <br />
          OUR LATEST OFFERS
        </h2>

        <div className="newsletter-form">
          <div className="input-box">
            <span className="mail-icon">✉️</span>
            <input
              type="email"
              placeholder="Enter your email address"
            />
          </div>

          <button>Subscribe to Newsletter</button>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
