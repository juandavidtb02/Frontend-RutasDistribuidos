import { MapContainer, TileLayer,Marker,Popup,useMap } from 'react-leaflet'
import React from 'react';

import Clock from './Clock';
import "leaflet/dist/leaflet.css"
import data from '../../data';
import L from "leaflet";
import Spinner from './spinner/spinner';
import ButtonOptions from './auth/Button';
import GoToPoint from './GoToPoint';

import useUserContext from "../../hooks/useUser";
import useLocationContext from '../../hooks/useLocationContext';

import Swal from 'sweetalert2';
import Welcome from './auth/Welcome';

const myIcon = L.icon({
    iconUrl: "https://icones.pro/wp-content/uploads/2021/02/icone-de-broche-de-localisation-rouge.png",
    iconSize: [45, 43],
    iconAnchor: [23.5, 41],
    popupAnchor: [0, -33]
  });

export default function MapView() {
  const now = new Date()

    const {userLog,setUserLog} = useUserContext();
    const {location,setLocation} = useLocationContext();
  
  
    const [time, setTime] = React.useState();
    const [modal,setModal] = React.useState(false);
    const [position, setPosition] = React.useState([0,0]);

    
    
    
    const alertModal = (message,icon) => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'bottom',
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: icon,
            title: message
          })
    }
    React.useEffect(()=>{
      const intervalId = setInterval(() => {
        const horaActual = `${now.getHours()}:${now.getMinutes()}`;
        setTime(horaActual);
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    },[])

    React.useEffect(() => {
        if (navigator.permissions) {
          navigator.permissions.query({ name: 'geolocation' }).then(result => {
            if (result.state === 'granted') {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  setPosition([position.coords.latitude, position.coords.longitude]);
                },
                (error) => console.error(error),
                { enableHighAccuracy: true }
              );
            } else {
                setPosition([4.146693142883072, -73.63678437430272])
                alertModal('Activa la ubicación del navegador para conocer tu paradero más cercano','warning')
            }
          });
        } else {
            setPosition([4.146693142883072, -73.63678437430272])
            alertModal('Este navegador no cuenta con ubicación en tiempo real!','error')
        }
      }, []);

      const calculateNextStop = (array) => {
        
        let busProximo = null;
        let tiempoMinimo = Infinity;

        array.forEach(bus => {
          const horaBus = bus.hour_name;
          const tiempo = (new Date(`2000-01-01T${horaBus}:00`) - new Date(`2000-01-01T${time}:00`)) / 1000 / 60;
          if (tiempo >= 0 && tiempo < tiempoMinimo) {
            tiempoMinimo = tiempo;
            busProximo = bus;
          }
        });

        if(busProximo){
          return busProximo.hora
        }else{
          const earliestHour = array.sort((a, b) => {
            const aDate = new Date(`1970-01-01T${a.hour_name}`);
            const bDate = new Date(`1970-01-01T${b.hour_name}`);
            return aDate - bDate;
          })[0];
          if(earliestHour !== undefined){
            return earliestHour.hour_name
          }
          else{
            return "05:00"
          }
        }
      }

    if (position[0] === 0) return(<Spinner/>)
    return (
        <>
                  
            <div className='md:w-1/2 h-screen'>
                {userLog !== '' && (<Welcome name={userLog.name}/>)}
                <ButtonOptions/>
                <Clock/>
                <GoToPoint/> 
                
                <MapContainer center={position} zoom={17}>
                  

                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />  
                    
                    <Marker
                        position={position}
                        icon={myIcon}
                    >
                            <Popup>
                                Tu ubicación actual
                            </Popup>
                    </Marker>

                    {(()=>{
                      if(location !== undefined){
                        return(
                          <>
                          {location.map((item, index) => (
                            <React.Fragment key={index}>
                              {item.locations.map((it, i) => (
                                <div key={i}>
                                  <Marker position={[it?.latitude,it?.longitude]} eventHandlers={{ click: (e) => setModal(true) }}>
                                    <Popup>{calculateNextStop(item?.hours)} - {it?.location_name} </Popup>
                                  </Marker>
                                </div>
                              ))}
                            </React.Fragment>
                          ))}
                          </>
                        )
                      }
                    })()}

                </MapContainer>     
            </div>
                           
        </>
    );
};
