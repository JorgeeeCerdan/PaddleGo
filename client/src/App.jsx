import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./utility/PrivateRouter";
import './App.css';

// PROMO APP
import InicioPromo from "./components/InicioPromo";
import Login from "./components/Login.jsx";
import Registro from "./components/Registro.jsx";

// APP PADDLEGO
import InicioApp from "./components/InicioApp";
import Pistas from "./components/Pistas.jsx";
import PistaCrear from "./components/PistaCrear";
import PistaReserva from "./components/PistaReserva.jsx";
import Reservas from "./components/Reservas.jsx";
import ReservasUsuario from "./components/ReservasUsuario";
import Usuarios from "./components/Usuarios.jsx";
import PerfilUsuario from "./components/PerfilUsuario.jsx";
import ReservaConcreta from './components/ReservaConcreta.jsx'

function App () {
  

  return (    
    <Router>
        <Switch>
        <PrivateRoute path="/reservas/usuario/" component={ReservasUsuario} />
        <PrivateRoute path="/reservas/:id" component={ReservaConcreta} />
        <PrivateRoute path="/reservas" component={Reservas} />
        <PrivateRoute path="/pista/:id" component={PistaReserva} />
        <PrivateRoute path="/pista" component={PistaCrear} />
        <PrivateRoute path="/pistas" component={Pistas} />
        <PrivateRoute path="/usuario" component={PerfilUsuario} />
        <PrivateRoute path="/usuarios" component={Usuarios} />
        <PrivateRoute path="/inicio" component={InicioApp} />

        <Route path="/registro" component={Registro} />
        <Route path="/login" component={Login} />
        <Route path="/" exact component={InicioPromo}/>
      </Switch>
    </Router>
  )
}

export default App;
