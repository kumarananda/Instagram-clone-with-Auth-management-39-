import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Authpages/Login";
import Profile from "./pages/Profile/Profile";
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss'
import './defult.css'
import Register from "./pages/Authpages/Register";
import AuthenticateUser from "./middlewares/AuthenticateUser";
import AuthRedirectUser from "./middlewares/AuthRedirectUser";
import Cookies from "js-cookie";
import { useContext, useEffect } from "react";
import axios from "axios";
import AuthContext from "./context/AuthContext";
import LoadingBar from 'react-top-loading-bar'
import LoaderContext from "./context/LoaderContext";
import VerifyPage from "./pages/Authpages/AuthComponents/Verify/VerifyPage";
import VerifyMobile from "./pages/Authpages/AuthComponents/Verify/VerifyMobile";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { creatToast } from "./utility/toast";
import ForgotPassword from "./pages/Authpages/ForgotPassword";
import ResetPassword from "./pages/Authpages/ResetPassword";


function App() {


  // get token
  const token = Cookies.get('token');


  // get auth context
  // const {authdispatch, authstate} = useContext(AuthContext);
  const {authdispatch } = useContext(AuthContext);

  // get loder context
  const {loaderstate, loaderDispatch } = useContext(LoaderContext)

  // console.log(authstate.user);

  // check login user
  useEffect( () => {
    

    try{ 

      // get token user
      axios.get('http://localhost:5050/api/user/me', {
        headers : {
          "Authorization" : `Bearer ${token}`
        }
      })
      .then(res => {
        
        if(res.data.isVerified && token){
          authdispatch({type : 'LOGIN_USER_SUCCESS', payload : res.data})
        }else {
          // authdispatch({type : 'USER_LOGOUT'});
          creatToast("Please verify your account")
          Cookies.remove('token')

          // working hare

        }
        
      })
      .catch(error => {
        authdispatch({type : 'USER_LOGOUT'})
      }) 

    }catch(error){
      console.log(error);
    }


  }, [token])
 
  // console.log(authstate);



  return (
    <>

      <LoadingBar
        color='#f11946'
        progress={loaderstate}
        onLoaderFinished={() => loaderDispatch({type : "LODER_END"})}
      />
      <ToastContainer limit={1}/>

      <Routes>
        <Route path="/login" element={ <AuthRedirectUser> <Login /> </AuthRedirectUser>  }/>
        <Route path="/register" element={ <AuthRedirectUser>  <Register /> </AuthRedirectUser>  }/>
        <Route path="/forgot-password" element={ <>  <ForgotPassword /> </>  }/>
        <Route path="/password-reset/:token" element={ <>  <ResetPassword /> </>  }/>
        <Route path="/user/:id/verify/:token" element={ <VerifyPage /> }/>
        <Route path="/user/mobile-verify" element={ <VerifyMobile /> }/>
        <Route path="/:id" element={ <AuthenticateUser> <Profile /> </AuthenticateUser> }/>
        <Route path="/" element={ <AuthenticateUser> <Home /> </AuthenticateUser>  }/>
      </Routes>
    </>
  );
}

export default App;
