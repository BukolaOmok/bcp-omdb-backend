import { expect, test } from "vitest";
import { albumSchema } from "./albumSchema.js";
test("validates ok when album is correct", () => {
    const submittedData = {
        title: "Slowhand",
        artist: "Eric Clapton",
        year: 1977,
    };
    expect(albumSchema.safeParse(submittedData).error).toBeUndefined;
});

test("fails validation when album has unexpected extra field", () => {
    const submittedData = {
        title: "Slowhand",
        artist: "Eric Clapton",
        cheekyExtraField: "can this field get through the validation?",
        year: 1977,
    };
    expect(albumSchema.safeParse(submittedData).data).toBeUndefined;
    expect(albumSchema.safeParse(submittedData).error.errors[0].code).toBe(
        `unrecognized_keys`
    );
});

test("fails validation when album artist is not a string but an object", () => {
    const submittedData = {
        title: "Slowhand",
        artist: { firstName: "Eric", secondName: "Clapton" },
        year: 1977,
    };
    expect(albumSchema.safeParse(submittedData).data).toBeUndefined;
    expect(albumSchema.safeParse(submittedData).error.errors[0].message).toBe(
        "Expected string, received object"
    );
});

test("fails validation when album is undefined", () => {
    expect(albumSchema.safeParse(undefined).data).toBeUndefined;
});
test("fails validation when album is empty object", () => {
    expect(albumSchema.safeParse({}).data).toBeUndefined;
});
