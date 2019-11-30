((e) => {
  if ((e.matches || e.matchesSelector || e.webkitMatchesSelector || e.mozMatchesSelector || e.msMatchesSelector || e.oMatchesSelector) === false) {
    e.matches = function (selector) {
      for (let i of document.querySelectorAll(selector)) {
        if (i === this) {
          return true;
        }
      }

      return false;
    }
  }
})(Element.prototype);

class ShadowNode {
  constructor(node) {
    this.node = node;
  }

  get class() {
    return this.node.classList;
  }

  set class(table) {
    for (let i in table) {
      if (table.hasOwnProperty(i) === false) {
        continue;
      }

      if (table[i]) {
        this.node.classList.add(i);
        continue;
      }

      this.node.classList.remove(i);
    }
  }

  get data() {
    return this.node.dataset;
  }

  set data(table) {
    for (let i in table) {
      if (table.hasOwnProperty(i) === false) {
        continue;
      }

      this.node.dataset[i] = table[i];
    }
  }

  get style() {
    return window.getComputedStyle(this.node);
  }

  set style(table) {
    for (let i in table) {
      if (table.hasOwnProperty(i) === false) {
        continue;
      }

      this.node.style.setProperty(i, table[i]);
    }
  }

  get tag() {
    return this.node.tagName.toLowerCase();
  }

  set tag(name) {
    this.node.tagName = name.toUpperCase();
  }

  get text() {
    return this.node.textContent;
  }

  set text(content) {
    this.node.textContent = content;
  }

  get html() {
    return this.node.innerHTML;
  }

  set html(content) {
    this.node.innerHTML = content;
  }

  set before(node) {
    this.node.parentNode.insertBefore(node, this.node);
  }

  set prepend(node) {
    this.node.insertBefore(node, this.node.firstChild);
  }

  set append(node) {
    this.node.appendChild(node);
  }

  set after(node) {
    this.node.parentNode.insertBefore(node, this.node.nextSibling);
  }
}

class Harp {
  constructor(args) {
    this.nodeList = typeof args === 'string' ?
      document.querySelectorAll(args) : [ args ];
  }

  get length() {
    return this.nodeList.length;
  }

  on(type, callback, bubble = false) {
    return this.forEach((node, index) => {
      node.addEventListener(type, (event) => {
        callback(node, event, index);
      },
      bubble);
    });
  }

  off(type, callback, bubble = false) {
    return this.forEach((node, index) => {
      node.removeEventListener(type, (event) => {
        callback(node, event, index);
      },
      bubble);
    });
  }

  item(index = 0) {
    return this.nodeList[index];
  }

  forEach(callback) {
    for (let i = 0; i < this.nodeList.length; i++) {
      callback(this.nodeList[i], i);
    }
  }

  make(table) {
    for (let i in table) {
      if (table.hasOwnProperty(i) === false) {
        continue;
      }

      const available = ShadowNode.prototype.hasOwnProperty(i);

      this.forEach((node) => {
        if (available) {
          node = new ShadowNode(node);
        }

        node[i] = table[i];
      });
    }

    return this;
  }

  have(name, callback) {
    const buffer = [];
    const match = ShadowNode.prototype.hasOwnProperty(name);

    for (let node of this.nodeList) {
      if (match) {
        node = new ShadowNode(node);
      }

      let value = callback === undefined ?
        node[name] : callback(node, node[name]);

      buffer.push(value);
    }

    return buffer;
  }

  find(target, selector) {
    const buffer = [];

    for (let i of this.nodeList) {
      while ((i = i[target])) {
        if (i && (selector === undefined || (i.matches !== undefined && i.matches(selector)))) {
          buffer.push(i);
          continue;
        }
      }
    }

    return buffer;
  }
}

module.exports = Harp;
