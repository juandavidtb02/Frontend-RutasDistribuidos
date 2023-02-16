import React from "react";
import {HiUser} from 'react-icons/hi'
import {ImUserPlus} from 'react-icons/im'
import {FaUserCircle,FaUserEdit} from 'react-icons/fa'
import {AiOutlinePlus} from 'react-icons/ai'
import {HiUserGroup,HiOutlineLogout} from 'react-icons/hi'
import validator from "validator";
import useUserContext from "../../../hooks/useUser";
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";

export default function ButtonOptions() {
    
    const {userLog,setUserLog} = useUserContext();


    const [showButtons, setShowButtons] = React.useState(false);
    const [loginModal,setLoginModal] = React.useState(false);
    const [registerModal,setRegisterModal] = React.useState(false);
    const [messageModal,setMessageModal] = React.useState({
        'message':'',
        'form':'',
        'error':false
    })
 
    
    const logout = () => {
        setUserLog('')
        setShowButtons(false)

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
            title: 'Sesión cerrada correctamente'
          })

          localStorage.removeItem('user')
    }

    const handleForm = (e) => {
        e.preventDefault()
        const jsonData = {
            "user":e.target.elements.email.value,
            "password":e.target.elements.password_user.value
        }
        
        if(jsonData.user !== 'user@com' || jsonData.password !== '1234'){
            setMessageModal({
                'message':'Las credenciales no son correctas',
                'form':'login',
                'error':true
            })
            return
        }

        setUserLog(jsonData.user)
        setLoginModal(false)
        setShowButtons(false)

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
            title: 'Inicio de sesión exitoso'
          })

          localStorage.setItem('user',jsonData.user)

    }

    const handleFormRegister = (e) => {
        e.preventDefault()
        const jsonData = {
            "name":e.target.elements.name.value,
            "user":e.target.elements.email.value,
            "password":e.target.elements.password_user.value,
            "password_confirm":e.target.elements.password_confirm.value

        }

        if(jsonData.password !== jsonData.password_confirm){
            setMessageModal({
                'message':'Las contraseñas no coinciden',
                'form':'register',
                'error':true
            })
            return
        }

        if(!validator.isStrongPassword(jsonData.password,{
            minLength:5,minLowercase:1,minUppercase:1,minNumbers:1
        })){
            setMessageModal({
                'message':'La contraseña debe contener: Minimo 5 caracteres, una mayuscula y una minuscula.',
                'form':'register',
                'error':true
            })
            return
        }



    }

    const handleCreate = () => {
        setLoginModal(false)
        setRegisterModal(true)
    }

    const handleLogin = () => {
        setLoginModal(true)
        setRegisterModal(false)
    }

    return(
        <>
            
                <button
                className="fixed bottom-0 right-0 mb-5 mr-5 p-3 bg-red-500 rounded-full w-12 h-12 text-white hover:bg-red-600 focus:outline-none focus:shadow-outline z-10 hover:bg-white border-2 border-white hover:text-black hover:bg-white hover:border-black hover:border-2 hover:text-black flex justify-center items-center text-center"
                onClick={() => setShowButtons(!showButtons)}
            >
                <AiOutlinePlus className="w-full h-full" />
            </button>
            

            
            {showButtons && userLog === '' ? (
            <div className="fixed flex flex-col bottom-0 right-0 mr-5 m-16 z-10">
                <button 
                    className="items-center p-3 justify-center bg-red-500 rounded-full text-white mb-2 hover:bg-red-600 focus:outline-none focus:shadow-outline z-10 border-white border-2 hover:bg-white hover:border-black hover:border-2 hover:text-black"
                    onClick={()=>{setRegisterModal(true)}}
                >
                    <ImUserPlus className="w-6 h-6"/>
                </button>
                <button 
                    className="items-center p-3 justify-center bg-red-500 rounded-full text-white mb-2 hover:bg-red-600 focus:outline-none focus:shadow-outline z-10 hover:bg-white border-white border-2 hover:border-black hover:border-2 hover:text-black"
                    onClick={()=>{setLoginModal(true)}}
                >
                    <HiUser className="w-6 h-6"/>
                </button>
            </div>

            
            ) : showButtons && userLog !== '' ? (

                <div className="fixed flex flex-col bottom-0 right-0 mr-5 m-16 z-10">
                    <button 
                        className="items-center p-3 justify-center bg-red-500 rounded-full text-white mb-2 hover:bg-red-600 focus:outline-none focus:shadow-outline z-10 border-white border-2 hover:bg-white hover:border-black hover:border-2 hover:text-black"
                        onClick={()=>{logout()}}
                    >
                        <HiOutlineLogout className="w-6 h-6"/>
                    </button>
                    <Link to="/dashboard">
                        <button
                            className="items-center p-3 justify-center bg-red-500 rounded-full text-white mb-2 hover:bg-red-600 focus:outline-none focus:shadow-outline z-10 hover:bg-white border-white border-2 hover:border-black hover:border-2 hover:text-black"                        
                        >
                            <FaUserEdit className="w-6 h-6" />
                        </button>
                    </Link>
                </div>
                
            ) : null}

            {loginModal && (
                <div className="fixed bottom-0 inset-x-0 px-3 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center z-10">
                <div className="fixed inset-0 transition-opacity">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-xs sm:w-full">
                
                    <form onSubmit={handleForm}>
                    <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div>
                            <div className="flex flex-col items-center">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 text-center">Iniciar sesión</h3>
                                <FaUserCircle className="w-9 h-9 mt-2" />
                            </div>
                            <div className="mt-2">
                            {messageModal.form === 'login' && (<div className={`${messageModal.error ? 'bg-red-500 text-white' : 'bg-green-400 text-white' } p-3 w-full rounded-xl grid col-span-2 max-w-sm mb-3`}>{messageModal.message}</div>) }

                                <div className="text-sm leading-5 text-gray-500">
                                        

                                        <div className=" relative mt-1 ">
                                            <input
                                                // onChange={handleChangeFormAdd}
                                                name="email"    
                                                type="email"
                                                required
                                                id="floatingInput2_login"
                                                placeholder=" "
                                                autoComplete="off"
                                                className='border block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer'/>
                                            <label
                                                htmlFor="email"
                                                for="floatingInput2_login" 
                                                className='absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white spx-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1'
                                                >
                                                    Correo electronico
                                            </label>
                                        </div>

                                        <div className='relative mt-4'>
                                            <input
                                                // onChange={handleChangeFormAdd}
                                                name="password_user"    
                                                type="password"
                                                required
                                                id="floatingInput2_login"
                                                placeholder=" "
                                                autoComplete="off"
                                                className='border block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer'/>
                                            <label
                                                htmlFor="email"
                                                for="floatingInput2_login" 
                                                className='absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white spx-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1'
                                                >
                                                    Contraseña
                                            </label>

                                        </div>
                                        
                                </div>
                            </div>
                        </div>
                    </div>
                    <a className="no-underline md:underline px-6 text-sm cursor-pointer" onClick={handleCreate}>¿No tienes cuenta?, ¡Creala!</a>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        
                        
                        <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                            <button
                            type="button"
                            className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                            onClick={()=>{setLoginModal(false)}}
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


{registerModal && (
                <div className="fixed bottom-0 inset-x-0 px-3 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center z-10">
                <div className="fixed inset-0 transition-opacity">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-xs sm:w-full">
                
                    <form onSubmit={handleFormRegister}>
                    <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div>
                            <div className="flex flex-col items-center">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 text-center">Crear una cuenta</h3>
                                <HiUserGroup className="w-9 h-9 mt-2" />
                            </div>
                            <div className="mt-2">
                            {messageModal.form === 'register' && (<div className={`${messageModal.error ? 'bg-red-500 text-white' : 'bg-green-400 text-white' } p-3 w-full rounded-xl grid col-span-2 max-w-sm mb-3`}>{messageModal.message}</div>) }
                                <div className="text-sm leading-5 text-gray-500">
                                        <div className=" relative mt- ">
                                            <input
                                                // onChange={handleChangeFormAdd}
                                                name="name"    
                                                type="text"
                                                required
                                                id="floatingInput1_register"
                                                placeholder=" "
                                                autoComplete="off"
                                                className='border block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer'/>
                                            <label
                                                htmlFor="name"
                                                for="floatingInput1_register" 
                                                className='absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white spx-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1'
                                                >
                                                    Nombre
                                            </label>
                                        </div>



                                        <div className=" relative mt-3 ">
                                            <input
                                                // onChange={handleChangeFormAdd}
                                                name="email"    
                                                type="email"
                                                required
                                                id="floatingInput2_register"
                                                placeholder=" "
                                                autoComplete="off"
                                                className='border block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer'/>
                                            <label
                                                htmlFor="email"
                                                for="floatingInput2_register" 
                                                className='absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white spx-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1'
                                                >
                                                    Correo electronico
                                            </label>
                                        </div>
                                        <div className='relative mt-4'>
                                            <input
                                                // onChange={handleChangeFormAdd}
                                                name="password_user"    
                                                type="password"
                                                required
                                                id="floatingInput3_register"
                                                placeholder=" "
                                                autoComplete="off"
                                                className='border block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer'/>
                                            <label
                                                htmlFor="password_user"
                                                for="floatingInput3_register" 
                                                className='absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white spx-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1'
                                                >
                                                    Contraseña
                                            </label>

                                        </div>

                                        <div className='relative mt-4'>
                                            <input
                                                // onChange={handleChangeFormAdd}
                                                name="password_confirm"    
                                                type="password"
                                                required
                                                id="floatingInput4_register"
                                                placeholder=" "
                                                autoComplete="off"
                                                className='border block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer'/>
                                            <label
                                                htmlFor="password_confirm"
                                                for="floatingInput4_register" 
                                                className='absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white spx-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1'
                                                >
                                                    Confirmar contraseña
                                            </label>

                                        </div>
                                        
                                </div>
                            </div>
                        </div>
                    </div>
                    <a className="no-underline md:underline px-6 text-sm cursor-pointer" onClick={handleLogin}>¿Ya tienes cuenta?, ¡Inicia sesión!</a>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        
                        
                        <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                            <button
                            type="button"
                            className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                            onClick={()=>{setRegisterModal(false)}}
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