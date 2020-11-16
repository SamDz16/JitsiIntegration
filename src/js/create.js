//Meet class
class Meet {
  constructor(domain, options) {
    this.domain = domain;
    this.options = options;
  }
}

// Utility class
class util {
  static verifyMeet(meet) {
    const meets = this.getMeets();
    let result = false;
    meets.forEach(({ options }) => {
      const { roomName } = options;
      if (roomName === meet.options.roomName) {
        result = true;
      }
    });

    return result;
  }

  static getMeets() {
    if (localStorage.getItem("meets") === null) return [];

    return JSON.parse(localStorage.getItem("meets"));
  }

  static hashCode(str) {
    var hash = 0,
      i,
      chr;
    for (i = 0; i < str.length; i++) {
      chr = str.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }

  static targetedMeet(roomName) {
    return this.getMeets().filter(
      (meet) => meet.options.roomName === roomName
    )[0];
  }

  static constructUrl(target) {
    const href = location.href.split("/");
    href[1] = "//";
    href[href.length - 1] = `/${target}`;

    return href.join("");
  }
}

// Handle submition
const roomName = $("#roomName");
const password = $("#password");
const submitBtn = $("button[type='submit']");
const form = $(".container form");

// Now meet is accessible everywhere in this documnet
let meet = null;

form.submit((e) => {
  // prevent default form submission behaviour
  e.preventDefault();

  const createdAt = new Date();

  // Instanciate a new meet
  meet = new Meet($("#domain").val(), {
    room: roomName.val(),
    roomName: roomName.val() + util.hashCode(roomName.val()),
    password: password.val(),
    createdAt: `${createdAt.toLocaleDateString()} - ${createdAt.toLocaleTimeString()}`,
  });

  // Verify if the room doesn't exist in the local storage
  const exists = util.verifyMeet(meet);

  // Save in localStorage
  if (!exists) {
    let meets = util.getMeets();
    meets.push(meet);
    localStorage.setItem("meets", JSON.stringify(meets));

    // Pop up a success alert to the user
    $(".jumbotron").after(
      $(
        "<div style='width: 80%; margin: 20px auto;' class='alert alert-success'><strong>Alert! </strong>This meeting was added successfully</div>"
      )
        .delay(2000)
        .fadeOut(3000)
    );

    // Clear out the fields
    roomName.val("");
    password.val("");

    //Pop up the suggestion
    $("form + div").slideDown("slow");
  } else {
    // Pop up an alert to the user
    $(".jumbotron").after(
      $(
        "<div style='width: 80%; margin: 20px auto;' class='alert alert-danger'><strong>Alert! </strong>This meeting already exists</div>"
      )
        .delay(2000)
        .fadeOut(3000)
    );
  }
});

// To do if their is a meet to modify
$(document).ready(() => {
  if (localStorage.getItem("hasToBeModified") !== null) {
    // Means that their is a meet to be modified

    // Retreive the meet
    const meet = JSON.parse(localStorage.getItem("hasToBeModified"));

    // Fill in the fields with the old values
    roomName.val(meet.options.room);
    password.val(meet.options.password);

    // Remove the meet from localStorage
    localStorage.removeItem("hasToBeModified");
  }
});

// Handling the suggestion
function yes() {
  // Popping off the suggestion
  $("form + div").slideUp("slow");

  // Save the meet to the local storage
  localStorage.setItem("hasToBeEmbeded", JSON.stringify(meet));

  // Construct the url to the index.html
  location.href = util.constructUrl("index.html");
}

function no() {
  // Popping off the suggestion
  $("form + div").slideUp("slow");
}
