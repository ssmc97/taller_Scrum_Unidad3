import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import { collection, onSnapshot, addDoc, doc, deleteDoc} from 'firebase/firestore';

const Formulario = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [carrera, setCarrera] = useState('');
    const [telefono, setTelefono] = useState('');
    const [edad, setEdad] = useState('');
    const [lista, setLista] = useState([])


    useEffect(() => {

        const obtenerDatos = async () => {    
          try {
            await onSnapshot(collection(db, "taller"), (querySnapshot) => {    
              setLista(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            });
          } catch (error) {
            console.log(error);
          }
        };
        obtenerDatos();
      }, []);


    const eliminar = async id => {
        console.log(id)
        try{
            await deleteDoc(doc(db,'taller',id))
        }catch(error){
            console.log(error)
        }
    }
    const guardarEstudiantes = async (e) =>{
        e.preventDefault()
        if (!nombre.trim()){
            alert('¡ERROR! Ingrese el nombre')
            return
        }
        if(!apellido.trim()){
            alert('¡ERROR! Ingrese el apellido')
            return
        }
        if(!carrera.trim()){
            alert('¡ERROR! Ingrese la carrera')
            return
        }
        if(!telefono.trim()){
            alert('¡ERROR! Ingrese el telefono de contacto')
            return
        }
        if(!edad.trim()){
            alert('¡ERROR! Ingrese la edad')
            return
        }
        try{   
            const data = await addDoc(collection(db,'taller'),{
                
                nombrenombre: nombre,
                nombreapellido: apellido,
                nombrecarrera: carrera,
                nombretelefono: telefono,
                nombreedad: edad
            })

            setLista([
                ...lista,
                {nombrenombre:nombre, nombreapellido:apellido, nombrecarrera: carrera, nombretelefono: telefono, nombreedad: edad, id:data.id}
            ])

            setNombre('')
            setApellido('')
            setCarrera('')
            setTelefono('')
            setEdad('')
            e.target.reset()
        }catch(error){
            console.log(error)
        }
    }

    return (
        <div className='container mt-5'>
        <h1 className='text-center'>ESTUDIANTES</h1>
        <hr/>
        <div className='row'>
            <div className="col-8">
                <h4 className="text-center">Listado de Estudiantes</h4>
                <ul className="list-group">
                    {
                        lista.map(item =>(
                            <li className='list-group-item' key={item.id}>
                                <span className='lead'>{item.nombrenombre}  -  {item.nombreapellido}  -  {item.nombrecarrera}  -  {item.nombretelefono}  -  {item.nombreedad} años</span>
                                <button className='btn btn-danger btn-sm float-end mx-2' onClick={()=>eliminar(item.id)}>Eliminar</button>
                            </li>
                        ))
                    }
                </ul>
            </div>
        
        <div className='col-4'>
            <h4 className="text-center">
                Agregar nuevo Estudiante
            </h4>
            <form onSubmit={guardarEstudiantes}>
                <input 
                className='form-control mb-2'
                type="text" 
                placeholder='Ingrese el Nombre'
                onChange={(e)=>setNombre(e.target.value)}
                value = {nombre}
                ></input>
                <input 
                className='form-control mb-2'
                type="text" 
                placeholder='Ingrese los Apellidos'
                onChange={(e) => setApellido(e.target.value)}
                value = {apellido}></input>
                <input 
                className='form-control mb-2'
                type="text" 
                placeholder='Ingrese la carrera a estudiar'
                onChange={(e) => setCarrera(e.target.value)}
                value = {carrera}></input>
                <input 
                className='form-control mb-2'
                type="number" 
                placeholder='Ingrese el Telefono de contacto'
                onChange={(e) => setTelefono(e.target.value)}
                value = {telefono}></input>
                <input 
                className='form-control mb-2'
                type="number" 
                placeholder='Ingrese la Edad'
                onChange={(e) => setEdad(e.target.value)}
                value = {edad}></input>
                <button 
                className='btn btn-primary btn-block'
                type='submit'
                >Agregar</button>
            </form>
        </div>
        </div>   
    </div>
    );
};

export default Formulario;