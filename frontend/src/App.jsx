import AppRoutes from './routes/AppRoutes'
import {Toaster} from "react-hot-toast"

const App = () => {
  return (
    <div className='BACKGROUND h-screen'>
      <Toaster/>
      <AppRoutes />
    </div>
  )
}

export default App;