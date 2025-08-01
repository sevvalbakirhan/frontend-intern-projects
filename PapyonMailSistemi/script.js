document.addEventListener("DOMContentLoaded", function () {
  let currentCode= localStorage.getItem("verificationCode");

  if (!currentCode) {
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    localStorage.setItem("verificationCode", newCode);
    currentCode = newCode;
  }

  const codeBox = document.querySelector(".code-container");
  if (codeBox) {
   codeBox.textContent = currentCode;
  }
});