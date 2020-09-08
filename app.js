const formview = document.querySelector("#form");
const submitButton = document.querySelector(".composemodal__widgets--btn");
const inputTitle = document.querySelector(".composemodal__titleview--input");
const inputTextarea = document.querySelector(
  ".composemodal__textview--textarea"
);
const messageText = document.querySelector(".composemodal__textheader");
const closeModal = document.querySelector("#closeModal");
const composeModal = document.querySelector(".composemodal");
const composeButton = document.querySelector(".wxcomposebtn");
const list_view = document.querySelector(".wxcontainer__listview");

if ("localStorage" == undefined) {
  console.log("Local Storage not supported ");
}

//function to store data in modal
/**
 * key 1 = value { title, content, time }
 *
 */

//create unique ID
function create_uniqueId() {
  var idA = Math.floor(Math.random() * 100);
  var r = Math.random().toString(36).substring(7);
  var idB = Math.floor(Math.random() * 1000);
  var output = idA + r + idB;
  return output;
}

//disable default submit form
formview.addEventListener("submit", (e) => {
  e.preventDefault();
});

/** function to validate and store form details */
function storeData() {
  if (inputTitle.value === null || inputTitle.value === "") {
    messageText.innerText = "*Title field is required";
    inputTitle.focus();
  } else {
    var text_title = inputTitle.value;
    var text_content = inputTextarea.value;
    var today = new Date();

    let context = {
      title: text_title,
      content: text_content,
      date: today,
    };

    let newID = create_uniqueId();

    //push data to local storage
    localStorage.setItem(newID, JSON.stringify(context));
  }
}

submitButton.addEventListener("click", () => {
  storeData();
  render_layout();
  closeDialog();
});

//function to close Modal
function closeDialog() {
  composeModal.style.display = "none";
  inputTitle.value = null;
  inputTextarea.value = null;
  messageText.innerText = null;
}

closeModal.addEventListener("click", () => {
  closeDialog();
});

//function to open modal
composeButton.addEventListener("click", () => {
  composeModal.style.display = "block";
});

//render card data from local Storage

function render_layout() {
  for (var i = 0; i < window.localStorage.length; i++) {
    var key = window.localStorage.key(i);
    var data = JSON.parse(localStorage.getItem(key));
    if (data !== null) {
      var render_text = `
          <div data-itemID="${key}" class="wxcard">
            <div class="wxcard__title">
                <h3 class="wxcard__title--text">${data.title}</h3>
            </div>
            <div class="wxcard__textview">
                <p class="wxcard__textview--text">
                    ${data.content}
                </p>
            </div>
            <div class="wxcard__footerview">
              <p class="wxcard__footerview--smtext">${moment(data.date).format(
                "MMM Do YY"
              )}</p>
                <div title="Delete" onclick="removeItem('${key.trim()}')"  class="wxcard__iconview">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path
                            d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                    </svg>
              </div>
            </div>
          </div>
        `;
    }

    //render to DOM
    list_view.insertAdjacentHTML("beforeend", render_text);
  }
}

window.addEventListener("load", () => {
  render_layout();
});

//function to remove item from localStorage
function removeItem(value) {
  localStorage.removeItem(value);
  render_layout();
}
