// const api = new JitsiMeetExternalAPI("meet.jit.si", {
//   roomName: "samdz2020",
//   password: "samdz",
//   parentNode: document.querySelector("#embed"),
// });

// setTimeout(() => {
//   // set new password for channel -  for the first user
//   api.on("participantRoleChanged", function (event) {
//     if (event.role === "moderator") {
//       api.executeCommand("password", "samdz");
//     }
//   });
//   // join a protected channel - for the gusts
//   api.on("passwordRequired", function () {
//     api.executeCommand("password", "samdz");
//   });
// }, 10);

// $("#embed").after(
//   `<iframe
//     style="margin-top: 20px; border: none; width: 100%; height: 100vh;"
//     class="embed-responsive-item" src=https://meet.jit.si/samdz2020 allowfullscreen>
//   </iframe>`
// );
