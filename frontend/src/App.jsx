import { useContext } from 'react'
import AppRoutes from './routes/AppRoutes'
import {Toaster} from "react-hot-toast"
import { AuthContext } from './contexts/AuthContext'
import { useEffect } from 'react'
import { useState } from 'react'
import {io} from "socket.io-client"

const App = () => {

  const {user} = useContext(AuthContext);
  const [socket, setSocket] = useState(null);

  useEffect(()=>{
    if(!user) return;
    const socket = io(import.meta.env.VITE_SERVER_URL, {
      query:{
        userId: user._id,
      }
    });    
    if(socket){
      console.log("user connected");
      setSocket(socket);
    }

    return()=> socket.disconnect();
  },[user]);


  return (
    <div className='BACKGROUND h-screen'>
      <Toaster/>
      <AppRoutes />
    </div>
  )
}

export default App;