// SYMBOLS

// Create a symbol

// const sym = Symbol();
// const sym2 = Symbol('sym2');

// console.log(Symbol('123') == Symbol('123'));


// Unique Object Keys
// const KEY1 = Symbol();
// const KEY2 = Symbol('sum2');

// const myObj = {};

// myObj[KEY1] = 'Prop1'
// myObj[KEY2] = 'Prop2'

// console.log(myObj);





// DESTRUCTURING 

// let a, b;
// [a,b ] = [100, 200];

// console.log(a,b);

// Array Destructuring 

// const people = ['John', 'Beth', 'Mike',]

// const [person1, person2, person3] = people;

// console.log(person1, person2, person3);


// Object Destructuring 
// const person = {
//   name: 'John Doe',
//   age: 32,
//   city: 'Miami',
//   gender: 'Male',
//   sayHello: function() {
//     console.log('Hello');
//   }
// }

// Old ES5
// const name = person.name;
//       age = person.age;
//       city = person.city;

// New ES6 Destructuring
// const { name, age, city, sayHello } = person

// console.log(name, age, city);

// sayHello()





// //MAPS are key-value pairs - we can use ANY type as a key or value

// const map1 = new Map();

// //Set keys
// const key1 = 'some string',
//       key2 = {},
//       key3 = function () {};

// // Set map values by key
// map1.set(key1, 'Value of key1');
// map1.set(key2, 'Value of key2');
// map1.set(key3, 'Value of key3');

// // Get values by key
// console.log(`${map1.get(key1)}, ${map1.get(key2)}, ${map1.get(key3)}`);
// console.log(map1);






// SETS - Store unique values of any type

const set1 = new Set();

// Add values to set
set1.add(100);
set1.add('A String');
set1.add({name: 'John'});
set1.add(true)

console.log(set1);

// Get count
console.log(set1.size);

// Check for values
console.log(set1.has(100));

// Delete from set
set1.delete(100)
console.log(set1);

