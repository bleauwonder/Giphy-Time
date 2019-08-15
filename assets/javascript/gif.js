$( document ).ready(function() {
// Kimmy header gif hover
$(function() {
    $("#gif-hover").hide();
    $("#hover").on("mouseover", function()
    {
        $("#hover").hide();
        $("#gif-hover").show();
        $("#pic-hover").hide();
    });

    $("#gif-hover").on("mouseout", function() {
        $("#hover").show();
        $("#gif-hover").hide();
        $("#pic-hover").show();
    });
});

// initial Sitcom array
var topics = ["The Good Place", "The Goldbergs", "Letterkenny", "How I Met Your Mother", "I Love Lucy"];

function displaySitcom() {
    var sitcom = $(this).attr("data-name");
	console.log(sitcom)
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sitcom + "&api_key=xQ1cEV48oeuAx0ibvev8eMOowJYJ5xPL&limit=10";
   
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response)
        var gifInfo = $("<div id='abc'>");
        for (var i = 0; i < response.data.length; i++) {
        var rating = "Rating: " + (response.data[i].rating).toUpperCase();
        var active = response.data[i].images.fixed_width.url;
        var still = response.data[i].images.fixed_width_still.url;
        
        var gifImage = $("<img>");
        var ratingDiv = $("<div id='ratingDiv'>" + rating + "</div>");

        gifImage.attr({"active": active, "still": still, "src": still, "state": "still"});

        var ratingAndImage = $("<div id='ratingAndImage'>");

        $(ratingAndImage).prepend(ratingDiv, gifImage);
        $(gifInfo).prepend(ratingAndImage);
        
        $(gifImage).on("click", function(event) {
            var state = $(this).attr("state");
           
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
        $(".gif-info-container").prepend(gifInfo);
    
    });
}

function displayInfo() {
    var info = $(this).attr("data-info");
    console.log(info);

    var infoURL = "https://www.omdbapi.com/?t=" + info + "&apikey=3eee97fa";

    $.ajax({
        url: infoURL,
        method: "GET"
    }).then(function(about) {
        console.log(about);

        var infoDiv = $("<div class='about'>");
        var release = about.Released;
        var pOne = $("<p mb-0>").text("Released: " + release);
        infoDiv.append(pOne);

        var writer = about.Writer;
        var pTwo = $("<p>'").text("Writer: " + writer);
        infoDiv.append(pTwo);

        var actors = about.Actors;
        var pThree = $("<p>").text("Actors: " + actors);
        infoDiv.append(pThree);

        var plot = about.Plot;
        var pFour = $("<p>").text("Plot: " + plot);
        infoDiv.append(pFour);

        $(".gif-info-container").prepend(infoDiv);
    });
}
  

   

function makeGifButton() {
    $("#buttons-view").empty();
    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("sitcom-btn");
        a.attr("data-name", topics[i]);
        a.attr("data-info", topics[i]);
        a.text(topics[i]);
        $("#buttons-view").append(a);
    }
}

$("#add-sitcom").on("click", function(event) {
    event.preventDefault();
    var sitcom = $("#sitcom-input").val().trim();
    $("#sitcom-input").val('');
    topics.push(sitcom);
    makeGifButton();
});

$(document).on("click", ".sitcom-btn", displaySitcom);
$(document).on("click", ".sitcom-btn", displayInfo);
makeGifButton();

});
