import React from "react"
import {MdDashboard} from 'react-icons/md'
import {FaUsersCog} from 'react-icons/fa'
import {IoIosSubway} from 'react-icons/io'
import {AiOutlineRollback} from 'react-icons/ai'
export default function Dashboard(){
    const [page,setPage] = React.useState("inicio");
    const menus = [
        { name: "Dashboard", link: "inicio",icon: MdDashboard },
        { name: "Usuarios", link: "usuarios",icon: FaUsersCog  },
        { name: "Rutas", link: "rutas",icon: IoIosSubway},
        { name: "Regresar",link: "/",icon: AiOutlineRollback},
      ];


    return(
        <>
            <div className="flex gap-6">
                <div
                  className={`bg-red-500 border shadow-lg min-h-screen fixed md:w-72 w-16  duration-300 text-gray-900 px-4`}
                >
                  <div className="mt-4 flex flex-col gap-4 relative">
                    {menus?.map((menu, i) => (
                          <div
                            // to={menu?.link}
                            key={i}
                            className={` ${
                              menu?.margin && "mt-5" 
                            } ${page === menu?.link && "bg-white duration-75"}

                              group hover:bg-gray-100 flex items-center text-sm  gap-3.5 font-medium p-3 hover:text-dark rounded-md cursor-pointer`}
                            onClick={()=>{
                              setPage(menu?.link)
                            }}
                          >
                            <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                            <h2
                              className={`duration-200 opacity-0 md:opacity-100  overflow-hidden`}
                            >
                              {menu?.name}
                            </h2>
                            <h2
                              className={`md:hidden absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                              >
                              {menu?.name}
                            </h2>
                          </div>
                    ))}
                  </div>
                </div>
              </div>

            <div className='md:ml-72 ml-16 text-7xl max-h-screen p-4'>

                {page === 'inicio' && <>Hola</>}
                {page === '/' && window.location.replace('/')}

            </div>
             
        </>
    )
}