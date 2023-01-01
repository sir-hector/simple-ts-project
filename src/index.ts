import BasketStorage from './BasketStorage/BasketStorage';
import Router from './Router/Router';
import './global.styles.scss';
import Basket from './Basket/Basket';

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
router.addRoute({name: 'frontend', renderFunction: () => console.log('route od frontendu')})
router.addRoute({name: 'backend', renderFunction: () => console.log('route od backendu')})

window.basket = storage;

export {};
