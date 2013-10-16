var assert = require("chai").assert,
    Queue = require("../index").Queue;

describe("Queue", function() {
  it("should start out empty", function() {
    var queue = new Queue();
    assert.equal(queue.length(), 0);
  });

  it("should enqueue and dequeue", function() {
    var queue = new Queue();
    queue = queue.enqueue(1);
    queue = queue.enqueue(2);
    queue = queue.enqueue(3);

    dequeue(1);
    dequeue(2);
    dequeue(3);

    function dequeue(x) {
      var res = queue.dequeue();
      var val = res[0];
      queue = res[1];
      assert.equal(val, x);
    } 
  });
});
