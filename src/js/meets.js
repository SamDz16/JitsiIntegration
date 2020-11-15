//Utility class
class util {
  static getMeets() {
    if (localStorage.getItem("meets") === null) return [];

    return JSON.parse(localStorage.getItem("meets"));
  }

  static constructUrl(target) {
    const href = location.href.split("/");
    href[1] = "//";
    href[href.length - 1] = `/${target}`;

    return href.join("");
  }
}

// Listing out all the meets
const meets = util.getMeets();
let html = meets
  .map((meet) => {
    return `
  <div class="card text-white bg-info mb-3" style="max-width: 20rem;" wfd-id="83">
    <div class="card-header text-center"><h5 class="card-title">Click to join</h5></div>
    <div class="card-body">
      Room Name: <strong>${meet.options.room}</strong> <br />
      Real Room Name: <strong>${meet.options.roomName}</strong> <br />
      Password: <strong>${meet.options.password}</strong>
    </div>
  </div>
  `;
  })
  .join("");
$("#meet-list").html(html);

// Adding the click event for meetings
$(".card").click(function () {
  // Retrieve the roomName
  const targetCard = this;
  const roomName = targetCard.children[1].children[2].textContent.trim();

  // Get all the meets
  const meets = util.getMeets();

  // Retrive the targeted meet base on the roomName
  const targetMeet = meets.filter(
    (meet) => meet.options.roomName === roomName
  )[0];

  // Save the targeted meet to the local storage
  localStorage.setItem("targetedMeet", JSON.stringify(targetMeet));

  // Construct the url to the home
  location.href = util.constructUrl("index.html");
});
