/**
 * A lazy list implementation based on generators.  For anyone reading this
 * code: there are a number of unhandles edge cases. I know about them and will
 * get to them soon. I promise! -isaacbw
 */
function LazyList(arg) {
  if(arg instanceof Array && arg.length > 0) {
    var itr = (function*() {
      for(var i = 0; i < arg.length; i++) {
	yield arg[i];
      }
    })();
    this._node = new Node(itr);
  } else if(arg instanceof Node) {
    this._node = arg;
  } else if(typeof arg === 'function') {
    this._node = new Node(arg());
  } else {
    this._node = null;
  }
}

/**
 * Calculate the total length of the list. The internal generator is
 * exhausted, meaning, that lazy evaluation is thrown out the window.  Don't use
 * this function unless you really have to.
 */
LazyList.prototype.length = function() {
  for(var node = this._node, length = 0; node; node = node.next()) length++;
  return length;
};

/**
 * Convert the list to an array. If the generator in infinite, this function will
 * never exit (until the process runs out of memory).
 */
LazyList.prototype.toArray = function() {
  var array = new Array();
  for(var node = this._node, length = 0; node; node = node.next()) array.push(node.value());
  return array;
};

/**
 * Take n items from the beginning of the list and return a new list with
 * those items.
 */
LazyList.prototype.take = function(n) {
  var list = this;

  //(isaacbw) Can this be generalized into the generator below?
  if(n == 0)
    return new LazyList();

  return new LazyList(function*() {
    var i = 0;
    while(i < n) {
      yield list.head();
      list = list.tail();
      i++;
    }
  });
};

LazyList.prototype.head = function() {
  if(!this._node)
    throw new Error("Cannot get head of empty list");

  return this._node.value();
};

LazyList.prototype.tail = function() {
  if(!this._node.next())
    return new LazyList();

  return new LazyList(this._node.next());
};

LazyList.prototype.prepend = function(value) {
  var node = new Node(value, null);
  node._next = this._node;
  return new LazyList(node);
};

LazyList.prototype.empty = function() {
  return !this._node;
};

/**
 * Return a lazy list that is the concatonation of the two lists
 */
LazyList.prototype.append = function(other) {
  var list = this;
  if(list.empty() && other.empty())
     return list;

  return new LazyList(function*() {
    while(!list.empty()) {
      yield list.head();
      list = list.tail();
    }

    while(!other.empty()) {
      yield other.head();
      other = other.tail();
    }
  });
};

/**
 * Return the reverse of the list. This will exhaust the generator and store the
 * reversed list in memory.
 *
 * (isaacbw) This is a really poor implementation which requires 2n
 * space. That's no good. Can maybe do something better by having the node list
 * be doubly linked. Fix soon.
 */
LazyList.prototype.reverse = function() {
  var list = this;
  var array = list.toArray();

  if(this.empty())
     return this;

  return new LazyList(function*() {
    for(var i = array.length-1; i >= 0; i--) {
      yield array[i];
    }
  });
};

/**
 * Return an iterator to the LazyList's contents starting with the first
 * element. Don't confuse this with _node._itr field, which should never be used
 * externally.
 */
LazyList.prototype.iterator = function() {
  var node = this._node;
  if(node) {
    return {
      next: function() {
	var curr = node;
	node = node.next();
	return {
	  value: curr.value(),
	  done: !curr.next()
	};
      }
    };
  } else {
    return {
      next: function() {
	return {
	  done: true
	};
      }
    };
  }
};

/**
 * (isaacbw) can defer computation even further by waiting to call the generator
 * until value() is requested.
 */
function Node(value, iterator) {
  if(iterator === undefined) {
    iterator = value;
    var next = iterator.next();
    this._value = next.value;
  } else {
    this._value = value;
  }

  this._itr = iterator;
}

Node.prototype.next = function() {
  if(this._next !== undefined) 
    return this._next;

  if(this._end) 
    return null;

  var next = this._itr.next();
  if(next.done) {
    this._next = null;
    return null;
  } else {
    this._next = new Node(next.value, this._itr);
    return this._next;
  }
};

Node.prototype.value = function() {
  return this._value;
};

module.exports = LazyList;
