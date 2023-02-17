import React from "react";
import data from '../../../data'
import {AiFillEye,AiFillDelete} from 'react-icons/ai'
import Spinner from "../spinner/spinner";
import Swal from "sweetalert2";

export default function Horas(){
    const URL= import.meta.env.VITE_HOST + "/hours"
    const URL2= import.meta.env.VITE_HOST + "/create-hour"
    const URLD= import.meta.env.VITE_HOST + "/delete-hour"

    const [modalAdd,setModalAdd] = React.useState(false)
    const [loading,setLoading] = React.useState(false)
    const [peticion,setPeticion] = React.useState(false)
    const [horas,setHoras] = React.useState({})

    React.useEffect(()=>{
        let status = 0
        setLoading(true)
        const response = fetch(URL,{
            method:'GET'
        }).then(function(res){
            status = res.status

            return res.json();
        }).then(function(data){
            if(status !== 200)throw new Error(data)
            setHoras(data)
            
        }).catch(function(error){
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hubo un error con el servidor!'
                })
            
        })
        setLoading(false)

    },[peticion])

    const handleAddHour = async (e) => {
        e.preventDefault()
        console.log(e.target.elements.horario.value)
        const jsonData = {
            "hour_name":e.target.elements.horario.value
        }

        try{
            setLoading(true)
            const response = await fetch(URL2,{
                method:'POST',
                body: JSON.stringify(jsonData),
                headers: {
                    "Content-Type": 'application/json'
                }
            })
            const data = await response.json()

            if(response.status !== 200) throw new Error(data.detail)

            const Toast = Swal.mixin({
                toast: true,
                position: 'bottom',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
              
            Toast.fire({
                icon: 'success',
                title: 'Hora registrada exitosamente'
            })
            
            setPeticion(!loading)

        }catch(error){
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hubo un error con el servidor!'
                })
            
        }
        setLoading(false)
        setModalAdd(false)

    }

    const alertSuccessfull = (message) => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: message
          })
      
        setPeticion(!peticion)
    }

    const alertError = () => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hubo un error con el servidor!',
          })
    }

    const handleDeleteHour = async (id) => {
        
        await Swal.fire({
            title: '¿Estas seguro de eliminar?',
            text: "¡No podrás revertir esto! Todos los datos seran eliminados",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Confirmar'
          }).then((result) => {
            if (!result.isConfirmed) {
                return
            }
            const jsonData = {
                "hour_id":id
            }

            setLoading(true)
            let status = 0
            fetch(URLD,{
                method: 'DELETE',
                body:JSON.stringify(jsonData),
                headers: {
                    "Content-Type": 'application/json'
            }}).then(function(res){
                status = res.status
                return res.json();
            }).then(function(data){
                if(status !== 200)throw new Error(data.detail)
                alertSuccessfull('Hora eliminada')
                
            }).catch(function(error){
                console.log(error)
                alertError("Error al borrar hora")
                
            })
            setLoading(false)
          })
    }

    return(
        <>
        <h1 className="text-5xl pb-5 p-1.5">Horarios Rutas Unillanos</h1>
        {!loading && horas.length > 0 ? (
            <>
                 <div className="flex flex-col mt-3">
                            <div className="overflow-x-auto">
                                

                                <div className="p-1.5  inline-block align-middle">
                                    <div className="overflow-hidden border rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-sky-900">
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-xs font-bold text-left text-white uppercase "
                                                    >
                                                        ID DE LA HORA
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-xs font-bold text-left text-white uppercase "
                                                    >
                                                        HORA
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-xs font-bold text-left text-white uppercase "
                                                    >
                                                        OPCIONES
                                                    </th>
                                                    
                                                    
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                
                                               {horas.map((item,index)=>(
                                                    <tr key={index}>
                                                    <td className="px-6 py-4 text-sm font-medium text-black whitespace-nowrap">
                                                            {item.hours_id}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-black whitespace-nowrap">
                                                        {item.hours_name}
                                                    </td>
                                                    
                                                    <td className="px-6 py-4 text-sm text-black whitespace-nowrap">
                                                        <AiFillDelete 
                                                            className='w-6 h-6 cursor-pointer'
                                                            onClick={()=>{handleDeleteHour(item.hours_id)}}
                                                        />
                                                    </td>
                                                    
                                                </tr>
            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        
            </>
        ) : loading && horas.length > 0 ?  (<Spinner/>) : 
        (
            <p>No hay horas registradas</p>
        )}
        <button 
                            className='bg-green-500 hover:bg-green-700 text-white font-medium rounded text-base p-1 mt-2'
                            onClick={()=>{setModalAdd(true)}}
                        >
                            Añadir horario
                        </button>
       

                        {modalAdd && (
                <div className="fixed bottom-0 inset-x-0 px-3 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center z-10">
                <div className="fixed inset-0 transition-opacity">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-xs sm:w-full">
                
                    <form onSubmit={handleAddHour}>
                    <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div>
                            <div className="flex flex-col items-center">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 text-center">Añadir un horario</h3>
                                
                            </div>
                            <div className="mt-2">
                            
                                <div className="text-sm leading-5 text-gray-500">
                                        <div className=" relative mt- ">
                                            <input
                                                // onChange={handleChangeFormAdd}
                                                name="horario"    
                                                type="time"
                                                required
                                                id="floatingInput1_ruta"
                                                placeholder=" "
                                                autoComplete="off"
                                                className='border block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer'/>
                                            <label
                                                htmlFor="horario"
                                                for="floatingInput1_ruta" 
                                                className='absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white spx-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1'
                                                >
                                                    Hora
                                            </label>
                                        </div>
                                        
                                        
                                        
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        
                        <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                            <button
                            type="button"
                            className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                            onClick={()=>{setModalAdd(false)}}
                            >
                            Cerrar
                            </button>
                        </span>

                        <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                            <button
                            type="submit"
                            className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-red active:bg-green-700 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                            >
                                Añadir
                            </button>
                        </span>
                    </div>
                    </form>
                </div>
                </div>
            )}
            
        </>
    )
}