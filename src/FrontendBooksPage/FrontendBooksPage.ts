import ProductPage from "../ProductPage/ProductPage";
import FrontendBook from "../ProductsTypes/FrontendBook";
import Router from "../Router/Router";
import Basket from "../Basket/Basket";
import Product from "../ProductsTypes/Product";



class FrontendBooksPage extends ProductPage<FrontendBook>{
    protected readonly products: FrontendBook[] = [
        {id: 'fe-001', name:'super frontend', price:5},
        {id: 'fe-002', name:'mega frontend', price:6},
        {id: 'fe-003', name:'tani frontend', price:2.5},
    ];
    public constructor(containerId: string, listingName: string, router: Router, basket: Basket) {
        super(containerId, listingName, router, basket)
    }

    protected readonly productTemplate = ({id, name, price}: FrontendBook): HTMLElement => {
        const element = document.createElement('article')
        const titleElement = document.createElement('p')
        const priceElement = document.createElement('p')
        const formElement = document.createElement('form')

        formElement.innerHTML = `
            <label>
                Ilość
                <input id="product-${id}" type="number" value="0" />
            </label>
            <button type="submit">Dodaj do koszyka</button>
        `.trim();

        titleElement.textContent = name;
        priceElement.textContent = price.toFixed(2);
        formElement.addEventListener('submit', () => {
            const input = formElement.querySelector(`#product-${id}`) as HTMLInputElement;
            const quantity = Number(input.value);
            this.basket.addToBasket({id, name, price, quantity});
            input.value = '0';
        });

        element.appendChild(titleElement);
        element.appendChild(priceElement);
        element.appendChild(formElement);

        return element;
    };
}

export default FrontendBooksPage;