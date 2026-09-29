import { BrowserRouter, Routes, Route } from "react-router-dom"
import BodyComp from "./Body"
import LoginComp from "./Login"
import ProfileComp from "./Profile"

function App() {

  return (
    <div>
      <BrowserRouter basename="/">
        <Routes>

          <Route path="/" element={<BodyComp />}>
            <Route path="/login" element={<LoginComp />} />
            <Route path="/profile" element={<ProfileComp />} />
          </Route>

        </Routes>
      </BrowserRouter>


      {/* <h1 className="text-3xl font-bold">
        Hello World !!
      </h1> */}
    </div>
  )
}

export default App;
