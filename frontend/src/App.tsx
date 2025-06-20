import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import store from "./redux/store/store";

// Pages
import LoginPage from "./components/auth/loginPage";
import Register from "./components/auth/register/registerPage";
import MatchFinder from "./components/Match/MatchFinder";
import { ChatPage } from "./components/Chat/ChatPage";
import DashboardMainPage from "./components/Dashboard/DashboardMainPage";
import HomePage from "./components/home/HomePageLayout";

// Layout
import LoneTownNavBar from "./components/Header/PrivateHeader";
import PublicNavBar from "./components/Header/PublicHeader";

// Auth wrapper
import RequireAuth from "./components/auth/RequireAuth";

function App() {
  const user = useSelector((state: any) => state.auth.user);
  const isAuthenticated = !!user;

  return (
    <Provider store={store}>
      <Router>
        {isAuthenticated ? <LoneTownNavBar /> : <PublicNavBar />}

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/matches"
            element={
              <RequireAuth>
                <MatchFinder />
              </RequireAuth>
            }
          />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <DashboardMainPage />
              </RequireAuth>
            }
          />
          <Route
            path="/chat/:matchId/:userId"
            element={
              <RequireAuth>
                <ChatPage />
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
