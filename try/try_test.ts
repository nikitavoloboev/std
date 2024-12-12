// run this test with:
// deno test --unstable-http --unstable-webgpu --doc --allow-all --parallel --coverage --trace-leaks --clean try/try_test.ts
import { assertEquals, assertFalse } from "@std/assert";
import { isNil, validate, version } from "../uuid/common.ts";

Deno.test("isNil returns true for nil UUID", () => {
  assertEquals(isNil("00000000-0000-0000-0000-000000000000"), true);
});

Deno.test("isNil returns false for non-nil UUID", () => {
  assertFalse(isNil("6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b"));
});

Deno.test("validate returns true for valid UUIDs", () => {
  assertEquals(validate("6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b"), true);
  assertEquals(validate("00000000-0000-0000-0000-000000000000"), true);
});

Deno.test("validate returns false for invalid UUIDs", () => {
  assertFalse(validate("not-a-uuid"));
  assertFalse(validate("xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"));
});

Deno.test("version returns correct UUID version", () => {
  assertEquals(version("d9428888-122b-11e1-b85c-61cd3cbb3210"), 1);
  assertEquals(version("6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b"), 4);
});

Deno.test("version throws on invalid UUID", () => {
  try {
    version("not-a-uuid");
    throw new Error("Should have thrown");
  } catch (error: unknown) {
    if (error instanceof TypeError) {
      assertEquals(error instanceof TypeError, true);
      assertEquals(
        error.message,
        "Cannot detect UUID version: received not-a-uuid"
      );
    } else {
      throw error;
    }
  }
});
