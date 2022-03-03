import { isString } from "./is";

/**
 * 将 HTMLElement 转为 path string
 * 例如：HTMLElement --> body > ul > li.container > button#btn.hah
 * @returns string
 * @public
 */
export function htmlElement2String(elem: unknown, keyAttrs?: string[]): string {
  type SimpleNode = {
    parentNode: SimpleNode;
  } | null;

  // try/catch both:
  // - accessing event.target (see getsentry/raven-js#838, #768)
  // - `htmlTreeAsString` because it's complex, and just accessing the DOM incorrectly
  // - can throw an exception in some circumstances.
  try {
    let currentElem = elem as SimpleNode;
    const MAX_TRAVERSE_HEIGHT = 5;
    const MAX_OUTPUT_LEN = 80;
    const out = [];
    let height = 0;
    let len = 0;
    const separator = " > ";
    const sepLength = separator.length;
    let nextStr;

    while (currentElem && height++ < MAX_TRAVERSE_HEIGHT) {
      nextStr = transform(currentElem, keyAttrs);
      // bail out if
      // - nextStr is the 'html' element
      // - the length of the string that would be created exceeds MAX_OUTPUT_LEN
      //   (ignore this limit if we are on the first iteration)
      if (
        nextStr === "html" ||
        (height > 1 &&
          len + out.length * sepLength + nextStr.length >= MAX_OUTPUT_LEN)
      ) {
        break;
      }

      out.push(nextStr);

      len += nextStr.length;
      currentElem = currentElem.parentNode;
    }

    return out.reverse().join(separator);
  } catch (e) {
    /* istanbul ignore next */
    return "<unknown>";
  }
}

function transform(el: unknown, keyAttrs?: string[]): string {
  const elem = el as {
    tagName?: string;
    id?: string;
    className?: string;
    getAttribute(key: string): string;
  };

  const out = [];
  let className;
  let classes;
  let key;
  let attr;
  let i;

  if (!elem || !elem.tagName) {
    return "";
  }

  out.push(elem.tagName.toLowerCase());

  // Pairs of attribute keys defined in `serializeAttribute` and their values on element.
  const keyAttrPairs =
    keyAttrs && keyAttrs.length
      ? keyAttrs
          .filter((keyAttr) => elem.getAttribute(keyAttr))
          .map((keyAttr) => [keyAttr, elem.getAttribute(keyAttr)])
      : null;

  if (keyAttrPairs && keyAttrPairs.length) {
    keyAttrPairs.forEach((keyAttrPair) => {
      out.push(`[${keyAttrPair[0]}="${keyAttrPair[1]}"]`);
    });
  } else {
    if (elem.id) {
      out.push(`#${elem.id}`);
    }

    className = elem.className;
    if (className && isString(className)) {
      classes = className.split(/\s+/);
      for (i = 0; i < classes.length; i++) {
        out.push(`.${classes[i]}`);
      }
    }
  }
  const allowedAttrs = ["type", "name", "title", "alt"];
  for (i = 0; i < allowedAttrs.length; i++) {
    key = allowedAttrs[i];
    attr = elem.getAttribute(key);
    if (attr) {
      out.push(`[${key}="${attr}"]`);
    }
  }
  return out.join("");
}
