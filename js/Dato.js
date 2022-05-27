class Dato{
    constructor(descripcion, valor){
        this._descripcion = descripcion;
        this._valor = valor;
    }

    get descripcion(){
        return this._descripcion;
    }
    set descripcion(val){
        this._descripcion = val;
    }
    get valor(){
        return this._valor;
    }
    set valor(val){
        this._valor = val;
    }
}