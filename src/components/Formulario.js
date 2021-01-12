import React,{useState}from 'react';
import Error from './Error';
import shortid from 'shortid';
import PropTypes from 'prop-types';

const Formulario = ({guardarGasto,guardarCrearGasto}) =>{
    const [ nombre, guardarNombre ] = useState('');
    const [ cantidad, guardarCantidad] = useState(0);
    const [ error, guardarError] = useState(false);

    const agregarGasto = e =>{
        e.preventDefault();

        // validar
        if( cantidad < 1 || isNaN(cantidad) || nombre.trim() === ''){
            guardarError(true);
            return;
        }
        guardarError(false);
        
        // construir el gato
        const gasto = {
            nombre,
            cantidad,
            id: shortid.generate()
        }

        // pasar el gasto al component principal
        guardarGasto(gasto);
        guardarCrearGasto(true);

        // resetear el form
        guardarNombre('');
        guardarCantidad(0);
    }


    return(
        <form
            onSubmit={agregarGasto}
        >
            <h2>Agrega tus gastos aqui</h2>
            {
                error 
                ?
                    <Error
                        mensaje = {"Gatos vacio o gasto incorrecto"}
                    />
                :
                null
            }
            <div className="campo">
                <label>Nombre Gasto</label>
                <input
                    type="text"
                    className="u-full-width"
                    placeholder="Ej. Tranposte"
                    onChange={e => guardarNombre(e.target.value)}
                    value={nombre}
                />
            </div>
            <div className="campo">
                <label>Cantidad Gasto</label>
                <input
                    type="number"
                    className="u-full-width"
                    placeholder="Ej. 3000"
                    onChange={e => guardarCantidad(parseInt(e.target.value))}
                    value={cantidad}
                />
            </div>
            <input
                type="submit"
                className="button-primary u-full-width"
                value="Agregar Gasto"
            />
        </form>
    );
}

Formulario.protoType={
    guardarGasto: PropTypes.func.isRequired,
    guardarCrearGasto: PropTypes.func.isRequired
}

export default Formulario;