import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./Pages/home"
import Login from './Pages/login'
import Register  from './Pages/register'
import { logout } from "./features/userSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
   // const dispatch =useDispatch();
   // const {user} = useSelector((state) =>({...state})) This is same as below.
   const user = useSelector((state)=>(state.user))
   console.log(user);
   return (
      <div className="dark">
         {/* <button onClick={()=>{
            dispatch(logout());
         }}>
         </button> */}
         <Router>
            <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route exact path="/login" element={<Login/>}/>
              <Route exact path="/register" element={<Register/>}/>
            </Routes>
         </Router>
      </div>
   );
}

export default App;
