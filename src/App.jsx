// App.js

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import GetQuestionById from './pages/GetQuestionById';
import CreateQuestion from './pages/CreateQuestion';
import UpdateQuestion from './pages/UpdateQuestion';
import DeleteQuestion from './pages/DeleteQuestion';
import "./index.css"
import Login from './pages/Login';
import { isAuthenticated, logoutUser } from './services/api';

const App = () => {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <nav className="mb-4">
          <ul className="flex space-x-4">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/get-question">Get Question by ID</Link>
            </li>
            <li>
              <Link to="/create-question">Create Question</Link>
            </li>
            <li>
              <Link to="/update-question">Update Question</Link>
            </li>
            <li>
                <Link to="/delete-question">Delete Question</Link>
              </li>
            {
              isAuthenticated() ?
                <li>
                  <button onClick={logoutUser}>Log Out</button>
                </li>
              : 
              (
                <li>
                  <Link to="/login">Login</Link>
                </li>
              )
            }
          </ul>
        </nav>

        <Routes>
          <Route path="/get-question" element={<GetQuestionById />} />
          <Route path="/create-question" element={<CreateQuestion />} />
          <Route path="/update-question" element={<UpdateQuestion />} />
          <Route path="/delete-question" element={<DeleteQuestion />} />
          <Route path="/login" element={<Login />}/>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
