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
    roomName: roomName.val(),
    perentNode: "document.querySelector('#meet')",
  });

  // Verify if the room doesn't exist in the local storage
  const exists = util.verifyMeet(meet);

  // Save in localStorage
  if (!exists) {
    let meets = util.getMeets();
    meets.push(meet);
    localStorage.setItem("meets", JSON.stringify(meets));
  } else {
    // Pop up an alert to the user
    $(".jumbotron").after(
      $(
        "<div class='alert alert-danger'><strong>Alert! </strong>This meeting already exists</div>"
      )
        .delay(2000)
        .fadeOut(3000)
    );
  }

  // Clear out the fields
  roomName.val("");
  password.val("");
});
