var _ = require('underscore');

// Replica of python range method.
exports.range = function( n ) {
	var arr = [];
    for( var i = 0; i < (n || arr.length); ++i ) arr[i] = i;
    return arr;
};

// From array return array of chunks
exports.chunkify = function (arr, chunkSize) {
	arr = arr || [];
	chunkSize = chunkSize > 0 ? chunkSize : arr.length;

	var result = [];
	var buffer = [];
	var j = 0;
	for (var i = 0; i < arr.length; i++, j++) {
		if (j == chunkSize) {
			result.push(buffer);
			j = 0;
			buffer = [];
		}
		buffer.push(arr[i]);
	}
	if (buffer.length > 0) {
		result.push(buffer);
	}
	return result;
};

/* Inverts javascript object.
	- example :
		- input :
			- {a : 1, A : 1, b : 2, B : 2}
		- output :
			- {'1' : ['a', 'A'], '2' : ['b', 'B']}
*/
exports.invertObj = function (obj) {
	var result = {};
	_.each(obj, function (value, key) {
		if (_.has(result, value)) {
			result[value].push(key);
		} else {
			result[value] = [key];
		}
	});
	return result;
};

/* Unwinds an index
	- example :
		- input :
			- {'1': ['a', 'A'], '2': ['b', 'B']}
		- output :
			- {'a': '1', 'A': '1', 'b': '2', 'B': '2'}
*/
exports.unwindIndex = function (index) {
	var result = {};
	_.each(index, function(value, key) {
		_.each(value, function(elem) {
			result[elem] = key;
		});
	});

	return result;
};

/*
	An extension to underscore findWhere method, works with nested properties.
	constraints -> [{fields: ['k1', 'k2', 'k3'], value: 'val'}, ...]
	returns index / indexes
*/
exports.nestedFindWhere = function(itr, constraints, options) {
	options = options || {};
	result = []
	for (var index = 0; index < itr.length; index++) {
		var element = itr[index];
		var isOk = true;
		for (var i = 0; i < constraints.length; i++) {
			var terminal = element;
			for (var j = 0; j < constraints[i].fields.length; j++) {
				if (_.isObject(terminal) && _.has(terminal, constraints[i].fields[j])) {
					terminal = terminal[constraints[i].fields[j]];
				} else {
					isOk = false;
					break;
				}
			}

			if (!isOk || !_.isEqual(terminal, constraints[i].value)) {
				isOk = false;
				break;
			}
		}
		if (isOk) {
			if (options.onlyFirst) {
				return index;
			}
			result.push(index);
		}
	}
	return result;
};

// Serialize parameters in object for GET request.
exports.serialize = function(obj) {
	var str = [];
	for (var p in obj) {
		str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	}
	return str.join("&");
}

// Escapes / sanitize string for dynamic regular expressions.
exports.escapeRegExp = function (str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
};


// Trims and truncates multiple spaces to single space.
exports.cleanSpacing = function (str) {
	return str.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,' ');
};

exports.ellipsis = function (str, n) {
	n = n > 4 ? n: 4;
	return str.length > n ? str.substring(0, n - 3) + '...' : str;
};