let myApi = null;

// Check if their is a meet to embed
$(document).ready(() => {
  if (localStorage.getItem("hasToBeEmbeded") !== null) {
    // Means their is a meet to embed
    const meet = JSON.parse(localStorage.getItem("hasToBeEmbeded"));

    // Remove the meet from localStorage
    localStorage.removeItem("hasToBeEmbeded");

    launchMeet(meet);
  }
});

function launchMeet(meet) {
  const domain = "meet.jit.si";
  const options = {
    roomName: meet.options.roomName,
    width: "100%",
    height: 700,
    parentNode: document.querySelector("#meet"),
  };
  myApi = new JitsiMeetExternalAPI(domain, options);

  setTimeout(() => {
    // set new password for channel -  for the first user
    myApi.on("participantRoleChanged", function (event) {
      if (event.role === "moderator") {
        myApi.executeCommand("password", meet.options.password);
      }
    });
    // join a protected channel - for the gusts
    myApi.on("passwordRequired", function () {
      myApi.executeCommand("password", meet.options.password);
    });
  }, 10);
}

// myApi.participantKicckedOut((res) => {
//   console.log(res);
// });

// myApi.videoConferenceLeft((res) => alert("VIDEO CONFERENCE LEFT", res));

// myApi.videoConferenceJoined((res) => alert("VIDEO CONFERENCE JOINED", res));

// myApi.participantLeft((res) => alert("PARTICIPANT LEFT", res));
