import React from "./didact";

const root = document.getElementById("root");

function tick() {
  const time = new Date().toLocaleTimeString();
  const clockElement = (
    <div>
      <h1>{time}</h1>
      <p>hi </p>
    </div>
  );
  React.render(clockElement, root);
}

tick();
setInterval(tick, 1000);
