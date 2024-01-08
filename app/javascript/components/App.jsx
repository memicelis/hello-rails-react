import React,{useEffect} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Greeting from './Greeting.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { selectGreeting, fetchGreeting } from '../redux/store.js';

const App = () => {
    const dispatch = useDispatch();
    const greeting = useSelector(selectGreeting);
  
    useEffect(() => {
      dispatch(fetchGreeting()).then((data) => {
        console.log('Fetched Greeting:', data); // Log fetched data
      })
      .catch((error) => {
        console.error('Error fetching greeting:', error.message);
      });;
    }, [dispatch]);
  return (
    <BrowserRouter>
        <Routes>
          <Route index element={<Greeting greeting={greeting}/>} />
        </Routes>
      </BrowserRouter>
  );
};

export default App;