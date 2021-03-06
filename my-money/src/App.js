import { Route, Routes, BrowserRouter ,Navigate} from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import { useAuthContext } from "./hooks/useAuthContext";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";

function App() {
  
  const {user,authIsReady}=useAuthContext();
  return (
    <div className="App">
      {authIsReady&&(
        <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route path="/" 
            element={user? ( <Home />):(
              <Navigate to="/login" />)}/>
           <Route path="/login" 
            element={!user?(<Login />):
                      (<Navigate to ="/"/>)} />

            <Route path="/signup"
             element={!user?(<Signup />):
              (<Navigate to ="/" />)} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}
export default App;

