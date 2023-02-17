import React from "react"
export default function ModalInfo(){
    return(
        <>
                    <div className="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
                    <div className="fixed inset-0 transition-opacity">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                    
                        <form>
                        <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    Editar categoria
                                </h3>
                                <div className="mt-2">
                                    <div className="text-sm leading-5 text-gray-500">
                                            <div className=" relative mt-1 ">
                                                <input type="hidden"  name="category_id"/>
                                                <input
                                                    // onChange={handleChangeFormAdd}
                                                    name="category_name"    
                                                    type="text"
                                                    required
                                                    id="floatingInput1_login"
                                                    placeholder=" "
                                                    autoComplete="off"
                                                    className='block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer'/>
                                                <label
                                                    htmlFor="email"
                                                    for="floatingInput1_login" 
                                                    className='absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white spx-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1'
                                                    >
                                                        Nombre de la categoria
                                                </label>
                                            </div>
                                            <div className='mt-4'>
                                                <p className="mb-3">Imagen:</p>
                                                <input 
                                                    type="file" 
                                                    accept=".jpg,.jpeg,.png"
                                                    name="category_image" 
                                                    placeholder=""
                                                    // onChange={handleChangeFormAdd}
                                                />

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
                                    Editar
                                </button>
                            </span>
                        </div>
                        </form>
                    </div>
                    </div>
        </>
    )
}