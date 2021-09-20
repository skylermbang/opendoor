function getSelf(callback) {
  $.ajax({
    type: "GET",
    url: "user/me",
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    success: function (response) {
      callback(response.user);
    },
    error: function (xhr, status, error) {
      if (status == 401) {
        alert("로그인이 필요합니다.");
      } else {
        localStorage.clear();
        alert("fuck off ");
      }
      window.location.href = "/";
    },
  });
}

function signOut() {
  localStorage.clear();
  window.location.href = "/";
}
