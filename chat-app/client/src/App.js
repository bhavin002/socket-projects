import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import { Routes, Route } from "react-router-dom"
import Connected from './pages/Connected';
import Home from './pages/Home';
import PublicChat from './pages/PublicChat';
import RoomChat from './pages/RoomChat';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/visitor' element={<Connected />} />
        <Route path='/publicchat' element={<PublicChat />} />
        <Route path='/roomchat' element={<RoomChat />} />
      </Routes>
    </>
  );
}

export default App;
