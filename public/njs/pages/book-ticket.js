// Database
const tickets = [
  {
    name: 'Phổ thông',
    description: 'Dành cho mọi đối tượng.',
    unitPrice: 80000,
  },
  {
    name: 'Học sinh/Sinh viên',
    description: 'Chỉ dành cho học sinh và sinh viên.',
    unitPrice: 75000,
  },
  {
    name: 'VIP',
    description: 'Chỉ dành cho thành viên VIP.',
    unitPrice: 70000,
  },
];

const combos = [
  {
    image: 'https://www.galaxycine.vn/media/2020/5/19/combo-1_1589871759174.jpg',
    name: 'Combo 1 Large',
    description: '1 Bắp + 1 Nước ngọt 32 Oz',
    unitPrice: 72000,
  },
  {
    image: 'https://www.galaxycine.vn/media/2020/5/19/combo-2_1589871763789.jpg',
    name: 'Combo 2 Small',
    description: '1 Bắp + 2 Nước ngọt 22 Oz',
    unitPrice: 81000,
  },
];

// HTML Elements
const availableTicketsNumElement = document.getElementById('book-ticket-available-tickets-num');

const ticketRowNumElements = document.querySelectorAll(
  '#book-ticket-ticket-box .book-ticket-list .book-ticket-data-row .book-ticket-quantity',
);
const ticketRowTotalPriceElements = document.querySelectorAll(
  '#book-ticket-ticket-box .book-ticket-list .book-ticket-data-row .book-ticket-total-price-cell',
);
const ticketTotalPriceElement = document.querySelector(
  '#book-ticket-ticket-box .book-ticket-list .book-ticket-total-row .book-ticket-total-price-cell',
);

const comboRowNumElements = document.querySelectorAll(
  '#book-ticket-food-box .book-ticket-list .book-ticket-data-row .book-ticket-quantity',
);
const comboRowTotalPriceElements = document.querySelectorAll(
  '#book-ticket-food-box .book-ticket-list .book-ticket-data-row .book-ticket-total-price-cell',
);
const comboTotalPriceElement = document.querySelector(
  '#book-ticket-food-box .book-ticket-list .book-ticket-total-row .book-ticket-total-price-cell',
);

const totalPriceElement = document.querySelector(
  '#book-ticket-info-box .book-ticket-total-price span',
);

const ticketDecBtnElements = document.querySelectorAll(
  '#book-ticket-ticket-box .book-ticket-list .book-ticket-decrease-btn',
);
const ticketIncBtnElements = document.querySelectorAll(
  '#book-ticket-ticket-box .book-ticket-list .book-ticket-increase-btn',
);

const comboDecBtnElements = document.querySelectorAll(
  '#book-ticket-food-box .book-ticket-list .book-ticket-decrease-btn',
);
const comboIncBtnElements = document.querySelectorAll(
  '#book-ticket-food-box .book-ticket-list .book-ticket-increase-btn',
);

const infoTicketElement = document.querySelector(
  '#book-ticket-info-box .book-ticket-showtime-info-ticket',
);
const infoComboElement = document.querySelector(
  '#book-ticket-info-box .book-ticket-showtime-info-combo',
);
const infoSeatElement = document.querySelector(
  '#book-ticket-info-box .book-ticket-showtime-info-seat',
);

// Info
const ticketNames = tickets.map((ticket) => ticket.name);
const comboNames = combos.map((combo) => combo.name);
const ticketUnitPrices = tickets.map((ticket) => ticket.unitPrice);
const comboUnitPrices = combos.map((combo) => combo.unitPrice);

const ticketRowNums = Array(tickets.length).fill(0);
const ticketRowTotalPrices = Array(tickets.length).fill(0);
let ticketTotalPrice = 0;

const comboRowNums = Array(combos.length).fill(0);
const comboRowTotalPrices = Array(combos.length).fill(0);
let comboTotalPrice = 0;

let availableTicketsNum = availableTicketsNumElement.innerHTML;
let totalPrice = 0;

// Functions
function formatPriceVND(priceInt) {
  return priceInt.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
}

function init() {
  ticketRowNumElements.forEach((e) => {
    e.innerHTML = 0;
  });
  ticketRowTotalPriceElements.forEach((e) => {
    e.innerHTML = formatPriceVND(0);
  });
  ticketTotalPriceElement.innerHTML = formatPriceVND(0);

  comboRowNumElements.forEach((e) => {
    e.innerHTML = 0;
  });
  comboRowTotalPriceElements.forEach((e) => {
    e.innerHTML = formatPriceVND(0);
  });
  comboTotalPriceElement.innerHTML = formatPriceVND(0);

  totalPriceElement.innerHTML = formatPriceVND(0);
}

function getTicketInfo() {
  let str = '';
  for (let i = 0; i < ticketRowNums.length; ++i) {
    if (ticketRowNums[i] > 0) {
      str += `${ticketNames[i]} (${ticketRowNums[i]}), `;
    }
  }
  return str;
}

function getComboInfo() {
  let str = '';
  for (let i = 0; i < comboRowNums.length; ++i) {
    if (comboRowNums[i] > 0) {
      str += `${comboNames[i]} (${comboRowNums[i]}), `;
    }
  }
  return str;
}

// Events
ticketIncBtnElements.forEach((e, i) => {
  e.addEventListener('click', () => {
    if (availableTicketsNum > 0) {
      availableTicketsNum -= 1;
      ticketRowNums[i] += 1;
      ticketRowTotalPrices[i] += ticketUnitPrices[i];
      ticketTotalPrice += ticketUnitPrices[i];
      totalPrice += ticketUnitPrices[i];

      ticketRowNumElements[i].innerHTML = ticketRowNums[i];
      ticketRowTotalPriceElements[i].innerHTML = formatPriceVND(ticketRowTotalPrices[i]);
      ticketTotalPriceElement.innerHTML = formatPriceVND(ticketTotalPrice);
      totalPriceElement.innerHTML = formatPriceVND(totalPrice);
      availableTicketsNumElement.innerHTML = availableTicketsNum;
      infoTicketElement.innerHTML = getTicketInfo();
    }
  });
});

comboIncBtnElements.forEach((e, i) => {
  e.addEventListener('click', () => {
    comboRowNums[i] += 1;
    comboRowTotalPrices[i] += comboUnitPrices[i];
    comboTotalPrice += comboUnitPrices[i];
    totalPrice += comboUnitPrices[i];

    comboRowNumElements[i].innerHTML = comboRowNums[i];
    comboRowTotalPriceElements[i].innerHTML = formatPriceVND(comboRowTotalPrices[i]);
    comboTotalPriceElement.innerHTML = formatPriceVND(comboTotalPrice);
    totalPriceElement.innerHTML = formatPriceVND(totalPrice);
    infoComboElement.innerHTML = getComboInfo();
  });
});

ticketDecBtnElements.forEach((e, i) => {
  e.addEventListener('click', () => {
    if (ticketRowNums[i] > 0) {
      availableTicketsNum += 1;
      ticketRowNums[i] -= 1;
      ticketRowTotalPrices[i] -= ticketUnitPrices[i];
      ticketTotalPrice -= ticketUnitPrices[i];
      totalPrice -= ticketUnitPrices[i];

      ticketRowNumElements[i].innerHTML = ticketRowNums[i];
      ticketRowTotalPriceElements[i].innerHTML = formatPriceVND(ticketRowTotalPrices[i]);
      ticketTotalPriceElement.innerHTML = formatPriceVND(ticketTotalPrice);
      totalPriceElement.innerHTML = formatPriceVND(totalPrice);
      availableTicketsNumElement.innerHTML = availableTicketsNum;
      infoTicketElement.innerHTML = getTicketInfo();
    }
  });
});

comboDecBtnElements.forEach((e, i) => {
  e.addEventListener('click', () => {
    if (comboRowNums[i] > 0) {
      comboRowNums[i] -= 1;
      comboRowTotalPrices[i] -= comboUnitPrices[i];
      comboTotalPrice -= comboUnitPrices[i];
      totalPrice -= comboUnitPrices[i];

      comboRowNumElements[i].innerHTML = comboRowNums[i];
      comboRowTotalPriceElements[i].innerHTML = formatPriceVND(comboRowTotalPrices[i]);
      comboTotalPriceElement.innerHTML = formatPriceVND(comboTotalPrice);
      totalPriceElement.innerHTML = formatPriceVND(totalPrice);
      infoComboElement.innerHTML = getComboInfo();
    }
  });
});

(function main() {
  init();
})();