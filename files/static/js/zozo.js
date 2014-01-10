(function (e, t, n, r) {
    var i = function (t, n) {
        this["elem"] = t;
        this["$elem"] = e(t);
        this["options"] = n;
        this["metadata"] = this["$elem"]["data"]("options") ? this["$elem"]["data"]("options") : {};
        this["attrdata"] = this["$elem"]["data"]() ? this["$elem"]["data"]() : {};
        this["elemID"];
        this["$sections"];
        this["sectionCount"];
        this["$container"];
        this["$contents"];
        this["autoplayIntervalId"];
        this["resizeWindowIntervalId"];
        this["currentsection"];
        this["browser"] = e["zozo"]["core"]["browser"];
        this["responsive"];
        this["lastWindowHeight"];
        this["lastWindowWidth"]
    };
    if (t["zozo"] == null) {
        t["zozo"] = {}
    }
    var s = {
        pluginName: "zozoAccordion",
        elementSpacer: "<span class='z-tab-spacer' style='clear: both;display: block;'></span>",
        commaRegExp: /,/g,
        headerTitle: "<span class='z-title'>Illustrations</span>",
        headerArrow: "<span class='z-arrow'><i class='icon-chevron-down'></i></span>",
        space: " ",
        responsive: {
            largeDesktop: 1200,
            desktop: 960,
            tablet: 720,
            phone: "auto"
        },
        animation: {
            effects: {
                fade: "fade",
                none: "none"
            },
            types: {
                css: "css",
                jquery: "jquery"
            }
        },
        expandModes: {
            single: "single",
            multiple: "multiple"
        },
        events: {
            click: "click",
            mousover: "mouseover",
            mouseenter: "mouseenter",
            mouseleave: "mouseleave",
            touchend: "touchend",
            touchstart: "touchstart",
            touchmove: "touchmove"
        },
        classes: {
            prefix: "z-",
            wrapper: "z-accordion",
            section: "z-section",
            first: "z-first",
            last: "z-last",
            active: "z-active",
            link: "z-link",
            focus: "z-focus",
            container: "z-container",
            content: "z-content",
            shadows: "z-shadows",
            bordered: "z-bordered",
            rounded: "z-rounded",
            scrollable: "z-scrollable",
            autoClass: "z-auto-g",
            themes: {
                gray: "gray",
                black: "black",
                blue: "blue",
                white: "white",
                lightblue: "lightblue",
                deepblue: "deepblue",
                crystal: "crystal",
                green: "green",
                yellow: "yellow",
                purple: "purple",
                silver: "silver",
                red: "red",
                orange: "orange",
                clean: "clean2"
            },
            orientations: {
                vertical: "vertical",
                horizontal: "horizontal"
            },
            groups: {
                grouped: "z-grouped",
                ungrouped: "z-ungrouped"
            }
        }
    }, o = "px",
        u = ".z-link",
        a = ".z-arrow",
        f = "error",
        l = ".z-dot-nav",
        c = "select",
        h = ".z-content",
        p = "expand",
        d = "activate",
        v = "section",
        m = "> " + h,
        g = "> " + v,
        y = "contentUrl",
        b = "contentLoad",
        w = "z-dot-nav",
        E = "z-mobile",
        S = "z-active",
        x = "disabled",
        T = "z-disabled",
        N = "z-loading",
        C = g + "." + S,
        k = "z-dot-nav-item",
        L = "z-slider-wrapper",
        A = "z-sub-nav",
        O = "> ." + A,
        M = "z-content-nav",
        _ = l + " span." + k,
        D = l + " ." + S;
    i["prototype"] = {
        defaults: {
            animation: {
                duration: 400,
                effects: "fadeIn",
                easing: "easeOutQuart",
                type: s["animation"]["types"]["jquery"]
            },
            autoplay: {
                interval: 0,
                smart: true
            },
            active: false,
            activate: function () {},
            bordered: true,
            cacheAjax: true,
            contentHeight: 0,
            contentLoad: function () {},
            contentSpacing: 0,
            contentUrls: null,
            contentWidth: 715,
            dotNav: false,
            contentNav: false,
            headerFontSize: 1.5,
            event: s["events"]["click"],
            error: function () {},
            expand: function () {},
            expandAfter: false,
            expandMode: s["expandModes"]["single"],
            grouped: true,
            headerSize: 40,
            height: 320,
            hideHeaders: false,
            iconStateClose: null,
            iconStateOpen: null,
            keyboard: false,
            minContentWidth: 0,
            minWidth: 480,
            minWindowWidth: 720,
            orientation: s["classes"]["orientations"]["vertical"],
            original: {
                width: 0,
                height: 0,
                headerSize: 0,
                headerFontSize: 0,
                sectionSpacing: 0,
                orientation: null
            },
            responsive: false,
            responsiveDelay: 100,
            rounded: false,
            scrollable: false,
            shadows: true,
            showIcons: true,
            slider: false,
            sectionSpacing: 0,
            theme: s["classes"]["themes"]["silver"],
            urlBased: false,
            horizontal: {
                headerSize: 40,
                headerFontSize: 1.1,
                sectionSpacing: 8
            },
            vertical: {
                headerSize: 38,
                headerFontSize: 1.1,
                sectionSpacing: 0
            },
            select: function () {},
            width: 960
        },
        init: function () {
            var t = this;
            t["settings"] = e["extend"](true, {}, t["defaults"], t["options"], t["metadata"], t["attrdata"]);
            t["currentsection"] = t["settings"]["active"];
            t["settings"]["original"]["width"] = t["settings"]["width"];
            t["settings"]["original"]["height"] = t["settings"]["height"];
            t["settings"]["original"]["headerSize"] = t["settings"]["headerSize"];
            t["settings"]["original"]["orientation"] = t["settings"]["orientation"];
            t["settings"]["original"]["headerFontSize"] = t["settings"]["headerFontSize"];
            t["settings"]["original"]["sectionSpacing"] = t["settings"]["sectionSpacing"];
            if (t["settings"]["original"]["orientation"] === s["classes"]["orientations"]["vertical"]) {
                t["settings"]["vertical"]["headerSize"] = t["settings"]["original"]["headerSize"]
            }
            if (t["settings"]["animation"]["type"] === s["animation"]["types"]["css"] && e["zozo"]["core"]["support"]["transition"] || jQuery["browser"]["mobile"]) {}
            if (t["settings"]["slider"] === true) {
                if (!t["$elem"]["parent"]()["hasClass"](L)) {
                    t["$elem"]["wrap"]("<div class='" + L + "'></div>")
                }
                if (t["settings"]["dotNav"] === true && t["settings"]["slider"] === true) {
                    t["$sections"] = t["$elem"]["find"](g);
                    var n = e("<div class='" + w + "'></div>");
                    t["$sections"]["each"](function (t, r) {
                        n["append"](e("<span class='" + k + "'></span>"))
                    });
                    t["$elem"]["parent"]()["append"](n)
                }
            }
            e["zozo"]["core"]["plugins"]["easing"](t);
            P["updateClasses"](t);
            P["bindEvents"](t);
            if (t["settings"]["contentUrls"] != null) {
                t["$sections"]["each"](function (n, r) {
                    e(r)["find"]("." + s["classes"]["link"])["data"](y, t["settings"]["contentUrls"][n])
                })
            }
            if (t["settings"]["responsive"] === true && t["settings"]["original"]["orientation"] === s["classes"]["orientations"]["horizontal"]) {
                P["checkWidth"](t)
            } else {
                if (t["settings"]["orientation"] === s["classes"]["orientations"]["vertical"]) {
                    if (e["zozo"]["core"]["utils"]["isNumber"](t["settings"]["active"])) {
                        P["showSection"](t, t["settings"]["active"])
                    }
                } else {
                    P["showSection"](t, t["settings"]["active"])
                }
            }
            P["initAutoPlay"](t);
            return t
        },
        setOptions: function (t, n) {
            var r = this;
            r["settings"]["active"] = r["currentsection"];
            r["settings"] = e["extend"](true, r["settings"], t);
            P["updateClasses"](r, true);
            P["showSection"](r, r["settings"]["active"]);
            P["initAutoPlay"](r);
            return r
        },
        add: function (e, t, n) {
            var r = this;
            var i = P["create"](e, t);
            i["appendTo"](r.$elem);
            P["updateClasses"](r);
            P["bindEvent"](r, i["find"]("> h3"));
            return r
        },
        remove: function (t) {
            var n = this;
            var r = n["$sections"]["eq"](t);
            r["fadeOut"](300, function () {
                e(this)["remove"]();
                P["updateClasses"](n)
            });
            return n
        },
        select: function (e) {
            var t = this;
            P["showSection"](t, e);
            return t
        },
        enable: function (e) {
            var t = this;
            var n = t["$sections"]["eq"](e);
            if (n["length"]) {
                n["removeClass"](T);
                n["data"](x, false)
            }
            return t
        },
        disable: function (e) {
            var t = this;
            var n = t["$sections"]["eq"](e);
            if (n["length"]) {
                n["addClass"](T);
                n["data"](x, true)
            }
            return t
        },
        first: function () {
            var e = this;
            e["select"](P["getFirst"](e));
            return e
        },
        prev: function () {
            var e = this;
            var t = parseInt(e["currentsection"]);
            if (t <= P["getFirst"](e)) {
                e["select"](P["getLast"](e))
            } else {
                e["select"](t - 1)
            }
            return e
        },
        next: function (e) {
            e = e ? e : this;
            var t = parseInt(e["currentsection"]);
            var n = P["getLast"](e);
            if (t >= n) {
                e["select"](P["getFirst"](e))
            } else {
                e["select"](t + 1)
            }
            return e
        },
        last: function () {
            var e = this;
            e["select"](P["getLast"](e));
            return e
        },
        play: function (e) {
            var t = this;
            if (e == null || e < 0) {
                e = 2e3
            }
            t["settings"]["autoplay"]["interval"] = e;
            t["stop"]();
            t["autoplayIntervalId"] = setInterval(function () {
                t["next"](t)
            }, t["settings"]["autoplay"]["interval"]);
            return t
        },
        stop: function (e) {
            e = e ? e : this;
            clearInterval(e["autoplayIntervalId"]);
            return e
        },
        expandAll: function (e) {
            e = e ? e : this;
            return e
        },
        collapseAll: function (e) {
            e = e ? e : this;
            return e
        },
        refresh: function () {
            var e = this;
            P["checkWidth"](e);
            return e
        }
    };
    var P = {
        resetClasses: function (t) {
            t["$elem"]["find"]("*")["stop"](true, true);
            t["elemID"] = t["$elem"]["attr"]("id");
            t["$sections"] = t["$elem"]["find"](g);
            t["sectionCount"] = t["$sections"]["length"];
            t["settings"]["contentWidth"] = t["settings"]["width"] - t["sectionCount"] * (t["settings"]["headerSize"] + t["settings"]["sectionSpacing"]);
            t["$elem"]["attr"]("role", "tablist")["removeClass"](s["classes"]["wrapper"])["addClass"](s["classes"]["wrapper"])["removeClass"](s["classes"]["orientations"]["vertical"])["removeClass"](s["classes"]["orientations"]["horizontal"])["removeClass"](s["classes"]["groups"]["grouped"])["removeClass"](s["classes"]["groups"]["ungrouped"])["addClass"](t["settings"]["orientation"])["removeClass"](s["classes"]["rounded"])["removeClass"](s["classes"]["shadows"])["removeClass"](s["classes"]["bordered"])["parents"]("." + L)["css"]({
                width: "",
                padding: ""
            });
            t["$elem"]["css"]({
                width: "",
                height: ""
            });
            t["$sections"]["each"](function (t, n) {
                var r = e(n);
                r["removeClass"](s["classes"]["first"])["removeClass"](s["classes"]["last"])["removeClass"](s["classes"]["active"])["addClass"](s["classes"]["section"])["css"]({
                    margin: "none"
                });
                r["css"]({
                    left: "",
                    width: "",
                    margin: ""
                });
                r["find"]("> h3")["css"]({
                    width: "",
                    height: "",
                    lineHeight: ""
                })["find"]("span")["css"]({
                    width: "",
                    height: "",
                    lineHeight: ""
                });
                r["find"]("> div")["css"]({
                    height: "",
                    maxHeight: "",
                    width: "",
                    left: "",
                    display: "",
                    margin: "",
                    padding: ""
                })["find"]("> div")["css"]({
                    height: "",
                    width: "",
                    left: "",
                    display: "",
                    margin: "",
                    padding: ""
                })
            });
            return t
        },
        updateClasses: function (t, n) {
            P["resetClasses"](t, n);
            t["$sections"]["each"](function (n, r) {
                var i = e(r);
                var o = i["find"]("> h3");
                var u = o["html"]();
                var a = i["find"]("> div");
                var f = t["settings"]["showIcons"] === true ? "<span class='z-arrow' style='top:none'></span>" : "";
                if (!o["find"]("> span.z-title")["length"]) {
                    o["text"]("")["append"]("<span class='z-title'>" + e["trim"](u) + "</span>" + f)["addClass"](s["classes"]["link"])
                }
                if (P["isTabDisabled"](i)) {
                    t["disable"](n)
                }
                a["addClass"](s["classes"]["content"])
            });
            P["setContentSize"](t);
            t["$sections"]["filter"](s["classes"]["first"] + ":not(:first-child)")["removeClass"](s["classes"]["first"]);
            t["$sections"]["filter"](s["classes"]["last"] + ":not(:last-child)")["removeClass"](s["classes"]["last"]);
            t["$sections"]["filter"](":first-child")["addClass"](s["classes"]["first"])["find"]("h3")["attr"]("tabindex", "0")["attr"]("accesskey", "w");
            t["$sections"]["filter"](":last-child")["addClass"](s["classes"]["last"]);
            var r = e["zozo"]["core"]["utils"]["toArray"](s["classes"]["themes"]);
            if (!e["zozo"]["core"]["utils"]["isEmpty"](t["settings"]["theme"])) {
                t["$elem"]["removeClass"](r["join"]()["replace"](s["commaRegExp"], s["space"]))["addClass"](t["settings"]["theme"])
            } else {
                if (!t["$elem"]["hasClasses"](r)) {
                    t["$elem"]["addClass"](s["classes"]["themes"]["silver"])
                }
            } if (t["settings"]["animation"]["type"] === "css" && e["zozo"]["core"]["support"]["transition"] || jQuery["browser"]["mobile"]) {}
            t["$elem"]["addClass"]("transition");
            t["settings"]["contentNav"] === true && t["$elem"]["addClass"](M);
            jQuery["browser"]["mobile"] === true && t["$elem"]["addClass"](E);
            t["settings"]["rounded"] === true && t["$elem"]["addClass"](s["classes"]["rounded"])["parent"]("." + L)["addClass"](s["classes"]["rounded"]);
            t["settings"]["scrollable"] === true && t["$elem"]["addClass"](s["classes"]["scrollable"]);
            t["settings"]["grouped"] === true ? t["$elem"]["addClass"](s["classes"]["groups"]["grouped"]) : t["$elem"]["addClass"](s["classes"]["groups"]["ungrouped"]);
            t["settings"]["bordered"] === true && t["$elem"]["addClass"](s["classes"]["bordered"]);
            t["settings"]["shadows"] === true && t["$elem"]["addClass"](s["classes"]["shadows"])["parent"]("." + L)["addClass"](s["classes"]["shadows"]);
            P["addAria"](t, {
                index: t["currentsection"]
            })
        },
        setContentSize: function (t) {
            var n = t["settings"]["slider"];
            var r = t["settings"]["contentNav"];
            var i = t["settings"]["orientation"];
            var u = i === s["classes"]["orientations"]["vertical"] && t["settings"]["responsive"] === true ? t["settings"]["vertical"]["sectionSpacing"] : t["settings"]["sectionSpacing"];
            var a = i === s["classes"]["orientations"]["vertical"] ? t["settings"]["vertical"]["headerSize"] : t["settings"]["headerSize"];
            var f = t["settings"]["contentWidth"] - t["settings"]["contentSpacing"] * 2;
            var l = t["settings"]["height"] - t["settings"]["contentSpacing"] * 2;
            var c = t["$elem"]["parents"]("." + L);
            var h = e["zozo"]["core"]["browser"]["isIE"](8);
            var p = e["zozo"]["core"]["browser"]["isIE"](9);
            if (i === s["classes"]["orientations"]["horizontal"]) {
                if (u > 0) {
                    t["settings"]["contentWidth"] = parseInt(t["settings"]["width"] - t["sectionCount"] * (t["settings"]["headerSize"] + u - 1))
                } else {
                    t["settings"]["contentWidth"] = t["settings"]["width"] - t["sectionCount"] * t["settings"]["headerSize"]
                }
                t["$elem"]["css"]({
                    width: u > 0 ? t["settings"]["width"] - 1 : t["settings"]["width"],
                    height: t["settings"]["height"]
                });
                c["css"]({
                    width: t["settings"]["width"]
                })
            } else {
                u > 0 ? t["settings"]["grouped"] = false : t["settings"]["grouped"] = true
            } if (n == true && u > 0) {
                c["css"]({
                    padding: u + o
                });
                i === s["classes"]["orientations"]["horizontal"] ? c["css"]({
                    paddingRight: 1,
                    paddingBottom: u - 1 + o
                }) : c["css"]({
                    paddingTop: "1px",
                    paddingBottom: "1px"
                })
            }
            t["$sections"]["each"](function (f, l) {
                var c = e(l);
                var p = e(l)["find"]("> h3")["css"]({
                    outline: "none",
                    height: a + 1 + o,
                    lineHeight: a + 2 + o
                });
                var d = e(l)["find"]("> div");
                h && p["css"]({
                    height: a + 3 + o
                })["find"]("> span.z-title")["css"]({
                    height: t["settings"]["height"] + o
                });
                if (!c["find"](">div>." + s["classes"]["autoClass"])["length"]) {
                    var v = e("<div class='" + s["classes"]["autoClass"] + "'></div>");
                    var m = d["html"]();
                    d["html"]("");
                    v["append"](m);
                    v["appendTo"](d);
                    t["settings"]["contentNav"] === true && v["find"]("> ul")["addClass"](A)
                }
                if (i === s["classes"]["orientations"]["horizontal"]) {
                    p["css"]({
                        width: t["settings"]["height"]
                    });
                    if (n === true) {
                        d["css"]({
                            height: "100%",
                            margin: 0
                        })["find"]("img")["css"]({
                            margin: t["settings"]["contentSpacing"]
                        })
                    }
                    if (t["settings"]["responsive"] === true && t["settings"]["original"]["headerFontSize"] > 0) {
                        p["css"]({
                            fontSize: t["settings"]["headerFontSize"] + "em"
                        })
                    }
                } else {
                    c["css"]({
                        overflow: "",
                        width: "100%",
                        left: "",
                        display: "block"
                    });
                    if (t["settings"]["grouped"] === false || u > 0) {
                        c["css"]({
                            marginTop: u + o,
                            marginBottom: u + o
                        })
                    }
                    if (t["settings"]["responsive"] === true && t["settings"]["vertical"]["headerFontSize"] > 0) {
                        p["css"]({
                            fontSize: t["settings"]["vertical"]["headerFontSize"] + "em"
                        })
                    }
                } if (n === true || r === true) {
                    if (i === s["classes"]["orientations"]["horizontal"]) {
                        d["find"](">." + s["classes"]["autoClass"])["css"]({
                            paddingLeft: u - 2 + o
                        })
                    } else {
                        d["find"](">." + s["classes"]["autoClass"])["css"]({
                            paddingTop: u + o
                        })
                    }
                }
                r === true && d["find"](">." + s["classes"]["autoClass"])["find"](O + " > li:not(:first)")["css"]({
                    marginTop: u + o
                })
            })
        },
        bindEvents: function (n) {
            var r = false;
            e(t)["blur"](function () {
                r = false;
                e["zozo"]["core"]["console"]["log"]("blur: " + r)
            })["focus"](function () {
                r = true;
                e["zozo"]["core"]["console"]["log"]("focus: " + r)
            });
            n["$elem"]["focus"](function (t) {
                var n = e(this);
                var r = n["data"]("mdown");
                n["removeData"]("mdown");
                if (!r) {
                    n["addClass"](s["classes"]["focus"])
                }
            })["blur"](function (t) {
                e(this)["removeClass"](s["classes"]["focus"])
            });
            n["$sections"]["each"](function () {
                var r = e(this);
                var i = r["find"]("> h3");
                var s = r["find"]("> .z-content");
                s["on"]("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd", function () {
                    n["settings"]["animating"] = false
                });
                if (n["settings"]["hideHeaders"] === true) {
                    i = e(this)["find"](">div>div>img")
                }
                if (!i["find"]("a")["length"]) {
                    P["bindEvent"](n, i)
                } else {
                    i["on"](n["settings"]["event"], function (n) {
                        var r = i["find"]("a");
                        var s = r["attr"]("target");
                        if (e["trim"](s)["length"]) {
                            t["open"](r["attr"]("href"), s)
                        } else {
                            t["location"] = r["attr"]("href")
                        }
                        n["preventDefault"]()
                    })
                }
            });
            n["$elem"]["bind"](c, n["settings"]["select"]);
            n["$elem"]["bind"](p, n["settings"]["expand"]);
            n["$elem"]["bind"](d, n["settings"]["activate"]);
            n["$elem"]["bind"](f, n["settings"]["error"]);
            n["$elem"]["bind"](b, n["settings"]["contentLoad"]);
            if (n["settings"]["slider"] === true && n["settings"]["dotNav"] === true) {
                e(_)["each"](function () {
                    e(this)["on"]("click", function (t) {
                        t["preventDefault"]();
                        P["showSection"](n, e(this)["index"]())
                    })
                });
                e(".z-nav a.z-next")["click"](function (e) {
                    e["preventDefault"]();
                    P["showSection"](n, n["currentsection"] + 1)
                });
                e(".z-nav a.z-prev")["click"](function (e) {
                    e["preventDefault"]();
                    P["showSection"](n, n["currentsection"] - 1)
                })
            }
            if (n["settings"]["responsive"] === true && n["settings"]["original"]["orientation"] === s["classes"]["orientations"]["horizontal"]) {
                e(t)["resize"](function () {
                    if (n["lastWindowHeight"] !== e(t)["height"]() || n["lastWindowWidth"] !== e(t)["width"]()) {
                        clearInterval(n["resizeWindowIntervalId"]);
                        n["resizeWindowIntervalId"] = setTimeout(function () {
                            n["lastWindowHeight"] = e(t)["height"]();
                            n["lastWindowWidth"] = e(t)["width"]();
                            P["checkWidth"](n)
                        }, n["settings"]["responsiveDelay"])
                    }
                })
            }
        },
        bindEvent: function (t, n) {
            if (e["zozo"]["core"]["support"]["is_touch_device"]()) {
                n["on"](s["events"]["touchstart"], function (n) {
                    e(this)["on"](s["events"]["touchend"], function (n) {
                        n["preventDefault"]();
                        var r = e(this)["parent"]()["index"]();
                        t["currentsection"] = r;
                        if (t["settings"]["autoplay"] !== false && t["settings"]["autoplay"] != null) {
                            if (t["settings"]["autoplay"]["smart"] === true) {
                                t["stop"]()
                            }
                        }
                        P["showSection"](t, r);
                        e(this)["off"](s["events"]["touchend"])
                    });
                    e(this)["on"](s["events"]["touchmove"], function (t) {
                        e(this)["off"](s["events"]["touchend"])
                    })
                })
            } else {
                n["on"](t["settings"]["event"], function (n) {
                    n["preventDefault"]();
                    var r = e(this)["parent"]()["index"]();
                    t["currentsection"] = r;
                    if (t["settings"]["autoplay"] !== false && t["settings"]["autoplay"] != null) {
                        if (t["settings"]["autoplay"]["smart"] === true) {
                            t["stop"]()
                        }
                    }
                    P["showSection"](t, r)
                })
            } if (t["settings"]["keyboard"] === true) {
                n["on"]("keyup", function (n) {
                    n["preventDefault"]();
                    var r = e(this);
                    var i = n["keyCode"] || n["which"];
                    var s = r["parent"]()["index"]();
                    var o = r["parent"]()["index"]();
                    var u = t["sectionCount"];
                    if (i == e["zozo"]["core"]["keyCodes"]["space"] || i == e["zozo"]["core"]["keyCodes"]["enter"]) {
                        P["showSection"](t, o)
                    } else {
                        if (i >= e["zozo"]["core"]["keyCodes"]["end"] || i <= e["zozo"]["core"]["keyCodes"]["down"]) {
                            if (i === e["zozo"]["core"]["keyCodes"]["home"]) {
                                o = 0
                            } else {
                                if (i === e["zozo"]["core"]["keyCodes"]["end"]) {
                                    o = u - 1
                                } else {
                                    if (i === e["zozo"]["core"]["keyCodes"]["up"] || i === e["zozo"]["core"]["keyCodes"]["left"]) {
                                        o--
                                    } else {
                                        if (i === e["zozo"]["core"]["keyCodes"]["down"] || i === e["zozo"]["core"]["keyCodes"]["right"]) {
                                            o++
                                        }
                                    }
                                }
                            } if (o != s) {
                                if (o === -1) {
                                    o = u - 1
                                }
                                if (o === u && i != e["zozo"]["core"]["keyCodes"]["end"]) {
                                    o = 0
                                }
                                t["$sections"]["find"]("> h3")["eq"](o)["focus"]()
                            }
                        }
                    }
                })["mousedown"](function (t) {
                    var n = e(this);
                    if (!n["is"](":focus")) {
                        n["data"]("mdown", true)
                    }
                })["focus"](function (t) {
                    var n = e(this);
                    var r = n["data"]("mdown");
                    n["removeData"]("mdown");
                    if (!r) {
                        n["addClass"](s["classes"]["focus"])
                    }
                })["blur"](function (t) {
                    e(this)["removeClass"](s["classes"]["focus"])
                })
            }
        },
        checkWidth: function (r) {
            var i = e(t)["width"]();
            var o = r["settings"]["orientation"];
            var u = r["settings"]["minContentWidth"];
            var a = r["settings"]["minWidth"];
            var f = r["settings"]["minWindowWidth"];
            var l = r["$elem"]["parents"]("." + L);
            var c = r["$elem"];
            if (l["length"]) {
                c = l
            }
            r["settings"]["width"] = c["hide"]()["parent"]()["outerWidth"]() - 2;
            if (e(n)["height"]() > e(t)["height"]()) {
                if (r["settings"]["slider"] === true && r["settings"]["sectionSpacing"] > 0) {
                    r["settings"]["width"] = r["settings"]["width"] - r["settings"]["width"] / r["settings"]["original"]["width"] * r["settings"]["sectionSpacing"]
                }
            }
            c["show"]();
            if (r["settings"]["width"] > r["settings"]["original"]["width"]) {
                r["settings"]["width"] = r["settings"]["original"]["width"];
                r["settings"]["height"] = r["settings"]["original"]["height"];
                r["settings"]["headerSize"] = r["settings"]["original"]["headerSize"];
                r["settings"]["headerFontSize"] = r["settings"]["original"]["headerFontSize"];
                r["settings"]["sectionSpacing"] = r["settings"]["original"]["sectionSpacing"]
            } else {
                var h = r["settings"]["width"] / r["settings"]["original"]["width"];
                r["settings"]["height"] = parseInt(h * r["settings"]["original"]["height"]);
                r["settings"]["headerSize"] = h * r["settings"]["original"]["headerSize"];
                r["settings"]["headerFontSize"] = h * r["settings"]["original"]["headerFontSize"];
                r["settings"]["sectionSpacing"] = h * r["settings"]["original"]["sectionSpacing"]
            }
            console["log"]("accordionWidth: " + r["settings"]["width"] + " / " + a + " windowWidth: " + i + " / " + f);
            if (i <= f || r["settings"]["width"] <= a) {
                r["settings"]["width"] = r["settings"]["original"]["width"];
                r["settings"]["height"] = r["settings"]["original"]["height"];
                r["settings"]["headerSize"] = r["settings"]["original"]["headerSize"];
                r["settings"]["headerFontSize"] = r["settings"]["original"]["headerFontSize"];
                r["settings"]["sectionSpacing"] = r["settings"]["vertical"]["sectionSpacing"];
                P["changeOrientation"](r, s["classes"]["orientations"]["vertical"])
            } else {
                P["changeOrientation"](r, s["classes"]["orientations"]["horizontal"])
            }
        },
        changeOrientation: function (e, t) {
            P["setContentSize"](e);
            if (t != e["settings"]["orientation"]) {
                e["settings"]["orientation"] = t;
                e["setOptions"]({
                    orientation: t
                })
            } else {
                P["showSection"](e, e["currentsection"], true)
            }
        },
        showSection: function (t, n, r) {
            var i = t["$elem"]["find"](g)["eq"](n);
            var o = {
                index: e["zozo"]["core"]["utils"]["isNumber"](n) ? n : 0,
                section: i,
                enabled: P["isTabDisabled"](i) === false,
                head: i["find"]("> h3"),
                link: i["find"](".z-link"),
                content: i["find"]("> .z-content"),
                contentInner: i["find"]("> .z-content > .z-auto-g"),
                contentUrl: i["find"](".z-link")["data"](y),
                noAnimation: r
            };
            if (o["enabled"]) {
                t["settings"]["select"] && typeof t["settings"]["select"] == typeof Function && t["$elem"]["trigger"](c, {
                    header: o["link"][0],
                    content: o["contentInner"][0],
                    index: o["index"]
                });
                if (o["contentUrl"]) {
                    t["settings"]["orientation"] === s["classes"]["orientations"]["vertical"] ? P["ajaxRequest"](t, o, P["showVertical"]) : P["ajaxRequest"](t, o, P["showHorizontal"])
                } else {
                    t["settings"]["orientation"] === s["classes"]["orientations"]["vertical"] ? P["showVertical"](t, o) : P["showHorizontal"](t, o)
                }
                P["updateDotNav"](t, o);
                P["addAria"](t, o);
                t["currentsection"] = o["index"];
                t["settings"]["activate"] && typeof t["settings"]["activate"] == typeof Function && t["$elem"]["trigger"](d, {
                    header: o["link"][0],
                    content: o["contentInner"][0],
                    index: o["index"]
                })
            }
            return t
        },
        showHorizontal: function (t, n) {
            var r = t["settings"]["orientation"] === s["classes"]["orientations"]["vertical"] ? t["settings"]["vertical"]["sectionSpacing"] : t["settings"]["sectionSpacing"];
            var i = t["settings"]["headerSize"];
            var u = t["settings"]["contentWidth"];
            var a = r > 0 ? r - 1 : r;
            var f = 0;
            var l = n["index"];
            var c = e["zozo"]["core"]["browser"]["isIE"](8);
            t["$sections"]["each"](function (r, h) {
                var p;
                var d = e(h);
                var v = d["find"]("> h3");
                var m = d["find"]("> .z-content");
                if (r > 0) {
                    f = f + i + a
                }
                p = f;
                if (r === l) {
                    f = f + u
                }
                t["$elem"]["find"]("section.z-active > .z-content")["parent"]()["removeClass"](s["classes"]["active"]);
                t["$elem"]["find"]("section > .z-content")["eq"](l)["parent"]()["toggleClass"](s["classes"]["active"]);
                v["css"]({
                    outline: "none",
                    height: i + 1,
                    "line-height": i + o
                })["find"]("> span.z-title")["css"]({
                    height: i,
                    "line-height": i + o
                });
                if (a > 0) {
                    v["find"]("> span.z-title")["css"]({
                        height: i + 2
                    })
                }
                if (c) {
                    v["find"]("> span.z-title")["css"]({
                        height: t["settings"]["height"] + o
                    })
                }
                var g = u + i + 2;
                var y = a === 0 ? i : i + 3;
                if (c == true && a > 0) {
                    y = y + 1
                }
                if (c == true && a === 0) {
                    y = y + 1
                }
                if (n["noAnimation"] === true) {
                    d["stop"]()["css"]({
                        left: p,
                        width: g
                    });
                    m["css"]({
                        left: y,
                        width: "auto",
                        overflow: "",
                        display: ""
                    })
                } else {
                    P["animate"](t, d["stop"](), null, {
                        left: p,
                        width: g
                    });
                    P["animate"](t, m["stop"](), {
                        left: y,
                        display: ""
                    }, {
                        width: "auto"
                    }, {
                        overflow: ""
                    })
                }
            });
            return t
        },
        showVertical: function (t, n) {
            if (typeof n["noAnimation"] === "undefined" || n["noAnimation"] == null) {
                var r = t["settings"]["contentHeight"];
                var i = t["settings"]["animation"]["duration"];
                var o = e["zozo"]["core"]["support"]["css"]["transition"];
                if (n["section"]["hasClass"](s["classes"]["active"])) {
                    setTimeout(function () {
                        n["section"]["removeClass"](s["classes"]["active"])
                    }, i);
                    P["animate"](t, n["content"], null, {
                        height: "0",
                        overflow: ""
                    })
                } else {
                    if (t["settings"]["expandMode"] === s["expandModes"]["single"]) {
                        t["$sections"]["each"](function () {
                            P["animate"](t, e(this)["removeClass"](s["classes"]["active"])["find"]("> .z-content")["stop"](), null, {
                                height: "0",
                                overflow: ""
                            })
                        })
                    }
                    var u = r <= 0 ? P["getElementSize"](n["content"])["height"] : r;
                    var a = {
                        height: "auto"
                    };
                    if (r > 0) {
                        setTimeout(function () {
                            n["content"]["css"]({
                                overflow: "auto"
                            })
                        }, i);
                        a = null
                    }
                    P["animate"](t, n["content"]["stop"](), null, {
                        height: u
                    }, a);
                    n["section"]["addClass"](s["classes"]["active"])
                }
            }
            return t
        },
        updateDotNav: function (e, t) {
            if (e["settings"]["slider"] === true) {
                var n = e["$elem"]["parent"]();
                n["find"](D)["removeClass"](s["classes"]["active"]);
                n["find"](_)["eq"](t["index"])["toggleClass"](s["classes"]["active"])
            }
        },
        addAria: function (t, n) {
            t["$sections"]["each"](function (r, i) {
                var o = e(i);
                var u = o["find"]("> h3");
                var a = o["find"]("> div");
                var f = o["hasClass"](s["classes"]["active"]);
                e["zozo"]["core"]["console"]["log"]("currentsection: " + t["currentsection"] + " index: " + n["index"] + " expanded: " + f);
                o["attr"]({
                    "aria-hidden": (!f).toString(),
                    "aria-expanded": f.toString(),
                    "aria-selected": f.toString()
                });
                u["attr"]({
                    "aria-controls": t["elemID"] + "-" + (r + 1),
                    role: "tab",
                    tabindex: "-1"
                });
                a["attr"]({
                    id: t["elemID"] + "-" + (r + 1),
                    role: "tabpanel",
                    "aria-hidden": (!f).toString(),
                    "aria-expanded": f.toString()
                })
            });
            return t
        },
        ajaxRequest: function (t, n, r) {
            if (!n["section"]["hasClass"](s["classes"]["active"])) {
                var i = setTimeout(function () {
                    n["link"]["find"](a)["addClass"](N)
                }, 100);
                var o = {};
                e["ajax"]({
                    type: "GET",
                    cache: t["settings"]["cacheAjax"] === true,
                    url: n["contentUrl"],
                    dataType: "html",
                    data: o,
                    beforeSend: function (e, t) {},
                    error: function (e, r, i) {
                        if (e["status"] == 404) {
                            n["contentInner"]["html"]("<h4 style='color:red;'>Sorry, error: 404 - the requested content could not be found.</h4>")
                        } else {
                            n["contentInner"]["html"]("<h4 style='color:red;'>An error occurred: " + r + "\nError: " + e + " code: " + e["status"] + "</h4>")
                        }
                        t["settings"]["error"] && typeof t["settings"]["error"] == typeof Function && t["$elem"]["trigger"](f, e)
                    },
                    complete: function (e, s) {
                        clearTimeout(i);
                        n["link"]["find"](a)["removeClass"](N);
                        r && typeof r == typeof Function && r(t, n)
                    },
                    success: function (e, r, i) {
                        n["contentInner"]["html"](e);
                        t["settings"]["contentLoad"] && typeof t["settings"]["contentLoad"] == typeof Function && t["$elem"]["trigger"](b, {
                            header: n["link"][0],
                            content: n["contentInner"][0],
                            index: n["index"]
                        })
                    }
                })
            } else {
                r && typeof r == typeof Function && r(t, n)
            }
            return t
        },
        getFirst: function (e) {
            return 0
        },
        getLast: function (e) {
            return parseInt(e["$sections"]["size"]()) - 1
        },
        initAutoPlay: function (e) {
            if (e["settings"]["autoplay"] !== false && e["settings"]["autoplay"] != null) {
                if (e["settings"]["autoplay"]["interval"] > 0) {
                    e["stop"]();
                    e["autoplayIntervalId"] = setInterval(function () {
                        e["next"](e)
                    }, e["settings"]["autoplay"]["interval"])
                } else {
                    e["stop"]()
                }
            } else {
                e["stop"]()
            }
        },
        animate: function (t, n, r, i, s, o) {
            e["zozo"]["core"]["utils"]["animate"](t, n, r, i, s, o)
        },
        getElementSize: function (e) {
            var t = {
                width: 0,
                height: 0
            };
            if (e == null || e["length"] == 0) {
                return t
            }
            if (e["css"]("height") === 0 || e["css"]("height") === "0px") {
                e["css"]({
                    height: "auto"
                });
                t["height"] = e["innerHeight"]();
                t["width"] = e["outerWidth"]();
                e["css"]("height", "0px")
            } else {
                var n = e["css"]("height");
                t["height"] = e["innerHeight"]();
                t["width"] = e["outerWidth"]()
            }
            return t
        },
        isTabDisabled: function (e) {
            return e["hasClass"](T) || e["data"](x) === true
        },
        create: function (t, n) {
            return e("<section><h3>" + t + "</h3><div>" + n + "</div></section")
        }
    };
    i["defaults"] = i["prototype"]["defaults"];
    e["fn"]["zozoAccordion"] = function (t) {
        return this["each"](function () {
            if (r == e(this)["data"](s["pluginName"])) {
                var n = (new i(this, t))["init"]();
                e(this)["data"](s["pluginName"], n)
            }
        })
    };
    t["zozo"]["accordion"] = i;
    e(n)["ready"](function () {
        e("[data-role='z-accordion']")["each"](function (t, n) {
            if (!e(n)["zozoAccordion"]()) {
                e(n)["zozoAccordion"]()
            }
            e(n)["find"]("[data-role='z-accordion']")["each"](function (t, n) {
                if (!e(n)["zozoAccordion"]()) {
                    e(n)["zozoAccordion"]()
                }
                e(n)["find"]("[data-role='z-accordion']")["each"](function (t, n) {
                    if (!e(n)["zozoAccordion"]()) {
                        e(n)["zozoAccordion"]()
                    }
                    e(n)["find"]("[data-role='z-accordion']")["each"](function (t, n) {
                        if (!e(n)["zozoAccordion"]()) {
                            e(n)["zozoAccordion"]()
                        }
                    })
                })
            })
        })
    })
})(jQuery, window, document);
(function (e) {
    (jQuery["browser"] = jQuery["browser"] || {})["mobile"] = /(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i ["test"](e) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i ["test"](e["substr"](0, 4))
})(navigator["userAgent"] || navigator["vendor"] || window["opera"]);

(function (e, t, n, r) {
    if (!t["console"]) {
        t["console"] = {}
    }
    if (!t["console"]["log"]) {
        t["console"]["log"] = function () {}
    }
    e["fn"]["extend"]({
        hasClasses: function (t) {
            var n = this;
            for (i in t) {
                if (e(n)["hasClass"](t[i])) {
                    return true
                }
            }
            return false
        }
    });
    e["zozo"] = {};
    e["zozo"]["core"] = {};
    e["zozo"]["core"]["console"] = {
        debug: false,
        log: function (t) {
            if (e("#zozo-console")["length"] != 0) {
                e("<div/>")["css"]({
                    marginTop: -24
                })["html"](t)["prependTo"]("#zozo-console")["animate"]({
                    marginTop: 0
                }, 300)["animate"]({
                    backgroundColor: "#ffffff"
                }, 800)
            } else {
                if (console && this["debug"] === true) {
                    console["log"](t)
                }
            }
        }
    };
    e["zozo"]["core"]["content"] = {
        debug: false,
        video: function (t) {
            if (t) {
                t["find"]("iframe")["each"](function () {
                    var t = e(this)["attr"]("src");
                    var n = "wmode=transparent";
                    if (t["indexOf"](n) === -1) {
                        if (t["indexOf"]("?") != -1) {
                            e(this)["attr"]("src", t + "&" + n)
                        } else {
                            e(this)["attr"]("src", t + "?" + n)
                        }
                    }
                })
            }
        },
        check: function (e) {
            this["video"](e)
        }
    };
    e["zozo"]["core"]["keyCodes"] = {
        tab: 9,
        enter: 13,
        esc: 27,
        space: 32,
        pageup: 33,
        pagedown: 34,
        end: 35,
        home: 36,
        left: 37,
        up: 38,
        right: 39,
        down: 40
    };
    e["zozo"]["core"]["debug"] = {
        startTime: new Date,
        log: function (e) {
            if (console) {
                console["log"](e)
            }
        },
        start: function () {
            this["startTime"] = +(new Date);
            this["log"]("start: " + this["startTime"])
        },
        stop: function () {
            var e = +(new Date);
            var t = e - this["startTime"];
            this["log"]("end: " + e);
            this["log"]("diff: " + t);
            var n = t / 1e3;
            var r = Math["abs"](n)
        }
    };
    e["zozo"]["core"]["support"] = {
        is_mouse_present: function () {
            return "onmousedown" in t && "onmouseup" in t && "onmousemove" in t && "onclick" in t && "ondblclick" in t && "onmousemove" in t && "onmouseover" in t && "onmouseout" in t && "oncontextmenu" in t
        },
        is_touch_device: function () {
            return ("ontouchstart" in t || navigator["maxTouchPoints"] > 0 || navigator["msMaxTouchPoints"] > 0) && jQuery["browser"]["mobile"]
        },
        supportsCss: function () {
            var t = n["createElement"]("div"),
                r = "khtml ms o moz webkit" ["split"](" "),
                i = false;
            return function (n) {
                n in t["style"] && (i = n);
                var s = n["replace"](/^[a-z]/, function (e) {
                    return e["toUpperCase"]()
                });
                e["each"](r, function (e, r) {
                    r + s in t["style"] && (i = "-" + r + "-" + n)
                });
                return i
            }
        }(),
        css: {
            transition: false
        }
    };
    e["zozo"]["core"]["utils"] = {
        toArray: function (t) {
            return e["map"](t, function (e, t) {
                return e
            })
        },
        createHeader: function (t, n) {
            var r = e("<li><a>" + t + "</a></li>");
            var i = e("<div>" + n + "</div>");
            return {
                tab: r,
                content: i
            }
        },
        isEmpty: function (e) {
            return !e || 0 === e["length"]
        },
        isNumber: function (e) {
            return typeof e === "number" && isFinite(e)
        },
        isEven: function (e) {
            return e % 2 === 0
        },
        isOdd: function (e) {
            return !(_number % 2 === 0)
        },
        animate: function (t, n, r, i, s, o) {
            var u = t["settings"]["animation"]["effects"] === "none" ? 0 : t["settings"]["animation"]["duration"];
            var a = t["settings"]["animation"]["easing"];
            var f = e["zozo"]["core"]["support"]["css"]["transition"];
            if (n && i) {
                if (r) {
                    n["css"](r)
                }
                var l = n["css"]("left");
                var c = n["css"]("top");
                if (t["settings"]["animation"]["type"] === "css") {
                    i[f] = "all " + u + "ms ease-in-out";
                    setTimeout(function () {
                        n["css"](i)
                    });
                    setTimeout(function () {
                        if (s) {
                            n["css"](s)
                        }
                        n["css"](f, "")
                    }, u)
                } else {
                    n["animate"](i, {
                        duration: u,
                        easing: a,
                        complete: function () {
                            if (s) {
                                n["css"](s)
                            }
                            if (o) {
                                n["hide"]()
                            }
                        }
                    })
                }
            }
            return t
        }
    };
    e["zozo"]["core"]["plugins"] = {
        easing: function (t) {
            var n = false;
            if (t) {
                if (t["settings"]) {
                    var r = "swing";
                    if (e["easing"]["def"]) {
                        n = true
                    } else {
                        if (t["settings"]["animation"]["easing"] != "swing" && t["settings"]["animation"]["easing"] != "linear") {
                            t["settings"]["animation"]["easing"] = r
                        }
                    }
                }
            }
            return n
        }
    };
    e["zozo"]["core"]["browser"] = {
        init: function () {
            this["browser"] = this["searchString"](this["dataBrowser"]) || "An unknown browser";
            this["version"] = this["searchVersion"](navigator["userAgent"]) || this["searchVersion"](navigator["appVersion"]) || "an unknown version";
            e["zozo"]["core"]["console"]["log"]("init: " + this["browser"] + " : " + this["version"]);
            if (this["browser"] === "Explorer") {
                var t = e("html");
                var n = parseInt(this["version"]);
                if (n === 6) {
                    t["addClass"]("ie ie7")
                } else {
                    if (n === 7) {
                        t["addClass"]("ie ie7")
                    } else {
                        if (n === 8) {
                            t["addClass"]("ie ie8")
                        } else {
                            if (n === 9) {
                                t["addClass"]("ie ie9")
                            }
                        }
                    }
                }
            }
        },
        isIE: function (t) {
            if (e["zozo"]["core"]["utils"]["isNumber"](t)) {
                return this["browser"] === "Explorer" && this["version"] <= t
            } else {
                return this["browser"] === "Explorer"
            }
        },
        isChrome: function (t) {
            if (e["zozo"]["core"]["utils"]["isNumber"](t)) {
                return this["browser"] === "Chrome" && this["version"] <= t
            } else {
                return this["browser"] === "Chrome"
            }
        },
        searchString: function (e) {
            for (var t = 0; t < e["length"]; t++) {
                var n = e[t]["string"];
                var r = e[t]["prop"];
                this["versionSearchString"] = e[t]["versionSearch"] || e[t]["identity"];
                if (n) {
                    if (n["indexOf"](e[t]["subString"]) != -1) {
                        return e[t]["identity"]
                    }
                } else {
                    if (r) {
                        return e[t]["identity"]
                    }
                }
            }
        },
        searchVersion: function (e) {
            var t = e["indexOf"](this["versionSearchString"]);
            if (t == -1) {
                return
            }
            return parseFloat(e["substring"](t + this["versionSearchString"]["length"] + 1))
        },
        dataBrowser: [{
            string: navigator["userAgent"],
            subString: "Chrome",
            identity: "Chrome"
        }, {
            string: navigator["vendor"],
            subString: "Apple",
            identity: "Safari",
            versionSearch: "Version"
        }, {
            prop: t["opera"],
            identity: "Opera"
        }, {
            string: navigator["userAgent"],
            subString: "Firefox",
            identity: "Firefox"
        }, {
            string: navigator["userAgent"],
            subString: "MSIE",
            identity: "Explorer",
            versionSearch: "MSIE"
        }]
    };
    e["zozo"]["core"]["hashHelper"] = {
        all: function () {
            var e = [];
            var t = n["location"]["hash"];
            if (!this["hasHash"]()) {
                return e
            }
            t = t["substring"](1)["split"]("&");
            for (var r = 0; r < t["length"]; r++) {
                var i = t[r]["split"]("=");
                if (i["length"] != 2 || i[0] in e) {
                    i[1] = "none"
                }
                e[i[0]] = i[1]
            }
            return e
        },
        get: function (e) {
            var t = this["all"]();
            if (typeof t === "undefined" || typeof t["length"] < 0) {
                return null
            } else {
                if (typeof t[e] !== "undefined" && t[e] !== null) {
                    return t[e]
                } else {
                    return null
                }
            }
        },
        set: function (e, t) {
            var r = this["all"]();
            var i = [];
            r[e] = t;
            for (var e in r) {
                i["push"](e + "=" + r[e])
            }
            n["location"]["hash"] = i["join"]("&")
        },
        hasHash: function () {
            var e = n["location"]["hash"];
            if (e["length"] > 0) {
                return true
            } else {
                return false
            }
        }
    };
    e["zozo"]["core"]["support"]["css"]["transition"] = e["zozo"]["core"]["support"]["supportsCss"]("transition");
    e["zozo"]["core"]["browser"]["init"]()
})(jQuery, window, document);

(function (e) {
    e["event"]["special"]["ztap"] = {
        distanceThreshold: 10,
        timeThreshold: 500,
        isTouchSupported: jQuery["zozo"]["core"]["support"]["is_touch_device"](),
        setup: function (t) {
            var n = this,
                r = e(n);
            var i = "click";
            if (t) {
                if (t["data"]) {
                    i = t["data"]
                }
            }
            if (e["event"]["special"]["ztap"]["isTouchSupported"]) {
                r["on"]("touchstart", function (t) {
                    function l() {
                        clearTimeout(f);
                        r["off"]("touchmove", h)["off"]("touchend", c)
                    }

                    function c(t) {
                        l();
                        if (i == t["target"]) {
                            e["event"]["simulate"]("ztap", n, t)
                        }
                    }

                    function h(e) {
                        var t = e["originalEvent"]["touches"][0],
                            n = t["pageX"],
                            r = t["pageY"];
                        if (Math["abs"](n - o) > a || Math["abs"](r - u) > a) {
                            l()
                        }
                    }
                    var i = t["target"],
                        s = t["originalEvent"]["touches"][0],
                        o = s["pageX"],
                        u = s["pageY"],
                        a = e["event"]["special"]["ztap"]["distanceThreshold"],
                        f;
                    f = setTimeout(l, e["event"]["special"]["ztap"]["timeThreshold"]);
                    r["on"]("touchmove", h)["on"]("touchend", c)
                })
            } else {
                r["on"](i, function (t) {
                    e["event"]["simulate"]("ztap", n, t)
                })
            }
        }
    }
})(jQuery);

jQuery.easing["jswing"] = jQuery.easing["swing"];

jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function (e, t, n, r, i) {
        return jQuery.easing[jQuery.easing.def](e, t, n, r, i)
    },
    easeInQuad: function (e, t, n, r, i) {
        return r * (t /= i) * t + n
    },
    easeOutQuad: function (e, t, n, r, i) {
        return -r * (t /= i) * (t - 2) + n
    },
    easeInOutQuad: function (e, t, n, r, i) {
        if ((t /= i / 2) < 1) return r / 2 * t * t + n;
        return -r / 2 * (--t * (t - 2) - 1) + n
    },
    easeInCubic: function (e, t, n, r, i) {
        return r * (t /= i) * t * t + n
    },
    easeOutCubic: function (e, t, n, r, i) {
        return r * ((t = t / i - 1) * t * t + 1) + n
    },
    easeInOutCubic: function (e, t, n, r, i) {
        if ((t /= i / 2) < 1) return r / 2 * t * t * t + n;
        return r / 2 * ((t -= 2) * t * t + 2) + n
    },
    easeInQuart: function (e, t, n, r, i) {
        return r * (t /= i) * t * t * t + n
    },
    easeOutQuart: function (e, t, n, r, i) {
        return -r * ((t = t / i - 1) * t * t * t - 1) + n
    },
    easeInOutQuart: function (e, t, n, r, i) {
        if ((t /= i / 2) < 1) return r / 2 * t * t * t * t + n;
        return -r / 2 * ((t -= 2) * t * t * t - 2) + n
    },
    easeInQuint: function (e, t, n, r, i) {
        return r * (t /= i) * t * t * t * t + n
    },
    easeOutQuint: function (e, t, n, r, i) {
        return r * ((t = t / i - 1) * t * t * t * t + 1) + n
    },
    easeInOutQuint: function (e, t, n, r, i) {
        if ((t /= i / 2) < 1) return r / 2 * t * t * t * t * t + n;
        return r / 2 * ((t -= 2) * t * t * t * t + 2) + n
    },
    easeInSine: function (e, t, n, r, i) {
        return -r * Math.cos(t / i * (Math.PI / 2)) + r + n
    },
    easeOutSine: function (e, t, n, r, i) {
        return r * Math.sin(t / i * (Math.PI / 2)) + n
    },
    easeInOutSine: function (e, t, n, r, i) {
        return -r / 2 * (Math.cos(Math.PI * t / i) - 1) + n
    },
    easeInExpo: function (e, t, n, r, i) {
        return t == 0 ? n : r * Math.pow(2, 10 * (t / i - 1)) + n
    },
    easeOutExpo: function (e, t, n, r, i) {
        return t == i ? n + r : r * (-Math.pow(2, -10 * t / i) + 1) + n
    },
    easeInOutExpo: function (e, t, n, r, i) {
        if (t == 0) return n;
        if (t == i) return n + r;
        if ((t /= i / 2) < 1) return r / 2 * Math.pow(2, 10 * (t - 1)) + n;
        return r / 2 * (-Math.pow(2, -10 * --t) + 2) + n
    },
    easeInCirc: function (e, t, n, r, i) {
        return -r * (Math.sqrt(1 - (t /= i) * t) - 1) + n
    },
    easeOutCirc: function (e, t, n, r, i) {
        return r * Math.sqrt(1 - (t = t / i - 1) * t) + n
    },
    easeInOutCirc: function (e, t, n, r, i) {
        if ((t /= i / 2) < 1) return -r / 2 * (Math.sqrt(1 - t * t) - 1) + n;
        return r / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + n
    },
    easeInElastic: function (e, t, n, r, i) {
        var s = 1.70158;
        var o = 0;
        var u = r;
        if (t == 0) return n;
        if ((t /= i) == 1) return n + r;
        if (!o) o = i * .3;
        if (u < Math.abs(r)) {
            u = r;
            var s = o / 4
        } else var s = o / (2 * Math.PI) * Math.asin(r / u);
        return -(u * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * i - s) * 2 * Math.PI / o)) + n
    },
    easeOutElastic: function (e, t, n, r, i) {
        var s = 1.70158;
        var o = 0;
        var u = r;
        if (t == 0) return n;
        if ((t /= i) == 1) return n + r;
        if (!o) o = i * .3;
        if (u < Math.abs(r)) {
            u = r;
            var s = o / 4
        } else var s = o / (2 * Math.PI) * Math.asin(r / u);
        return u * Math.pow(2, -10 * t) * Math.sin((t * i - s) * 2 * Math.PI / o) + r + n
    },
    easeInOutElastic: function (e, t, n, r, i) {
        var s = 1.70158;
        var o = 0;
        var u = r;
        if (t == 0) return n;
        if ((t /= i / 2) == 2) return n + r;
        if (!o) o = i * .3 * 1.5;
        if (u < Math.abs(r)) {
            u = r;
            var s = o / 4
        } else var s = o / (2 * Math.PI) * Math.asin(r / u); if (t < 1) return -.5 * u * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * i - s) * 2 * Math.PI / o) + n;
        return u * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * i - s) * 2 * Math.PI / o) * .5 + r + n
    },
    easeInBack: function (e, t, n, r, i, s) {
        if (s == undefined) s = 1.70158;
        return r * (t /= i) * t * ((s + 1) * t - s) + n
    },
    easeOutBack: function (e, t, n, r, i, s) {
        if (s == undefined) s = 1.70158;
        return r * ((t = t / i - 1) * t * ((s + 1) * t + s) + 1) + n
    },
    easeInOutBack: function (e, t, n, r, i, s) {
        if (s == undefined) s = 1.70158;
        if ((t /= i / 2) < 1) return r / 2 * t * t * (((s *= 1.525) + 1) * t - s) + n;
        return r / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + n
    },
    easeInBounce: function (e, t, n, r, i) {
        return r - jQuery.easing.easeOutBounce(e, i - t, 0, r, i) + n
    },
    easeOutBounce: function (e, t, n, r, i) {
        if ((t /= i) < 1 / 2.75) {
            return r * 7.5625 * t * t + n
        } else if (t < 2 / 2.75) {
            return r * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + n
        } else if (t < 2.5 / 2.75) {
            return r * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + n
        } else {
            return r * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + n
        }
    },
    easeInOutBounce: function (e, t, n, r, i) {
        if (t < i / 2) return jQuery.easing.easeInBounce(e, t * 2, 0, r, i) * .5 + n;
        return jQuery.easing.easeOutBounce(e, t * 2 - i, 0, r, i) * .5 + r * .5 + n
    }
});
var q = null;
window.PR_SHOULD_USE_CONTINUATION = !0;
