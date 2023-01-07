import React from "react";
import { render } from "@testing-library/react";

function soma(a: number, b: number) {
  return a + b;
}

function MeuComponent() {
  return <div>Vazia</div>;
}

test("Deve Somar", () => {
  const { getByText } = render(<MeuComponent />);
  expect(getByText("Vazia")).toBeVisible();
});
