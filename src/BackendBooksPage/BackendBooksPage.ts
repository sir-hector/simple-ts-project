import ProductPage from "../ProductPage/ProductPage";
import BackendBook from "../ProductsTypes/BackendBook";
import Router from "../Router/Router";
import Basket from "../Basket/Basket";
import Product from "../ProductsTypes/Product";



class BackendBooksPage extends ProductPage<BackendBook>{
    protected readonly products: BackendBook[] = [
        {id: 'be-001', name:'super backend', price:5, backendLanguage: 'JavaScript'},
        {id: 'be-002', name:'mega backend', price:6,  backendLanguage: 'JavaScript'},
        {id: 'be-003', name:'tani backend', price:2.5,  backendLanguage: 'JavaScript'},
    ];
    public constructor(containerId: string, listingName: string, router: Router, basket: Basket) {
        super(containerId, listingName, router, basket)
    }

    protected readonly productTemplate = ({backendLanguage, id, name, price}: BackendBook): HTMLElement => {
        const element = document.createElement('article')
        const titleElement = document.createElement('p')
        const priceElement = document.createElement('p')
        const languageElement = document.createElement('p')
        const formElement = document.createElement('form')

        formElement.innerHTML = `
            <label>
                Ilość
                <input id="product-${id} type="number" value="0" />
            </label>
            <button type="submit">Dodaj do koszyka</button>
        `.trim();

        titleElement.textContent = name;
        priceElement.textContent = price.toFixed(2);
        languageElement.textContent = backendLanguage;

        formElement.addEventListener('submit', () => {
            const input = formElement.querySelector(`#product-${id}`) as HTMLInputElement;
            const quantity = Number(input.value);
            this.basket.addToBasket({id, name, price, quantity});
            input.value = '0';
        });

        element.appendChild(titleElement);
        element.appendChild(priceElement);
        element.appendChild(formElement);
        element.appendChild(languageElement);

        return element;
    };
}

export default BackendBooksPage;