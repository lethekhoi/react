
import Login from './Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import { ToastContainer } from 'react-toastify';
function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer theme='colored' position='top-center'></ToastContainer>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path='/login' element={<Login />}></Route>
          {/* <Route path='/register' element={<Register/>}></Route>
        <Route path='/customer' element={<Customer/>}></Route> */}
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;