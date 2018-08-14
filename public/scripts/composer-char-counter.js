$(document).ready(function() {
    $("#tweet-textbox").on('keyup', function() {
        var content = $("input[id='tweet-textbox']");
        var charactersInBox = this.value.length;
        var charactersLeft = 140 - charactersInBox;
        var counter = $("textarea").parent(".counter");
        console.log(counter);
    });
});