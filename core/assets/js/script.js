TimeMe.initialize({
  currentPageName: "home-page", // current page
  idleTimeoutInSeconds: 30,
  //websocketOptions: { // optional
  //	websocketHost: "ws://your_host:your_port",
  //	appId: "insert-your-made-up-app-id"
  //}
});

// TimeMe.callAfterTimeElapsedInSeconds(4, function () {
//   console.log(
//     "The user has been using the page for 4 seconds! Let's prompt them with something."
//   );
// });

window.onload = function () {
  TimeMe.trackTimeOnElement("area-of-interest-1");

  setInterval(function () {
    let timeSpentOnPage = TimeMe.getTimeOnCurrentPageInSeconds();
    document.getElementById(
      "timeInSeconds"
    ).textContent = timeSpentOnPage.toFixed(2);

    if (TimeMe.isUserCurrentlyOnPage && TimeMe.isUserCurrentlyIdle === false) {
      document.getElementById("activityStatus").textContent =
        "You are actively using this page.";
    } else {
      document.getElementById("activityStatus").textContent =
        "You have left the page.";
    }

    let timeSpentOnElement = TimeMe.getTimeOnElementInSeconds(
      "area-of-interest-1"
    );
    document.getElementById(
      "area-of-interest-time-1"
    ).textContent = timeSpentOnElement.toFixed(2);
  }, 37);
};

function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie != "") {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = jQuery.trim(cookies[i]);
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) == name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

window.onbeforeunload = function (event) {
  xmlhttp = new XMLHttpRequest();
  xmlhttp.open("POST", "/set-behaviour/", true);
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  let data = JSON.stringify({
    time_spent: TimeMe.getTimeOnCurrentPageInSeconds(),
    button_spent: TimeMe.getTimeOnElementInSeconds(
      "area-of-interest-1"
    ).toFixed(2),
    title: document.getElementById("area-of-interest-1").getAttribute("title"),
  });

  xmlhttp.send(data);
};
