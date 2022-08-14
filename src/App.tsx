
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AboutIconLink } from "./Components/AboutIconLink";
import { FeedbackContextProvider } from "./Components/context/FeedbackContext";
import FeedbackForm from "./Components/FeedbackForm";
import FeedbackList from "./Components/FeedbackList";
import Header from "./Components/Header";
import { AboutPage } from "./pages/AboutPage";
import {FeedbackStats} from "./Components/FeedbackStats";

function App() {

  return (
    <FeedbackContextProvider>
      <Router>
        <Header />
        <div className='container'>
          <Routes>
            <Route
              path='/'
              element={
                <>
                  <FeedbackForm />
                  <FeedbackStats />
                  <FeedbackList  />
                  <AboutIconLink />
                </>
              }
            ></Route>
            <Route path='/about' element={<AboutPage />} />
          </Routes>
        </div>
      </Router>
    </FeedbackContextProvider>
  );
}

export default App;
