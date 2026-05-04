import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateTravel from "./pages/CreateTravel";
import Navbar from "./Navbar";
import TravelList from "./pages/TravelList";
import PassengerDetail from "./pages/PassengerDetail";

function App() {
  return (<>
    
    <BrowserRouter><Navbar/>
      <Routes>
        <Route path="/" element={<TravelList/>}/>
        <Route path="/create" element={<CreateTravel/>} />
        <Route path="/passenger/:id" element={<PassengerDetail/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;