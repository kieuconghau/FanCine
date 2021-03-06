// ===== HTML elements =====
const ticketRowElements = document.querySelectorAll('#mnticket-table tbody tr');
const tableRowElements = document.querySelectorAll('#mnticket-table tr');
const tableBodyElement = document.querySelector('#mnticket-table tbody');
const displayCheckboxElements = document.querySelectorAll(
  '#mnticket-display .mmnticket-display-item input',
);

// Global variables
// const COL = Object.freeze({
// });

// ===== Functions =====
function showTableColumn(colIndex) {
  tableRowElements.forEach((e) => {
    e.children[colIndex].style.display = 'table-cell';
  });
}

function hideTableColumn(colIndex) {
  tableRowElements.forEach((e) => {
    e.children[colIndex].style.display = 'none';
  });
}

function refreshDisplay() {
  displayCheckboxElements.forEach((e, i) => {
    if (e.checked === false) {
      hideTableColumn(i + 1);
    }
  });
}

// function openModal() {
//   $('#myModal').css('display', 'block');
// }

// function closeModal() {
//   $('#myModal').css('display', 'none');
// }

// function editModal() {
//   if (!$('.modal-content').hasClass('editing')) {
//     $('.modal-content').addClass('editing');
//     $('#button-submit').css('display', 'none');
//     $('#close').css('display', 'none');
//     $('#edit').text('Save');
//     $('.modal-content')
//       .find('.edit')
//       .each(function () {
//         if (jQuery(this).is('#mapid')) {
//           const value = jQuery(this).text();
//           jQuery(this).text('');
//           jQuery(this).append(
//             `<textarea class="form-control" rows="3" id="mapEmbedID" name="mapEmbedID" onchange="updateMap();" required>${value}</textarea>`,
//           );
//         } else if (jQuery(this).hasClass('desField')) {
//           const value = jQuery(this).text();
//           jQuery(this).text('');
//           jQuery(this).append(`<textarea class="form-control" rows="6">${value}</textarea>`);
//         } else {
//           const value = jQuery(this).text();
//           jQuery(this).text('');
//           jQuery(this).append(`<input class="textfield" type="text" value="${value}"/>`);
//         }
//       });
//   } else {
//     $('.modal-content').removeClass('editing');
//     $('#edit').text('Edit');
//     $('#button-submit').css('display', 'inline-block');
//     $('#close').css('display', 'inline-block');
//     $('.modal-content')
//       .find('.edit')
//       .each(function () {
//         if (!jQuery(this).is('#mapid') && !jQuery(this).hasClass('desField')) {
//           const value = $(this).find('INPUT').val();
//           $(this).text(value);
//           $(this).find('INPUT').remove();
//         } else {
//           const value = $(this).find('TEXTAREA').val();
//           $(this).text(value);
//           $(this).find('TEXTAREA').remove();
//         }
//       });
//   }
// }

// function updateMap() {
//   let result;
//   result = `${document.getElementById('mapEmbedID').value}`;
//   document.getElementById('Map').src = result;
// }

// function submitModal() {
//   let theForm;
//   let id;
//   let namefield;
//   let city;
//   let address;
//   let phone;
//   let description;
//   let rooms;
//   let mapEmbedID;

//   // Start by creating a <form>
//   theForm = document.createElement('form');
//   theForm.action = '/admin/manageTicket/update';
//   theForm.method = 'post';

//   // Next create the <input>s in the form and give them names and values
//   id = document.createElement('input');
//   id.type = 'hidden';
//   id.name = 'id';
//   id.value = $('.idField').text();
//   namefield = document.createElement('input');
//   namefield.type = 'hidden';
//   namefield.name = 'namefield';
//   namefield.value = $('.nameField').text();
//   city = document.createElement('input');
//   city.type = 'hidden';
//   city.name = 'city';
//   city.value = $('.cityField').text();
//   address = document.createElement('input');
//   address.type = 'hidden';
//   address.name = 'address';
//   address.value = $('.addressField').text();
//   phone = document.createElement('input');
//   phone.type = 'hidden';
//   phone.name = 'phone';
//   phone.value = $('.phoneField').text();
//   description = document.createElement('input');
//   description.type = 'hidden';
//   description.name = 'description';
//   description.value = $('.desField').text();
//   rooms = document.createElement('input');
//   rooms.type = 'hidden';
//   rooms.name = 'rooms';
//   rooms.value = $('.roomField').text();
//   mapEmbedID = document.createElement('input');
//   mapEmbedID.type = 'hidden';
//   mapEmbedID.name = 'mapEmbedID';
//   mapEmbedID.value = $('#mapid').text();
//   mapEmbedID.value = mapEmbedID.value.replace('https://www.google.com/maps/embed?pb=', '');

//   // Now put everything together...
//   theForm.appendChild(id);
//   theForm.appendChild(namefield);
//   theForm.appendChild(city);
//   theForm.appendChild(address);
//   theForm.appendChild(phone);
//   theForm.appendChild(description);
//   theForm.appendChild(rooms);
//   theForm.appendChild(mapEmbedID);

//   // ...and it to the DOM...
//   document.getElementById('hidden_form_container').appendChild(theForm);
//   // ...and submit it
//   theForm.submit();
// }

// ===== Events =====
function eventDisplayCheckboxes() {
  displayCheckboxElements.forEach((e, i) => {
    e.addEventListener('click', () => {
      if (e.checked === true) {
        showTableColumn(i + 1);
      } else {
        hideTableColumn(i + 1);
      }
    });
  });
}

// function eventRowTickets() {
//   ticketRowElements.forEach((row) => {
//     row.addEventListener('click', () => {
//       const _id = row.children[10].innerHTML;
//       fetch(`/api/sessions/${_id}`).then((res) => {
//       });
//     });
//   });
// }

function handleEvents() {
  eventDisplayCheckboxes();
  // eventRowTickets();
}

// ===== Main =====
function main() {
  refreshDisplay();
  handleEvents();
}

main();
