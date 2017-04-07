casper.options.viewportSize = {width: 1024, height: 768};
var testCount = 1;
casper.test.begin("Testing upvote login", testCount, function upvoteLogin(test) {
    casper.start("http://www.reddit.com/r/programming", function() {
    	var modalOpensAndCloses = casper.evaluate(function(){
            console.log("Now I'm in the DOM!");
            $(".arrow.up:first").click()
            var modalVisibleAfterClick = $(".modal-content").is(":visible");
            $(".c-close").click()
            var modalClosedAfterClickOff = $(".modal-content").is(":visible");
            return (modalVisibleAfterClick && !modalClosedAfterClickOff);
        });
        test.assert(modalOpensAndCloses, "Login Modal is displayed when clicking upvote before signing in");
    }).run(function() {
        test.done();
    });
});
