import BasketStorage from './BasketStorage/BasketStorage';
import Router from './Router/Router';
import './global.styles.scss';
import Basket from './Basket/Basket';
import FrontendBooksPage from './FrontendBooksPage/FrontendBooksPage';
import BackendBooksPage from './BackendBooksPage/BackendBooksPage';

declare global {
  interface Window {
    basket: BasketStorage;
  }
}

const redirectFunction = (locaction: string): void => {
  window.location.hash = `#/${locaction}`
}

const frontendButton = document.getElementById('fe-button')

if(frontendButton) {
  frontendButton.addEventListener('click',  () => 
    redirectFunction('frontend')
  )
}

const backendButton = document.getElementById('be-button')

if(backendButton) {
  backendButton.addEventListener('click',  () => 
    redirectFunction('backend')
  )
}

const storage = new BasketStorage();
const router = new Router();
const basket = new Basket('basket', storage)

new FrontendBooksPage('listing-page', 'frontend', router, basket);
new BackendBooksPage('listing-page', 'backend', router, basket);

window.basket = storage;

export {};
