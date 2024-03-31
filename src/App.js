
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ListStudent from './components/ListStudent';
import StudentComponent from './components/StudentComponent';



function App() {
  return (
    <>
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path ='/' element={<ListStudent/>}></Route>
        <Route path ='/student' element={<ListStudent/>}></Route>
        <Route path ='/add-student' element={<StudentComponent/>}></Route>
        <Route path ='/update-student/:id' element={<StudentComponent/>}></Route>
      </Routes>
     
      <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
