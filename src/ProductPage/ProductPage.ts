import Basket from "../Basket/Basket";
import Product from "../ProductsTypes/Product";
import Router from "../Router/Router";

abstract class ProductPage<T extends Product> {
  protected abstract readonly productTemplate: (product: T) => HTMLElement;
  private readonly rootElement!: HTMLDivElement;
  protected readonly products: T[] = [];

  public constructor(
    containerId: string,
    listingName: string,
    private readonly router: Router,
    protected readonly basket: Basket,
  ) {
    const containerElement = document.getElementById(containerId);

    if (!containerId) {
      return;
    }

    this.router.addRoute({ name: listingName, renderFunction: this.render });
    this.rootElement = containerElement as HTMLDivElement;
  }

  public render = (): void => {
    while (this.rootElement.firstChild) {
      this.rootElement.firstChild.remove();
    }

    const productBoxes = this.products.map(this.productTemplate);
    productBoxes.forEach(product => {
      this.rootElement.appendChild(product);
    });
  };
}

export default ProductPage;
