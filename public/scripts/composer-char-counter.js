$(document).ready(function() {
    $("#tweet-textbox").on('keyup', function() {
        var content = $("input[id='tweet-textbox']");
        var charactersInBox = this.value.length;
        var charactersLeft = 140 - charactersInBox;
        var counter = $( "#tweet-textbox" ).siblings( ".counter" );
        counter.text(charactersLeft);
        if (charactersLeft < 0) {
            $(counter).css({'color': 'red'});
        }
    });
});