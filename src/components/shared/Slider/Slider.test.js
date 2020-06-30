import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Slider from "./";

const setup = (cardsQty) => {
  const cards = new Array(cardsQty)
    .fill(undefined)
    .map((e, i) => <Card index={i} key={i} />);
  const queryMethods = render(<Slider items={cards} itemWidthInPx="180" />);

  const clickNext = () => {
    userEvent.click(
      queryMethods
        .getByTestId("apa-slider")
        .querySelector(".apa-slider-next-arrow")
    );
    fireEvent.animationEnd(
      queryMethods
        .getByTestId("apa-slider")
        .querySelector(".apa-slider-items-container")
    );
  };
  const clickPrev = () => {
    userEvent.click(
      queryMethods
        .getByTestId("apa-slider")
        .querySelector(".apa-slider-prev-arrow")
    );
    fireEvent.animationEnd(
      queryMethods
        .getByTestId("apa-slider")
        .querySelector(".apa-slider-items-container")
    );
  };
  return { cards, clickNext, clickPrev, ...queryMethods };
};

const Card = ({ index = 0 }) => {
  return (
    <div
      style={{ height: "300px", width: "180px", backgroundColor: "red" }}
      data-testid="sample-card"
      className={`card-${index}`}
    >
      card-{index}
    </div>
  );
};

describe("<Slider />", () => {
  it("renders single card component", () => {
    const { getAllByTestId } = render(
      <Slider items={[<Card key="unique key" />]} itemWidthInPx="180" />
    );
    expect(getAllByTestId("sample-card")).toHaveLength(1);
  });

  it("renders only components that fit in viewport width", () => {
    const { getAllByTestId } = setup(10);
    expect(getAllByTestId("sample-card")).toHaveLength(5); // jsdom sets innerWidth to 1024 and slider adds 10px padding
  });

  it("renders only components that fit in viewport width", () => {
    const { getAllByTestId, getByTestId } = setup(10);
    expect(getAllByTestId("sample-card")).toHaveLength(5);
    expect(
      getByTestId("apa-slider").querySelector(".card-5")
    ).not.toBeInTheDocument();
  });

  it("slides forwards and backwards", () => {
    const { getByTestId, clickNext, clickPrev } = setup(10);

    clickNext();

    expect(
      getByTestId("apa-slider").querySelector(".card-0")
    ).not.toBeInTheDocument();
    expect(
      getByTestId("apa-slider").querySelector(".card-5")
    ).toBeInTheDocument();

    clickPrev();

    expect(
      getByTestId("apa-slider").querySelector(".card-0")
    ).toBeInTheDocument();
    expect(
      getByTestId("apa-slider").querySelector(".card-5")
    ).not.toBeInTheDocument();
  });

  it("clicking back button does nothing if first component on start", () => {
    const { getByTestId, clickPrev } = setup(10);
    clickPrev();

    expect(
      getByTestId("apa-slider").querySelector(".card-0")
    ).toBeInTheDocument();
    expect(
      getByTestId("apa-slider").querySelector(".card-4")
    ).toBeInTheDocument();
  });

  it("clicking on next button does nothing if last component on end", () => {
    const { getByTestId, clickNext } = setup(5);

    clickNext();

    expect(
      getByTestId("apa-slider").querySelector(".card-0")
    ).toBeInTheDocument();
    expect(
      getByTestId("apa-slider").querySelector(".card-4")
    ).toBeInTheDocument();
  });

  it("disables prev button if first component on start", () => {
    const { getByTestId } = setup(10);

    expect(
      getByTestId("apa-slider").querySelector(".apa-slider-prev-arrow")
    ).toHaveProperty("disabled", true);
  });

  it("disables next button if last component on end", () => {
    const { getByTestId } = setup(5);

    expect(
      getByTestId("apa-slider").querySelector(".apa-slider-next-arrow")
    ).toHaveProperty("disabled", true);
  });
});
