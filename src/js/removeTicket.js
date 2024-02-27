function removeTicketCancelButtonHandler(widgetRemoveTicket) {
  const cancelBtn = widgetRemoveTicket.querySelector("[data-id=cancel]");
  cancelBtn.addEventListener("click", () => {
    widgetRemoveTicket.remove();
  });
}

function removeTicketOkButtonHandler(widgetRemoveTicket, currentTicket, serverUrl) {
  const okBtn = widgetRemoveTicket.querySelector("[data-id=ok]");
  okBtn.addEventListener("click", () => {
    const formData = new FormData();
    formData.append("id", currentTicket.dataset.id);
    const requestRemoveTicketUrl = `${serverUrl}/?method=removeTicket`;
    const xhrRemoveTicket = new XMLHttpRequest();
    xhrRemoveTicket.open("POST", requestRemoveTicketUrl);
    xhrRemoveTicket.addEventListener("load", () => {
      if (xhrRemoveTicket.status >= 200 && xhrRemoveTicket.status < 300) {
        try {
          setTimeout(() => {
            document.location.reload();
          }, 1000);
        } catch (e) {
          console.error(e);
        }
      }
    });
    widgetRemoveTicket.remove();
    xhrRemoveTicket.send(formData);
  });
}

export default function getRemoveTicketWidget(mainContainer, currentTicket, serverUrl) {
  if (mainContainer.querySelector(".modal")) return;
  const widgetRemoveTicket = document.createElement("div");
  widgetRemoveTicket.dataset.widget = "removeTicket";
  widgetRemoveTicket.classList.add("modal", "widget-remove");
  widgetRemoveTicket.innerHTML = `
    <h2>Удалить тикет?</h2>
    <div class="widget-form">
      <p class="widget-remove-text">Вы уверены, что хотите удалить тикет?</p>
      <div class="widget-form-controls">
        <button data-id="cancel" class="widget-button">Отмена</button>
        <button data-id="ok" class="widget-button">Ок</button>
      </div>
    </div>
  `;
  removeTicketCancelButtonHandler(widgetRemoveTicket);
  removeTicketOkButtonHandler(widgetRemoveTicket, currentTicket, serverUrl);
  mainContainer.appendChild(widgetRemoveTicket);
}
