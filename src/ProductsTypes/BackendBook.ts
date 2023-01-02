import Product from "./Product";

type BackendLanguage = 'JavaScript' | 'C#' | 'GoLang'

type BackendBook = {
    backendLanguage: BackendLanguage
} & Product;

export default BackendBook;