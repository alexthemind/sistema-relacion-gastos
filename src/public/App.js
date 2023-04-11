import { NextUIProvider, Container } from "@nextui-org/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { MainNavigation } from "./pages/Navigation";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import History from "./pages/History";
import News from "./pages/News";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";

const App = () => {
    const logged = localStorage.token != undefined ? true : false;

    return(
        <BrowserRouter>
            <NextUIProvider>
                <MainNavigation />
            
                <Routes>
                    <Route path="/" element={ logged ? Home() : Login() } />
                    <Route path="/signup" element={<Signup key={'signup'} />} />
                    <Route path="/historial" element={<History key={'historial'} />} />
                    <Route path="/comunicados" element={<News key={'departamentos'} />} />
                    <Route path="/notifications" element={<Notifications key={'notificaciones'} />} />
                    <Route path="/profile" element={<Profile key={'perfil'} />} />
                </Routes>
            </NextUIProvider>
        </BrowserRouter>
    );
}

export default App