"use strict";function removeUserFromDatabase(e){var t=e.firstElementChild.innerHTML;try{fetch("/api/users/".concat(t),{method:"DELETE"}).then(function(t){t.json().then(function(t){t.message?alert(t.message):(e.classList.add("fall"),e.ontransitionend=function(t){return e.remove()})})})}catch(e){return!1}}function removeUser(e){var t=e.target,s=t.parentElement;"trash-btn"===t.classList[0]?confirm("Bạn có chắc chắn xóa user này không?")&&removeUserFromDatabase(s):"edit-btn"===t.classList[0]?s.classList.toggle("completed"):"complete-btn"===t.classList[0]&&s.classList.toggle("completed")}