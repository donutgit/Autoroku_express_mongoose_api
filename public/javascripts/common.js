(function() {
  const nominationsTable = document.getElementById("nomination-list");
  nominationsTable
    ? nominationsTable.addEventListener("click", function(event) {
        if (
          event.target.tagName === "BUTTON" &&
          event.target.id === "deleteNomination"
        ) {
          const id = event.target.getAttribute("data-id");
          fetch(`/api/nominations/${id}`, {
            method: "delete"
          })
            .then(function(response) {
              if (response.status !== 200) {
                console.log(
                  "Looks like there was a problem. Status Code: " +
                    response.status
                );
                return;
              } else {
                window.location.href = "/nominations";
              }
            })
            .catch(function(err) {
              console.log("Fetch Error :-S", err);
            });
        } else return;
      })
    : null;
})();
