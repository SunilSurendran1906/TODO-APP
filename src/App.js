import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";
import Todos from "./components/todos";

function App() {
  return (
    <div className="App">
      <Header />
      <Todos />
      <Footer />
    </div>
  );
}

export default App;
