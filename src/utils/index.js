export const delay = ms =>
    new Promise(res => {
        const timer = setTimeout(() => {
            clearTimeout(timer);
            res();
        }, ms);
    });

export function safeSetState() {
    return function(target) {
        target.isTestable = true;
        const setState = target.prototype.setState;
        const componentWillUnmount = target.prototype.componentWillUnmount || function() {};
        target.prototype.setState = function() {
            return setState.apply(this, [...arguments]);
        };
        target.prototype.componentWillUnmount = function() {
            const value = componentWillUnmount.apply(this, [...arguments]);
            this.setState = () => {};
            return value;
        };
    };
}
export function createReducer(initialState, handlers) {
    return (state = initialState, action) =>
        handlers.hasOwnProperty(action.type) ? handlers[action.type](state, action) : state;
}

const objectToString = Object.prototype.toString;

export const isObject = obj => objectToString.call(obj) === '[object Object]';
export const isArray = arr => Array.isArray(arr) || objectToString.call(arr) === '[object Array]';
