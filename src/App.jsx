import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login, {action as authAction} from "./pages/Login.jsx"
import RootLayout from './pages/RootLayout.jsx'
import AddDemon from "./pages/AddDemon.jsx";
import EditDemon from "./pages/EditDemon.jsx";
import {action as modifyListAction} from "./components/DemonForm.jsx"
import Fallback from './components/Fallback.jsx';
import Error from './pages/Error.jsx';
import Home from "./components/Home.jsx";
import ViewDemonModal, {loader as demonLoader, action as deleteDemonAction} from './components/ViewDemonModal.jsx'
import User from "./pages/User.jsx";
import Users, {loader as userLoader} from "./pages/Users.jsx"
import UserDemonList, {loader as loadUserDemons} from "./pages/UserDemonList.jsx";
import {action as logoutAction} from "./pages/Logout.jsx";
import {tokenLoader} from "./util/auth.js";
import CompareUserDemonLists, {loader as listLoader} from './pages/CompareUserDemonLists.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout/>,
    errorElement: <Error/>,
    id: 'root',
    loader: tokenLoader,
    hydrateFallbackElement: <Fallback/>,
    children: [
      { index: true, element: <Home/>},
      { path: "/demonlist/:username", element: <UserDemonList/>, loader: loadUserDemons, children:
        [
          { path: "/demonlist/:username/:levelID", element: <ViewDemonModal/>, loader: demonLoader, action: deleteDemonAction}
        ]
      },
      { path: "/demonlist/:username/add", element: <AddDemon/>, action: modifyListAction},
      { path: "/demonlist/:username/:levelID/edit", element: <EditDemon/>, loader: demonLoader, action: modifyListAction},
      { path: "/demonlist/compare/:username", element: <CompareUserDemonLists/>, loader: listLoader},
      { path: "/login", element: <Login mode={"login"}/>, action: authAction },
      { path: "/signup", element: <Login mode={"signup"}/>, action: authAction },
      { path: "/users", element: <Users/>, loader: userLoader},
      { path: "/users/:username", element: <User/>},
      { path: "/logout", action: logoutAction}
    ]
  }]
  )


function App() {

  return ( 
      <RouterProvider router={router}/>
  )

}
export default App
