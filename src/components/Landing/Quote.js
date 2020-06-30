import React from "react";
import "./styles/quote.scss";
const Quote = () => {
  return (
    <section data-testid="quote-section" className="quote-section">
      <p className="parenthood-quote text-md">
        -La función de un hijo es vivir su propia vida, no vivir la vida que su
        padre ansioso cree que debe vivir. <em>-A.S. Neill.</em>
      </p>
    </section>
  );
};

export default Quote;
