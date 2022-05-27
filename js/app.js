const ingresos = [
    new Ingreso('Sueldo', 2100),
    new Ingreso('Venta Automovil', 1500)
];

const egresos = [
    new Egreso('Renta Departamento', 1000),
    new Egreso('Compra de ropa', 500)
]

const cargarApp = () => {
    cargarHeader();
    cargar_ingreso();
    cargar_egreso();
}

const totalIngresos = () => {
    let total = 0;
    for(let ingreso of ingresos) {
        total += ingreso.valor;
    }
    return total;
}


const totalEgresos = () => {
    let total = 0;
    for(let egreso of egresos) {
        total += egreso.valor;
    }
    return total;
}

const cargarHeader = () => {
    let total = 0;
    total = totalIngresos() - totalEgresos();
    let porcentaje = totalEgresos()/totalIngresos();
    document.getElementById('presupuesto').innerHTML = formatoMoneda(total);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentaje);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
}

const formatoMoneda = (valor) => {
    return valor.toLocaleString('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: 2});
}

const formatoPorcentaje = (valor) => {
    return valor.toLocaleString('en-US', {style: 'percent', minimumFractionDigits: 1})
}

const cargar_ingreso = () => {
    let ingresoshtml = '';
    for(let ingreso of ingresos){
        ingresoshtml += crearIngreso(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML = ingresoshtml;
}

const crearIngreso = (ingreso) => {
    let ingresohtml = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${ingreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="close-circle-outline"
                    onclick='eliminarIngreso(${ingreso.id})'></ion-icon>
                </button>
            </div>
        </div>
    </div>`;
    return ingresohtml;
}

const eliminarIngreso = (id) => {
    let index = ingresos.findIndex(ingreso => ingreso.id === id);
    ingresos.splice(index, 1);
    cargarHeader();
    cargar_ingreso();
}

const cargar_egreso = () => {
    let egresohtml = '';
    for(let egreso of egresos){
        egresohtml += crearEgreso(egreso);
    }
    document.getElementById('lista-egresos').innerHTML = egresohtml;
}

const crearEgreso = (egreso) => {
    let egresohtml = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${egreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
            <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="close-circle-outline"
                    onclick='eliminarEgreso(${egreso.id})'></ion-icon>
                </button>
            </div>
        </div>
    </div>`;
    
    return egresohtml;
}

const eliminarEgreso = (id) => {
    let index = egresos.findIndex(egreso => egreso.id === id);
    egresos.splice(index, 1);
    cargarHeader();
    cargar_egreso();
}

const agregarDato = () => {
    let form = document.getElementById('forma');
    let tipo = form['tipo'];
    let descripcion = form['descripcion'];
    let valor = form['valor'];
    if(descripcion.value != '' && valor.value != '')
    {
        if(tipo.value === 'ingreso'){
            ingresos.push(new Ingreso(descripcion.value, +valor.value));
            cargarHeader();
            cargar_ingreso();
        }
        else if(tipo.value === 'egreso'){
            egresos.push(new Egreso(descripcion.value, +valor.value));
            cargarHeader();
            cargar_egreso();
        }
    }
}