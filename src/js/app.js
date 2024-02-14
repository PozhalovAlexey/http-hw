import getTicket from "./getTicket";
import changeTicketStatus from "./changeTicketStatus";
import showTicketDescription from "./showTicketDescription";
import getRemoveTicketWidget from "./removeTicket";
import getEditTicketWidget from "./editTicket";
import getAddTicketWidget from "./addTicketWidget";

const serverUrl = 'http://localhost:8080/';
const mainContainer = document.querySelector(".container");
const ticketsContainer = document.querySelector(".ticketsContainer");
const addTicketButton = document.querySelector(".add-ticket-button");

document.addEventListener("DOMContentLoaded", () => {
  const xhrLoadTicket = new XMLHttpRequest();
  xhrLoadTicket.open("GET", `${serverUrl}/?method=allTickets`);
  xhrLoadTicket.responseType = "json";

  xhrLoadTicket.addEventListener("load", () => {
    if (xhrLoadTicket.status >= 200 && xhrLoadTicket.status < 300) {
      try {
        const responsedTickets = xhrLoadTicket.responseText;

        if (!responsedTickets.length) {
          responsedTickets.forEach((ticket) => {
            getTicket(ticket, ticketsContainer);

            const currentTicket = ticketsContainer.lastElementChild;
            const ticketStatus = currentTicket.querySelector(".ticketStatus");
            const ticketStatusCheckbox = currentTicket.querySelector(
              ".ticketStatusCheckbox"
            );

            if (ticketStatus.dataset.status === "true") {
              ticketStatusCheckbox.classList.remove("hidden");

              const ticketName = currentTicket.querySelector(".ticketName");
              const ticketEdit = currentTicket.querySelector(".ticketEditButton");
              const ticketRemove = currentTicket.querySelector(
                ".ticketRemoveButton"
              );

              ticketStatus.addEventListener("click", () => {
                changeTicketStatus(
                  mainContainer,
                  currentTicket,
                  ticketStatus,
                  ticketStatusCheckbox
                );
              });

              ticketName.addEventListener("click", () => {
                showTicketDescription(
                  mainContainer,
                  currentTicket,
                  ticketName,
                  serverUrl
                );
              });

              ticketEdit.addEventListener("click", () => {
                getEditTicketWidget(
                  mainContainer,
                  currentTicket,
                  ticketEdit,
                  serverUrl
                );
              });

              ticketRemove.addEventListener("click", () => {
                getRemoveTicketWidget(
                  mainContainer,
                  currentTicket,
                  serverUrl
                );
              });
            }
          });
        }
      } catch (e) {
        console.error(e);
      }
    }
  });

  xhrLoadTicket.send();
  console.log('clik')


  addTicketButton.addEventListener("click", () => {
    getAddTicketWidget(mainContainer, serverUrl);
  });
});
