window.log = function (arg) {
    console.log(arg);
};

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

    log(undef);   // undefined

    // Types can be changed at runtime
    num = str;
    str = obj;
    obj = func = bool = nothing;

    // Reserved words:
    // function, for, if, switch, break, etc.
}());

// Type determination
(function () {
    "use strict";

    // Type determination via `typeof`
    log(typeof "string");    // "string"
    log(typeof false);       // "boolean"
    log(typeof undefined);   // "undefined"
    log(typeof function () {}); // "function"

    log(typeof 245);         // "number"
    log(typeof 2.7);         // "number"

    log(typeof {k: "v"});    // "object"
    log(typeof [1, 2]);      // "object"
    log(typeof (/regExp/i)); // "object"
    log(typeof new Date());  // "object"
    log(typeof null);        // "object"

    // Better to use a library for this
    
}());

// Type conversion
(function () {
    "use strict";

    var num = 10,
        str = "20",
        floating = "24.9";

    log(num.toString());    // "10"
    log(String(num));       // "10"
    log("" + num);          // "10"

    log(Number(str));           // 20
    log(parseInt(str, 10));     // 20
    log(parseFloat(floating));  // 24.9

    log(+str);                  // 20
    log(+floating);             // 24.9

}());

// Wrong Equality Checking
(function () {
    "use strict";

    log("" == []);      // true
    log(0 == []);       // true
    log("1" == [1]);    // true

    log("" == 0);       // true
    log(0 == " ");      // true
    log("" == " ");     // false

    log(24 == "twenty four"); // false
    log(24 == "24");          // true

    log(null == undefined); // true

    // Never use == or !=
}());

// Correct Equality Checking
(function () {
    "use strict";

    log("" === []);      // false
    log(0 === []);       // false
    log("1" === [1]);    // false

    log("" === 0);       // false
    log(0 === " ");      // false
    log("" === " ");     // false

    log(24 === "twenty four"); // false
    log(24 === "24");          // false

    log(null === undefined); // false

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

    log(obj.property);     // "value"
    log(obj["property"]);  // "value"

    // New object properties can be created
    obj.anotherProp = 56;
    log(obj.anotherProp);  // 56

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
    log(arr.length); // 3

    arr.push("4");      // [1, 2, 3, "4"]
    arr.pop();          // [1, 2, 3]
    arr.unshift([0]);   // [[0], 1, 2, 3]
    arr.shift();        // [1, 2, 3]
    arr[4] = "value";   // [1, 2, 3, undefined, "value"]
    arr.splice(1, 4, "2", "3"); // [1, "2", "3"]

    log(arr.concat(4));     // [1, 2, 3, 4]
    log(arr.concat([4]));   // [1, 2, 3, 4]

    log(arr[-1]);   // undefined
    log(arr[1]);    // 2
    log(arr[3]);    // undefined

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

    log(arr[1]);    // 1
    log(obj[1]);    // 1

    arr.property = "value";
    log(arr.property);  // "value"

    // Since object keys can only be strings
    log(arr["1"]);  // 1

    // Don't use for-in loops with arrays
}());

// && and ||
(function () {
    "use strict";

    var obj = {
        func: function () { return 99; }
    };

    // Guard Operator
    log(obj && obj.func && obj.func()); // 99

    // Default Operator
    log(obj.nope || obj.func() || 100); // 99
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
        log(e.message); // "haha"
    }

}());

// Functions

