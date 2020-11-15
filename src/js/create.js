//Meet class
class Meet {
  constructor(domain, options) {
    this.domain = domain;
    this.options = options;
  }

  jitsi() {
    // console.log(this.domain, this.options);
    const api = new JitsiMeetExternalAPI(this.domain, this.options);
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
}

// Handle submition
const roomName = $("#roomName");
const password = $("#password");
const submitBtn = $("button[type='submit']");
const form = $(".container form");

form.submit((e) => {
  // prevent default form submission behaviour
  e.preventDefault();

  // Instanciate a new meet
  const meet = new Meet($("#domain").val(), {
    room: roomName.val(),
    roomName: roomName.val() + util.hashCode(roomName.val()),
    password: password.val(),
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

  // Clear out the fields
  roomName.val("");
  password.val("");
});
