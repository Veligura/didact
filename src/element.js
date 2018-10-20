// @flow
const TEXT_ELEMENT: string = "TEXT ELEMENT";

export function createElement(type, config, ...args) {
  const children = (args.length ? args : [])
    .filter(item => !!item)
    .map(
      element =>
        element instanceof Object ? element : createTextElement(element)
    );
  const props = { ...config, children };
  return {
    type,
    props
  };
}

function createTextElement(element) {
  return createElement(TEXT_ELEMENT, { nodeValue: element });
}
