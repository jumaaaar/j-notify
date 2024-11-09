
// Position mapping
const POSITIONS = {
  "top-right": { class: "top-0 end-0", anim: "Right" },
  "top-center": { class: "top-0 start-50 translate-middle-x", anim: "Down" },
  "top-left": { class: "top-0 start-0", anim: "Left" },
  "middle-right": { class: "top-50 end-0 translate-middle-y", anim: "Right" },
  "middle-left": { class: "top-50 start-0 translate-middle-y", anim: "Left" },
  "bottom-right": { class: "bottom-0 end-0", anim: "Right" },
  "bottom-center": { class: "bottom-0 start-50 translate-middle-x", anim: "Up" },
  "bottom-left": { class: "bottom-0 start-0", anim: "Left" },
};

const NOTIFICATION_TYPES = {
  success: {
    icon: "fa-solid fa-circle-check",
    color: "#00ff00", // Green color for success
    background: "url('background.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  info: {
    icon: "fa-solid fa-circle-info",
    color: "#1E90FF", // Dodger blue for info
    background: "url('background.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  error: {
    icon: "fa-solid fa-circle-exclamation",
    color: "#ff0000", // Red color for error
    background: "url('background.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  warning: {
    icon: "fa-solid fa-triangle-exclamation",
    color: "#ffcc00", // Yellow color for warning
    background: "url('background.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  announcement: {
    icon: "fa-solid fa-bullhorn",
    color: "#f0990d", // Gold color for announcement
    background: "url('background.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
};


function createNotification(type, title, message, time, position) {
  const { icon, color, background } = NOTIFICATION_TYPES[type];
  const { class: positionClass, anim } = POSITIONS[position];
  const id = Math.floor(Math.random() * 1000 + 1);

  const notification = `
    <div class="animate__animated animate__fadeIn${anim}" id="anim-class-${id}">
      <div class="notify-${id} pt-1 mx-1 my-1">
        <div class="toast show" style="background: ${background}; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="toast-body" style="border: transparent; font-size: 15px; text-shadow: rgba(255, 255, 255, 0.5) 1px 0 5px; color: #fff; display: flex; align-items: center; padding: 10px;">
            <i class="${icon}" style="color: white; margin-right: 12px; font-size: 35px; border-radius: 50%; padding: 10px; background-color: rgba(255, 255, 255, 0.2);"></i>
            <div class="d-flex flex-column" style="margin-left: 10px;">
              <strong style="font-size: 18px; color: ${color}; margin-bottom: 5px;">${title}</strong>
              <span style="font-size: 14px; color: #fff; max-width: 300px; overflow-wrap: break-word;">${message}</span>
            </div>
          </div>
        </div>
      </div>
    </div>`;

  $("#notify").append(notification);
  $("#containerclass").addClass(positionClass);

  setTimeout(() => {
    $(`#anim-class-${id}`).removeClass(`animate__fadeIn${anim}`).addClass(`animate__fadeOut${anim}`);
    $(`.notify-${id}`).fadeOut("slow");
  }, time);
}



// Function to open settings
function openSetting(position) {
  updatePositionText(position);
  $("#containerclass").removeClass(POSITIONS[position].class);
  $(".container").css("display", "block");
  $("body").css({ "background-color": "rgba(0, 0, 0, 0.514)" });
}

// Function to update position text
function updatePositionText(position) {
  $("#position-text").replaceWith(`
    <h3 class="text-center px-2 py-2" id="position-text" style="text-transform: uppercase; border:1px solid white; color: #00f4f4cb; text-shadow: rgb(185, 185, 185) 1px 0px 15px; background-color: rgba(19, 204, 255, 0.336);">
      ${position}
    </h3>
  `);
}

// Function to close settings
function closeSettings() {
  $(".container").css("display", "none");
  $("body").css({ "background-color": "transparent" });
  sendNUI("close");
}

// Function to send NUI messages
function sendNUI(event, data, cb = () => {}) {
  fetch(`https://${GetParentResourceName()}/${event}`, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify(data),
  })
    .then((resp) => resp.json())
    .then(cb);
}

// Event listener for messages
window.addEventListener("message", (event) => {
  const { action, type, title, message, time, position } = event.data;

  if (action === "open") {
    createNotification(type, title, message, time, position);
  } else if (action === "opensetting") {
    openSetting(position);
  }
});

// Event listeners for position buttons
Object.keys(POSITIONS).forEach(position => {
  $(`#${position}`).on("click", () => {
    updatePositionText(position);
    sendNUI("notify-position", position);
  });
});

// Event listener for closing settings
$(document).on("keydown", (event) => {
  if ([27, 36, 8].includes(event.keyCode)) {
    closeSettings();
  }
});

$("#quit").click(closeSettings);