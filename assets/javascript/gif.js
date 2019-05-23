// initial Sitcom array
var topics = ["The Good Place", "The Goldbergs", "Letterkenny", "Single Parents", "Crazy Ex-Girlfriend"];

function displaySitcom() {
    var sitcom = $(this).attr("data-name");
	console.log("TCL: displaySitcom -> sitcom", sitcom)
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sitcom + "&api_key=xQ1cEV48oeuAx0ibvev8eMOowJYJ5xPL&limit=1";
// how to really get gif from URL in the API without embedding

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
	console.log("TCL: displaySitcom -> response", response)
    var sitcomDiv = $("<div class='sitcom'>");
    for (var i = 0; i < response.data.length; i++) {
    var rating = response.data[i].rating;
    }
    var p = $("<p>").text("Rating: " + rating);
    sitcomDiv.append(p);
    $("#sitcom-view").prepend(sitcomDiv);

    var gif = $("<iframe>").attr("src", response.data[0].embed_url);
    
    sitcomDiv.append(gif);
});
}

function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("sitcom-btn");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#buttons-view").append(a);
    }
}

$("#add-sitcom").on("click", function(event) {
    event.preventDefault();
    var sitcom = $("#sitcom-input").val().trim();
    topics.push(sitcom);
    renderButtons();
});

$(document).on("click", ".sitcom-btn", displaySitcom);
renderButtons();
