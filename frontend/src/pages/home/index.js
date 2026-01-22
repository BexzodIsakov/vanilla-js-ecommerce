import { Header } from "../../components/Header";

function App() {
  console.log("app running");

  return `
    ${Header()}
  `;
}

const root = document.getElementById("root");
root.innerHTML = App();
