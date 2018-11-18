export class ArrayBufferStore {

    private _store: Map<number, ArrayBuffer>;

    constructor () {
        this._store = new Map();
    }

    public clone (id: number): ArrayBuffer {
        const arrayBuffer = this._store.get(id);

        if (arrayBuffer === undefined) {
            throw new Error(`There is no arrayBuffer stored with an id called "${ id }".`);
        }

        return arrayBuffer.slice(0);
    }

    public purge (id: number): void {
        const arrayBufferExisted = this._store.delete(id);

        if (!arrayBufferExisted) {
            throw new Error(`There is no arrayBuffer stored with an id called "${ id }".`);
        }
    }

    public slice (id: number, begin: number, end: null | number): ArrayBuffer {
        const arrayBuffer = this._store.get(id);

        if (arrayBuffer === undefined) {
            throw new Error(`There is no arrayBuffer stored with an id called "${ id }".`);
        }

        if (begin < 0 || begin > arrayBuffer.byteLength) {
            throw new Error(`The given value for begin "${ begin }" is out of bounds.`);
        }

        if (end !== null) {
            if (end > arrayBuffer.byteLength) {
                throw new Error(`The given value for end "${ end }" is out of bounds.`);
            }

            if (end < begin) {
                throw new Error(`The given value for end "${ end }" is below the given value for begin "${ begin }".`);
            }
        }

        return arrayBuffer.slice(begin, (end === null) ? arrayBuffer.byteLength : end);
    }

    public store (id: number, arrayBuffer: ArrayBuffer): void {
        if (this._store.has(id)) {
            throw new Error(`There is already an arrayBuffer stored with an id called "${ id }".`);
        }

        this._store.set(id, arrayBuffer);
    }

}
