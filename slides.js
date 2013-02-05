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
// Prevents unintended global namespace pollution
globalVar = "global value";
(function () {
    "use strict";

    log(window.globalVar);

    str = "global";

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
// Variable scope is simply the function scope
(function () {
    "use strict";

    var outer = "outer value";

    function func() {
        var inner = "inner value";

        log(outer);
        log(inner);
    }

    func();

    log(outer);
    log(inner);

}());
// `function` declarations get "hoisted" at top of scope
(function () {
    "use strict";

    var func1,
        func2 = function () { return "func2"; };

    log(func1);
    log(func2());
    log(func3());

    func1 = function () { return "func1"; };
    log(func1());

    function func3() { return "func3"; }

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

}());

// Object Creation
(function () {
    "use strict";

    var o1 = {
        property: "o1's value"
    };
    log(o1.property);

    // or
    var o2 = {};
    o2.property = "o2's value";
    log(o2.property);

    // or
    function ClassName() {
        this.property = "o3's value";
    }
    var o3 = new ClassName();
    log(o3.property);
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

}());

// Prototype Chain
(function () {
    "use strict";

    var obj = { property: "value" };

    function MyClass() {
        this.ownProperty = "something";
    }
    MyClass.prototype = obj;

    var newObj = new MyClass();

    var prop;
    for (prop in newObj) {
        log(prop);
        log(newObj[prop]);
    }

    log(newObj.toString());

}());

// Better for...in
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
            log(newObj[prop]);
        }
    }
}());

// Inheritance
(function () {
    "use strict";

    function BaseClass() {
        this.property = "base value";
    }

    function InheritedClass() {
        this.ownProperty = "own value";
    }

    InheritedClass.prototype = new BaseClass();

    var obj = new InheritedClass();

    log(obj.ownProperty);
    log(obj.property);

}());

// Arrays
(function () {
    "use strict";

    var arr = [1, 2, 3, 4];
    log(arr.length);

    arr.push(5);                    log(arr);
    arr.pop();                      log(arr);
    arr.unshift(0);                 log(arr);
    arr.shift();                    log(arr);

    arr.splice(1, 2);               log(arr);
    arr.splice(1, 0, 20, 25, 30);   log(arr);

    log(arr.concat([5]));
    log(arr.concat(5));

}());
// Arrays can contain multiple types
(function () {
    "use strict";

    var arr = ["one", 2, [1, 2, 3]];

    log(arr);
    log(arr[2][2]);

    // another way to `push`
    arr[arr.length] = function () { return 100; };

    log(arr[3].toString());
    log(arr[3]());

    // Out of bounds
    log(arr[-1]);
    log(arr[100]);
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
}());
// Array Enumeration
(function () {
    "use strict";

    var arr = ["zero", "one"];

    log("Using regular for loop");
    for (var i = 0; i < arr.length ; i++) {
        log(i);
        log(arr[i]);
    }

    log("Using Array#forEach");
    // native in ES5 (needs a library in ES3)
    arr.forEach(function (value, index) {
        log(index);
        log(value);
    });

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
    obj.property = obj.property || obj.func();
    log(obj.property);

}());

// Exception Handling
(function () {
    "use strict";

    var obj = {};

    try {

        log(1/0);
        obj.nonExistentFunc();

    } catch (e) {
        log("error caught, no harm done.");
        log(e.name + ": " + e.message);
    }

    "here".is.an = "uncaught error";
    
}());
// Throw your own errors
(function () {
    "use strict";

    try {

        throw new Error("My custom error");

    } catch (e) {
        log(e.toString());

        try {
            throw new TypeError("Why U Mix Types");
        } catch (err) {
            log(err.toString());
        }
    }

}());
// Throw anything
(function () {
    "use strict";

    var anything = {
        code: 201,
        name: "SomeErrorClass",
        message: "Just got thrown",
        toString: function () {
            return "[ " + this.name + ": " + this.message + " ]";
        }
    };

    throw anything;

}());

// Functions

