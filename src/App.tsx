import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CardInfoProvider from "components/provider/CardInfoProvider";
import ModalStateProvider from "components/provider/ModalStateProvider";
import MainPage from "pages/MainPage";
import CardRegisterForm from "pages/RegisterPage/CardRegisterForm";
import LastPage from "pages/LastPage";
import GotLost from "pages/GotLost";
import { getData } from "utils/getDataFromLocalStorage";

const App = () => {
  const cardList = getData("card");

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route
          path="/"
          element={
            <CardInfoProvider>
              <MainPage cardList={cardList} />
            </CardInfoProvider>
          }
        />
        <Route
          path="/register"
          element={
            <CardInfoProvider>
              <ModalStateProvider>
                <CardRegisterForm />
              </ModalStateProvider>
            </CardInfoProvider>
          }
        />
        <Route
          path="/completion"
          element={
            <CardInfoProvider>
              <LastPage />
            </CardInfoProvider>
          }
        />
        <Route path="/got-lost" element={<GotLost />} />
        <Route path="*" element={<Navigate replace to="/got-lost" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
