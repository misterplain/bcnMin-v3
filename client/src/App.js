import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect } from "react";
//components
import Inform from "./pages/Inform/Inform";
import Connect from "./pages/Connect/Connect";
import Reduce from "./pages/Reduce/Reduce";
import Tech from "./pages/Tech/Tech";
import Rescue from "./pages/Rescue/Rescue";
import Collab from "./pages/Collab/Collab";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { purple } from "@material-ui/core/colors";
import Layout from "./components/Layout";
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
          <Layout>
            <Switch>
              <Route exact path='/'>
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
          </Layout>
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
