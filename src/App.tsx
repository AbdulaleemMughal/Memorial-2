import "./App.css";
import { Main } from "./Component/Main";
import { Provider } from "react-redux";
import { appStore } from "./Store/appStore";
import { createBrowserRouter, RouterProvider } from "react-router";
import { LivePage } from "./LiveDemo/Components/Livepage.tsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/live-page", 
    element: <LivePage />,
  },
]);

function App() {
  return (
    <Provider store={appStore}>
      <RouterProvider router={appRouter} />
    </Provider>
  );
}

export default App;
