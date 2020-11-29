import React, { useEffect }  from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles/'
import MainCon from './components/MainCon'
import VerticalTabs from './components/VerticalTabs'
import ProxyPage from './components/proxyPage'
import AppBarComp from './components/AppBarComp'
import Login from './components/Login'
import PublicRoute from './routes/PublicRoute'
import { verifyTokenAsync } from './asyncActions/authAsyncActions';
import { useSelector, useDispatch } from 'react-redux';

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});



class IndexPage extends React.Component {

  render() {

    return (
      <ThemeProvider theme={theme} >
        <AppBarComp />
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

function LoginComp () {
  return (
    <ThemeProvider theme={theme} >
      <Login/>
    </ThemeProvider>
  )
}


function App() {
  const authObj = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const { authLoading, isAuthenticated } = authObj;

  useEffect(() => {
    dispatch(verifyTokenAsync());
  }, []);
 
  // checking authentication
  if (authLoading) {
    return <div className="content">Checking Authentication...</div>
  }

  return (

    <BrowserRouter>
      <Switch>

        <PublicRoute path="/" component={IndexPage} isAuthenticated={isAuthenticated} exact></PublicRoute>
        <PublicRoute path="/proxy" component={ProxyComp} isAuthenticated={isAuthenticated}></PublicRoute>
        <PublicRoute path="/login" component={LoginComp} isAuthenticated={isAuthenticated}></PublicRoute>

      </Switch>
    </BrowserRouter>

  )
}


export default App;
