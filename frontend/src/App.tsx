import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/auth/loginPage";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import Register from "./components/auth/register/registerPage";
import { HomePage } from "./components/home/HomePage";
function App() {
  return(
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App;
