import { htmlElement2String } from "../browser";

describe("htmlElement2String", () => {
  it("should return normalized path string if input is a HTMLElement", () => {
    const el = document.createElement("ul");
    el.innerHTML = `<li class="container">
      <button id="btn" class="hah" />
    </li>`;
    document.body.appendChild(el);

    expect(htmlElement2String(document.getElementById("btn"))).toBe(
      "body > ul > li.container > button#btn.hah"
    );
  });

  it("should return '' if input isn't a HTMLElement", () => {
    expect(htmlElement2String("eee")).toBe("");
  });
});
