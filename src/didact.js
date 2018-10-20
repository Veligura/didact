import { createElement } from './element';
import Component from './component';
import { render } from './reconciler';

export default {
    createElement,
    Component,
    render
};

export {
    createElement,
    Component,
    render
};

// const element = (
//     <div id="container">
//         <input value="foo" type="text" />
//         <a href="/bar">bar</a>
//         <span onClick={e => alert("Hi")}>click me</span>
//     </div>
// );