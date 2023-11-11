import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CitiesProvider } from "./Contexts/CitiesContext";
import { AuthProvider } from "./Contexts/FakeAuthContext";
import { Suspense, lazy } from "react";
import ProtectedRoute from "./Pages/ProtectedRoute";
import CountryList from "./Components/CountryList";
import City from "./Components/City";
import Form from "./Components/Form";
import CityList from "./Components/CityList";
import SpinnerFullPage from "./Components/SpinnerFullPage";

const HomePage = lazy(() => import("./Pages/HomePage"));
const Product = lazy(() => import("./Pages/Product"));
const Pricing = lazy(() => import("./Pages/Pricing"));
const PageNotFound = lazy(() => import("./Pages/PageNotFound"));
const AppLayout = lazy(() => import("./Pages/AppLayout"));
const Login = lazy(() => import("./Pages/Login"));

function App() {
  return (
    // for using params with react router 3 steps
    // 1 create new route
    // 2 link that route
    // 3 and in that route we read the data  from url state
    <div>
      <AuthProvider>
        <CitiesProvider>
          <BrowserRouter>
            <Suspense fallback={<SpinnerFullPage />}>
              <Routes>
                <Route index element={<HomePage />}></Route>
                <Route path="Pricing" element={<Pricing />}></Route>
                <Route path="Product" element={<Product />}></Route>
                <Route path="login" element={<Login />}></Route>
                <Route
                  path="app"
                  element={
                    <ProtectedRoute>
                      <AppLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route
                    index
                    element={<Navigate replace to="cities" />}
                  ></Route>
                  <Route path="cities" element={<CityList />}></Route>
                  {/* // 1 create new route
            then cityitem pe click krne se cities id open hoge/ when ever url get this cities id shape city component ke andar jaye ge   */}
                  <Route path="cities/:id" element={<City />}></Route>
                  <Route path="countries" element={<CountryList />}></Route>
                  <Route path="form" element={<Form />}></Route>
                </Route>
                <Route path="*" element={<PageNotFound />}></Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </CitiesProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
