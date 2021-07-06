import './index.css';
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Header from './components/Header'
import Home from './components/Home';
import {BrowserRouter, Route} from 'react-router-dom';
import Profile from './components/Auth/Profile';
import Subjects from './components/Subjects/Subjects'
import Listrooms from './components/Listrooms';
import EditProfile from './components/Auth/EditProfile';
import ChangePassword from './components/Auth/ChangePassword';
import Writeboard from './components/Writeboard'
import BulletinBoard from './components/BulletinBoard'
function App() {
 
  return (
    <div className="background">
      <BrowserRouter>
     
      <main>
        <Header className="header"/>
        <Route path="/" exact component={Home}/>
  
  
        <Route path="/Classroom" exact component={Listrooms}/>
        {/* <Route path="/Videos" exact component={Videos}/> */}
        <Route path="/Profile" exact component={Profile}/>
      </main>
      <div className="loginform-container">
        <Route path="/Login" exact component={Login}/>
        <Route path="/Register" exact component={Register}/>
        <Route path="/Changepassword" exact component={ChangePassword}/>
        <Route path="/Subjects" exact component={Subjects}/>
        <Route path="/EditProfile" exact component={EditProfile}/>
        <Route path="/Writeboard" exact component={Writeboard} />
        <Route path="/BulletinBoard" exact component={BulletinBoard} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
