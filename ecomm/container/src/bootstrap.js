// we need to create different aliases to prevent two mount
// function from colliding with each other.
import {mount as productsMount} from 'products/ProductsIndex';
import {mount as cartMount} from 'cart/CartShow';

console.log('Container');
productsMount(document.querySelector('#my-products'));
cartMount(document.querySelector('#my-cart'));