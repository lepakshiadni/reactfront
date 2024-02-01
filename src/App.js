import './App.css';
// import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import AdminLogin from './component/adminLogin';
// import AdminOtp from './component/adminOtp';
// import Login from './component/adminLandingPage';
// import AdminPostPage from './component/AdminPostPage';
import { ToastContainer } from 'react-toastify';
import RouteComponent from './route/RouteComponent';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <RouteComponent/>
    </div>
  );
}

export default App;
