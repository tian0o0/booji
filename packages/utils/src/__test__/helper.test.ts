import { rewrite } from "..";

describe("rewrite", () => {
  it("should rewrite correctly", () => {
    const source = {
      open() {
        return "open";
      },
    };
    const replacement = () => {
      return () => "rewrite open";
    };
    rewrite(source, "open", replacement);

    expect(source.open()).toBe("rewrite open");
  });

  it("should rewrite force correctly", () => {
    interface Source {
      open: Function;
    }
    const source = {} as Source;

    const replacement = () => {
      return () => "rewrite open";
    };
    rewrite(source, "open", replacement, true);

    expect(source.open()).toBe("rewrite open");
  });
});
