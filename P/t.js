// ==UserScript==
// @name         Game of Thrones Spoiler Blocker.
// @namespace    None
// @version      0.1
// @description  try to take over the world!
// @author       You
// @include      *
// @grant        none
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// ==/UserScript==

//Adds a .contains() function for strings.
String.prototype.contains = function(n){var t=this.indexOf(n);return-1===t?!1:!0;};

//List of keywords which determine if the page contains potential spoilers.
var filter = ["game of thrones", "snow", "arya", "winterfell", "cersei", "jaime", "bronn", "dany",
              "daenerys", "tarag", "tyrion", "iron throne", "stark", "king of the north",
              "north king", "dragonglass", "whitewalker", "wight", "nightking", "night king", "got spoilers", "dragon", "drogon",
              "dies", "maester", "azhor", "ahai", "stark", "heads of the dragon", "heads of dragon", "head of the dragon", "head of dragon",
              "leaked script", "script leak", "rhaegar", "rhaegal", "varys", "prince who was promised"];

var found = false;

//Stores the function that checks if the page contains the keywords. Used for later reference.
var check =
    function () {
        //Stores the content of the head and body in the document.
        var head = $("head").html();
        var body = $("body").html();


        $.each(filter, function(index, item) {
            if ((head + body).toString().toLowerCase().contains(item.toLowerCase()))  {
                window.clearInterval(interval);
                console.log("[Spoiler Blocker] Found: " + item);
                found = true;
                return false;
            }
        });

        if (found) {
            $("body").hide();
            var originalTitle = $(document).prop("title");
            $(document).prop("title", "Spoilers Blocked.");

            window.setTimeout(function() {
                if (confirm("This page may have Game of Thrones spoilers. Are you sure you'd like to continue?")) {
                    $(document).prop("title", originalTitle);
                    $("body").show();
                    return;
                }
            }, 1);
        }
    };

//Re-checks the page content every 2 seconds to re-check the content, as it may have changed since it was last checked.
var interval = window.setInterval(check, 2000);

//Calls the keyword checking method so that initally it doesn
check();