import { React, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home.js';
import Reports from './components/Reports/Reports.js';
import AddEdit from './components/AddEdit/AddEdit.js'
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { ToastContainer, toast } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';
import api  from './api/transport';

const App = () => {

  injectStyle();
  //const navigate = useNavigate();
  const [datas,setData] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pages,setPages] = useState(0);
  const [previous, setPrevious] = useState(current-1);
  const [next, setNext] = useState(current+1)
  const [keyword, setKeyword] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    getList('keyword');
  }

  const handleOnChange = (event) => {
    setKeyword(event.target.value);
  }

  const handlePageChange = (e, number) => {
    e.preventDefault();
    setCurrent(number)
  }

  const deleteTransport = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
        const response = await api.delete(`transport/delete/${id}`);
        if (response.status === 200) {
            toast.success(response.data);
            setCurrent(1);
        }
    }
  }

  const getList = async (value) => {
    let url = value === current ? `transport?page=${value}` : `transport?search=${value}`;
    const response = await api.get(url);
    if (response.status === 200) {
        setData(response.data.page_lists === undefined ? [] : response.data.page_lists);
        setPrevious(response.data.previousPage);
        setNext(response.data.nextPage);
        setPages(response.data.numberOfPages);
    }
  }

  useEffect( () => {
    getList(keyword === "" ? current : keyword);
  }, [current,previous,next,keyword])

  return (

    <div className='App'>
      <Router>
        <Navbar 
          handleSearch={handleSearch} 
          handleOnChange={handleOnChange}
          keywords={keyword}
        />
          <ToastContainer 
            position='top-center'
            autoClose={2000}
            hideProgressBar={true}
          />
          <Routes>
            <Route path="" element= {
              <Home 
                datas={datas}
                previous={previous}
                next={next}
                pages={pages}
                current={current}
                handlePageChange={handlePageChange}
                deleteTransport={deleteTransport}
              /> }
            />
            <Route path='add' element = {<AddEdit getList={getList} />} />
            <Route path='edit/:id' element = {<AddEdit />} />
            <Route path='reports' element = {<Reports />}/>
          </Routes>
        <Footer />
      </Router>
    </div>

  );
}

export default App;
