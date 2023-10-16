import { Outlet } from "react-router-dom";
import { Footer } from "./app/shared/components/Footer";
import { Header } from "./app/shared/components/Header";
import { Main } from "./app/shared/components/Main";

export const App = () => {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </>
  );
};
