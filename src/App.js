import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Hero from "./components/HeroSection/Hero";
import Why from "./components/WhySection/Why";
import HackathonList from "./components/Challenges/HackathonList";
import CreateChallenge from "./components/Challenges/CreateChallenge";
import DetailsPage from "./components/Challenges/DetailsPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Why />
                <HackathonList />
              </>
            }
          />
          <Route path="/createChallenge" element={<CreateChallenge />} />
          <Route path="/details/:id" element={<DetailsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
