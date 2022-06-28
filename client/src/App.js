import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
//components
import Inform from './pages/Inform'
import Connect from './pages/Connect'
import Reduce from './pages/Reduce'
import Tech from './pages/Tech'
import Rescue from './pages/Rescue'
import Collab from './pages/Collab'
import Favorites from './pages/Favorites'
import Login from './pages/Login'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import { purple } from '@material-ui/core/colors'
import Layout from './components/Layout'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fefefe'
    },
    secondary: purple
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/inform">
              <Inform />
            </Route>
            <Route path="/connect">
              <Connect />
            </Route>
            <Route path="/reduce">
              <Reduce />
            </Route>
            <Route path="/tech">
              <Tech />
            </Route>
            <Route path="/rescue">
              <Rescue />
            </Route>
            <Route path="/collab">
              <Collab />
            </Route>
            <Route path="/favorites">
              <Favorites />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
