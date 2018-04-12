let title = "The world is a vampire";

const App = new State({
  title: title
});
App.bindToDom();

let btn = document.getElementById("reset-title-button"),
  txt = document.getElementById("title-input");

btn.addEventListener("click", () => {
  App.state.title = title;
});

txt.addEventListener("input", e => {
  App.state["title"] = e.target.value;
});

txt.placeholder = title;
