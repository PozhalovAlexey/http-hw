export default function changeTicketStatus(
  mainContainer,
  currentTicket,
  ticketStatus,
  ticketStatusCheckbox,
  serverUrl,
) {
  if (mainContainer.querySelector(".modal")) return;

  ticketStatusCheckbox.classList.toggle("hidden");

  const requestChangeTicketStatusUrl = `${serverUrl}/?method=changeTicketStatus&id=${currentTicket.dataset.id}`;
  const xhrChangeTicketStatus = new XMLHttpRequest();
  xhrChangeTicketStatus.open("POST", requestChangeTicketStatusUrl);
  xhrChangeTicketStatus.addEventListener("load", () => {
    if (
      xhrChangeTicketStatus.status >= 200 &&
      xhrChangeTicketStatus.status < 300
    ) {
      try {
        console.log(xhrChangeTicketStatus.response);
      } catch (e) {
        console.error(e);
      }
    }
  });

  xhrChangeTicketStatus.send();
}
