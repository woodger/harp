# Harp

[![License](https://img.shields.io/npm/l/express.svg)](https://github.com/woodger/harp/blob/master/LICENSE)

`Harp` is a small and fast solution for loading modules and DOM manipulation.

Source code implemented by following the [ECMAScript® 2018 Language Specification
](https://www.ecma-international.org/ecma-262/9.0/index.html) Standard.

## Getting Started

### Installation

To use `Harp` in your project, run:

```bash
npm i git+https://git@github.com/woodger/harp.git
```

#### Table of Contents

* [window.require](#windowrequirepath)
* [window.require.cache](#windowrequirecache)

* [class Harp](#class-harp)
  * [constructor: new Harp(selector | node)](#constructor-new-harpselector--node)
  * [harp.on(type, callback[, bubble])](#harpontype-callback-bubble)
  * [harp.off(type, callback[, bubble])](#harpofftype-callback-bubble)
  * [harp.forEach(callback)](#harpforeachcallback)
  * [harp.have(name[, callback])](#harphavename-callback)
  * [harp.make(table)](#harpmaketable)
  * [harp.find(target[, callback])](harpfindtarget-callback)
  * [harp.nodeList](#harpnodelist)
  * [harp.length](#harplength)

#### window.require(path)

`Harp` provides modular asynchronous scripting capabilities using <[async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)>
This method takes a different approach to script loading than traditional <[script](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script)> tags.

Contents each modules will is wrapped in a `new Function()` constructor with the `module` parameter. The result of the function call is cached by listing a simple object in the [window.require.cache](#windowrequirepathcache) field.

Below `index.js` uses the counter module, which imports the Counter class:

**scripts/index.js**

```js
async () => {
  const Counter = await require('./counter.js');
}
```

The counter module is defined in `counter.js`:

**scripts/counter.js**

```js
module.exports = class Counter {};
```

The module.exports property can be assigned a new value (such as a function or object).
In addition to JavaScript models `.js` data import is supported `.json` extension.

#### window.require.cache

Modules are cached after the first time they are uploaded.

#### class Harp

#### constructor: new Harp(selector | node)

- `selector` <[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)> a string containing a selector like CSS expression to match elements against.
- `node` <[Node](https://developer.mozilla.org/en-US/docs/Web/API/Node)> any type of DOM interface [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element), [Text](https://developer.mozilla.org/en-US/docs/Web/API/Text), [Comment](https://developer.mozilla.org/en-US/docs/Web/API/Comment).

```js
async () => {
  const Harp = await require('harp');

  const h1 = new Harp('h1');
}
```

#### harp.on(type, callback[, bubble])

- `type` <[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)> a case-sensitive string representing the [event type](https://developer.mozilla.org/en-US/docs/Web/Events) to listen for, such as 'click' or 'keyup'.
- `callback` <[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)> a function to execute when the event is triggered.
  - `bubble` <[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)> indicating that events of this type will be dispatched to the registered listener before being dispatched to any `EventTarget` beneath it in the DOM tree. **Default:** `false`.
- returns: `this`.

For example attach an event handler function for one or more events to the selected elements.

```js
async () => {
  const Harp = await require('harp');

  const buttons = new Harp('button');
  buttons.on('click', (node) => {
    console.log('Target "click"');
  });
}
```

#### harp.off(type, callback[, bubble])

- `type` <[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)> A case-sensitive string representing the [event type](https://developer.mozilla.org/en-US/docs/Web/Events) to listen for, such as 'click' or 'keyup'.
- `callback` <[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)> a function to execute when the event is triggered.
  - `bubble` <[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)> indicating that events of this type will be dispatched to the registered listener before being dispatched to any `EventTarget` beneath it in the DOM tree. **Default:** `false`.
- returns: `this`.

The method removes from the `EventTarget` an event listener previously registered with [harp.on(event, callback[, bubble])](#harponevent-callback-bubble).

#### harp.forEach(callback)

- `callback` <[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)> result executing a function for each matched element.
- returns: `undefined`.

The method is designed to make DOM looping constructs concise and less error-prone. When called it iterates over the [NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList) or [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).

```js
elements.forEach((node, index) => {
  console.log(node.nodeName);
});
```

#### harp.have(name[, callback])

- `name` <[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)> A case-sensitive string representing the determine whether any of the matched elements are assigned the given property.
- `callback` <[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)> result executing a function for each matched element.
- returns: <[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)>.

```js
async () => {
  const Harp = await require('harp');

  const buttons = new Harp('button');
  const [tag] = buttons.have('tag');

  console.log(tag);
}
```

The return values may be the result of a `callback` function call.

```js
async () => {
  const Harp = await require('harp');

  const buttons = new Harp('button');
  const [key] = buttons.have('data', (node, value) => {
    return value.key;
  });

  console.log(key);
}
```

#### harp.make(table)

- `table` <[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)>
  - `class` <[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)>

Below will add an `action` class for the element and remove the `hide` class.

```js
elem.make({
  class: {
    action: true,
    hide: false
  }
});
```

  - `data` <[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)>

The date attribute like `<div data-key="1">` for the item will be added.

```js
elem.make({
  data: {
    key: 1
  }
});
```

  - `style` <[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)>

Property is used set the inline `style` of an element.

```js
elem.make({
  style: {
    color: '#000000'
  }
});
```

When setting must a object contains a list of styles properties for that element with values assigned like [CSSStyleDeclaration](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration) for the attributes that are defined in the element's inline `style` attribute.

  - `tag` <[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>

Assigns an element HTML tag

```js
elem.make({
  tag: 'h1'
});
```

  - `text` <[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>
  - `html` <[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>
  - `before` <[Node](https://developer.mozilla.org/en-US/docs/Web/API/Node)>
  - `prepend` <[Node](https://developer.mozilla.org/en-US/docs/Web/API/Node)>
  - `append` <[Node](https://developer.mozilla.org/en-US/docs/Web/API/Node)>
  - `after` <[Node](https://developer.mozilla.org/en-US/docs/Web/API/Node)>
- returns: `this`

#### harp.find(target[, selector])

- `target` <[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)> find property any of `'firstChild'`, `'firstElementChild'`, `'lastChild'`, `'lastElementChild'`, `'childNodes'`, `'children'`, `'parentNode'`, `'parentElement'`, `'previousSibling'`, `'previousElementSibling'`, `'nextSibling'`, `'nextElementSibling'`.
- `selector` <[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)> a string containing a selector like CSS expression to match elements against.
- returns: <[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)>.

Search for the nearest node in document.

```js
const [parent] = elem.find('parentNode');
console.log(parent.nodeName);
```

Below for example recursive search parent node by CSS selector.

```js
const [action] = elem.find('parentNode', '.action');
console.log(parent.nodeName);
```

#### harp.nodeList

- <[NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList) | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)> objects are collections of nodes, usually returned by properties such as [Node.childNodes](https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes) and methods such as [document.querySelectorAll()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll).

#### harp.length

- <[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)> property returns the number of items in a [harp.nodeList](#harpnodelist).
