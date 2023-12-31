
import Login from './Login';
import List from './List';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import AddSchedule from './AddSchedule';
import { ToastContainer } from 'react-toastify';
import EditSchedule from './EditSchedule';
import Header1 from './Header1'
function App() {

  return (
    
      <div>
      <BrowserRouter>
        <ToastContainer theme='colored' position='top-center'></ToastContainer>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/list' element={<List />}></Route>
          <Route path='/addSchedule' element={<AddSchedule />}></Route>
          <Route path='/editSchedule' element={<EditSchedule />}></Route>
          {/* <Route path='/register' element={<Register/>}></Route>
        <Route path='/customer' element={<Customer/>}></Route> */}
        </Routes>

      </BrowserRouter>
      </div>

  );
}

export default App;