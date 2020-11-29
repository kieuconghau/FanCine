"use strict";

var _, _ref;

// -- SignIn - Modal initial --
var modalBtn = document.getElementById('signIn');
var modal = document.getElementById('modal');
var closeModal = document.getElementById('close-Modal'); // Disable sign in modal

function popdownModal() {
  modal.style.display = 'none';
} // When the user clicks the signIn, open the modal


modalBtn.onclick = function signInClick() {
  modal.style.display = 'block';
}; // When the user clicks on <span> (x), close the modal


closeModal.onclick = function closeModalClick() {
  popdownModal();
}; // When the user clicks anywhere outside of the modal, close it


window.onclick = function windowClickOff(event) {
  if (event.target === modal) {
    popdownModal();
  }
}; // -- End modal --


console.log((_ = 0) !== null && _ !== void 0 ? _ : 'babel compile fail');
console.log((_ref = null) !== null && _ref !== void 0 ? _ref : 'babel compile successfully');