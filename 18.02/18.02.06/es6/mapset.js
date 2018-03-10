var log = console.log;

const s = new Set();
[2, 3, 5, 4, 5 ,2, 2].forEach(x => s.add(x));
for (let i of s) {
  log(i);
}
// 2 3 5 4

const set = new Set([1, 2, 3, 4, 4]);
log([...set])
log(set.size)

// [1, 2, 3, 4]
// 4

// function div() {
//   return [...document.querySelectorAll('div')];
// }
// const divSet = new Set(div());
// log(divSet.size)


let equalSet = new Set(['3', 3]);
let a = NaN;
let b = NaN;
equalSet.add(a);
equalSet.add(b);
log(equalSet);
// Set { '3', 3, NaN }

let objEqual = new Set();
objEqual.add({});
log(objEqual.size)

objEqual.add({});
log(objEqual.size);
log(objEqual);
//Set { {}, {} }

// 对象写法
const properties = {
  'width': 1,
  'height': 1
}
if (properties['width']) {
  log(true)
}
// Set写法
const propertiesSet = new Set(['width', 'height']);
if (propertiesSet.has('width')) {
  log(true)
}


function dedupe(array){
  return Array.from(new Set(array));
}
log(dedupe([1, 1, 2, 3]))
// [1, 2, 3]

var iteratorSet = new Set(['red', 'green', 'blue']);
for(let item of iteratorSet.keys()) {
  log(item);
}
// red
// green
// blue
for(let item of iteratorSet.values()) {
  log(item);
}
// red
// green
// blue
for(let item of iteratorSet.entries()) {
  log(item);
}
// [ 'red', 'red' ]
// [ 'green', 'green' ]
// [ 'blue', 'blue' ]

log(Set.prototype[Symbol.iterator] === Set.prototype.values);
// true

for (let x of iteratorSet) {
  log(x);
}
// red
// green
// blue

iteratorSet.forEach((value, key) => log(key + ':' + value ));
// red:red
// green:green
// blue:blue

let set1 = new Set([1, 2, 3]);
set1 = new Set([...set1].map(x => x * 2));
log(set1);
//Set { 2, 4, 6 }

let set2 = new Set([1, 2, 3, 4, 5]);
set2 = new Set([...set].filter(x => x % 2 == 0));
log(set2);
// Set { 2, 4 }

let c = new Set([1, 2, 3]);
let d = new Set([4, 3, 2]);

//并集
let union = new Set([...c, ...d]);

//交集
let intersect = new Set([[...c].filter( x => d.has(x))]);

//差集
let difference = new Set([[...c].filter( x => !d.has(x))])

log(union, intersect, difference);
//Set { 1, 2, 3, 4 } Set { [ 2, 3 ] } Set { [ 1 ] }

let changeSet1 = new Set([1, 2, 3]);
changeSet1 = new Set([...set].map(val => val * 2));

let changeSet2 = new Set([1, 2, 3]);
changeSet2 = new Set(Array.from(set, val => val * 2));

log(changeSet1, changeSet2);
// Set { 2, 4, 6, 8 } Set { 2, 4, 6, 8 }

const wa = [[1, 2], [3, 4]];
const wsa = new WeakSet(wa);
log(wsa);
// WeakSet {}

const wb = [3, 4];
// const wsb = new WeakSet(wb);
// TypeError: Invalid value used in weak set

const wc = new WeakSet();
const objc = {};
const fooc = {};
const window = {};
wc.add(window);
wc.add(objc);

log(wc.has(window));
log(wc.has(fooc));
// true
// false

wc.delete(window);
log(wc.has(window));
// false
