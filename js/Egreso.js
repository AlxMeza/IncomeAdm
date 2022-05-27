class Egreso extends Dato {
    static id = 0;
    constructor(descripcion, valor){
        super(descripcion, valor);
        this._id = ++Egreso.id;
    }
    get id(){
        return this._id;
    }
}