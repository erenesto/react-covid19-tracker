import React from 'react'
import { Route, Switch } from 'react-router-dom'
import 'normalize.css'
import './App.css'
import Home from './pages/Home'
import Country from './pages/Country'
import { Container } from '@material-ui/core'

function App() {
  return (
    <Container maxWidth="lg">
      <Switch>
        <Route path="/:code" component={Country} />
        <Route path="/" exact component={Home} />
      </Switch>
    </Container>
  )
}

export default App
