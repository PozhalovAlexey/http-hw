import getTicket from "./getTicket";
import changeTicketStatus from "./changeTicketStatus";
import showTicketDescription from "./showTicketDescription";
import removeTicketOkButtonHandler from "./removeTicket";
import getEditTicketWidget from "./editTicket";
import getAddTicketWidget from "./addTicketWidget";

const serverUrl = 'https://serverfor-http-hw.onrender.com';
const mainContainer = document.querySelector(".container");

const addTicketButton = document.querySelector(".add-ticket-button");

document.addEventListener("DOMContentLoaded", () => {
  const xhrLoadTicket = new XMLHttpRequest();
  xhrLoadTicket.open("GET", `${serverUrl}/?method=allTickets`);
  xhrLoadTicket.responseType = "json";
  xhrLoadTicket.onreadystatechange = ()=>{
  }
  xhrLoadTicket.onreadystatechange = (e,t) => {
    if (xhrLoadTicket.status >= 200 && xhrLoadTicket.status < 300) {
      try {
        let responsedTickets = [];
        const ticketsContainer = document.querySelector(".tickets-container");

        if (!responsedTickets.length) {
          responsedTickets = xhrLoadTicket.response
          responsedTickets?.forEach((ticket) => {
            getTicket(ticket, ticketsContainer);
            const currentTicket = ticketsContainer.lastElementChild;
            const ticketStatus = currentTicket.querySelector(".ticket-status");
            const ticketStatusCheckbox = currentTicket.querySelector(
              ".ticket-status-checkbox"
            );
            // if (ticketStatus.dataset.status === "true") {

              // ticketStatusCheckbox.classList.remove("hidden");
              const ticketName = currentTicket.querySelector(".ticket-name");
              const ticketEdit = currentTicket.querySelector(".ticket-edit-button");
              const ticketRemove = currentTicket.querySelector(
                ".ticket-remove-button"
              );
              console.log(ticketName,"ticketName")
              ticketStatus.addEventListener("click", () => {
                changeTicketStatus(
                  mainContainer,
                  currentTicket,
                  ticketStatus,
                  ticketStatusCheckbox
                );
              });

              ticketName.addEventListener("click", () => {
                console.log('name')
                showTicketDescription(
                  mainContainer,
                  currentTicket,
                  ticketName,
                  serverUrl
                );
              });

              ticketEdit.addEventListener("click", () => {
                console.log('edit')
                getEditTicketWidget(
                  mainContainer,
                  currentTicket,
                  ticketEdit,
                  serverUrl
                );
              });

              ticketRemove.addEventListener("click", () => {
                console.log('remove')
                removeTicketOkButtonHandler(
                  mainContainer,
                  currentTicket,
                  serverUrl
                );
              });
          });
        }
      } catch (e) {
        console.error(e);
      }
    }
  }

  xhrLoadTicket.send();
  console.log('click')


  addTicketButton.addEventListener("click", () => {
    getAddTicketWidget(mainContainer, serverUrl);
  });
});
