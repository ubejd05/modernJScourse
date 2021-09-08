// try {
//   // Produce a ReferenceError
//   myFunction();
// } catch (error) {
//   console.log(error);
//   // console.log(error.message);
//   // console.log(error.name);
//   // console.log(error instanceof ReferenceError);
// }

// console.log('Program continues...');


// =================================================

const user = {name: 'Ubejd'}

if (!user.lastname) {
  // throw 'User has no lastname'
  throw new SyntaxError('User has no lastname')
}