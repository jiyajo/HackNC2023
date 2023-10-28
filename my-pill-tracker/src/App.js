import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import Calendar from './pages/Calendar';
import Home from './pages/Home';
import Medications from './pages/Medications'

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <Router>
      <Routes>
          <Route path='/my-pill-tracker/' exact element={<Home />} />
          <Route path='/my-pill-tracker/medications' exact element={<Medications />} />
          <Route path='/my-pill-tracker/calendar' exact element={<Calendar />} />
      </Routes>
    </Router>
  );
}

export default App;
