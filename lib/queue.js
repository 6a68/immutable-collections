var LazyList = require('./ll');

function Queue(array, fsize, front, rsize, rear) {
  if(array) {
    this.front = new LazyList(array);
    this.fsize = array.length;
    this.rear = new LazyList();
    this.rsize = 0;
  } else if(array === undefined) {
    this.front = new LazyList();
    this.fsize = 0;
    this.rear = new LazyList();
    this.rsize = 0;
  } else if(array === null) {
    this.fsize = fsize;
    this.rsize = rsize;
    this.front = front;
    this.rear = rear;
  }
}

Queue.prototype.enqueue = function(value) {
  return check(new Queue(null, this.fsize, this.front, this.rsize + 1, this.rear.prepend(value)));
};

Queue.prototype.dequeue = function() {
  var val = this.front.head();
  return [val, check(new Queue(null, this.fsize-1, this.front.tail(), this.rsize, this.rear))];
};

Queue.prototype.length = function() {
  return this.fsize + this.rsize;
};

function check(queue) {
  if(queue.fsize >= queue.rsize) {
    return queue;
  } else {
    var size = queue.fsize + queue.rsize;
    var front = queue.front.append(queue.rear.reverse());
    return new Queue(null, size, front, 0, new LazyList());
  }
};

module.exports = Queue;
