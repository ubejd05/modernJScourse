//Person constructor
// function Person(firstName, lastName) {
//    this.firstName = firstName,
//    this.lastName = lastName;
//    console.log(this);
// }

// const ubi = new Person("Ubejd", "Haziri");

// // console.log(ubi);
// const number = parseInt(new Number("5"));
// console.log(number);

// console.log(Date.now() - "Thu Jul 15 2020 21:14:06".getTime());

class Person {
   constructor(firstName, lastName) {
      this.firstName = firstName;
      this.lastName = lastName;
   }

   greeting() {
      return `Hello there ${this.firstName} ${this.lastName}`;
   }
}

class Customer extends Person {
   constructor(firstName, lastName, phone, membership) {
      super(firstName, lastName);

      this.phone = phone;
      this.membership = membership;
   }

   static getMembershipCost() {
      return 500;
   }
}

const john = new Customer('test1', 'test2', 'test3', 'test4');

console.log(john.greeting());