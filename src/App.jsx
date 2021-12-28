import './App.css';
import Sidebar from './component/Sidebar';
import Task from './pages/Task';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Allboard from './pages/Allboard';
import createBoard from './pages/CreateBoard';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateTask from './pages/CreateTask';
import 'react-datepicker/dist/react-datepicker.css';


const App = () => {
  return (
    <div className='App' >
      <Sidebar />
      <Router>
        <Switch>
          <Route exact path="/home" component={Allboard} />
          <Route exact path="/task/:id" component={Task} />
          <Route exact path="/createBoard" component={createBoard} />
          <Route exact path="/createTask" component={CreateTask} />
          <Redirect to="/home" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
