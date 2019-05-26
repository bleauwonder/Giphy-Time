
// initial Sitcom array
var topics = ["The Good Place", "The Goldbergs", "Letterkenny", "How I Met Your Mother", "I Love Lucy"];

function displaySitcom() {
    var sitcom = $(this).attr("data-name");
	console.log("TCL: displaySitcom -> sitcom", sitcom)
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sitcom + "&api_key=xQ1cEV48oeuAx0ibvev8eMOowJYJ5xPL&limit=10";
   
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log("TCL: displaySitcom -> response", response)
        
        for (var i = 0; i < response.data.length; i++) {
        var rating = "Rating: " + (response.data[i].rating).toUpperCase();
        var active = response.data[i].images.fixed_width.url;
        var still = response.data[i].images.fixed_width_still.url;
        
        var gifImage = $("<img>");
        var ratingDiv = $("<div id='ratingDiv'>" + rating + "</div>");

        gifImage.attr({"active": active, "still": still, "src": still, "state": "still"});

        var ratingAndImage = $("<div id='ratingAndImage'>");

        $(ratingAndImage).prepend(ratingDiv, gifImage);
        $("#sitcom-view").prepend(ratingAndImage);

        $(gifImage).on("click", function(event) {
            var state = $(this).attr("state");
            // var source = $(this).attr("src");
            if (state === "still") {
                $(this).attr("src", $(this).attr("active"));
                $(this).attr("state", "active"); 
            }
            else {
                $(this).attr("src", $(this).attr("still"));
                $(this).attr("state", "still");
            }
        });

        }
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
    $("#sitcom-input").val('');
    topics.push(sitcom);
    renderButtons();
});


$(document).on("click", ".sitcom-btn", displaySitcom);
renderButtons();

