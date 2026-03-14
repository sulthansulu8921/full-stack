import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">

        {/* TOP */}
        <div className="row footer-top">

          {/* BRAND */}
          <div className="col-lg-4 col-md-6 footer-brand">
            <h3 className="footer-logo">SHOP.CO</h3>
            <p className="footer-desc">
              We have clothes that suits your style and which you’re proud to
              wear. From women to men.
            </p>

            <div className="footer-social">
              <i className="bi bi-twitter"></i>
              <i className="bi bi-facebook"></i>
              <i className="bi bi-instagram"></i>
              <i className="bi bi-youtube"></i>
            </div>
          </div>

          {/* LINKS */}
          <div className="col-lg-8 col-md-6">
            <div className="row">

              <div className="col-6 col-md-3 footer-col">
                <h4>COMPANY</h4>
                <p>About</p>
                <p>Features</p>
                <p>Works</p>
                <p>Career</p>
              </div>

              <div className="col-6 col-md-3 footer-col">
                <h4>HELP</h4>
                <p>Customer Support</p>
                <p>Delivery Details</p>
                <p>Terms & Conditions</p>
                <p>Privacy Policy</p>
              </div>

              <div className="col-6 col-md-3 footer-col">
                <h4>FAQ</h4>
                <p>Account</p>
                <p>Manage Deliveries</p>
                <p>Orders</p>
                <p>Payments</p>
              </div>

              <div className="col-6 col-md-3 footer-col">
                <h4>RESOURCES</h4>
                <p>Free eBooks</p>
                <p>Development Tutorial</p>
                <p>How to - Blog</p>
                <p>YouTube Playlist</p>
              </div>

            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="footer-bottom">
          <p>Shop.co © 2000-2023, All Rights Reserved</p>

          <div className="footer-payments">
            <img src="https://press-release-v1-new.s3.ap-south-1.amazonaws.com/order/43008/1760089449538_content_img.jpeg" alt="Visa" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg" alt="Mastercard" />
            <img src="https://freepngimg.com/save/13626-paypal-logo-png/2272x864" alt="PayPal" />
            <img src="https://www.logo.wine/a/logo/Apple_Pay/Apple_Pay-Logo.wine.svg" alt="Apple Pay" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/250px-Google_Pay_Logo.svg.png" alt="G Pay" />
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
