import React from "react";
import data from '../../../data'
import {AiFillEye,AiFillDelete} from 'react-icons/ai'
import {MdMoreTime} from 'react-icons/md'
export default function Buses(){
    const [modalParaderos,setModalParaderos] = React.useState(false)
    const [modalAddRuta,setModalAddRuta] = React.useState(false)
    const [modalHours,setModalHours] = React.useState(false)


    const handleFormHours = (e) => {
        e.preventDefault()
        console.log(e.target.elements.horario.value)
    }
    return(
        <>
        <h1 className="text-5xl pb-5 p-1.5">Rutas Unillanos</h1>
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
                                                
                                               {data.map((item,index)=>(
                                                    <tr key={index}>
                                                    <td className="px-6 py-4 text-sm font-medium text-black whitespace-nowrap">
                                                            {item.busid}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-black whitespace-nowrap">
                                                        Maracos
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-black whitespace-nowrap">
                                                        {item.hora}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-black whitespace-nowrap">
                                                    <AiFillEye className='w-8 h-8 cursor-pointer' onClick={()=>{setModalParaderos(true)}}/>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-black whitespace-nowrap inline-flex">
                                                        <MdMoreTime 
                                                            className='w-6 h-6 cursor-pointer'
                                                            onClick={()=>{setModalHours(true)}}
                                                        />
                                                        <AiFillDelete className='w-6 h-6 cursor-pointer'/>
                                                    </td>
                                                    
                                                </tr>
            ))}
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
                                                        COORDENADAS
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
                                                
                                               {data.map((item,index)=>(
                                                    <tr key={index}>
                                                    <td className="px-6 py-4 text-sm font-medium text-black whitespace-nowrap">
                                                            {item.busid}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-black whitespace-nowrap">
                                                        Bomba maracos
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-black whitespace-nowrap">
                                                        {item.coordenadas}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-black whitespace-nowrap inline-flex">
                                                        <AiFillDelete className='w-6 h-6 cursor-pointer'/>
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
                
                    <form>
                    <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div>
                            <div className="flex flex-col items-center">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 text-center">Añadir un</h3>
                                
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



                                        <div className=" relative mt-1 pb-2">
                                            <select name="horario" className='rounded-md'>
                                                {/* {horario.map((item,index)=>(
                                                        <option value={item.category_id}>{item.category_name}</option>
                                                    ))} */}
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
                    <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div>
                            <div className="flex flex-col items-center">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 text-center">Añadir un horario a la ruta</h3>
                                
                            </div>
                            <div className="mt-2">
                            
                                <div className="text-sm leading-5 text-gray-500">
                                        

                                        <div className=" relative mt-1 pb-2 text-center ">
                                            <select multiple name="horario" className='rounded-md p-3 bg-sky-700 text-white'>
                                                {/* {horario.map((item,index)=>(
                                                        <option value={item.category_id}>{item.category_name}</option>
                                                    ))} */}
                                                    <option value="11:30">11:30</option>
                                                    <option value="12:30">12:30</option>
                                                    <option value="13:30">13:30</option>
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



        </>
    )
}