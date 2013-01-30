// Use Strict Pragma
(function () {
    "use strict";

    // CODE
}());
// Prevents common JS errors that would fail silently otherwise
(function () {
    "use strict";

    var obj = {
        key: "value",
        anotherKey: "another value",
        keyKey: "value value",
        key: "one more value"
    };
}());

// Variables
(function () {
    "use strict";

    var undef,
        num     = 10,
        str     = "string",
        bool    = false,
        obj     = { property: "value" },
        func    = function () {},
        nothing = null,
        camelCasedVar = "convention";

    log(undef);

}());
// Types can be changed at runtime.
(function () {
    "use strict";

    var num     = 10,
        str     = "string",
        obj     = { property: "value" },
        func    = function () {},
        nothing = null;

    num = str;
    log(num);

    str = obj;
    log(str);

    obj = func = nothing;
    log(obj);
    log(func);

}());

// Type determination
(function () {
    "use strict";

    log(typeof "string");
    log(typeof false);
    log(typeof undefined);
    log(typeof function () {});

    log(typeof 245);
    log(typeof 2.7);

    log(typeof {k: "v"});
    log(typeof [1, 2]);
    log(typeof (/regExp/i));
    log(typeof new Date());
    log(typeof null);

}());

// Type conversion
(function () {
    "use strict";

    var num = 10,
        str = "20",
        floating = "24.9";

    log(num.toString());
    log(String(num));
    log("" + num);

    log(Number(str));
    log(parseInt(str, 10));
    log(parseFloat(floating));

    log(+str);
    log(+floating);

}());

// Wrong Equality Checking
(function () {
    "use strict";

    log("" == []);
    log(0 == []);
    log("1" == [1]);

    log("" == 0);
    log(0 == " ");
    log("" == " ");

    log(24 == "twenty four");
    log(24 == "24");

    log(null == undefined);

    // Never use == or !=
}());

// Correct Equality Checking
(function () {
    "use strict";

    log("" === []);
    log(0 === []);
    log("1" === [1]);

    log("" === 0);
    log(0 === " ");
    log("" === " ");

    log(24 === "twenty four");
    log(24 === "24");

    log(null === undefined);

    // Always use === and !==
}());

// Object Creation
(function () {
    "use strict";

    var o1 = {
        property: "value"
    };

    // or

    var o2 = {};
    o2.property = "value";

    // or

    function ClassName() {
        this.property = "value";
    }
    var o3 = new ClassName();

    // or Object.create

}());

// Object Property Access
(function () {
    "use strict";

    var obj = { property: "value" };

    log(obj.property);
    log(obj["property"]);

    // New object properties can be created
    obj.anotherProp = 56;
    log(obj.anotherProp);

    // obj.constructor is predefined

}());

// Prototype Chain
(function () {
    "use strict";

    var obj = { property: "value" };

    function MyClass() {
        this.anotherProp = "something";
    }
    MyClass.prototype = obj;

    var newObj = new MyClass();

    var prop;
    for (prop in newObj) {
        log(prop);
    }
    // "anotherProp"
    // "property"

}());

// Better Object Property Enumeration
(function () {
    "use strict";

    var obj = { property: "value" };

    function MyClass() {
        this.anotherProp = "something";
    }
    MyClass.prototype = obj;

    var newObj = new MyClass();

    var prop;
    for (prop in newObj) {
        if (newObj.hasOwnProperty(prop)) {
            log(prop);
        }
    }
    // "anotherProp"

}());

// Arrays
(function () {
    "use strict";

    var arr = [1, 2, 3];
    log(arr.length);

    arr.push("4");
    arr.pop();
    arr.unshift([0]);
    arr.shift();
    arr[4] = "value";
    arr.splice(1, 4, "2", "3");

    log(arr.concat(4));
    log(arr.concat([4]));

    log(arr[-1]);
    log(arr[1]);
    log(arr[3]);

}());

// Arrays are Objects!
(function () {
    "use strict";

    var arr = [0, 1, 2],
        obj = {
            0: 0,
            1: 1,
            2: 2
        };

    log(arr[1]);
    log(obj[1]);

    arr.property = "value";
    log(arr.property);

    // Since object keys can only be strings
    log(arr["1"]);

    // Don't use for-in loops with arrays
}());

// && and ||
(function () {
    "use strict";

    var obj = {
        func: function () { return 99; }
    };

    // Guard Operator
    log(obj && obj.func && obj.func());

    // Default Operator
    log(obj.nope || obj.func() || 100);
}());

// Throw stuff!
(function () {
    "use strict";

    var error = new Error("reason for blow-up"),
        anything = {
            code: 201,
            message: "haha"
        };

    throw error;
    throw anything;
    throw 4;
    throw [2, 4];

    // Function execution stops at first throw
}());

// Exception Handling
(function () {
    "use strict";

    try {

        log("this about to throw up");
        throw {
            code: 201,
            message: "haha"
        };
        log("this never to show up");

    } catch (e) {
        log(e.message);
    }

}());

// Functions

