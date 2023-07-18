const outerWrap = document.querySelector("#outer-wrap");
const closeModal = document.querySelector(".close");
const modal = document.querySelector("#modal");

const modalClose = document.querySelector("#modal-close");
const userInput = document.querySelector("#user-input");

const chat = document.querySelector(".chat");
const messageInput = document.querySelector("#message");
const socket = io("http://localhost:5000");
const modalForm = document.querySelector("#modal-form");
const messageForm = document.querySelector("#form-message");
const cathTitle = document.querySelector("#cath-title");

let username = "";
modalForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (userInput.value != "") {
    username = userInput.value;
  }
  modal.close();
  cathTitle.innerText = `Welcome ${username}`;
  socket.emit("user", username);
  socket.on("user-connected", (user) => {
    renderJoinUser(user);
  });
  socket.on("message", (data) => {
    outerWrap.innerHTML += `
  <div class="wrap">
  <div class="message">
  <div class="speech-bubble">
  <span class="username">${data.name}:</span>
  <p>${data.msg}</p>
  </div>
  </div>
  </div>`;
    document.querySelectorAll(".wrap").forEach((item) => {
      item.lastElementChild.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    });
  });
});
messageInput.focus();
messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (messageInput.value != "") {
    const msg = messageInput.value;
    socket.emit("send-message", msg);
    messageInput.value = "";
  }
});

window.addEventListener("DOMContentLoaded", () => {
  modal.showModal();
});

function renderJoinUser(user) {
  outerWrap.innerHTML += `<div class="join">${user} Joined</div>`;
}
