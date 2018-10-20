// @flow

let rootInstance = null;

const isEventListener = (name: string): boolean => name.startsWith("on");
const isAtribute: boolean = name =>
  !isEventListener(name) && name !== "children";

export function render(element, container) {
  const prevInstance = rootInstance;
  const nextInstance = reconcile(container, prevInstance, element);
  rootInstance = nextInstance;
}

function reconcile(parentDom, prevInstance, element) {
  if (prevInstance == null) {
    const newInstance = instantiate(element);
    parentDom.appendChild(newInstance.dom);
    return newInstance;
  } else if (element.type === prevInstance.element.type) {
    updateDomAttributes(
      prevInstance.dom,
      prevInstance.element.props,
      element.props
    );
    prevInstance.element = element;
    prevInstance.childInstances = reconcileChildren(prevInstance, element);
    return prevInstance;
  } else {
    const newInstance = instantiate(element);
    parentDom.replaceChild(newInstance.dom, prevInstance.dom);
    return newInstance;
  }
}

function instantiate(element) {
  const { type, props } = element;
  const dom =
    type === "TEXT ELEMENT"
      ? document.createTextNode("")
      : document.createElement(type);

  updateDomAttributes(dom, [], props);
  const children = props.children || [];
  const childInstances = children.map(instantiate);
  childInstances.map(child => dom.appendChild(child.dom));

  const instance = { element, dom, childInstances };
  return instance;
}

function updateDomAttributes(dom, prevProps, props) {
  // Remove old props

  Object.keys(prevProps)
    .filter(isEventListener)
    .map(name => {
      const eventType = name.toLowerCase().substring(2);
      dom.removeEventLister(eventType, name);
    });

  Object.keys(prevProps)
    .filter(isAtribute)
    .forEach(attribute => (dom[attribute] = null));

  Object.keys(props)
    .filter(isEventListener)
    .map(name => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventLister(eventType, props[name]);
    });

  Object.keys(props)
    .filter(isAtribute)
    .forEach(attribute => (dom[attribute] = props[attribute]));
}

function reconcileChildren(instance, element) {
  const dom = instance.dom;
  const childInstances = instance.childInstances;
  const nextChildElements = element.props.children || [];
  const newChildInstances = [];
  const count = Math.max(childInstances.length, nextChildElements.length);
  for (let i = 0; i < count; i++) {
    const childInstance = childInstances[i];
    const childElement = nextChildElements[i];
    const newChildInstance = reconcile(dom, childInstance, childElement);
    newChildInstances.push(newChildInstance);
  }
  return newChildInstances;
}
