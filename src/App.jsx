import { BrowserRouter, Routes, Route } from "react-router-dom"
import BodyComp from "./Body"
import LoginComp from "./Login"
import ProfileComp from "./Profile"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import FeedComp from "./Feed"
import Requests from "./Requests"
import Connections from "./Connections"

function App() {

  return (
    <div>
      <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>

          <Route path="/" element={<BodyComp />}>
            <Route path="/login" element={<LoginComp />} />
            <Route path="/profile" element={<ProfileComp />} />
            <Route path="/feed" element={<FeedComp />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/requests" element={<Requests />} />
          </Route>

        </Routes>
      </BrowserRouter>
      </Provider>


      {/* <h1 className="text-3xl font-bold">
        Hello World !!
      </h1> */}
    </div>
  )
}

export default App;
