// -- SignIn - Modal initial --
let loginW = null;
let registerW = null;
let activateW = null;
let forgotW = null;
let resetW = null;

const modal = document.getElementById('modal');
const parser = new DOMParser();
let redirectURL = '';
let forceLogin = false;

// Spinner
const spinnerModal = document.getElementsByClassName('spinner-modal')[0];

function enableSpinner() {
  spinnerModal.style.display = 'block';
}

function disableSpinner() {
  spinnerModal.style.display = 'none';
}

function popdownModal() {
  enableSpinner();
  fetch('/isLogin').then((res) => {
    res.text().then((val) => {
      if (forceLogin && val === 'true') {
        window.location.reload();
      } else if (forceLogin) {
        window.location = '/';
      }
    });
  });
  modal.style.display = 'none';
  disableSpinner();
}
function popupModal() {
  modal.style.display = 'block';
  CaptchaCallback();
}
function popupLogin() {
  popupModal();
  $('#modal a[href="#nav-sign-in"]').tab('show');
}
function popupRegister() {
  popupModal();
  $('#modal a[href="#nav-sign-up"]').tab('show');
}
function popupForgot() {
  document.querySelector('#nav-forgot-tab').style.display = 'block';
  popupModal();
  $('#modal a[href="#nav-forgot"]').tab('show');
}

function renderUsernameToggle() {
  fetch('/render/header').then((partial) => {
    partial.text().then((html) => {
      const headerData = parser.parseFromString(html, 'text/html');
      const header = document.querySelector('#usernameToggle');
      header.innerHTML = headerData.querySelector('#usernameToggle').innerHTML;
    });
  });
}

function login(event) {
  enableSpinner();
  event.preventDefault();
  $('#loginBtn').attr('disabled', 'disabled');
  fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'email': document.querySelector('#emailLogin').value,
      'password': document.querySelector('#passwordLogin').value,
      'g-recaptcha-response': grecaptcha.getResponse(loginW),
    }),
  })
    .then((res) => {
      res.json().then((data) => {
        if (data.message) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            html: data.message,
          });
        } else {
          if (redirectURL.length > 0) {
            window.location = redirectURL;
            redirectURL = '';
          }
          renderUsernameToggle();
          popdownModal();
        }
      });
    })
    .finally(() => {
      grecaptcha.reset(loginW);
      $('#loginBtn').removeAttr('disabled');
      disableSpinner();
    });
}

function showVerify() {
  document.querySelector('#nav-verify-tab').style.display = 'block';
  $('#modal a[href="#nav-verify"]').tab('show');
}

function register(event) {
  enableSpinner();
  event.preventDefault();
  $('#registerBtn').attr('disabled', 'disabled');
  fetch('/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'name': document.querySelector('#name').value,
      'email': document.querySelector('#regEmail').value,
      'password': document.querySelector('#regPassword').value,
      'password2': document.querySelector('#regPassword2').value,
      'phone': document.querySelector('#regPhone').value,
      'DoB': document.querySelector('#regBirthday').value,
      'sex': document.querySelector('#regGender').value,
      'address': document.querySelector('#regAddress').value,
      'city': document.querySelector('#regCity').value,
      'town': document.querySelector('#regTown').value,
      'g-recaptcha-response': grecaptcha.getResponse(registerW),
    }),
  })
    .then((res) => {
      res.json().then((data) => {
        if (data.success_msg) {
          Swal.fire({
            icon: 'info',
            title: 'Thông báo',
            html: data.success_msg,
          });
          showVerify();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            html: data.message,
          });
        }
      });
    })
    .finally(() => {
      grecaptcha.reset(registerW);
      $('#registerBtn').removeAttr('disabled');
      disableSpinner();
    });
}

function logout(event) {
  enableSpinner();
  event.preventDefault();
  fetch('/logout')
    .then((res) => {
      res.json().then((data) => {
        renderUsernameToggle();
        fetch(`${data.curTab}/checkAuth`).then((partial) => {
          partial.text().then((text) => {
            if (text === 'notAuth') {
              popupModal();
              forceLogin = true;
            }
          });
        });
      });
    })
    .finally(() => {
      disableSpinner();
    });
}

function showForgot(event) {
  event.preventDefault();
  document.querySelector('#nav-forgot-tab').style.display = 'block';
  $('#modal a[href="#nav-forgot"]').tab('show');
}

function showReset() {
  document.querySelector('#nav-reset-tab').style.display = 'block';
  $('#modal a[href="#nav-reset"]').tab('show');
}

function hideUnused() {
  document.querySelector('#nav-verify-tab').style.display = 'none';
  document.querySelector('#nav-forgot-tab').style.display = 'none';
  document.querySelector('#nav-reset-tab').style.display = 'none';
}

function forgot(event) {
  enableSpinner();
  event.preventDefault();
  $('#forgotBtn').attr('disabled', 'disabled');
  fetch('/forgot', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'email': document.querySelector('#forgotEmail').value,
      'g-recaptcha-response': grecaptcha.getResponse(forgotW),
    }),
  })
    .then((res) => {
      res.json().then((data) => {
        if (data.success_msg) {
          Swal.fire({
            icon: 'info',
            title: '',
            html: data.success_msg,
          });
          showReset();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            html: data.message,
          });
        }
      });
    })
    .finally(() => {
      grecaptcha.reset(forgotW);
      $('#forgotBtn').removeAttr('disabled');
      disableSpinner();
    });
}

function resetPasswordForm(event) {
  enableSpinner();
  event.preventDefault();
  $('#resetBtn').attr('disabled', 'disabled');
  const token = document.querySelector('#resetToken').value;
  fetch(`/forgot/${token}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'g-recaptcha-response': grecaptcha.getResponse(resetW),
    }),
  })
    .then((res) => {
      res.json().then((data) => {
        if (data.message) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            html: data.message,
          });
          grecaptcha.reset(resetW);
          $('#resetBtn').removeAttr('disabled');
        } else {
          fetch(`/reset/${data.id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              'password': document.querySelector('#resetPassword').value,
              'password2': document.querySelector('#resetPassword2').value,
            }),
          }).then((res2) => {
            res2.json().then((data2) => {
              if (data2.success_msg) {
                Swal.fire({
                  icon: 'success',
                  title: 'Thành công',
                  html: data2.success_msg,
                });
                $('#modal a[href="#nav-sign-in"]').tab('show');
                hideUnused();
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  html: data2.message,
                });
              }
            });
          });
        }
      });
    })
    .finally(() => {
      grecaptcha.reset(resetW);
      $('#resetBtn').removeAttr('disabled');
      disableSpinner();
    });
}

function verify(event) {
  enableSpinner();
  event.preventDefault();
  $('#activateBtn').attr('disabled', 'disabled');
  const token = document.querySelector('#verifyToken').value;
  fetch(`/activate/${token}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'g-recaptcha-response': grecaptcha.getResponse(activateW),
    }),
  })
    .then((res) => {
      res.json().then((data) => {
        if (data.message) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            html: data.message,
          });
        } else {
          Swal.fire({
            icon: 'info',
            title: '',
            html: data.success_msg,
          });
          $('#modal a[href="#nav-sign-in"]').tab('show');
          hideUnused();
        }
      });
    })
    .finally(() => {
      grecaptcha.reset(activateW);
      $('#activateBtn').removeAttr('disabled');
      disableSpinner();
    });
}

function forceLoginAndRedirect(url) {
  redirectURL = url;
  fetch('/isLogin').then((res) => {
    res.text().then((val) => {
      if (val === 'false') {
        popupModal();
      } else {
        enableSpinner();
        window.location = url;
        disableSpinner();
      }
    });
  });
}

// --- Client side provinces Handler --
function districtLoad() {
  const provincesHTML = document.getElementById('regCity');
  const districtHTML = document.getElementById('regTown');

  districtHTML.innerHTML = '';

  arr[provincesHTML.value].forEach((district, index) => {
    const pID = index;
    const pName = district;

    const innerDistrict = `<option value="${pID}">${pName}</option>`;

    // const provinceElement = document.createElement(innerProvince);
    districtHTML.insertAdjacentHTML('beforeend', innerDistrict);
  });

  districtHTML.disabled = false;
}

function districtLoadProfile() {
  const provincesHTML = document.getElementById('mem-info-province');
  const districtHTML = document.getElementById('mem-info-district');

  const currentUserDistrict = document.querySelector('#mem-info-district option:first-child').value;
  districtHTML.innerHTML = '';

  arr[provincesHTML.value].forEach((district, index) => {
    const pID = index;
    const pName = district;

    const innerDistrict = `<option value="${pID}">${pName}</option>`;

    // const provinceElement = document.createElement(innerProvince);
    districtHTML.insertAdjacentHTML('beforeend', innerDistrict);
  });

  const selectUserCurrent = document.querySelector(
    `#mem-info-district option[value="${currentUserDistrict}"]`,
  );
  if (selectUserCurrent) {
    selectUserCurrent.selected = true;
  }
  districtHTML.disabled = false;
}

function provincesDisplay() {
  const provincesHTML = document.getElementById('regCity');
  const districtHTML = document.getElementById('regTown');

  const provincesProfileHTML = document.getElementById('mem-info-province');
  const districtProfileHTML = document.getElementById('mem-info-district');

  fetch('/isLogin')
    .then((islogRes) => islogRes.json())
    .then((islogin) => {
      if (!islogin) {
        if (provincesHTML) {
          districtHTML.disabled = true;

          c.forEach((provin, ID) => {
            const pID = ID;
            const pName = provin;

            const innerProvince = `<option value="${pID}">${pName}</option>`;

            // const provinceElement = document.createElement(innerProvince);
            provincesHTML.insertAdjacentHTML('beforeend', innerProvince);
          });
        }
      }
    });

  if (provincesProfileHTML) {
    districtProfileHTML.disabled = false;

    c.forEach((provin, ID) => {
      if (`${ID}` === document.querySelector('#mem-info-province option:first-child').value) {
        document.querySelector('#mem-info-province option:first-child').label = provin;

        districtLoadProfile();

        return;
      }
      const pID = ID;
      const pName = provin;

      const innerProvince = `<option value="${pID}">${pName}</option>`;

      // const provinceElement = document.createElement(innerProvince);
      provincesProfileHTML.insertAdjacentHTML('beforeend', innerProvince);
    });
  }
}

function CaptchaCallback() {
  const siteKey = '6LcxngkaAAAAAO-aKP2yGehcIFJ8bIXHiJ6awbZB';

  loginW = grecaptcha.render('loginCaptcha', {
    'sitekey': siteKey,
  });
  registerW = grecaptcha.render('registerCaptcha', {
    'sitekey': siteKey,
  });
  activateW = grecaptcha.render('activateCaptcha', {
    'sitekey': siteKey,
  });
  forgotW = grecaptcha.render('forgotCaptcha', {
    'sitekey': siteKey,
  });
  resetW = grecaptcha.render('resetCaptcha', {
    'sitekey': siteKey,
  });
}

$(document).ready(() => {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $('#back-to-top').addClass('show');
    } else {
      $('#back-to-top').removeClass('show');
    }
  });
  $('#back-to-top').click(() => {
    $('body,html').animate(
      {
        scrollTop: 0,
      },
      400,
    );
    return false;
  });
});
