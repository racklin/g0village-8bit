/*
 mouinfo
 */
window.overworldMouinfoScript = function (vnEngine) {
    var counter = 0;
    var space = function () {
        if (!vnEngine.isWriting() && !vnEngine.isAnimating()) {
            switch (counter) {
                case 0:
                    vnEngine.hideInteraction();

                    vnEngine.setName("文化部 龍印台");
                    vnEngine.setText("嗨! 您好～");
                    vnEngine.setPortrait("assets/mouinfo.png");
                    vnEngine.showDialog();
                    counter = 1;
                    break;

                case 1:
                    vnEngine.setText("想知道 g0v 文化部都在做些什麼嗎？");
                    $.when(vnEngine.animateMessage()).then(function () {
                        $.when(vnEngine.promptQuestion(["想！", "不想耶！"])).then(function (choice) {
                            switch (choice) {
                                case 1:
                                    Crafty.audio.muteMusic('music');
                                    openUrlInBox('https://g0v.hackpad.com/g0v-g0v-mou-info-NX60cqNWwpi', {
                                        onClosed: function() {
                                            Crafty.audio.unmuteMusic('music');
                                        }
                                    });
                                    vnEngine.setText("（微笑以對）");
                                    vnEngine.animateMessage();
                                    break;
                                case 2:
                                    vnEngine.setText("（不聞不問）");
                                    vnEngine.animateMessage();
                                    break;
                            }
                        });
                    });
                    counter=2;
                    break;

                case 2:
                    vnEngine.setText("（微笑以對 x 2）");
                    $.when(vnEngine.animateMessage()).then(function () {
                        //derp
                    });
                    counter = -1;
                    break;
                default:
                    counter = -1;
                    vnEngine.hideDialog();
                    vnEngine.showInteraction();
                    counter++;
                    break;
            }
        } else if (vnEngine.isWriting()) {
            console.log("is writing");
            vnEngine.forceTextFinish();
        }
        console.log(counter);
    }
    var leave = function () {
        if (counter == 3 || counter == 4) counter = 4;
        else counter = 0;
        vnEngine.hideDialog();
        vnEngine.hideInteraction();

    }
    var enter = function () {
        vnEngine.showInteraction();
    }
    return {
        spacebarCallback: space,
        leaveCallback: leave,
        enterCallback: enter
    }
};
