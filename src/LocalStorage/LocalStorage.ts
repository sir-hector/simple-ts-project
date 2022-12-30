import Storage from '../Storage/Storage'

class LocalStorage<T> extends Storage<T> {
    public constructor(storageKey: string){
        super(storageKey)
    }

    public getItems(): T[] {
        const jsonItems = localStorage.getItem(this.STORAGE_KEY) as string;
        const items = JSON.parse(jsonItems) as T[];
        
        return items;
    }

    public saveItems(items: T[]): void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items))
    }

    public clearItems(): void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify([]))
    }

    protected init(): void {
        if(!localStorage.getItem(this.STORAGE_KEY)){
            this.clearItems()
        }
    }

}

export default LocalStorage;