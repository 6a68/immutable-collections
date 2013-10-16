var assert = require("chai").assert,
    LazyList = require("../lib/ll");

describe("LazyList", function() {
  it("should default to empty", function() {
    var list = new LazyList();
    assert.equal(list.length(), 0);
  });

  it("should accept an array", function() {
    var list = new LazyList([1, 2, 3]);
    assert.equal(list.length(), 3);
  });

  describe("toArray", function() {
    it("should convert a list to an array", function() {
      var list = new LazyList([1, 2, 3]);
      assert.deepEqual(list.toArray(), [1, 2, 3]);
    });

    it("should return [] from an empty list", function() {
      var list = new LazyList();
      assert.deepEqual(list.toArray(), []);
    });
  });

  it("should accept a generator", function() {
    var list = new LazyList(function*() {
      yield 1;
      yield 2;
      yield 3;
    });

    assert.deepEqual(list.toArray(), [1, 2, 3]);
  });

  describe("head", function() {
    it("should return the first element", function() {
      var list = new LazyList([1, 2, 3]);
      assert.equal(list.head(), 1);
    });

    it("should throw an error if the list is empty", function() {
      var thrown = false;
      var list = new LazyList();
      try {
	list.head();
      } catch (e) {
	thrown = true;
      }

      assert(thrown);
    });
  });

  it("should return the correct tail", function() {
    var list = new LazyList([1, 2, 3]);
    assert.deepEqual(list.tail().toArray(), [2, 3]);
  });

  it("should have a take function", function() {
    var list = new LazyList([1, 2, 3]);
    assert.deepEqual(list.take(2).toArray(), [1, 2]);
  });

  it("should be super cool", function() {
    function* fibonacci() {
      yield 0;
      yield 1;

      var prev = 0,
	  curr = 1;

      for (;;) {
	var tmp = prev;
        prev = curr;
	curr = tmp + curr;
        yield curr;
      }
    }

    var list = new LazyList(fibonacci);
    assert.equal(list.head(), 0);
    assert.equal(list.tail().head(), 1);
    assert.deepEqual(list.take(8).toArray(), [0, 1, 1, 2, 3, 5, 8, 13]);
  });

  it("should be able to append lists", function() {
    var a = new LazyList([1, 2, 3]);
    var b = new LazyList([4, 5, 6]);
    var list = a.append(b);
    assert.deepEqual(list.toArray(), [1, 2, 3, 4, 5, 6]);
  });

  it("should be able to reverse lists", function() {
    var list = new LazyList([1, 2, 3]);
    assert.deepEqual(list.reverse().toArray(), [3, 2, 1]);
  });

  it("should have a working iterator", function() {
    var list = new LazyList([1, 2, 3]);
    var itr = list.iterator();
    assert.equal(itr.next().value, 1);
    assert.equal(itr.next().value, 2);
    assert.equal(itr.next().value, 3);
  });
});
