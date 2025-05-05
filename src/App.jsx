
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Body from './components/Body'
import Login from './components/Login'
import Profile from './components/Profile'
import appStore from './utils/appStore'
import { Provider } from 'react-redux'
import Feed from './components/Feed'
import Connections from './components/Connections'
import Requests from './components/Requests'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <Provider store={appStore}>
    <BrowserRouter basename='/'>
        <Routes>
          <Route path="/" element={<Body />} >
          <Route path="/feed" element={<Feed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/connection" element={<Connections/>} />
          <Route path="/request" element={<Requests/>} />

          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
    </>

  )
}

export default App
