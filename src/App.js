import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles/'
import MainCon from './components/MainCon'
import VerticalTabs from './components/VerticalTabs'
import ProxyPage from './components/proxyPage'


const theme = createMuiTheme({
  palette: {
    type: "dark",
  }
});

function IndexPage() {
  return (
    <ThemeProvider theme={theme} >
      <div className='parentCon mainComp'>
        <div className="innerCon">
          <MainCon />
          <VerticalTabs />
        </div>
      </div>
    </ThemeProvider>
  )
}

function ProxyComp() {
  return (
    <ThemeProvider theme={theme} >

      <ProxyPage className='mainComp' />
    </ThemeProvider>
  )
}


function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact><IndexPage /></Route>
        <Route path="/proxy" ><ProxyComp /></Route>
      </Switch>
    </BrowserRouter>
  )
}


export default App;
