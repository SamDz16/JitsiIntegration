class util {
  static getMeets() {
    if (localStorage.getItem("meets") === null) return [];

    return JSON.parse(localStorage.getItem("meets"));
  }
}

const meets = util.getMeets();
let html = meets
  .map((meet) => {
    return `
  <div class="card text-white bg-info mb-3" style="max-width: 20rem;" wfd-id="83">
    <div class="card-header">Room name: <strong>${meet.options.roomName}</strong></div>
    <div class="card-body">
      <h5 class="card-title">Click to join</h5>
    </div>
  </div>
  `;
  })
  .join("");

$("#meet-list").html(html);
