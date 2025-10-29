import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { Footer, Navbar } from "./components";
import { About, Contact, Home, Projects } from "./pages";

const App = () => {
  return (
    <main className='bg-white'>
      <Router>
        <Navbar />
        <Routes>
          {/* <Route path='/' element={<Home />} /> */}
          <Route
            path='/*'
            element={
              <>
                <Routes>
                  <Route path='/' element={<About />} />
                  <Route path='/projects' element={<Projects />} />
                  <Route path='/contact' element={<Contact />} />
                </Routes>
                <Footer />
              </>
            }
          />
        </Routes>
      </Router>
    </main>
  );
};

export default App;
