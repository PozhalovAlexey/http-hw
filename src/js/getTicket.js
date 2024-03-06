export default function getTicket(ticket, ticketsContainer) {
  const ticketHtml = `
<div data-id="${ticket.id}" class="ticket-wrapper">
  <div class="ticket-body">
    <button data-status="${ticket.status}" class="ticket-status">
    <span class="ticket-status-checkbox hidden">&#10004;</span>
    </button>
    <div class="ticket-name"><p>${ticket.name}</p></div>
    <div class="ticket-timestamp">
      <span>${ticket.created}</span>
    </div>
    <button class="ticket-edit-button">
    <span>&#9998;</span>
    </button>
    <button class="ticket-remove-button">
      <span>&#10006;</span>
    </button>
  </div>
  <div class="ticket-description visible"><p></p></div>
</div>
 `;

  ticketsContainer.insertAdjacentHTML("beforeEnd", ticketHtml);
}
