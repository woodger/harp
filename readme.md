# Harp

[![License](https://img.shields.io/npm/l/express.svg)](https://github.com/woodger/harp/blob/master/LICENSE)

`Harp` is a small and fast solution for DOM manipulation.

Source code implemented by following the [ECMAScript® 2018 Language Specification
](https://www.ecma-international.org/ecma-262/9.0/index.html) Standard.

## Getting Started

### Installation

To use `Harp` in your project, run:

```bash
npm i git+https://git@github.com/woodger/harp.git
```

#### Table of Contents

* [class Harp](#class-harp)
  * [constructor: new Harp(selector | node)](#constructor-new-harpselector--node)
  * [harp.on(type, callback[, bubble])](#harpontype-callback-bubble)
  * [harp.off(type, callback[, bubble])](#harpofftype-callback-bubble)
  * [harp.forEach(callback)](#harpforeachcallback)
  * [harp.item([index])](#harpitemindex)
  * [harp.find(target[, selector])](harpfindtarget-selector)
  * [harp.have(name[, callback])](#harphavename-callback)
  * [harp.make(table)](#harpmaketable)
  * [harp.nodeList](#harpnodelist)
  * [harp.length](#harplength)

#### class Harp

#### constructor: new Harp(selector | node)

- `selector` <[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)> a string containing a selector like CSS expression to match elements against.
- `node` <[Node](https://developer.mozilla.org/en-US/docs/Web/API/Node)> any type of DOM interface [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element), [Text](https://developer.mozilla.org/en-US/docs/Web/API/Text), [Comment](https://developer.mozilla.org/en-US/docs/Web/API/Comment).

```js
require('/node_modules/harp/harp.js', function(Harp) {
  var h1 = new Harp('h1');
});
```

#### harp.on(type, callback[, bubble])

- `type` <[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)> a case-sensitive string representing the [event type](https://developer.mozilla.org/en-US/docs/Web/Events) to listen for, such as 'click' or 'keyup'.
- `callback` <[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)> a function to execute when the event is triggered.
  - `bubble` <[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)> indicating that events of this type will be dispatched to the registered listener before being dispatched to any `EventTarget` beneath it in the DOM tree. **Default:** `false`.
- returns: `this`.

For example attach an event handler function for one or more events to the selected elements.

```js
require('/node_modules/harp/harp.js', function(Harp) {
  var elem = new Harp('button');

  elem.on('click', (node, event) => {
    console.log('Target ' + event.target);
  });
});
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

#### harp.item([index])

- `index` <[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)> **Default:** `0`.

Returns a node from a [harp.nodeList](#harpnodelist) by index.

#### harp.find(target[, selector])

- `target` <[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)> find property any of:
  * firstChild
  * firstElementChild
  * lastChild
  * lastElementChild
  * childNodes
  * children
  * parentNode
  * parentElement
  * previousSibling
  * previousElementSibling
  * nextSibling
  * nextElementSibling

> NOTE target `childNodes` and `children` selector not support

- `selector` <[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)> a string containing a selector like CSS expression to match elements against.
- returns: <[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)> are collections of nodes.

Search for the nearest node in document.

```js
var [parent] = elem.find('parentNode');
console.log(parent.nodeName);
```

Below for example recursive search parent node by CSS selector.

```js
var [action] = elem.find('parentNode', '.action');
console.log(parent.nodeName);
```

#### harp.have(name[, callback])

- `name` <[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)> A case-sensitive string representing the determine whether any of the matched elements are assigned the given property.
- `callback` <[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)> result executing a function for each matched element.
- returns: <[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)>.

```js
require('/node_modules/harp/harp.js', function(Harp) {
  var button = new Harp('button');
  var [tag] = button.have('tag');

  console.log(tag);
});
```

The return values may be the result of a `callback` function call.

```js
require('/node_modules/harp/harp.js', function(Harp) {
  var button = new Harp('button');
  var [key] = buttons.have('data', (node, value) => {
    return value.key;
  });

  console.log(key);
});
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

#### harp.nodeList

- <[NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList) | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)> objects are collections of nodes, usually returned by properties such as [Node.childNodes](https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes) and methods such as [document.querySelectorAll()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll).

#### harp.length

- <[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)> property returns the number of items in a [harp.nodeList](#harpnodelist).
