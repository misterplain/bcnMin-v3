import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
//components
import Inform from "./pages/Inform";
import Connect from "./pages/Connect";
import Reduce from "./pages/Reduce";
import Rescue from "./pages/Rescue";
import Tech from "./pages/Tech";
import Collab from "./pages/Collab";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { purple } from "@material-ui/core/colors";
import Layout from "./components/Layout";
//redux
import {useDispatch} from 'react-redux';
import {loadUser} from './actions/userActions';
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
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Routes>
            <Route exact path='/' element={<Inform />} />
            <Route path='/connect' element={<Connect />} />
            <Route path='/reduce' element={<Reduce />} />
            <Route path='/tech' element={<Tech />} />
            <Route path='/rescue' element={<Rescue />} />
            <Route path='/collab' element={<Collab />} />
            <Route path='/favorites' element={<Favorites />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
