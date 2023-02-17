import React from "react";
import data from '../../../data'
import {AiFillEye,AiFillDelete,AiOutlineClose,AiFillEdit} from 'react-icons/ai'
import {MdMoreTime} from 'react-icons/md'
import Swal from "sweetalert2";
import Spinner from "../spinner/spinner";
export default function Buses(){
    const URL = import.meta.env.VITE_HOST + "/info-buses"
    const URLHoras = import.meta.env.VITE_HOST + "/hours"
    const URL2 = import.meta.env.VITE_HOST + "/create-bus"
    const URL3 = import.meta.env.VITE_HOST + "/create-location"
    const URLD = import.meta.env.VITE_HOST + "/delete-bus"
    const URLH = import.meta.env.VITE_HOST + "/create-bus-hour"
    const URLDP = import.meta.env.VITE_HOST + "/delete-location"
    const URLDBH = import.meta.env.VITE_HOST + "/delete-bus-hour"
    const URLU = import.meta.env.VITE_HOST + "/update-bus"


    const [modalParaderos,setModalParaderos] = React.useState(false)
    const [modalAddRuta,setModalAddRuta] = React.useState(false)
    const [modalHours,setModalHours] = React.useState(false)
    const [modalAddParadero,setModalAddParadero] = React.useState(false)
    const [modalEdit,setModalEdit] = React.useState(false)

    const [peticion,setPeticion] = React.useState(false)
    const [loading,setLoading] = React.useState(true)
    const [rutas,setRutas] = React.useState([])
    const [locations,setLocations] = React.useState()
    const [hours,setHours] = React.useState()
    const [horas,setHoras] = React.useState({})
    const [editBuffer,setEditBuffer] = React.useState()
    


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
            setRutas(data)
            setLoading(false)

        }).catch(function(error){
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hubo un error con el servidor!'
                })
            
        })

        
        setLoading(true)
        const responsex = fetch(URLHoras,{
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

    const handleDelete = async (id) =>{
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
                "bus_id":id
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
                alertSuccessfull('Ruta eliminada')
                
            }).catch(function(error){
                console.log(error)
                alertError("Error al borrar ruta")
                
            })
            setLoading(false)
          })
    }


    const handleFormHours = async (e) => {
        e.preventDefault()

        const jsonData = {
            bus_id:e.target.elements.id.value,
            hour_id:e.target.elements.horario.value
        }

        setLoading(true)
            let status = 0
            fetch(URLH,{
                method: 'POST',
                body:JSON.stringify(jsonData),
                headers: {
                    "Content-Type": 'application/json'
            }}).then(function(res){
                status = res.status
                return res.json();
            }).then(function(data){
                if(status !== 200)throw new Error(data.detail)
                alertSuccessfull('Hora agregada')
                
            }).catch(function(error){
                console.log(error)
                alertError("Error al agregar hora")
                
            })
            setLoading(false)
        setModalHours(false)

    }

    const handleAddParadero = async (e) => {
        e.preventDefault()
        const jsonData = {
            "location_name":e.target.elements.name.value,
            "latitude":e.target.elements.coordx.value,
            "longitude":e.target.elements.coordy.value,
            "bus_id":e.target.elements.id.value
        }
        try{
            setLoading(true)
            const response = await fetch(URL3,{
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
                title: 'Ruta registrada exitosamente'
            })
            
            setPeticion(!peticion)

        }catch(error){
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hubo un error con el servidor!'
                })
            
        }
        setLoading(false)
        setModalAddParadero(false)
        setModalParaderos(false)
        
    }

    const handleAddRoute = async (e) => {
        e.preventDefault()

        const jsonData = {
            "bus_name":e.target.elements.name.value
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
                title: 'Ruta registrada exitosamente'
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
        setModalAddRuta(false)

    }

    const handleDeleteParadero = async (id) => {
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
                "location_id":id
            }

            setLoading(true)
            let status = 0
            fetch(URLDP,{
                method: 'DELETE',
                body:JSON.stringify(jsonData),
                headers: {
                    "Content-Type": 'application/json'
            }}).then(function(res){
                status = res.status
                return res.json();
            }).then(function(data){
                if(status !== 200)throw new Error(data.detail)
                alertSuccessfull('Paradero eliminada')
                
            }).catch(function(error){
                console.log(error)
                alertError("Error al borrar paradero")
                
            })
            setLoading(false)
            setModalParaderos(false)
          })
    }

    const handleItemsParadero = (location,id) => {
        setModalParaderos(true)
        setLocations({
            location,
            id
        })
    }

    const handleItemsHours = (id) => {
        setModalHours(true)
        setHours(id)
    }

    const handleEdit = (item) => {
        setModalEdit(true)
        setEditBuffer(item)
    }

    const handleDeleteHourRoute = async (hour,bus) => {
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
                "hour_id":hour,
                "bus_id":bus
            }

            setLoading(true)
            let status = 0
            fetch(URLDBH,{
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
    
    const handleEditForm = async (e) => {
        e.preventDefault()
        const jsonData = {
            bus_id:e.target.elements.id.value,
            bus_name:e.target.elements.name.value
        }

        setLoading(true)
            let status = 0
            fetch(URLU,{
                method: 'PUT',
                body:JSON.stringify(jsonData),
                headers: {
                    "Content-Type": 'application/json'
            }}).then(function(res){
                status = res.status
                return res.json();
            }).then(function(data){
                if(status !== 200)throw new Error(data.detail)
                alertSuccessfull('Ruta editada')
                
            }).catch(function(error){
                console.log(error)
                alertError("Error al editar ruta")
                
            })
            setLoading(false)
        setModalEdit(false)
    }
    

    return(
        <>
        <h1 className="text-5xl pb-5 p-1.5">Rutas Unillanos</h1>
        {!loading ? (
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
                                                        ID DE LA RUTA
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-xs font-bold text-left text-white uppercase "
                                                    >
                                                        NOMBRE DE LA RUTA
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-xs font-bold text-left text-white uppercase "
                                                    >
                                                        HORARIOS
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-xs font-bold text-left text-white uppercase "
                                                    >
                                                        PARADEROS
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
                                                
                                               {(()=>{
                                                if(rutas.length === 0){return(<p>No hay rutas agregadas</p>)}
                                                else{
                                                return(
                                                    <>
                                                    {rutas.map((item,index)=>(
                                                    <tr key={index}>
                                                    <td className="px-6 py-4 text-sm font-medium text-black whitespace-nowrap">
                                                            {item.bus_id}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-black whitespace-nowrap">
                                                        {item.bus_name}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-black whitespace-nowrap">
                                                        {item.hours.length < 1 && (<p>No hay horas registradas</p>)}
                                                        {item.hours.map((it,id)=>(
                                                            <div className="flex p-0.5 items-center" key={id}>
                                                                <p key={id}>{it.hour_name}</p>
                                                                <AiOutlineClose 
                                                                    className='w-4 h-4 cursor-pointer'
                                                                    onClick={()=>{handleDeleteHourRoute(it.hour_id,item.bus_id)}}
                                                                    />
                                                            </div>
                                                            
                                                        ))}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-black whitespace-nowrap">
                                                    <AiFillEye className='w-8 h-8 cursor-pointer' onClick={()=>{handleItemsParadero(item.locations,item.bus_id)}}/>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-black whitespace-nowrap inline-flex">
                                                        <MdMoreTime 
                                                            className='w-6 h-6 cursor-pointer'
                                                            onClick={()=>{handleItemsHours(item.bus_id)}}
                                                        />
                                                        <AiFillDelete 
                                                            className='w-6 h-6 cursor-pointer'
                                                            onClick={()=>{handleDelete(item.bus_id)}}
                                                        />
                                                        <AiFillEdit
                                                            className='w-6 h-6 cursor-pointer'
                                                            onClick={()=>{handleEdit(item)}}
                                                        />
                                                    </td>
                                                    
                                                </tr>
            ))}
                                                    </>
                                                )}
                                               })()}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <button 
                            className='bg-sky-900 hover:bg-sky-700 text-white font-medium rounded text-base p-1 mt-2'
                            onClick={()=>{setModalAddRuta(true)}}
                        >
                            Añadir ruta
                        </button>
            </>
        ) : (<Spinner/>)}

                        {modalParaderos && (
                <div className="fixed bottom-0 inset-x-0 px-3 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center z-10">
                <div className="fixed inset-0 transition-opacity">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all ">
                
                    
                    <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div>
                            <div className="flex flex-col items-center">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 text-center">PARADEROS</h3>
                            </div>
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
                                                        ID DEL PARADERO
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-xs font-bold text-left text-white uppercase "
                                                    >
                                                        NOMBRE DEL PARADERO
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-xs font-bold text-left text-white uppercase "
                                                    >
                                                        COORDENADAS LAT
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-xs font-bold text-left text-white uppercase "
                                                    >
                                                        COORDENADAS LON
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
                                                
                                               {locations.location.map((item,index)=>(
                                                    <tr key={index}>
                                                    <td className="px-6 py-4 text-sm font-medium text-black whitespace-nowrap">
                                                            {item.location_id}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-black whitespace-nowrap">
                                                        {item.location_name}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-black whitespace-nowrap">
                                                        {item.latitude}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-black whitespace-nowrap">
                                                        {item.longitude}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-black whitespace-nowrap inline-flex">
                                                        <AiFillDelete 
                                                            className='w-6 h-6 cursor-pointer'
                                                            onClick={()=>handleDeleteParadero(item.location_id)}
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
                            
                        </div>
                    </div>
                    
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        
                        
                        <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                            <button
                            type="button"
                            className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                            onClick={()=>{setModalParaderos(false)}}
                            >
                            Cerrar
                            </button>
                        </span>

                        <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                            <button
                            type="submit"
                            className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-sky-900 text-base leading-6 font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:border-green-700 focus:shadow-outline-red active:bg-green-700 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                            onClick={()=>{setModalAddParadero(true)}}
                            >
                                Agregar paradero    
                            </button>
                        </span>
                    </div>
                    
                </div>
                </div>
            )}

{modalAddRuta && (
                <div className="fixed bottom-0 inset-x-0 px-3 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center z-10">
                <div className="fixed inset-0 transition-opacity">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-xs sm:w-full">
                
                    <form onSubmit={handleAddRoute}>
                    <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div>
                            <div className="flex flex-col items-center">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 text-center">Añadir una ruta</h3>
                                
                            </div>
                            <div className="mt-2">
                            
                                <div className="text-sm leading-5 text-gray-500">
                                        <div className=" relative mt- ">
                                            <input
                                                // onChange={handleChangeFormAdd}
                                                name="name"    
                                                type="text"
                                                required
                                                id="floatingInput1_ruta"
                                                placeholder=" "
                                                autoComplete="off"
                                                className='border block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer'/>
                                            <label
                                                htmlFor="name"
                                                for="floatingInput1_ruta" 
                                                className='absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white spx-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1'
                                                >
                                                    Nombre de la ruta
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
                            onClick={()=>{setModalAddRuta(false)}}
                            >
                            Cerrar
                            </button>
                        </span>

                        <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                            <button
                            type="submit"
                            className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-red active:bg-green-700 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                            >
                                Ingresar
                            </button>
                        </span>
                    </div>
                    </form>
                </div>
                </div>
            )}

{modalHours && (
                <div className="fixed bottom-0 inset-x-0 px-3 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center z-10">
                <div className="fixed inset-0 transition-opacity">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-xs sm:w-full">
                
                    <form onSubmit={handleFormHours}>
                        <input value={hours} name="id" type="hidden"/>
                    <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div>
                            <div className="flex flex-col items-center">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 text-center">Añadir un horario a la ruta</h3>
                                
                            </div>
                            <div className="mt-2">
                            
                                <div className="text-sm leading-5 text-gray-500">
                                        

                                        <div className=" relative mt-1 pb-2 text-center ">
                                            <select multiple name="horario" className='rounded-md p-3 bg-sky-700 text-white'>
                                                {horas.map((item,index)=>(
                                                        <option value={item.hours_id}>{item.hours_name}</option>
                                                    ))}
                                            </select>
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
                            onClick={()=>{setModalHours(false)}}
                            >
                            Cerrar
                            </button>
                        </span>

                        <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                            <button
                            type="submit"
                            className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-red active:bg-green-700 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                            >
                                Ingresar
                            </button>
                        </span>
                    </div>
                    </form>
                </div>
                </div>
            )}

                        {modalAddParadero && (
                            <div className="fixed bottom-0 inset-x-0 px-3 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center z-10">
                            <div className="fixed inset-0 transition-opacity">
                                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                            </div>
                            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-xs sm:w-full">
                            
                                <form onSubmit={handleAddParadero}>
                                <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div>
                                        <div className="flex flex-col items-center">
                                            <h3 className="text-lg leading-6 font-medium text-gray-900 text-center">Añadir un paradero</h3>
                                            
                                        </div>
                                        <div className="mt-2">
                                        
                                            <div className="text-sm leading-5 text-gray-500">
                                                    <div className=" relative mt- ">
                                                        <input type="hidden" name="id" value={locations.id}/>
                                                        <input
                                                            // onChange={handleChangeFormAdd}
                                                            name="name"    
                                                            type="text"
                                                            required
                                                            id="floatingInput1"
                                                            placeholder=" "
                                                            autoComplete="off"
                                                            className='border block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer'/>
                                                        <label
                                                            htmlFor="name"
                                                            for="floatingInput1" 
                                                            className='absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white spx-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1'
                                                            >
                                                                Nombre del paradero
                                                        </label>
                                                    </div>

                                                    <div className=" relative mt-3 ">
                                                        <input
                                                            // onChange={handleChangeFormAdd}
                                                            name="coordx"    
                                                            type="number"
                                                            step="0.000000000000001"
                                                            required
                                                            id="floatingInput2"
                                                            placeholder=" "
                                                            autoComplete="off"
                                                            className='border block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer'/>
                                                        <label
                                                            htmlFor="coordx"
                                                            for="floatingInput2" 
                                                            className='absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white spx-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1'
                                                            >
                                                                Coordenadas Lat
                                                        </label>
                                                    </div>

                                                    <div className=" relative mt-3 ">
                                                        <input
                                                            // onChange={handleChangeFormAdd}
                                                            name="coordy"    
                                                            type="number"
                                                            step="0.000000000000001"
                                                            required
                                                            id="floatingInput3"
                                                            placeholder=" "
                                                            autoComplete="off"
                                                            className='border block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer'/>
                                                        <label
                                                            htmlFor="coordy"
                                                            for="floatingInput3" 
                                                            className='absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white spx-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1'
                                                            >
                                                                Coordenadas Lng
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
                                        onClick={()=>{setModalAddParadero(false)}}
                                        >
                                        Cerrar
                                        </button>
                                    </span>
            
                                    <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                                        <button
                                        type="submit"
                                        className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-red active:bg-green-700 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                                        >
                                            Agregar
                                        </button>
                                    </span>
                                </div>
                                </form>
                            </div>
                            </div>
                        )}

{modalEdit && (
                <div className="fixed bottom-0 inset-x-0 px-3 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center z-10">
                <div className="fixed inset-0 transition-opacity">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-xs sm:w-full">
                
                    <form onSubmit={handleEditForm}>
                        
                    <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div>
                            <div className="flex flex-col items-center">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 text-center">Editar ruta</h3>
                                
                            </div>
                            <div className="mt-2">
                            
                                <div className="text-sm leading-5 text-gray-500">
                                        

                                <div className=" relative mt-3 ">
                                    <input type="hidden" value={editBuffer.bus_id} name="id"/>
                                            <input
                                                // onChange={handleChangeFormAdd}
                                                name="name"    
                                                type="text"
                                                required
                                                id="floatingInput1_ruta"
                                                defaultValue={editBuffer.bus_name}
                                                placeholder=" "
                                                autoComplete="off"
                                                className='border block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer'/>
                                            <label
                                                htmlFor="name"
                                                for="floatingInput1_ruta" 
                                                className='absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white spx-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1'
                                                >
                                                    Nombre de la ruta
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
                            onClick={()=>{setModalEdit(false)}}
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