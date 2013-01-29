(function () {
    "use strict";

    window.snippets = [];

    var logQueue = [];
    window.log = function (arg) {
        logQueue.push(arg);
    };

    var humane = window.humane;
    var bigbox = humane.create({
        baseCls: "humane-bigbox",
        timeout: 3000
    });
    bigbox.success = bigbox.spawn({
        addnCls: "humane-bigbox-success",
        timeout: 1000
    });
    bigbox.error = bigbox.spawn({
        addnCls: "humane-bigbox-error",
        timeout: 2000
    });
    bigbox.info = bigbox.spawn({
        addnCls: "humane-bigbox-info",
        timeout: 1000
    });

    window.showLog = function () {
        bigbox.remove();
        if (logQueue.length) {
            bigbox.log(logQueue.shift());
        } else {
            bigbox.info("That's it!");
        }
    };

    window.runCode = function () {
        var slideNo = +window.location.hash.match(/^#\/([0-9]+)/)[1];
        if (window.snippets[slideNo]) {
            if (!logQueue.length) {
                try {
                    eval(window.snippets[slideNo]);
                    bigbox.info("Loaded.");
                } catch (e) {
                    bigbox.error("Threw up! " + e.message);
                    logQueue = [];
                }
            } else {
                bigbox.error("Got logs to show.");
            }
        } else {
            bigbox.error("No code on this slide.");
        }
    };

    function highlightLoaded() {
        $(document).ready(function () {
            $("pre code").each(function (i, block) {
                var slideNo = $(block)
                    .closest(".reveal > .slides > section")
                    .index();
                window.snippets[slideNo] = $(block).text();
                hljs.highlightBlock(block);
            });
        });
    }

    Reveal.initialize({
        controls: true,
        progress: true,
        history: true,
        center: true,

        keyboard: true,
        overview: true,
        loop: false,
        rtl: false,
        autoSlide: 0,
        mouseWheel: false,
        rollingLinks: false,

        theme: "sky",
        transition: "default",

        // Optional libraries used to extend on reveal.js
        dependencies: [
            {
                src: "lib/js/classList.js",
                condition: function () { return !document.body.classList; }
            },
            {
                src: "plugin/highlight/highlight.js",
                async: true,
                callback: highlightLoaded
            }
        ]
    });

    // Remote control!
    new Remotes("preview")
        .on("swipe-left", function (e) {
            Reveal.right();
        })
        .on("swipe-right", function (e) {
            Reveal.left();
        })
        .on("swipe-up", function (e) {
            Reveal.down();
        })
        .on("swipe-down", function (e) {
            Reveal.up();
        })
        .on("hold", runCode)
        .on("tap", showLog);


}());
