import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {useEffect} from 'react'
//components
import Inform from "./pages/Inform";
import Connect from "./pages/Connect";
import Reduce from "./pages/Reduce";
import Tech from "./pages/Tech";
import Rescue from "./pages/Rescue";
import Collab from "./pages/Collab";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { purple } from "@material-ui/core/colors";
import Layout from "./components/Layout";
import Layout2 from "./components/Layout2";
import Header from "./pages/Header";
//redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#fefefe",
    },
    secondary: purple,
  },
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          
          <Layout2>
            <Switch>
              <Route exact path='/inform'>
                <Inform />
              </Route>
              <Route path='/connect'>
                <Connect />
              </Route>
              <Route path='/reduce'>
                <Reduce />
              </Route>
              <Route path='/tech'>
                <Tech />
              </Route>
              <Route path='/rescue'>
                <Rescue />
              </Route>
              <Route path='/collab'>
                <Collab />
              </Route>
              <Route path='/favorites'>
                <Favorites />
              </Route>
              <Route path='/login'>
                <Login />
              </Route>
              <Route path='/register'>
                <Register />
              </Route>
            </Switch>
          </Layout2>
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
