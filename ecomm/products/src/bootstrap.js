import faker from 'faker';
let products = '';
for (let i = 0; i < 3; i++) {
    const name = faker.commerce.productName();
    products += `<div>${name}</div>`;
}

document.querySelector('#dev-products').innerHTML = products;

// Context/Situation #1
// We are running this file in development in isolation
// We are using local index.html file, which DEFINETELY 
// has an element with id of '#dev-products'.
// We want to immediately render our app into that element

// Context/Situation #2
// We are running this file in development or production
// through CONTAINER app and there is NO GUARANTEE that
// '#dev-products' exists. 
// WE DO NOT WANT try to immediately render the app.
