window.addEventListener("load", function() {
  var intervalId = setInterval(function() {
    if (ga) {
      ga("set", "anonymizeIp", true);
      clearInterval(intervalId);
    }
  }, 100);
});
