import BasketProduct from '../ProductsTypes/BasketProducts';
import Storage from '../Storage/Storage';
import './Basket.module.scss'

class Basket {
    private static readonly BASKET_CLASS = 'basket';
    private static readonly OPEN_POPUP_CLASS = 'basket--is-popup-active'
    private static readonly BASKET_POPUP_CLASS = 'basket__popup'
    private static readonly PRODUCTS_LIST_CLASS = 'basket__products-list'
    private static readonly PRODUCTS_LIST_ITEM_CLASS = 'basket__list-item'

    private readonly rootElement: HTMLDivElement;
    private readonly storage: Storage<BasketProduct>;
    private readonly products: BasketProduct[] = [];
    private basketProductList!: HTMLUListElement;

    public constructor(containerId: string, storage: Storage<BasketProduct>){
        const basketElement = document.getElementById(containerId);

        if(basketElement){
            this.rootElement = basketElement as HTMLDivElement
            this.attachBasketToDOM();
            this.storage = storage;
            this.products = storage.getItems();
            return;
        }

        throw Error('Nie odnaleziono elementu koszyka')
    }

    private attachBasketToDOM(): void {
        this.rootElement.classList.add(Basket.BASKET_CLASS);
        this.appendBasketButton();
        this.appendBasketPopup();
    }

    private appendBasketButton(): void {
        const basketButton = document.createElement('button');
        const basketIcon = document.createElement('span');

        basketIcon.textContent = 'X';
        basketButton.addEventListener('click', () => {
            if(!this.rootElement.classList.contains(Basket.OPEN_POPUP_CLASS)) {
                this.refreshBasketData();
            }

            this.rootElement.classList.toggle(Basket.OPEN_POPUP_CLASS);
        })

        basketButton.appendChild(basketIcon);
        this.rootElement.appendChild(basketButton);
    }

    private appendBasketPopup(): void{
        const popupContainer = document.createElement('div');
        const productsList =  document.createElement('ul');

        popupContainer.classList.add(Basket.BASKET_POPUP_CLASS);
        productsList.classList.add(Basket.PRODUCTS_LIST_CLASS);

        this.basketProductList = productsList;
        popupContainer.appendChild(productsList);
        this.rootElement.appendChild(popupContainer)
    }

    private refreshBasketData(): void {
        while(this.basketProductList.firstChild) {
            this.basketProductList.firstChild.remove();
        }

        this.products.forEach(this.createListElement)
    }

    private readonly createListElement = (product: BasketProduct): void => {
        const listElement = document.createElement('li');
        const productInfoElement = document.createElement('p');
        const increaseButton = document.createElement('button');
        const decreaseButton = document.createElement('button');

        productInfoElement.textContent = `${product.name}, ilość ${product.quantity}`;
        increaseButton.textContent = '+';
        decreaseButton.textContent = '-';
        
        listElement.classList.add(Basket.PRODUCTS_LIST_ITEM_CLASS);
        increaseButton.addEventListener('click', ()=> {
            console.log('dodano')
        })
        decreaseButton.addEventListener('click', ()=> {
            console.log('dodano')
        })

        listElement.appendChild(productInfoElement);
        listElement.appendChild(increaseButton);
        listElement.appendChild(decreaseButton);

        this.basketProductList.appendChild(listElement);
    }
}

export default Basket;
