"use strict";

// ===== HTML Elements =====
var infoBtnElement = document.querySelector('#mem-info-btn');
var historyBtnElement = document.querySelector('#mem-history-btn');
var infoTabElement = document.querySelector('#mem-info-tab');
var historyTabElement = document.querySelector('#mem-history-tab');
var transactionsGridElement = document.querySelector('.mem-history-section');
var transactionItemElements = document.querySelectorAll('.mem-history-item');
var historyInfoTimeElements = document.querySelectorAll('.mem-history-item .mem-history-item-info-time');
var historyStartDateElement = document.querySelector('#mem-history-head-item-start');
var historyEndDateElement = document.querySelector('#mem-history-head-item-end');
var historyOrderElement = document.querySelector('#mem-history-head-item-order');
var historySelectedOrderElement = document.querySelector('#mem-history-order-opt-index');
var historyTimezoneOffsetMiliElement = document.querySelector('#mem-history-head-item-timezone-offset-mili'); // ===== Functions =====

function displayInfoTab() {
  infoBtnElement.classList.add('mem-nav-btn-selected');
  historyBtnElement.classList.remove('mem-nav-btn-selected');
  infoTabElement.style.display = 'block';
  historyTabElement.style.display = 'none';
}

function displayHistoryTab() {
  historyBtnElement.classList.add('mem-nav-btn-selected');
  infoBtnElement.classList.remove('mem-nav-btn-selected');
  historyTabElement.style.display = 'block';
  infoTabElement.style.display = 'none';

  if (transactionItemElements.length === 0) {
    document.querySelector('.mem-history-tab-empty').style.display = 'block';
    document.querySelector('.mem-history-tab-not-empty').style.display = 'none';
  } else {
    document.querySelector('.mem-history-tab-empty').style.display = 'none';
    document.querySelector('.mem-history-tab-not-empty').style.display = 'block';
  }
}

function initValuesForHistoryForm() {
  // Timezone offset
  historyTimezoneOffsetMiliElement.value = new Date().getTimezoneOffset() * 60 * 1000; // Default dates

  if (historyStartDateElement.value === '') {
    var d = new Date();
    historyStartDateElement.value = "".concat(d.getFullYear(), "-01-01");
    historyEndDateElement.value = "".concat(d.getFullYear(), "-").concat(d.getMonth() + 1, "-").concat(d.getDate());
    historyOrderElement.value = 0;
  } // Selected order type


  if (historySelectedOrderElement.innerHTML !== '') {
    var optionElements = document.querySelectorAll('.mem-history-head-item-order-opt');
    optionElements[historySelectedOrderElement.innerHTML.charCodeAt(0) - '0'.charCodeAt(0)].setAttribute('selected', 'true');
  }
}

function turnOnAlertSave() {
  window.onbeforeunload = function () {
    return true;
  };
}

function turnOffAlertSave() {
  window.onbeforeunload = function () {
    return null;
  };
} // ===== Events handling =====


infoBtnElement.addEventListener('click', function () {
  window.location = '/member/info';
});
historyBtnElement.addEventListener('click', function () {
  window.location = '/member/transaction-history';
});
transactionItemElements.forEach(function (e) {
  e.addEventListener('mouseenter', function () {
    e.classList.add('mem-history-item-hover');
  });
  e.addEventListener('mouseleave', function () {
    e.classList.remove('mem-history-item-hover');
  });
  e.addEventListener('click', function () {
    window.open("/member/transaction-history/".concat(e.firstElementChild.innerHTML));
  });
});
historyInfoTimeElements.forEach(function (e) {
  e.innerHTML = new Date(e.innerHTML).toLocaleString('en-GB');
}); // Main

switch (document.querySelector('#mem-nav-active-tab').innerHTML) {
  case '0':
    displayInfoTab();
    break;

  case '1':
    displayHistoryTab();
    initValuesForHistoryForm();
    break;

  default:
    displayInfoTab();
}