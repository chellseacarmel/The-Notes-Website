import { createBrowserRouter, RouterProvider} from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';

// Components
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Note from "./pages/Note/NoteView";
import ProtectedRouter from './components/ProtectedRouter/protectedrouter';


const theme = createTheme({
  palette: {
    background: {
      default: '#F1F5FA', 
    },
  },
});

const routes = createBrowserRouter([
 {
  path: "/",
  element: <Login />,
 },
 {
  path: "/signup",
  element: <Signup />,
  },
  {
    path: "/home",
    element: <ProtectedRouter><Home /></ProtectedRouter>,
    },
    {
      path: "/note",
      element: <ProtectedRouter><Note /></ProtectedRouter>,
      },
])


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <RouterProvider router={routes} />
    </ThemeProvider>
  );
}

export default App;
