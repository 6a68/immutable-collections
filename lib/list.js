function List(array) {
  this._value = undefined;
  this._next = null;
  this._length = 0;

  if(typeof array !== 'undefined') {
    this._length = array.length;
    this._value = array[0];
    var node = this;
    for(var i = 1; i < array.length; i++)
      node._next = new List(array.slice(1));
  }
}

//O(n)
List.prototype.length = function() {
  return this._length;
};

//O(n)
List.prototype.concat = function(other) {
  var newlist = new List();
  var root = newlist;

  newlist._value = this._value;
  newlist._length = this.length() + other.length();

  for(var itr = this._next; itr; itr = itr._next) {
    var node = new List();
    node._value = itr._value;
    node._length = itr.length() + other.length();

    newlist._next = node;
    newlist = newlist._next;
  }

  newlist._next = other;

  return root;
};

//O(n)
List.prototype.append = function(value) {
  return this.concat(new List([value]));
};

//O(n)
List.prototype.toArray = function() {
  var array = new Array(this.length());
  for(var node = this, i = 0; node; node = node._next, i++) array[i] = node.head();
  return array;
};

//O(1)
List.prototype.prepend = function(value) {
  var list = new List();
  list._next = value;
  list._length = this.length() + 1;
  list._value = value;
  return list;
};

//O(1)
List.prototype.head = function() {
  return this._value;
};

//O(1)
List.prototype.tail = function() {
  return this._next;
};

//O(n)
List.prototype.last = function() {
  for(var node = this, i = 0; node._next; node = node._next, i++);
  return node._value;
};

//O(n)
List.prototype.init = function() {
  var newlist = new List();
  var root = newlist;

  newlist._value = this._value;
  newlist._length = this.length()-1;

  for(var itr = this._next; itr._next; itr = itr._next) {
    var node = new List();
    node._value = itr._value;
    node._length = itr.length()-1;

    newlist._next = node;
    newlist = newlist._next;
  }

  return root;
};

module.exports = List;
