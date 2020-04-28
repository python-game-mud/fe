const pipe = (...funcs) => initialValue =>
	funcs.reduce((acc, func) => func(acc), initialValue);

const compose = (...funcs) => initialValue =>
	pipe(...funcs.reverse())(initialValue);

export { pipe, compose };
