(function(proto) {
  if ((proto.matches || proto.matchesSelector || proto.webkitMatchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector) === false) {
    proto.matches = function(selector) {
      var nodeList = document.querySelectorAll(selector);

      for (var i = 0; i < nodeList.length; i++) {
        if (nodeList[i] === this) {
          return true;
        }
      }

      return false;
    };
  }
})(Element.prototype);

var ShadowNode = function(node) {
  this.node = node;
};

Object.defineProperties(ShadowNode.prototype, {
  class: {
    get: function() {
      return this.node.classList;
    },
    set: function(table) {
      var iterable = Object.keys(table);

      for (var i = 0; i < iterable.length; i++) {
        var name = iterable[i];

        if (table[name]) {
          this.node.classList.add(name);
        }
        else {
          this.node.classList.remove(name);
        }
      }
    }
  },

  data: {
    get: function() {
      return this.node.dataset;
    },
    set: function(table) {
      var iterable = Object.keys(table);

      for (var i = 0; i < iterable.length; i++) {
        var name = iterable[i];
        this.node.dataset[name] = table[name];
      }
    }
  },

  style: {
    get: function() {
      return window.getComputedStyle(this.node);
    },
    set: function(table) {
      var iterable = Object.keys(table);

      for (var i = 0; i < iterable.length; i++) {
        var name = iterable[i];
        this.node.style.setProperty(name, table[name]);
      }
    }
  },

  text: {
    get: function() {
      return this.node.textContent;
    },
    set: function(value) {
      this.node.textContent = value;
    }
  },

  html: {
    get: function() {
      return this.node.innerHTML;
    },
    set: function(value) {
      this.node.innerHTML = value;
    }
  },

  before: {
    set: function(node) {
      this.node.parentNode.insertBefore(node, this.node);
    }
  },

  prepend: {
    set: function(node) {
      this.node.insertBefore(node, this.node.firstChild);
    }
  },

  append: {
    set: function(node) {
      this.node.appendChild(node);
    }
  },

  after: {
    set: function(node) {
      this.node.parentNode.insertBefore(node, this.node.nextSibling);
    }
  }
});

var Harp = function(args) {
  this.nodeList = typeof args === 'string' ?
    document.querySelectorAll(args) : [ args ];
};

Object.defineProperties(Harp.prototype, {
  length: {
    get: function() {
      return this.nodeList.length;
    }
  }
});

Harp.prototype.on = function(type, callback, bubble) {
  if (bubble === undefined) {
    bubble = false;
  }

  return this.forEach(function(node, index) {
    node.addEventListener(
      type,
      callback.bind(undefined, node, event, index),
      bubble
    );
  });
};

Harp.prototype.off = function(type, callback, bubble) {
  if (bubble === undefined) {
    bubble = false;
  }

  return this.forEach(function(node, index) {
    node.removeEventListener(
      type,
      callback.bind(undefined, node, event, index),
      bubble
    );
  });
};

Harp.prototype.item = function(index) {
  if (index === undefined) {
    index = 0;
  }

  return this.nodeList[index];
};

Harp.prototype.forEach = function(callback) {
  for (var i = 0; i < this.nodeList.length; i++) {
    callback(this.nodeList[i], i);
  }
};

Harp.prototype.find = function(target, selector) {
  var buffer = [];

  this.forEach(function(node) {
    while ((node = node[target])) {
      if (node && (selector === undefined || (node.matches !== undefined && node.matches(selector)))) {
        buffer.push(node);
        continue;
      }
    }
  });

  return buffer;
};

Harp.prototype.make = function(table) {
  var iterable = Object.keys(table);

  for (var i = 0; i < iterable.length; i++) {
    var name = iterable[i];
    var available = ShadowNode.prototype.hasOwnProperty(name);

    this.forEach(function(node) {
      if (available) {
        node = new ShadowNode(node);
      }

      node[name] = table[name];
    });
  }

  return this;
};

Harp.prototype.have = function(name, callback) {
  var buffer = [];
  var match = ShadowNode.prototype.hasOwnProperty(name);

  this.forEach(function(node) {
    if (match) {
      node = new ShadowNode(node);
    }

    var value = callback === undefined ?
      node[name] : callback(node, node[name]);

    buffer.push(value);
  });

  return buffer;
};

module.exports = Harp;
