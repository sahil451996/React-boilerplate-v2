console.log("promises");

const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve('This is my resolved data');
        reject('Something went wrong!!')
    }, 3000);
});

console.log('before');

// promise.then((data) => {
//     console.log(data);
// }).catch( (error) => {
//     console.log(error);
// });

//syntax 2

promise.then((data) => {
    console.log(data);
}, (error) => {
    console.log(error);
});


console.log('after');
