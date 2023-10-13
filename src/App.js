import "./App.css";
import { Routes, Route} from 'react-router-dom'
import Special from "./pages/Special";
import ButtomNav from "./Components/ButtomNav";
import Home from "./pages/Home";
import Order from "./pages/Order";



function App() {
  return (
    <div className='App'> 
      <Routes>
        <Route path='/' element={<Home />} />
        {/* <Route path='/order' element={<Order />} /> */}
        {/* <Route path='/special' element={<Special />} /> */}
       </Routes>
      <ButtomNav />
    </div>
  );
}

export default App;
