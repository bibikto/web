import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles/'
import MainCon from './components/MainCon'
import VerticalTabs from './components/VerticalTabs'
import ProxyPage from './components/proxyPage'
//import AppBarComp from './components/AppBarComp'
//import Login from './components/Login'

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});



class IndexPage extends React.Component {

  render() {

    return (
      <ThemeProvider theme={theme} >
        {/* <AppBarComp /> */}
        <div className='parentCon mainComp'>
          <div className="innerCon">
            <MainCon />
            <VerticalTabs />
          </div>
        </div>
      </ThemeProvider>
    )
  }
}

function ProxyComp() {
  return (
    <ThemeProvider theme={theme} >
      <ProxyPage className='mainComp' />
    </ThemeProvider>
  )
}

/*function LoginComp() {
  return (
    <ThemeProvider theme={theme} >
      <Login />
    </ThemeProvider>
  )
}*/


function App() {
  return (

    <BrowserRouter>
      <Switch>

        <Route path="/" exact><IndexPage /></Route>
        <Route path="/proxy"  ><ProxyComp/></Route>
        {/* <Route path="/login" ><LoginComp /></Route> */}

      </Switch>
    </BrowserRouter>

  )
}


export default App;
