(function () {
    "use strict";

    window.snippets = {};

    var logQueue = [];
    window.log = function (arg) {
        logQueue.push("<pre>" + JSON.stringify(arg) + "</pre>");
    };

    var humane = window.humane;
    var bigbox = window.bigbox = humane.create({
        baseCls: "humane-bigbox",
        timeout: 3000
    });
    bigbox.success = bigbox.spawn({
        addnCls: "humane-bigbox-success",
        timeout: 1000
    });
    bigbox.error = bigbox.spawn({
        addnCls: "humane-bigbox-error",
        timeout: 4000
    });
    bigbox.info = bigbox.spawn({
        addnCls: "humane-bigbox-info",
        timeout: 1000
    });

    window.showLog = function () {
        bigbox.remove();
        if (logQueue.length) {
            bigbox.log(logQueue.shift());
        }
    };

    window.runCode = function () {
        var hash = window.location.hash,
            hIndexMatch = hash.match(/^#\/([0-9]+)/),
            vIndexMatch = hash.match(/^#\/[0-9]+\/([0-9]+)$/),
            hIndex = (hIndexMatch && hIndexMatch[1]) || "0",
            vIndex = (vIndexMatch && vIndexMatch[1]) || "0",
            slideIndex = hIndex + "/" + vIndex;

        if (window.snippets[slideIndex]) {
            if (!logQueue.length) {
                try {
                    eval(window.snippets[slideIndex]);
                    bigbox.info("Loaded.");
                } catch (e) {
                    bigbox.error(e.message);
                    logQueue = [];
                }
            } else {
                bigbox.error("Got logs to show.");
            }
        } else {
            bigbox.error("No code on this slide.");
        }
    };

    window.runCodeAndShowLog = function () {
        if (!logQueue.length) {
            window.runCode();
        } else {
            window.showLog();
        }
    };

    function highlightLoaded() {
        $(document).ready(function () {
            $("pre code").each(function (i, block) {
                var hSection = $(block).closest(".reveal > .slides > section"),
                    hIndex = (hSection.length && String(hSection.index())) || "0",
                    vSection = $(block).closest(".reveal > .slides > section > section"),
                    vIndex = (vSection.length && String(vSection.index())) || "0",
                    slideIndex = hIndex + "/" + vIndex;

                window.snippets[slideIndex] = $(block).text();
                $("<div class='run-code' title='Run Code'></div>")
                    .insertBefore($(block).closest("pre"))
                    .bind("click", window.runCodeAndShowLog);
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
    //new Remotes("preview")
        //.on("swipe-left", function (e) {
            //Reveal.right();
        //})
        //.on("swipe-right", function (e) {
            //Reveal.left();
        //})
        //.on("swipe-up", function (e) {
            //Reveal.down();
        //})
        //.on("swipe-down", function (e) {
            //Reveal.up();
        //})
        //.on("hold", runCode)
        //.on("tap", showLog);


}());
