import { Route, Routes } from "react-router-dom"
import { MainLayout } from "./layout/main-layout"
import { Home } from "./pages/home"
import { Users } from "./pages/users"
import { Login } from "./pages/login"
import { Register } from "./pages/register"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/> 
        <Route path="/app" element={<MainLayout/>}>
          <Route index element={<Home />}/>
          <Route path="addusers" element={<Users/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
