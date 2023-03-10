import React, { useState, useEffect } from 'react';
import {FaBus} from 'react-icons/fa'
import {AiOutlineClockCircle} from 'react-icons/ai'
import {MdBusAlert} from 'react-icons/md'
import {GiBusStop} from 'react-icons/gi'
import {BiRun} from 'react-icons/bi'
import data from '../../data';

import useLocationContext from '../../hooks/useLocationContext';


function Clock({hora,time}) {

  const now = new Date()
  // const [time, setTime] = useState();
  const [showInfo,setShowInfo] = useState(false)
  const [nextStop,setNextStop] = useState([])
  const {location,setLocation} = useLocationContext();
  const [horas,setHoras] = useState([])
  const URLH = import.meta.env.VITE_HOST + "/hours"

  React.useEffect(()=>{
    let status = 0
    let data = []
    

    const response = fetch(URLH,{
        method:'GET'
    }).then(function(res){
        status = res.status

        return res.json();
    }).then(function(datax){
        if(status !== 200)throw new Error(datax)
        if(datax.length > 0){
          setHoras(datax)
        }

    }).catch(function(error){
        console.log(error)
      })
    

    
    
  },[])


  useEffect(()=>{
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const currentTime = `${hours}:${minutes}`;
    
    if(horas.length > 0) {
      
      let busProximo = null;
      let tiempoMinimo = Infinity;
      horas.forEach(bus => {
          const horaBus = bus.hours_name;
          const tiempo = (new Date(`2000-01-01T${horaBus}:00`) - new Date(`2000-01-01T${currentTime}:00`)) / 1000 / 60;
          
          if (tiempo >= 0 && tiempo < tiempoMinimo) {
            tiempoMinimo = tiempo;
            busProximo = bus;
          }
      });

      
      if(busProximo){
        setNextStop(busProximo.hours_name)
      }else{
        setNextStop('No hay más rutas hoy')
      }
  }
  },[horas])

  // useEffect(() => {
    
  //   const intervalId = setInterval(() => {
  //       const horaActual = `${now.getHours()}:${now.getMinutes()}`;
  //       setTime(horaActual);
  //   }, 1000);



  //   return () => {
  //     clearInterval(intervalId);
  //   };



  // }, [location]);



  return (
    <div>
      <button
        className="flex fixed items-center justify-center w-12 h-12 top-0 right-0 mt-5 mr-5 bg-red-500 rounded-full border-white border-2 hover:bg-white hover:border-black hover:border-2 text-white hover:bg-red-600 focus:outline-none focus:shadow-outline z-10 hover:bg-white hover:text-black"
        onClick={() => setShowInfo(true)}
      >
        <FaBus className='w-5 h-5'/>
      </button>

      {showInfo && (
        <div className="fixed top-0 right-0 mt-5 mr-5 bg-red-500 rounded-lg text-white z-10">
          <div className="p-5 rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
          
          <div className='inline-block'>
            <div className='flex items-center p-2'>
              <AiOutlineClockCircle className='mr-2 w-8 h-8' />
              <p>Hora actual: {time}</p>
            </div>

            <div className='flex items-center p-2'>
              <MdBusAlert className='mr-2 w-8 h-8' />
              <p>Proxima parada: {nextStop}</p>
            </div>

            {/* <div className='flex items-center p-2'>
              <GiBusStop className='mr-2 w-8 h-8'/>
              <p>Parada más cercana: </p><button className='pl-4 pr-4 pt-2 pb-2 bg-sky-700 rounded-xl text-center ml-3'>Ir</button>
              
            </div> */}

            
            
          </div>



            <div className="sm:flex sm:flex-row-reverse">            
                <span className="flex w-full rounded-md shadow-sm sm:w-auto">
                    <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                    onClick={()=>{setShowInfo(false)}}
                    >
                    Cerrar
                    </button>
                </span>
            </div>
          </div>
        </div>
      )}
      {/* <p
        className="fixed right-0 mb-5 mr-5 bg-red-500 rounded-xl p-2 mt-5 text-white focus:outline-none focus:shadow-outline z-10 "
      >La hora actual es: {time}
      </p> */}
    </div>
  );
}

export default Clock;
