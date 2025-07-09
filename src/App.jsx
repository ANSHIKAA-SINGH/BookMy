import './App.css';
import Login from './Components/Login';
import Home from './Components/Home';
import Signup from './Components/Signup';
import Guideregister from './Components/Guideregister';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Searchresult from './Components/Searchresult';
import Myprofile from './Components/Myprofile';
import Landingpage from './Components/Landingpage';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <GoogleOAuthProvider clientId="856886865847-qu0gcgorqddu1euo78f1o4du9uvu0qf5.apps.googleusercontent.com">
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<Landingpage />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/guideregister" element={<Guideregister />}></Route>
          <Route path="/searchresult" element={<Searchresult />}></Route>
          <Route path="/profile" element={<Myprofile />}></Route>
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
