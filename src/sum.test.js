import { test, expect } from "vitest";
import { sum } from "./sum.js";

test("sum", () => {
    expect(sum(10, 20)).toBe(30);
    expect(sum(0, 0)).toBe(0);
    expect(sum(-20, 20)).toBe(0);
});
