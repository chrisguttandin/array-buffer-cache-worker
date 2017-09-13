export class ArrayBufferStore {

    private _store: Map<number, ArrayBuffer>;

    constructor () {
        this._store = new Map();
    }

    public clone (id: number) {
        const arrayBuffer = this._store.get(id);

        if (arrayBuffer === undefined) {
            throw new Error(`There is no arrayBuffer stored with an id called "${ id }".`);
        }

        return arrayBuffer.slice(0);
    }

    public purge (id: number) {
        const arrayBufferExisted = this._store.delete(id);

        if (!arrayBufferExisted) {
            throw new Error(`There is no arrayBuffer stored with an id called "${ id }".`);
        }
    }

    public slice (id: number, begin: number, end: null | number) {
        const arrayBuffer = this._store.get(id);

        if (arrayBuffer === undefined) {
            throw new Error(`There is no arrayBuffer stored with an id called "${ id }".`);
        }

        // @todo Validate the values of begin and end.

        return arrayBuffer.slice(begin, (end === null) ? arrayBuffer.byteLength : end);
    }

    public store (id: number, arrayBuffer: ArrayBuffer) {
        if (this._store.has(id)) {
            throw new Error(`There is already an arrayBuffer stored with an id called "${ id }".`);
        }

        this._store.set(id, arrayBuffer);
    }

}
