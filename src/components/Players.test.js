import { Players, validateNames } from "./Players";

const validationCases = [
  { X: "", O: "", errors: 2 },
  { X: "", O: "John", errors: 1 },
  { X: "Jane", O: "", errors: 1 },
  { X: "Jane", O: "John", errors: 0 }
];

validationCases.forEach(c => {
  it("Should validate the player names are not empty", () => {
    expect(validateNames(c.X, c.O).length).toEqual(c.errors);
  });
});
