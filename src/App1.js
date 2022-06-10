//import logo from './logo.svg';
//import './App.css';

import Footer from "./layouts/admin/Footer";
import Navbar from "./layouts/admin/Navbar";
import Sidebar from "./layouts/admin/Sidebar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <Sidebar />
        </div>
        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid px-4">
              <h1 className="mt-4">Dashboard</h1>
              <div>
              sacc
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
