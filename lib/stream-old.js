//A lazy list that just does what we need
exports.toStream = function toStream(array,  copy) {
  if(copy || copy === undefined) {
    array = array.filter(function() { return true; });
  }

  function arrayStream(i) {
    return {
      hasNext: function() {
	return i < array.length - 1;
      },
      value: function() {
	if(i === -1)
	  throw new Error('Iterator is at the front of the stream');
	return array[i];
      },
      next: function() {
	return arrayStream(i + 1); //only copy the array once
      }
    };
  }

  return arrayStream(-1);
};

exports.emptyStream = function() {
  return {
    hasNext: function() {
      return false;
    },
    value: function() {
      throw new Error('Empty stream');
    },
    next: function() {
      throw new Error('End of stream');
    }
  };
};

exports.concat = function(a, b) {
  function concatStream(inA, itr) {
    return {
      hasNext: function() {
	if(inA && !itr.hasNext())
	  return b.hasNext();
	else return itr.hasNext();
      },
      value: function() {
	return itr.value();
      },
      next: function() {
	if(inA && !itr.hasNext())
	  return concatStream(false, b);
	else
	  return concatStream(inA, itr.next());
      }
    };
  }

  if(a.hasNext())
    return concatStream(true, a.hasNext());
  else
    return concatStream(false, b.next());
};

