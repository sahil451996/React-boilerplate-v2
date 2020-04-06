// const person = {
//     name: 'sahil',
//     age: 24,
//     location: {
//         city: 'Mumbai',
//         temprature: 35
//     }
// }

// const { name: firstName = '', age } = person;

// const { city, temprature: temp } = person.location;

// console.log(`${firstName} is ${age}`);
// if (city && temp) {
//     console.log(`${temp} in ${city}`);
// }

// const book = {
//     title: 'Ego is the enemy',
//     author: 'Ryan Holiday',
//     publisher: {
//         name: 'Penguin'
//     }
// }

// const { name: publisherName = 'Self-Published' } = book.publisher;

// console.log(publisherName);


const item = ['Coffee(Hot)', '$2.00', '$2.50', '$2.75'];
const [coffee, , cost] = item;

console.log(`A medium ${coffee} costs ${cost} dollars.`)