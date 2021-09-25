import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import TelaUsuario from "./TelaUsuario";
import TelaHorarios from "./TelaHorarios";
import CadastroUsuario from "./CadastroUsuario";
import TelaAgendamento from "./TelaAgendamento";

function App() {
  return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <TelaUsuario/>
          </Route>
          <Route path="/horarios">
            <TelaHorarios/>
          </Route>
          <Route path="/cadastroUsuario">
            <CadastroUsuario/>
          </Route>
          <Route path="/agendado">
            <TelaAgendamento/>
          </Route>
        </Switch>
      </BrowserRouter>
  );
}

export default App;
