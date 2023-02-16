import React from "react"
import {GrMapLocation} from 'react-icons/gr'
import {BiBus} from 'react-icons/bi'
import {AiOutlineRollback} from 'react-icons/ai'
import {MdOutlineAccessTimeFilled} from 'react-icons/md'
import data from '../../../data'
import Buses from "./Buses"
import Horas from "./Horas"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useUserContext from "../../../hooks/useUser";
import Spinner from "../spinner/spinner"
import Swal from "sweetalert2"


export default function Dashboard(){

    const {userLog,setUserLog} = useUserContext();

    const [page,setPage] = React.useState("inicio");
    const [loading,setLoading] = React.useState(true)
    const menus = [
        { name: "Rutas", link: "inicio",icon: BiBus },
        { name: "Horas", link: "horas",icon: MdOutlineAccessTimeFilled  },
        { name: "Volver al mapa",link: "/",icon: GrMapLocation},
      ];
      const navigateTo = useNavigate();

      React.useEffect(()=>{
        if(userLog === ''){
          Swal.fire({
            title:'Error',
            icon:'error',
            text:'Hubo un error al ingresar'
          }).then(function(si){ 
            window.location.replace('/')
          }
          )
        }
        else{
          setLoading(false)
        }
        
      },[])

    return(
      <>
        {!loading ? (<div>
             <div className="flex gap-6">
                <div
                  className={`  bg-red-600 rounded-r-xl shadow-xl shadow-black min-h-screen fixed md:w-72 w-16  duration-300 text-gray-900 px-4`}
                >
                  <div className="mt-4 flex flex-col gap-4 relative">
                    {menus?.map((menu, i) => (
                          <div
                            // to={menu?.link}
                            key={i}
                            className={` ${
                              menu?.margin && "mt-5" 
                            } ${page === menu?.link && "backdrop-blur-2xl bg-white/80 duration-75"}

                              group hover:backdrop-blur-2xl hover:bg-white/80 flex items-center text-sm  gap-3.5 font-medium p-3 hover:text-dark rounded-md cursor-pointer`}
                            onClick={()=>{
                              setPage(menu?.link)
                            }}
                          >
                            <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                            <h2
                              className={`duration-200 opacity-100 overflow-hidden`}
                            >
                              {menu?.name}
                            </h2>
                          </div>
                    ))}
                  </div>
                </div>
              </div>


              <div className='ml-72 max-h-screen p-4'>

                {page === 'inicio' && <Buses/>}
                {page === 'horas' && <Horas/>}
                {page === '/' ? (navigateTo('/')) : null}

              </div>

        </div>) : (<> <Spinner></Spinner></>)}
      </>
        
    )
}