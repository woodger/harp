(() => {
  class ShadowNode {
		constructor(node) {
			this.node = node;
		}

    get class() {
      return this.node.classList;
    }

		set class(args) {
			for (let i in args) {
				if (args.hasOwnProperty(i) === false) {
          continue;
				}

        if (args[i]) {
          this.node.classList.add(i);
        }
        else {
          this.node.classList.remove(i);
        }
			}
		}

    get data() {
      return this.node.dataset;
    }

		set data(args) {
			for (let i in args) {
        if (args.hasOwnProperty(i) === false) {
          continue;
				}

				this.node.dataset[i] = args[i];
			}
		}

    get style() {
			return window.getComputedStyle(this.node);
		}

		set style(args) {
			for (let i in args) {
        if (args.hasOwnProperty(i) === false) {
          continue;
				}

				this.node.style.setProperty(i, args[i]);
			}
		}

    get tag() {
			return this.node.tagName.toLowerCase();
		}

		set tag(args) {
			this.node.tagName = args.toUpperCase();
		}

    get text() {
      return this.node.textContent;
    }

		set text(args) {
			this.node.textContent = args;
		}

    get html() {
			return this.node.innerHTML;
		}

		set html(args) {
			this.node.innerHTML = args;
		}

		set before(args) {
			this.node.parentNode.insertBefore(args, this.node);
		}

		set prepend(args) {
			this.node.insertBefore(args, this.node.firstChild);
		}

		set append(args) {
			this.node.appendChild(args);
		}

		set after(args) {
			this.node.parentNode.insertBefore(args, this.node.nextSibling);
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

    forEach(callback) {
      for (let i = 0; i < this.nodeList.length; i++) {
        const node = this.nodeList[i];

        if (callback(node, i) === false) {
          break;
        }
      }

      return this;
    }

  	on(event, callback, bubble = false) {
      return this.forEach((node) => {
        node.addEventListener(event, callback, bubble);
      });
  	}

  	off(event, callback, bubble = false) {
      return this.forEach((node) => {
        node.removeEventListener(event, callback, bubble);
      });
  	}

    have(name, callback) {
			const available = ShadowNode.prototype.hasOwnProperty(name);

      return this.forEach((node) => {
        if (available) {
          node = new ShadowNode(node);
        }

        const value = node[name];

        return callback(value, node);
      });
		}

    make(args) {
      for (let i in args) {
        if (args.hasOwnProperty(i) === false) {
          continue;
        }

        const available = ShadowNode.prototype.hasOwnProperty(i);

        this.forEach((node) => {
          if (available) {
            node = new ShadowNode(node);
          }

          node[i] = args[i];
        });
      }

      return this;
    }
  }

	const require = async (path) => {
    if (path in require.cache === false) {
  		const res = await fetch(path);

      if (res.ok === false) {
        throw new Error(`Canot find module '${path}'`);
      }

      const type = path.substr(-5) === '.json' ?
        'json' : 'text';
      let content = await res[type]();

      require.cache[path] = module = {
        exports: {}
      };

      const invoke = new Function('module', content);
      await invoke(module);
    }

    return require.cache[path];
	};

	require.cache = {
    harp: Harp
  };

	window.require = require;
})();
