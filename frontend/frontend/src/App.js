import "./App.css";
import Layout from "./compoments/Layout/Layout";
import { Provider as ReduxProvider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import { store } from "./store";

function App() {
  return (
    <CookiesProvider>
    <ReduxProvider store={store}>
      <Layout />
    </ReduxProvider>
    </CookiesProvider>
  );
}

export default App;
