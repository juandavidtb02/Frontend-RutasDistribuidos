import React, { useState, useEffect } from 'react';
import {FaBus} from 'react-icons/fa'
import {AiOutlineClockCircle} from 'react-icons/ai'
import {MdBusAlert} from 'react-icons/md'
import {GiBusStop} from 'react-icons/gi'
import {BiRun} from 'react-icons/bi'
import data from '../../data';



function Clock() {


  const [time, setTime] = useState(new Date().toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: true}));
  const [showInfo,setShowInfo] = useState(false)
  const [nextStop,setNextStop] = useState({})

  function hora(){
    const currentTime = new Date();
    const currentTimeInMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

    let nearestTimeInMinutes = Infinity;
    let nearestTime = '';
    let id = 0
    let coordenadas = []
    data.forEach(function(i) {
      const parts = i.hora.split(':');
      let hours = parseInt(parts[0]);
      const minutes = parseInt(parts[1].split(' ')[0]);
      const ampm = parts[1].split(' ')[1];

      if (ampm === 'PM' && hours !== 12) {
        hours += 12;
      }
      if (ampm === 'AM' && hours === 12) {
        hours = 0;
      }

      const timeInMinutes = hours * 60 + minutes;
      // const formattedTimeString = `${hours}:${minutes} ${ampm}`;

      if (timeInMinutes > currentTimeInMinutes && timeInMinutes < nearestTimeInMinutes) {
        nearestTimeInMinutes = timeInMinutes;

        let formattedHours = hours;
        let formattedAMPM = 'AM';
        if (hours === 0) {
          formattedHours = 12;
        } else if (hours >= 12) {
          formattedHours = hours % 12;
          formattedAMPM = 'PM';
        }
      
        nearestTime = `${formattedHours}:${minutes} ${formattedAMPM}`;
        id = i.busid;
        coordenadas = i.coordenadas
      }

      // if (timeInMinutes > currentTimeInMinutes) {
      //   return {
      //     id: i.busid,
      //     hora: formattedTimeString
      //   }
      //   };
      });

      if(nearestTime){
        setNextStop({
          id,
          hora:nearestTime,
          coordenadas
        })
      }else{
        setNextStop({
          id:1,
          hora:'05:00 AM',
          coordenadas:[4.1339803896157195, -73.61317519238939]
        })
      }

  }
  

  useEffect(() => {
    const intervalId = setInterval(() => {
        setTime(new Date().toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: true}));
    }, 1000);

     hora()


    return () => {
      clearInterval(intervalId);
    };



  }, []);



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
              <p>Proxima parada: {nextStop.hora}</p>
            </div>

            <div className='flex items-center p-2'>
              <GiBusStop className='mr-2 w-8 h-8'/>
              <p>Parada: {nextStop.id}</p>
              
            </div>

            
            
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
