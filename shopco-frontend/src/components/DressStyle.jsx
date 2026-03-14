

import "../styles/dressStyle.css";

function DressStyle() {
  const styles = [
    { title: "Casual", className: "casual" },
    { title: "Formal", className: "formal" },
    { title: "Party", className: "party" },
    { title: "Gym", className: "gym" },
  ];

  return (
    <section className="dress-style">
      <div className="dress-container">
        <h2 className="dress-title">BROWSE BY DRESS STYLE</h2>
        <div className="dress-grid">
          {styles.map((item, index) => (
            <div key={index} className={`dress-card ${item.className}`}>
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DressStyle;
