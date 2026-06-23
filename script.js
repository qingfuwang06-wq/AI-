document.addEventListener("DOMContentLoaded", () => {
  const leadForm = document.querySelector("#leadForm");

  leadForm.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("已收到咨询信息，我们会尽快联系您。");
    leadForm.reset();
  });
});
