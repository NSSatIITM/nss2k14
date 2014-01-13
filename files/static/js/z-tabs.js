function switchHeader() {
    if (document.documentElement.clientWidth > 1024) {
        if ($(window).scrollTop() <= 100) {
            $("#nav-wrap").removeClass("navbar-fixed-top")
        }
    }
}
window.log = function () {
    log.history = log.history || [];
    log.history.push(arguments);
    if (this.console) {
        var t = arguments,
            n;
        t.callee = t.callee.caller;
        n = [].slice.call(t);
        if (typeof console.log === "object") log.apply.call(console.log, console, n);
        else console.log.apply(console, n)
    }
};
(function (e) {
    function t() {}
    for (var n = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","), r; !! (r = n.pop());) {
        e[r] = e[r] || t
    }
})(function () {
    try {
        console.log();
        return window.console
    } catch (e) {
        return window.console = {}
    }
}());
! function (e) {
    "use strict";
    e(function () {
        e.support.transition = function () {
            var e = function () {
                var e, t = document.createElement("bootstrap"),
                    n = {
                        WebkitTransition: "webkitTransitionEnd",
                        MozTransition: "transitionend",
                        OTransition: "oTransitionEnd otransitionend",
                        transition: "transitionend"
                    };
                for (e in n)
                    if (void 0 !== t.style[e]) return n[e]
            }();
            return e && {
                end: e
            }
        }()
    })
}(window.jQuery), ! function (e) {
    "use strict";
    var t = '[data-dismiss="alert"]',
        n = function (n) {
            e(n).on("click", t, this.close)
        };
    n.prototype.close = function (t) {
        function n() {
            r.trigger("closed").remove()
        }
        var r, i = e(this),
            s = i.attr("data-target");
        s || (s = i.attr("href"), s = s && s.replace(/.*(?=#[^\s]*$)/, "")), r = e(s), t && t.preventDefault(), r.length || (r = i.hasClass("alert") ? i : i.parent()), r.trigger(t = e.Event("close")), t.isDefaultPrevented() || (r.removeClass("in"), e.support.transition && r.hasClass("fade") ? r.on(e.support.transition.end, n) : n())
    };
    var r = e.fn.alert;
    e.fn.alert = function (t) {
        return this.each(function () {
            var r = e(this),
                i = r.data("alert");
            i || r.data("alert", i = new n(this)), "string" == typeof t && i[t].call(r)
        })
    }, e.fn.alert.Constructor = n, e.fn.alert.noConflict = function () {
        return e.fn.alert = r, this
    }, e(document).on("click.alert.data-api", t, n.prototype.close)
}(window.jQuery), ! function (e) {
    "use strict";
    var t = function (t, n) {
        this.$element = e(t), this.options = e.extend({}, e.fn.button.defaults, n)
    };
    t.prototype.setState = function (e) {
        var t = "disabled",
            n = this.$element,
            r = n.data(),
            i = n.is("input") ? "val" : "html";
        e += "Text", r.resetText || n.data("resetText", n[i]()), n[i](r[e] || this.options[e]), setTimeout(function () {
            "loadingText" == e ? n.addClass(t).attr(t, t) : n.removeClass(t).removeAttr(t)
        }, 0)
    }, t.prototype.toggle = function () {
        var e = this.$element.closest('[data-toggle="buttons-radio"]');
        e && e.find(".active").removeClass("active"), this.$element.toggleClass("active")
    };
    var n = e.fn.button;
    e.fn.button = function (n) {
        return this.each(function () {
            var r = e(this),
                i = r.data("button"),
                s = "object" == typeof n && n;
            i || r.data("button", i = new t(this, s)), "toggle" == n ? i.toggle() : n && i.setState(n)
        })
    }, e.fn.button.defaults = {
        loadingText: "loading..."
    }, e.fn.button.Constructor = t, e.fn.button.noConflict = function () {
        return e.fn.button = n, this
    }, e(document).on("click.button.data-api", "[data-toggle^=button]", function (t) {
        var n = e(t.target);
        n.hasClass("btn") || (n = n.closest(".btn")), n.button("toggle")
    })
}(window.jQuery), ! function (e) {
    "use strict";
    var t = function (t, n) {
        this.$element = e(t), this.options = n, "hover" == this.options.pause && this.$element.on("mouseenter", e.proxy(this.pause, this)).on("mouseleave", e.proxy(this.cycle, this))
    };
    t.prototype = {
        cycle: function (t) {
            return t || (this.paused = !1), this.options.interval && !this.paused && (this.interval = setInterval(e.proxy(this.next, this), this.options.interval)), this
        },
        to: function (t) {
            var n = this.$element.find(".item.active"),
                r = n.parent().children(),
                i = r.index(n),
                s = this;
            if (!(t > r.length - 1 || 0 > t)) return this.sliding ? this.$element.one("slid", function () {
                s.to(t)
            }) : i == t ? this.pause().cycle() : this.slide(t > i ? "next" : "prev", e(r[t]))
        },
        pause: function (t) {
            return t || (this.paused = !0), this.$element.find(".next, .prev").length && e.support.transition.end && (this.$element.trigger(e.support.transition.end), this.cycle()), clearInterval(this.interval), this.interval = null, this
        },
        next: function () {
            return this.sliding ? void 0 : this.slide("next")
        },
        prev: function () {
            return this.sliding ? void 0 : this.slide("prev")
        },
        slide: function (t, n) {
            var r, i = this.$element.find(".item.active"),
                s = n || i[t](),
                o = this.interval,
                u = "next" == t ? "left" : "right",
                a = "next" == t ? "first" : "last",
                f = this;
            if (this.sliding = !0, o && this.pause(), s = s.length ? s : this.$element.find(".item")[a](), r = e.Event("slide", {
                relatedTarget: s[0]
            }), !s.hasClass("active")) {
                if (e.support.transition && this.$element.hasClass("slide")) {
                    if (this.$element.trigger(r), r.isDefaultPrevented()) return;
                    s.addClass(t), s[0].offsetWidth, i.addClass(u), s.addClass(u), this.$element.one(e.support.transition.end, function () {
                        s.removeClass([t, u].join(" ")).addClass("active"), i.removeClass(["active", u].join(" ")), f.sliding = !1, setTimeout(function () {
                            f.$element.trigger("slid")
                        }, 0)
                    })
                } else {
                    if (this.$element.trigger(r), r.isDefaultPrevented()) return;
                    i.removeClass("active"), s.addClass("active"), this.sliding = !1, this.$element.trigger("slid")
                }
                return o && this.cycle(), this
            }
        }
    };
    var n = e.fn.carousel;
    e.fn.carousel = function (n) {
        return this.each(function () {
            var r = e(this),
                i = r.data("carousel"),
                s = e.extend({}, e.fn.carousel.defaults, "object" == typeof n && n),
                o = "string" == typeof n ? n : s.slide;
            i || r.data("carousel", i = new t(this, s)), "number" == typeof n ? i.to(n) : o ? i[o]() : s.interval && i.cycle()
        })
    }, e.fn.carousel.defaults = {
        interval: 5e3,
        pause: "hover"
    }, e.fn.carousel.Constructor = t, e.fn.carousel.noConflict = function () {
        return e.fn.carousel = n, this
    }, e(document).on("click.carousel.data-api", "[data-slide]", function (t) {
        var n, r = e(this),
            i = e(r.attr("data-target") || (n = r.attr("href")) && n.replace(/.*(?=#[^\s]+$)/, "")),
            s = e.extend({}, i.data(), r.data());
        i.carousel(s), t.preventDefault()
    })
}(window.jQuery), ! function (e) {
    "use strict";
    var t = function (t, n) {
        this.$element = e(t), this.options = e.extend({}, e.fn.collapse.defaults, n), this.options.parent && (this.$parent = e(this.options.parent)), this.options.toggle && this.toggle()
    };
    t.prototype = {
        constructor: t,
        dimension: function () {
            var e = this.$element.hasClass("width");
            return e ? "width" : "height"
        },
        show: function () {
            var t, n, r, i;
            if (!this.transitioning) {
                if (t = this.dimension(), n = e.camelCase(["scroll", t].join("-")), r = this.$parent && this.$parent.find("> .accordion-group > .in"), r && r.length) {
                    if (i = r.data("collapse"), i && i.transitioning) return;
                    r.collapse("hide"), i || r.data("collapse", null)
                }
                this.$element[t](0), this.transition("addClass", e.Event("show"), "shown"), e.support.transition && this.$element[t](this.$element[0][n])
            }
        },
        hide: function () {
            var t;
            this.transitioning || (t = this.dimension(), this.reset(this.$element[t]()), this.transition("removeClass", e.Event("hide"), "hidden"), this.$element[t](0))
        },
        reset: function (e) {
            var t = this.dimension();
            return this.$element.removeClass("collapse")[t](e || "auto")[0].offsetWidth, this.$element[null !== e ? "addClass" : "removeClass"]("collapse"), this
        },
        transition: function (t, n, r) {
            var i = this,
                s = function () {
                    "show" == n.type && i.reset(), i.transitioning = 0, i.$element.trigger(r)
                };
            this.$element.trigger(n), n.isDefaultPrevented() || (this.transitioning = 1, this.$element[t]("in"), e.support.transition && this.$element.hasClass("collapse") ? this.$element.one(e.support.transition.end, s) : s())
        },
        toggle: function () {
            this[this.$element.hasClass("in") ? "hide" : "show"]()
        }
    };
    var n = e.fn.collapse;
    e.fn.collapse = function (n) {
        return this.each(function () {
            var r = e(this),
                i = r.data("collapse"),
                s = "object" == typeof n && n;
            i || r.data("collapse", i = new t(this, s)), "string" == typeof n && i[n]()
        })
    }, e.fn.collapse.defaults = {
        toggle: !0
    }, e.fn.collapse.Constructor = t, e.fn.collapse.noConflict = function () {
        return e.fn.collapse = n, this
    }, e(document).on("click.collapse.data-api", "[data-toggle=collapse]", function (t) {
        var n, r = e(this),
            i = r.attr("data-target") || t.preventDefault() || (n = r.attr("href")) && n.replace(/.*(?=#[^\s]+$)/, ""),
            s = e(i).data("collapse") ? "toggle" : r.data();
        r[e(i).hasClass("in") ? "addClass" : "removeClass"]("collapsed"), e(i).collapse(s)
    })
}(window.jQuery), ! function (e) {
    "use strict";

    function t() {
        e(r).each(function () {
            n(e(this)).removeClass("open")
        })
    }

    function n(t) {
        var n, r = t.attr("data-target");
        return r || (r = t.attr("href"), r = r && /#/.test(r) && r.replace(/.*(?=#[^\s]*$)/, "")), n = e(r), n.length || (n = t.parent()), n
    }
    var r = "[data-toggle=dropdown]",
        i = function (t) {
            var n = e(t).on("click.dropdown.data-api", this.toggle);
            e("html").on("click.dropdown.data-api", function () {
                n.parent().removeClass("open")
            })
        };
    i.prototype = {
        constructor: i,
        toggle: function () {
            var r, i, s = e(this);
            if (!s.is(".disabled, :disabled")) return r = n(s), i = r.hasClass("open"), t(), i || r.toggleClass("open"), s.focus(), !1
        },
        keydown: function (t) {
            var r, i, s, o, u;
            if (/(38|40|27)/.test(t.keyCode) && (r = e(this), t.preventDefault(), t.stopPropagation(), !r.is(".disabled, :disabled"))) {
                if (s = n(r), o = s.hasClass("open"), !o || o && 27 == t.keyCode) return r.click();
                i = e("[role=menu] li:not(.divider):visible a", s), i.length && (u = i.index(i.filter(":focus")), 38 == t.keyCode && u > 0 && u--, 40 == t.keyCode && i.length - 1 > u && u++, ~u || (u = 0), i.eq(u).focus())
            }
        }
    };
    var s = e.fn.dropdown;
    e.fn.dropdown = function (t) {
        return this.each(function () {
            var n = e(this),
                r = n.data("dropdown");
            r || n.data("dropdown", r = new i(this)), "string" == typeof t && r[t].call(n)
        })
    }, e.fn.dropdown.Constructor = i, e.fn.dropdown.noConflict = function () {
        return e.fn.dropdown = s, this
    }, e(document).on("click.dropdown.data-api touchstart.dropdown.data-api", t).on("click.dropdown touchstart.dropdown.data-api", ".dropdown form", function (e) {
        e.stopPropagation()
    }).on("touchstart.dropdown.data-api", ".dropdown-menu", function (e) {
        e.stopPropagation()
    }).on("click.dropdown.data-api touchstart.dropdown.data-api", r, i.prototype.toggle).on("keydown.dropdown.data-api touchstart.dropdown.data-api", r + ", [role=menu]", i.prototype.keydown)
}(window.jQuery), ! function (e) {
    "use strict";
    var t = function (t, n) {
        this.options = n, this.$element = e(t).delegate('[data-dismiss="modal"]', "click.dismiss.modal", e.proxy(this.hide, this)), this.options.remote && this.$element.find(".modal-body").load(this.options.remote)
    };
    t.prototype = {
        constructor: t,
        toggle: function () {
            return this[this.isShown ? "hide" : "show"]()
        },
        show: function () {
            var t = this,
                n = e.Event("show");
            this.$element.trigger(n), this.isShown || n.isDefaultPrevented() || (this.isShown = !0, this.escape(), this.backdrop(function () {
                var n = e.support.transition && t.$element.hasClass("fade");
                t.$element.parent().length || t.$element.appendTo(document.body), t.$element.show(), n && t.$element[0].offsetWidth, t.$element.addClass("in").attr("aria-hidden", !1), t.enforceFocus(), n ? t.$element.one(e.support.transition.end, function () {
                    t.$element.focus().trigger("shown")
                }) : t.$element.focus().trigger("shown")
            }))
        },
        hide: function (t) {
            t && t.preventDefault(), t = e.Event("hide"), this.$element.trigger(t), this.isShown && !t.isDefaultPrevented() && (this.isShown = !1, this.escape(), e(document).off("focusin.modal"), this.$element.removeClass("in").attr("aria-hidden", !0), e.support.transition && this.$element.hasClass("fade") ? this.hideWithTransition() : this.hideModal())
        },
        enforceFocus: function () {
            var t = this;
            e(document).on("focusin.modal", function (e) {
                t.$element[0] === e.target || t.$element.has(e.target).length || t.$element.focus()
            })
        },
        escape: function () {
            var e = this;
            this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.modal", function (t) {
                27 == t.which && e.hide()
            }) : this.isShown || this.$element.off("keyup.dismiss.modal")
        },
        hideWithTransition: function () {
            var t = this,
                n = setTimeout(function () {
                    t.$element.off(e.support.transition.end), t.hideModal()
                }, 500);
            this.$element.one(e.support.transition.end, function () {
                clearTimeout(n), t.hideModal()
            })
        },
        hideModal: function () {
            this.$element.hide().trigger("hidden"), this.backdrop()
        },
        removeBackdrop: function () {
            this.$backdrop.remove(), this.$backdrop = null
        },
        backdrop: function (t) {
            var n = this.$element.hasClass("fade") ? "fade" : "";
            if (this.isShown && this.options.backdrop) {
                var r = e.support.transition && n;
                this.$backdrop = e('<div class="modal-backdrop ' + n + '" />').appendTo(document.body), this.$backdrop.click("static" == this.options.backdrop ? e.proxy(this.$element[0].focus, this.$element[0]) : e.proxy(this.hide, this)), r && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), r ? this.$backdrop.one(e.support.transition.end, t) : t()
            } else !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), e.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(e.support.transition.end, e.proxy(this.removeBackdrop, this)) : this.removeBackdrop()) : t && t()
        }
    };
    var n = e.fn.modal;
    e.fn.modal = function (n) {
        return this.each(function () {
            var r = e(this),
                i = r.data("modal"),
                s = e.extend({}, e.fn.modal.defaults, r.data(), "object" == typeof n && n);
            i || r.data("modal", i = new t(this, s)), "string" == typeof n ? i[n]() : s.show && i.show()
        })
    }, e.fn.modal.defaults = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, e.fn.modal.Constructor = t, e.fn.modal.noConflict = function () {
        return e.fn.modal = n, this
    }, e(document).on("click.modal.data-api", '[data-toggle="modal"]', function (t) {
        var n = e(this),
            r = n.attr("href"),
            i = e(n.attr("data-target") || r && r.replace(/.*(?=#[^\s]+$)/, "")),
            s = i.data("modal") ? "toggle" : e.extend({
                remote: !/#/.test(r) && r
            }, i.data(), n.data());
        t.preventDefault(), i.modal(s).one("hide", function () {
            n.focus()
        })
    })
}(window.jQuery), ! function (e) {
    "use strict";
    var t = function (e, t) {
        this.init("tooltip", e, t)
    };
    t.prototype = {
        constructor: t,
        init: function (t, n, r) {
            var i, s;
            this.type = t, this.$element = e(n), this.options = this.getOptions(r), this.enabled = !0, "click" == this.options.trigger ? this.$element.on("click." + this.type, this.options.selector, e.proxy(this.toggle, this)) : "manual" != this.options.trigger && (i = "hover" == this.options.trigger ? "mouseenter" : "focus", s = "hover" == this.options.trigger ? "mouseleave" : "blur", this.$element.on(i + "." + this.type, this.options.selector, e.proxy(this.enter, this)), this.$element.on(s + "." + this.type, this.options.selector, e.proxy(this.leave, this))), this.options.selector ? this._options = e.extend({}, this.options, {
                trigger: "manual",
                selector: ""
            }) : this.fixTitle()
        },
        getOptions: function (t) {
            return t = e.extend({}, e.fn[this.type].defaults, t, this.$element.data()), t.delay && "number" == typeof t.delay && (t.delay = {
                show: t.delay,
                hide: t.delay
            }), t
        },
        enter: function (t) {
            var n = e(t.currentTarget)[this.type](this._options).data(this.type);
            return n.options.delay && n.options.delay.show ? (clearTimeout(this.timeout), n.hoverState = "in", this.timeout = setTimeout(function () {
                "in" == n.hoverState && n.show()
            }, n.options.delay.show), void 0) : n.show()
        },
        leave: function (t) {
            var n = e(t.currentTarget)[this.type](this._options).data(this.type);
            return this.timeout && clearTimeout(this.timeout), n.options.delay && n.options.delay.hide ? (n.hoverState = "out", this.timeout = setTimeout(function () {
                "out" == n.hoverState && n.hide()
            }, n.options.delay.hide), void 0) : n.hide()
        },
        show: function () {
            var e, t, n, r, i, s, o;
            if (this.hasContent() && this.enabled) {
                switch (e = this.tip(), this.setContent(), this.options.animation && e.addClass("fade"), s = "function" == typeof this.options.placement ? this.options.placement.call(this, e[0], this.$element[0]) : this.options.placement, t = /in/.test(s), e.detach().css({
                    top: 0,
                    left: 0,
                    display: "block"
                }).insertAfter(this.$element), n = this.getPosition(t), r = e[0].offsetWidth, i = e[0].offsetHeight, t ? s.split(" ")[1] : s) {
                case "bottom":
                    o = {
                        top: n.top + n.height,
                        left: n.left + n.width / 2 - r / 2
                    };
                    break;
                case "top":
                    o = {
                        top: n.top - i,
                        left: n.left + n.width / 2 - r / 2
                    };
                    break;
                case "left":
                    o = {
                        top: n.top + n.height / 2 - i / 2,
                        left: n.left - r
                    };
                    break;
                case "right":
                    o = {
                        top: n.top + n.height / 2 - i / 2,
                        left: n.left + n.width
                    }
                }
                e.offset(o).addClass(s).addClass("in")
            }
        },
        setContent: function () {
            var e = this.tip(),
                t = this.getTitle();
            e.find(".tooltip-inner")[this.options.html ? "html" : "text"](t), e.removeClass("fade in top bottom left right")
        },
        hide: function () {
            function t() {
                var t = setTimeout(function () {
                    n.off(e.support.transition.end).detach()
                }, 500);
                n.one(e.support.transition.end, function () {
                    clearTimeout(t), n.detach()
                })
            }
            var n = this.tip();
            return n.removeClass("in"), e.support.transition && this.$tip.hasClass("fade") ? t() : n.detach(), this
        },
        fixTitle: function () {
            var e = this.$element;
            (e.attr("title") || "string" != typeof e.attr("data-original-title")) && e.attr("data-original-title", e.attr("title") || "").removeAttr("title")
        },
        hasContent: function () {
            return this.getTitle()
        },
        getPosition: function (t) {
            return e.extend({}, t ? {
                top: 0,
                left: 0
            } : this.$element.offset(), {
                width: this.$element[0].offsetWidth,
                height: this.$element[0].offsetHeight
            })
        },
        getTitle: function () {
            var e, t = this.$element,
                n = this.options;
            return e = t.attr("data-original-title") || ("function" == typeof n.title ? n.title.call(t[0]) : n.title)
        },
        tip: function () {
            return this.$tip = this.$tip || e(this.options.template)
        },
        validate: function () {
            this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
        },
        enable: function () {
            this.enabled = !0
        },
        disable: function () {
            this.enabled = !1
        },
        toggleEnabled: function () {
            this.enabled = !this.enabled
        },
        toggle: function (t) {
            var n = e(t.currentTarget)[this.type](this._options).data(this.type);
            n[n.tip().hasClass("in") ? "hide" : "show"]()
        },
        destroy: function () {
            this.hide().$element.off("." + this.type).removeData(this.type)
        }
    };
    var n = e.fn.tooltip;
    e.fn.tooltip = function (n) {
        return this.each(function () {
            var r = e(this),
                i = r.data("tooltip"),
                s = "object" == typeof n && n;
            i || r.data("tooltip", i = new t(this, s)), "string" == typeof n && i[n]()
        })
    }, e.fn.tooltip.Constructor = t, e.fn.tooltip.defaults = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover",
        title: "",
        delay: 0,
        html: !1
    }, e.fn.tooltip.noConflict = function () {
        return e.fn.tooltip = n, this
    }
}(window.jQuery), ! function (e) {
    "use strict";
    var t = function (e, t) {
        this.init("popover", e, t)
    };
    t.prototype = e.extend({}, e.fn.tooltip.Constructor.prototype, {
        constructor: t,
        setContent: function () {
            var e = this.tip(),
                t = this.getTitle(),
                n = this.getContent();
            e.find(".popover-title")[this.options.html ? "html" : "text"](t), e.find(".popover-content")[this.options.html ? "html" : "text"](n), e.removeClass("fade top bottom left right in")
        },
        hasContent: function () {
            return this.getTitle() || this.getContent()
        },
        getContent: function () {
            var e, t = this.$element,
                n = this.options;
            return e = t.attr("data-content") || ("function" == typeof n.content ? n.content.call(t[0]) : n.content)
        },
        tip: function () {
            return this.$tip || (this.$tip = e(this.options.template)), this.$tip
        },
        destroy: function () {
            this.hide().$element.off("." + this.type).removeData(this.type)
        }
    });
    var n = e.fn.popover;
    e.fn.popover = function (n) {
        return this.each(function () {
            var r = e(this),
                i = r.data("popover"),
                s = "object" == typeof n && n;
            i || r.data("popover", i = new t(this, s)), "string" == typeof n && i[n]()
        })
    }, e.fn.popover.Constructor = t, e.fn.popover.defaults = e.extend({}, e.fn.tooltip.defaults, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"></div></div></div>'
    }), e.fn.popover.noConflict = function () {
        return e.fn.popover = n, this
    }
}(window.jQuery), ! function (e) {
    "use strict";

    function t(t, n) {
        var r, i = e.proxy(this.process, this),
            s = e(t).is("body") ? e(window) : e(t);
        this.options = e.extend({}, e.fn.scrollspy.defaults, n), this.$scrollElement = s.on("scroll.scroll-spy.data-api", i), this.selector = (this.options.target || (r = e(t).attr("href")) && r.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a", this.$body = e("body"), this.refresh(), this.process()
    }
    t.prototype = {
        constructor: t,
        refresh: function () {
            var t, n = this;
            this.offsets = e([]), this.targets = e([]), t = this.$body.find(this.selector).map(function () {
                var t = e(this),
                    r = t.data("target") || t.attr("href"),
                    i = /^#\w/.test(r) && e(r);
                return i && i.length && [
                    [i.position().top + n.$scrollElement.scrollTop(), r]
                ] || null
            }).sort(function (e, t) {
                return e[0] - t[0]
            }).each(function () {
                n.offsets.push(this[0]), n.targets.push(this[1])
            })
        },
        process: function () {
            var e, t = this.$scrollElement.scrollTop() + this.options.offset,
                n = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight,
                r = n - this.$scrollElement.height(),
                i = this.offsets,
                s = this.targets,
                o = this.activeTarget;
            if (t >= r) return o != (e = s.last()[0]) && this.activate(e);
            for (e = i.length; e--;) o != s[e] && t >= i[e] && (!i[e + 1] || i[e + 1] >= t) && this.activate(s[e])
        },
        activate: function (t) {
            var n, r;
            this.activeTarget = t, e(this.selector).parent(".active").removeClass("active"), r = this.selector + '[data-target="' + t + '"],' + this.selector + '[href="' + t + '"]', n = e(r).parent("li").addClass("active"), n.parent(".dropdown-menu").length && (n = n.closest("li.dropdown").addClass("active")), n.trigger("activate")
        }
    };
    var n = e.fn.scrollspy;
    e.fn.scrollspy = function (n) {
        return this.each(function () {
            var r = e(this),
                i = r.data("scrollspy"),
                s = "object" == typeof n && n;
            i || r.data("scrollspy", i = new t(this, s)), "string" == typeof n && i[n]()
        })
    }, e.fn.scrollspy.Constructor = t, e.fn.scrollspy.defaults = {
        offset: 10
    }, e.fn.scrollspy.noConflict = function () {
        return e.fn.scrollspy = n, this
    }, e(window).on("load", function () {
        e('[data-spy="scroll"]').each(function () {
            var t = e(this);
            t.scrollspy(t.data())
        })
    })
}(window.jQuery), ! function (e) {
    "use strict";
    var t = function (t) {
        this.element = e(t)
    };
    t.prototype = {
        constructor: t,
        show: function () {
            var t, n, r, i = this.element,
                s = i.closest("ul:not(.dropdown-menu)"),
                o = i.attr("data-target");
            o || (o = i.attr("href"), o = o && o.replace(/.*(?=#[^\s]*$)/, "")), i.parent("li").hasClass("active") || (t = s.find(".active:last a")[0], r = e.Event("show", {
                relatedTarget: t
            }), i.trigger(r), r.isDefaultPrevented() || (n = e(o), this.activate(i.parent("li"), s), this.activate(n, n.parent(), function () {
                i.trigger({
                    type: "shown",
                    relatedTarget: t
                })
            })))
        },
        activate: function (t, n, r) {
            function i() {
                s.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), t.addClass("active"), o ? (t[0].offsetWidth, t.addClass("in")) : t.removeClass("fade"), t.parent(".dropdown-menu") && t.closest("li.dropdown").addClass("active"), r && r()
            }
            var s = n.find("> .active"),
                o = r && e.support.transition && s.hasClass("fade");
            o ? s.one(e.support.transition.end, i) : i(), s.removeClass("in")
        }
    };
    var n = e.fn.tab;
    e.fn.tab = function (n) {
        return this.each(function () {
            var r = e(this),
                i = r.data("tab");
            i || r.data("tab", i = new t(this)), "string" == typeof n && i[n]()
        })
    }, e.fn.tab.Constructor = t, e.fn.tab.noConflict = function () {
        return e.fn.tab = n, this
    }, e(document).on("click.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function (t) {
        t.preventDefault(), e(this).tab("show")
    })
}(window.jQuery), ! function (e) {
    "use strict";
    var t = function (t, n) {
        this.$element = e(t), this.options = e.extend({}, e.fn.typeahead.defaults, n), this.matcher = this.options.matcher || this.matcher, this.sorter = this.options.sorter || this.sorter, this.highlighter = this.options.highlighter || this.highlighter, this.updater = this.options.updater || this.updater, this.source = this.options.source, this.$menu = e(this.options.menu), this.shown = !1, this.listen()
    };
    t.prototype = {
        constructor: t,
        select: function () {
            var e = this.$menu.find(".active").attr("data-value");
            return this.$element.val(this.updater(e)).change(), this.hide()
        },
        updater: function (e) {
            return e
        },
        show: function () {
            var t = e.extend({}, this.$element.position(), {
                height: this.$element[0].offsetHeight
            });
            return this.$menu.insertAfter(this.$element).css({
                top: t.top + t.height,
                left: t.left
            }).show(), this.shown = !0, this
        },
        hide: function () {
            return this.$menu.hide(), this.shown = !1, this
        },
        lookup: function () {
            var t;
            return this.query = this.$element.val(), !this.query || this.query.length < this.options.minLength ? this.shown ? this.hide() : this : (t = e.isFunction(this.source) ? this.source(this.query, e.proxy(this.process, this)) : this.source, t ? this.process(t) : this)
        },
        process: function (t) {
            var n = this;
            return t = e.grep(t, function (e) {
                return n.matcher(e)
            }), t = this.sorter(t), t.length ? this.render(t.slice(0, this.options.items)).show() : this.shown ? this.hide() : this
        },
        matcher: function (e) {
            return~ e.toLowerCase().indexOf(this.query.toLowerCase())
        },
        sorter: function (e) {
            for (var t, n = [], r = [], i = []; t = e.shift();) t.toLowerCase().indexOf(this.query.toLowerCase()) ? ~t.indexOf(this.query) ? r.push(t) : i.push(t) : n.push(t);
            return n.concat(r, i)
        },
        highlighter: function (e) {
            var t = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
            return e.replace(RegExp("(" + t + ")", "ig"), function (e, t) {
                return "<strong>" + t + "</strong>"
            })
        },
        render: function (t) {
            var n = this;
            return t = e(t).map(function (t, r) {
                return t = e(n.options.item).attr("data-value", r), t.find("a").html(n.highlighter(r)), t[0]
            }), t.first().addClass("active"), this.$menu.html(t), this
        },
        next: function () {
            var t = this.$menu.find(".active").removeClass("active"),
                n = t.next();
            n.length || (n = e(this.$menu.find("li")[0])), n.addClass("active")
        },
        prev: function () {
            var e = this.$menu.find(".active").removeClass("active"),
                t = e.prev();
            t.length || (t = this.$menu.find("li").last()), t.addClass("active")
        },
        listen: function () {
            this.$element.on("blur", e.proxy(this.blur, this)).on("keypress", e.proxy(this.keypress, this)).on("keyup", e.proxy(this.keyup, this)), this.eventSupported("keydown") && this.$element.on("keydown", e.proxy(this.keydown, this)), this.$menu.on("click", e.proxy(this.click, this)).on("mouseenter", "li", e.proxy(this.mouseenter, this))
        },
        eventSupported: function (e) {
            var t = e in this.$element;
            return t || (this.$element.setAttribute(e, "return;"), t = "function" == typeof this.$element[e]), t
        },
        move: function (e) {
            if (this.shown) {
                switch (e.keyCode) {
                case 9:
                case 13:
                case 27:
                    e.preventDefault();
                    break;
                case 38:
                    e.preventDefault(), this.prev();
                    break;
                case 40:
                    e.preventDefault(), this.next()
                }
                e.stopPropagation()
            }
        },
        keydown: function (t) {
            this.suppressKeyPressRepeat = ~e.inArray(t.keyCode, [40, 38, 9, 13, 27]), this.move(t)
        },
        keypress: function (e) {
            this.suppressKeyPressRepeat || this.move(e)
        },
        keyup: function (e) {
            switch (e.keyCode) {
            case 40:
            case 38:
            case 16:
            case 17:
            case 18:
                break;
            case 9:
            case 13:
                if (!this.shown) return;
                this.select();
                break;
            case 27:
                if (!this.shown) return;
                this.hide();
                break;
            default:
                this.lookup()
            }
            e.stopPropagation(), e.preventDefault()
        },
        blur: function () {
            var e = this;
            setTimeout(function () {
                e.hide()
            }, 150)
        },
        click: function (e) {
            e.stopPropagation(), e.preventDefault(), this.select()
        },
        mouseenter: function (t) {
            this.$menu.find(".active").removeClass("active"), e(t.currentTarget).addClass("active")
        }
    };
    var n = e.fn.typeahead;
    e.fn.typeahead = function (n) {
        return this.each(function () {
            var r = e(this),
                i = r.data("typeahead"),
                s = "object" == typeof n && n;
            i || r.data("typeahead", i = new t(this, s)), "string" == typeof n && i[n]()
        })
    }, e.fn.typeahead.defaults = {
        source: [],
        items: 8,
        menu: '<ul class="typeahead dropdown-menu"></ul>',
        item: '<li><a href="#"></a></li>',
        minLength: 1
    }, e.fn.typeahead.Constructor = t, e.fn.typeahead.noConflict = function () {
        return e.fn.typeahead = n, this
    }, e(document).on("focus.typeahead.data-api", '[data-provide="typeahead"]', function (t) {
        var n = e(this);
        n.data("typeahead") || (t.preventDefault(), n.typeahead(n.data()))
    })
}(window.jQuery), ! function (e) {
    "use strict";
    var t = function (t, n) {
        this.options = e.extend({}, e.fn.affix.defaults, n), this.$window = e(window).on("scroll.affix.data-api", e.proxy(this.checkPosition, this)).on("click.affix.data-api", e.proxy(function () {
            setTimeout(e.proxy(this.checkPosition, this), 1)
        }, this)), this.$element = e(t), this.checkPosition()
    };
    t.prototype.checkPosition = function () {
        if (this.$element.is(":visible")) {
            var t, n = e(document).height(),
                r = this.$window.scrollTop(),
                i = this.$element.offset(),
                s = this.options.offset,
                o = s.bottom,
                u = s.top,
                a = "affix affix-top affix-bottom";
            "object" != typeof s && (o = u = s), "function" == typeof u && (u = s.top()), "function" == typeof o && (o = s.bottom()), t = null != this.unpin && r + this.unpin <= i.top ? !1 : null != o && i.top + this.$element.height() >= n - o ? "bottom" : null != u && u >= r ? "top" : !1, this.affixed !== t && (this.affixed = t, this.unpin = "bottom" == t ? i.top - r : null, this.$element.removeClass(a).addClass("affix" + (t ? "-" + t : "")))
        }
    };
    var n = e.fn.affix;
    e.fn.affix = function (n) {
        return this.each(function () {
            var r = e(this),
                i = r.data("affix"),
                s = "object" == typeof n && n;
            i || r.data("affix", i = new t(this, s)), "string" == typeof n && i[n]()
        })
    }, e.fn.affix.Constructor = t, e.fn.affix.defaults = {
        offset: 0
    }, e.fn.affix.noConflict = function () {
        return e.fn.affix = n, this
    }, e(window).on("load", function () {
        e('[data-spy="affix"]').each(function () {
            var t = e(this),
                n = t.data();
            n.offset = n.offset || {}, n.offsetBottom && (n.offset.bottom = n.offsetBottom), n.offsetTop && (n.offset.top = n.offsetTop), t.affix(n)
        })
    })
}(window.jQuery);
(function (e, t, n, r) {
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
        log: function (t) {
            if (e("#console")["length"] != 0) {
                e("<div/>")["css"]({
                    marginTop: -24
                })["html"](t)["prependTo"]("#console")["animate"]({
                    marginTop: 0
                }, 300)["animate"]({
                    backgroundColor: "#ffffff"
                }, 800)
            } else {
                if (console) {
                    console["log"](t)
                }
            }
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
            var n = t / 1;
            e3;
            var r = Math["abs"](n)
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
    e["zozo"]["core"]["browser"]["init"]()
})(jQuery, window, document);
(function (e, t, n, r) {
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
        log: function (t) {
            if (e("#console")["length"] != 0) {
                e("<div/>")["css"]({
                    marginTop: -24
                })["html"](t)["prependTo"]("#console")["animate"]({
                    marginTop: 0
                }, 300)["animate"]({
                    backgroundColor: "#ffffff"
                }, 800)
            } else {
                if (console) {
                    console["log"](t)
                }
            }
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
            var n = t / 1;
            e3;
            var r = Math["abs"](n)
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
    e["zozo"]["core"]["browser"]["init"]()
})(jQuery, window, document);
(function (e, t, n, r) {
    if (t["zozo"] == null) {
        t["zozo"] = {}
    }
    var i = function (t, n) {
        this["elem"] = t;
        this["$elem"] = e(t);
        this["options"] = n;
        this["metadata"] = this["$elem"]["data"]("options") ? this["$elem"]["data"]("options") : {};
        this["attrdata"] = this["$elem"]["data"]() ? this["$elem"]["data"]() : {};
        this["tabID"];
        this["$tabGroup"];
        this["$tabs"];
        this["$container"];
        this["$contents"];
        this["autoplayIntervalId"];
        this["currentTab"];
        this["BrowserDetection"] = e["zozo"]["core"]["browser"];
        this["Hash"] = e["zozo"]["core"]["hashHelper"]
    };
    var s = {
        pluginName: "zozoTabs",
        elementSpacer: "<span class='z-tab-spacer' style='clear: both;display: block;'></span>",
        commaRegExp: /,/g,
        space: " ",
        classes: {
            prefix: "z-",
            wrapper: "z-tabs",
            tabGroup: "z-tabs-nav",
            tab: "z-tab",
            first: "z-first",
            last: "z-last",
            active: "z-active",
            link: "z-link",
            container: "z-container",
            content: "z-content",
            shadows: "z-shadows",
            rounded: "z-rounded",
            themes: {
                gray: "gray",
                black: "black",
                blue: "blue",
                crystal: "crystal",
                green: "green",
                silver: "silver",
                red: "red",
                orange: "orange",
                deepblue: "deepblue",
                white: "white"
            },
            styles: {
                normal: "normal",
                underlined: "underlined",
                simple: "simple"
            },
            orientations: {
                vertical: "vertical",
                horizontal: "horizontal"
            },
            sizes: {
                mini: "mini",
                small: "small",
                medium: "medium",
                large: "large",
                xlarge: "xlarge",
                xxlarge: "xxlarge"
            },
            positions: {
                topLeft: "top-left",
                topCenter: "top-center",
                topRight: "top-right",
                topCompact: "top-compact",
                bottomLeft: "bottom-left",
                bottomCenter: "bottom-center",
                bottomRight: "bottom-right",
                bottomCompact: "bottom-compact"
            }
        }
    };
    i["prototype"] = {
        defaults: {
            animation: {
                duration: 200,
                effects: "fadeIn",
                easing: "swing"
            },
            autoplay: {
                interval: 0
            },
            defaultTab: "tab1",
            event: "click",
            hashAttribute: "data-link",
            position: s["classes"]["positions"]["topLeft"],
            orientation: s["classes"]["orientations"]["horizontal"],
            rounded: true,
            shadows: true,
            tabWidth: 150,
            tabHeight: 51,
            theme: s["classes"]["themes"]["silver"],
            urlBased: false,
            select: function (e, t) {},
            size: s["classes"]["sizes"]["medium"],
            style: s["classes"]["styles"]["normal"]
        },
        init: function () {
            var r = this;
            r["settings"] = e["extend"](true, {}, r["defaults"], r["options"], r["metadata"], r["attrdata"]);
            o["updateClasses"](r);
            o["bindEvents"](r);
            if (r["settings"]["urlBased"] === true) {
                if (n["location"]["hash"]) {
                    var i = r["Hash"]["get"](r["tabID"]);
                    if (i != null) {
                        o["showTab"](r, i)
                    } else {
                        o["showTab"](r, r["settings"]["defaultTab"])
                    }
                } else {
                    o["showTab"](r, r["settings"]["defaultTab"])
                } if (typeof e(t)["hashchange"] != "undefined") {
                    e(t)["hashchange"](function () {
                        var e = r["Hash"]["get"](r["tabID"]);
                        if (r["currentTab"]["attr"](r["settings"]["hashAttribute"]) !== e) {
                            o["showTab"](r, e)
                        }
                    })
                } else {
                    e(t)["bind"]("hashchange", function () {
                        var e = r["Hash"]["get"](r["tabID"]);
                        if (r["currentTab"]["attr"](r["settings"]["hashAttribute"]) !== e) {
                            o["showTab"](r, e)
                        }
                    })
                }
            } else {
                o["showTab"](r, r["settings"]["defaultTab"])
            }
            o["initAutoPlay"](r);
            return this
        },
        setOptions: function (t) {
            var n = this;
            n["settings"] = e["extend"](true, n["settings"], t);
            o["updateClasses"](n);
            o["initAutoPlay"](n);
            return n
        },
        add: function (e, t) {
            var n = this;
            var r = o["create"](e, t);
            r["tab"]["appendTo"](n.$tabGroup)["hide"]()["fadeIn"](500);
            r["content"]["appendTo"](n.$container);
            o["updateClasses"](n);
            o["bindEvent"](n, r["tab"]);
            return n
        },
        remove: function (t) {
            var n = this;
            var r = t - 1;
            var i = n["$tabs"]["eq"](r);
            var s = n["$contents"]["eq"](r);
            s["remove"]();
            i["fadeOut"](500, function () {
                e(this)["remove"]();
                o["updateClasses"](n)
            });
            return n
        },
        select: function (e) {
            var t = this;
            o["changeHash"](t, t["$elem"]["find"]("> ul > li")["eq"](e - 1)["attr"](t["settings"]["hashAttribute"]));
            return t
        },
        first: function () {
            var e = this;
            e["select"](o["getFirst"]());
            return e
        },
        prev: function () {
            var e = this;
            var t = parseInt(e["currentTab"]["index"]()) + 1;
            if (t <= o["getFirst"](e)) {
                e["select"](o["getLast"](e))
            } else {
                e["select"](t - 1);
                o["log"]("prev tab : " + (t - 1))
            }
            return e
        },
        next: function (e) {
            e = e ? e : this;
            var t = parseInt(e["currentTab"]["index"]()) + 1;
            var n = parseInt(e["$tabGroup"]["children"]("li")["size"]());
            if (t >= n) {
                e["select"](o["getFirst"]())
            } else {
                e["select"](t + 1);
                o["log"]("next tab : " + (t + 1))
            }
            return e
        },
        last: function () {
            var e = this;
            e["select"](o["getLast"](e));
            return e
        },
        play: function (e) {
            var t = this;
            if (e == null || e < 0) {
                e = 2;
                e3
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
        }
    };
    var o = {
        log: function (e) {
            if (console) {
                console["log"](e)
            }
        },
        isEmpty: function (e) {
            return !e || 0 === e["length"]
        },
        updateClasses: function (t) {
            t["tabID"] = t["$elem"]["attr"]("id");
            t["$tabGroup"] = t["$elem"]["find"]("> ul")["addClass"](s["classes"]["tabGroup"]);
            t["$tabs"] = t["$tabGroup"]["find"]("> li");
            t["$container"] = t["$elem"]["find"]("> div");
            t["$contents"] = t["$container"]["find"]("> div");
            t["$container"]["addClass"](s["classes"]["container"]);
            t["$contents"]["addClass"](s["classes"]["content"]);
            t["$tabs"]["each"](function (n, r) {
                e(r)["removeClass"](s["classes"]["first"])["removeClass"](s["classes"]["last"])["attr"](t["settings"]["hashAttribute"], "tab" + (n + 1))["addClass"](s["classes"]["tab"])["find"]("a")["addClass"](s["classes"]["link"])
            });
            t["$tabs"]["filter"](s["classes"]["first"] + ":not(:first-child)")["removeClass"](s["classes"]["first"]);
            t["$tabs"]["filter"](s["classes"]["last"] + ":not(:last-child)")["removeClass"](s["classes"]["last"]);
            t["$tabs"]["filter"]("li:first-child")["addClass"](s["classes"]["first"]);
            t["$tabs"]["filter"]("li:last-child")["addClass"](s["classes"]["last"]);
            var n = o["toArray"](s["classes"]["styles"]);
            var r = o["toArray"](s["classes"]["themes"]);
            var i = o["toArray"](s["classes"]["sizes"]);
            var u = o["toArray"](s["classes"]["positions"]);
            t["$elem"]["removeClass"](s["classes"]["wrapper"])["removeClass"](s["classes"]["orientations"]["vertical"])["removeClass"](s["classes"]["orientations"]["horizontal"])["removeClass"](s["classes"]["rounded"])["removeClass"](s["classes"]["shadows"])["removeClass"](n["join"]()["replace"](s["commaRegExp"], s["space"]))["removeClass"](u["join"]()["replace"](s["commaRegExp"], s["space"]))["removeClass"](i["join"]()["replace"](s["commaRegExp"], s["space"]))["addClass"](t["settings"]["style"])["addClass"](t["settings"]["size"]);
            if (!o["isEmpty"](t["settings"]["theme"])) {
                t["$elem"]["removeClass"](r["join"]()["replace"](s["commaRegExp"], s["space"]))["addClass"](t["settings"]["theme"])
            } else {
                if (!t["$elem"]["hasClasses"](r)) {
                    t["$elem"]["addClass"](s["classes"]["themes"]["silver"])
                }
            } if (t["settings"]["rounded"] === true) {
                t["$elem"]["addClass"](s["classes"]["rounded"])
            }
            if (t["settings"]["shadows"] === true) {
                t["$elem"]["addClass"](s["classes"]["shadows"])
            }
            o["checkPosition"](t)
        },
        checkPosition: function (t) {
            t["$container"]["appendTo"](t.$elem);
            t["$tabGroup"]["prependTo"](t.$elem);
            t["$elem"]["find"]("> span.z-tab-spacer")["remove"]();
            t["$elem"]["addClass"](s["classes"]["wrapper"]);
            if (t["settings"]["orientation"] === s["classes"]["orientations"]["vertical"]) {
                t["$elem"]["addClass"](s["classes"]["orientations"]["vertical"]);
                var n = t["settings"]["tabHeight"];
                switch (t["settings"]["size"]) {
                case s["classes"]["sizes"]["mini"]:
                    n = 33;
                    break;;
                case s["classes"]["sizes"]["small"]:
                    n = 39;
                    break;;
                case s["classes"]["sizes"]["medium"]:
                    n = 45;
                    break;;
                case s["classes"]["sizes"]["large"]:
                    n = 51;
                    break;;
                case s["classes"]["sizes"]["xlarge"]:
                    n = 57;
                    break;;
                case s["classes"]["sizes"]["xxlarge"]:
                    n = 63;
                    break;;
                default:
                    n = 45;
                }
                var r = parseInt(t["$tabGroup"]["children"]("li")["size"]());
                var i = n * r - 1;
                t["$container"]["css"]({
                    "min-height": i,
                    padding: 0,
                    "margin-top": 0,
                    "margin-bottom": 0
                });
                if (t["settings"]["position"] !== s["classes"]["positions"]["topRight"]) {
                    t["settings"]["position"] = s["classes"]["positions"]["topLeft"]
                }
            } else {
                t["settings"]["orientation"] = s["classes"]["orientations"]["horizontal"];
                t["$elem"]["addClass"](s["classes"]["orientations"]["horizontal"]);
                if (t["settings"]["position"] === s["classes"]["positions"]["bottomLeft"] || t["settings"]["position"] === s["classes"]["positions"]["bottomCenter"] || t["settings"]["position"] === s["classes"]["positions"]["bottomRight"] || t["settings"]["position"] === s["classes"]["positions"]["bottomCompact"]) {
                    t["$tabGroup"]["appendTo"](t.$elem);
                    e(s["elementSpacer"])["appendTo"](t.$elem);
                    t["$container"]["prependTo"](t.$elem)
                }
            } if (t["settings"]["position"] === s["classes"]["positions"]["topCompact"] || t["settings"]["position"] === s["classes"]["positions"]["bottomCompact"]) {
                var o = parseInt(t["$tabGroup"]["children"]("li")["size"]());
                var u = t["settings"]["tabWidth"] * o;
                switch (t["BrowserDetection"]["browser"]) {
                case "Firefox":
                    break;;
                case "Explorer":
                    switch (t["BrowserDetection"]["version"]) {
                    case 7:
                        u = u + 1;
                        break;;
                    default:
                    }
                    break;;
                default:
                    u = u + 1;
                }
                t["$elem"]["css"]("width", u + "px");
                t["$tabs"]["each"](function (n, r) {
                    e(r)["css"]("width", t["settings"]["tabWidth"] + "px")
                })
            } else {
                t["$elem"]["css"]("width", "");
                t["$tabs"]["each"](function (t, n) {
                    e(n)["css"]("width", "")
                })
            }
            t["$elem"]["addClass"](t["settings"]["position"])
        },
        bindEvents: function (t) {
            t["$tabs"]["each"](function () {
                o["bindEvent"](t, e(this))
            })
        },
        bindEvent: function (e, t) {
            t["on"](e["settings"]["event"], function () {
                e["stop"]();
                o["changeHash"](e, t["attr"](e["settings"]["hashAttribute"]))
            })
        },
        showTab: function (e, t) {
            if (t != null) {
                e["$tabs"]["removeClass"](s["classes"]["active"]);
                e["currentTab"] = e["$tabs"]["filter"]("li[" + e["settings"]["hashAttribute"] + "=" + t + "]");
                e["currentTab"]["addClass"](s["classes"]["active"]);
                var n = e["$tabs"]["index"](e["currentTab"]);
                if (e["settings"]["animation"] !== false && e["settings"]["animation"] != null) {
                    if (e["settings"]["animation"]["effects"] === "fadeIn") {
                        e["$contents"]["removeClass"](s["classes"]["active"])["hide"]()["eq"](n)["addClass"](s["classes"]["active"])["fadeIn"](e["settings"]["animation"]["duration"], e["settings"]["animation"]["easing"])
                    } else {
                        if (e["settings"]["animation"]["effects"] === "slideDown") {
                            e["$contents"]["removeClass"](s["classes"]["active"])["slideUp"](200)["eq"](n)["addClass"](s["classes"]["active"])["slideDown"](e["settings"]["animation"]["duration"], e["settings"]["animation"]["easing"])
                        } else {
                            if (e["settings"]["animation"]["effects"] === "slideToggle") {
                                e["$contents"]["removeClass"](s["classes"]["active"])["hide"]()["eq"](n)["addClass"](s["classes"]["active"])["slideToggle"](e["settings"]["animation"]["duration"], e["settings"]["animation"]["easing"])
                            } else {
                                if (e["settings"]["animation"]["effects"] === "fadeToggle") {
                                    e["$contents"]["removeClass"](s["classes"]["active"])["hide"]()["eq"](n)["addClass"](s["classes"]["active"])["fadeToggle"](e["settings"]["animation"]["duration"], e["settings"]["animation"]["easing"])
                                } else {
                                    if (e["settings"]["animation"]["effects"] === "slideUp") {
                                        e["$contents"]["removeClass"](s["classes"]["active"])["slideUp"](200)["eq"](n)["addClass"](s["classes"]["active"])["slideDown"](e["settings"]["animation"]["duration"], e["settings"]["animation"]["easing"])
                                    }
                                }
                            }
                        }
                    }
                } else {
                    e["$contents"]["removeClass"](s["classes"]["active"])["hide"]()["eq"](n)["addClass"](s["classes"]["active"])["show"]()
                } if (typeof e["settings"]["select"] == "function") {
                    e["settings"]["select"]["call"](this, e["currentTab"], e["$contents"]["eq"](n))
                }
            }
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
        changeHash: function (n, r) {
            if (n["settings"]["urlBased"] === true) {
                if (typeof e(t)["hashchange"] != "undefined") {
                    n["Hash"]["set"](n["tabID"], r)
                } else {
                    o["log"]("browser: " + n["BrowserDetection"]["browser"] + " version: " + n["BrowserDetection"]["version"]);
                    if (n["BrowserDetection"]["browser"] === "Explorer" && n["BrowserDetection"]["version"] <= 7) {
                        o["log"]("IE");
                        o["showTab"](n, r)
                    } else {
                        n["Hash"]["set"](n["tabID"], r)
                    }
                }
            } else {
                o["showTab"](n, r)
            }
        },
        getFirst: function (e) {
            return 1
        },
        getLast: function (e) {
            return parseInt(e["$tabGroup"]["children"]("li")["size"]())
        },
        create: function (t, n) {
            var r = e("<li><a>" + t + "</a></li>");
            var i = e("<div>" + n + "</div>");
            return {
                tab: r,
                content: i
            }
        },
        toArray: function (t) {
            return e["map"](t, function (e, t) {
                return e
            })
        }
    };
    i["defaults"] = i["prototype"]["defaults"];
    e["fn"]["zozoTabs"] = function (t) {
        return this["each"](function () {
            if (r == e(this)["data"](s["pluginName"])) {
                var n = (new i(this, t))["init"]();
                e(this)["data"](s["pluginName"], n)
            }
        })
    };
    t["zozo"]["tabs"] = i;
    e(n)["ready"](function () {
        e("[data-role='z-tab']")["each"](function (t, n) {
            if (!e(n)["zozoTabs"]()) {
                e(n)["zozoTabs"]()
            }
        })
    })
})(jQuery, window, document);

(function (e, t, n) {
    function f(e) {
        e = e || location.href;
        return "#" + e.replace(/^[^#]*#?(.*)$/, "$1")
    }
    var r = "hashchange",
        i = document,
        s, o = e.event.special,
        u = i.documentMode,
        a = "on" + r in t && (u === n || u > 7);
    e.fn[r] = function (e) {
        return e ? this.bind(r, e) : this.trigger(r)
    };
    e.fn[r].delay = 50;
    o[r] = e.extend(o[r], {
        setup: function () {
            if (a) {
                return false
            }
            e(s.start)
        },
        teardown: function () {
            if (a) {
                return false
            }
            e(s.stop)
        }
    });
    s = function () {
        function m() {
            var n = f(),
                i = v(u);
            if (n !== u) {
                p(u = n, i);
                e(t).trigger(r)
            } else {
                if (i !== u) {
                    location.href = location.href.replace(/#.*/, "") + i
                }
            }
            o = setTimeout(m, e.fn[r].delay)
        }
        var s = {}, o, u = f(),
            l = function (e) {
                return e
            }, p = l,
            v = l;
        s.start = function () {
            o || m()
        };
        s.stop = function () {
            o && clearTimeout(o);
            o = n
        };
        ( /msie/.test(navigator.userAgent.toLowerCase()) ) && !a && function () {
            var t, n;
            s.start = function () {
                if (!t) {
                    n = e.fn[r].src;
                    n = n && n + f();
                    t = e('<iframe tabindex="-1" title="empty"/>').hide().one("load", function () {
                        n || p(f());
                        m()
                    }).attr("src", n || "javascript:0").insertAfter("body")[0].contentWindow;
                    i.onpropertychange = function () {
                        try {
                            if (event.propertyName === "title") {
                                t.document.title = i.title
                            }
                        } catch (e) {}
                    }
                }
            };
            s.stop = l;
            v = function () {
                return f(t.location.href)
            };
            p = function (n, s) {
                var o = t.document,
                    u = e.fn[r].domain;
                if (n !== s) {
                    o.title = i.title;
                    o.open();
                    u && o.write('<script>document.domain="' + u + '"</script>');
                    o.close();
                    t.location.hash = n
                }
            }
        }();
        return s
    }()
})(jQuery, this);
! function (e) {
    function t(t, n) {
        var r = e.proxy(this.process, this),
            i = e(t).is("body") ? e(window) : e(t),
            s;
        this.options = e.extend({}, e.fn.scrollspy.defaults, n), this.$scrollElement = i.on("scroll.scroll-spy.data-api", r), this.selector = (this.options.target || (s = e(t).attr("href")) && s.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a", this.$body = e("body"), this.refresh(), this.process()
    }
    t.prototype = {
        constructor: t,
        refresh: function () {
            var t = this,
                n;
            this.offsets = e([]), this.targets = e([]), n = this.$body.find(this.selector).map(function () {
                var t = e(this),
                    n = t.data("target") || t.attr("href"),
                    r = /^#\w/.test(n) && e(n);
                return r && r.length && [
                    [r.position().top, n]
                ] || null
            }).sort(function (e, t) {
                return e[0] - t[0]
            }).each(function () {
                t.offsets.push(this[0]), t.targets.push(this[1])
            })
        },
        process: function () {
            var e = this.$scrollElement.scrollTop() + this.options.offset,
                t = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight,
                n = t - this.$scrollElement.height(),
                r = this.offsets,
                i = this.targets,
                s = this.activeTarget,
                o;
            if (e >= n) return s != (o = i.last()[0]) && this.activate(o);
            for (o = r.length; o--;) s != i[o] && e >= r[o] && (!r[o + 1] || e <= r[o + 1]) && this.activate(i[o])
        },
        activate: function (t) {
            var n, r;
            this.activeTarget = t, e(this.selector).parent(".active").removeClass("active"), r = this.selector + '[data-target="' + t + '"],' + this.selector + '[href="' + t + '"]', n = e(r).parent("li").addClass("active"), n.parent(".dropdown-menu").length && (n = n.closest("li.dropdown").addClass("active")), n.trigger("activate")
        }
    }, e.fn.scrollspy = function (n) {
        return this.each(function () {
            var r = e(this),
                i = r.data("scrollspy"),
                s = typeof n == "object" && n;
            i || r.data("scrollspy", i = new t(this, s)), typeof n == "string" && i[n]()
        })
    }, e.fn.scrollspy.Constructor = t, e.fn.scrollspy.defaults = {
        offset: 10
    }, e(window).on("load", function () {
        e('[data-spy="scroll"]').each(function () {
            var t = e(this);
            t.scrollspy(t.data())
        })
    })
}(window.jQuery);
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
(function (e, t, n, r) {
    if (t["zozo"] == null) {
        t["zozo"] = {}
    }
    var i = function (t, n) {
        this["elem"] = t;
        this["$elem"] = e(t);
        this["options"] = n;
        this["metadata"] = this["$elem"]["data"]("options") ? this["$elem"]["data"]("options") : {};
        this["attrdata"] = this["$elem"]["data"]() ? this["$elem"]["data"]() : {};
        this["tabID"];
        this["$tabGroup"];
        this["$mobileNav"];
        this["$mobileDropdownArrow"];
        this["$tabs"];
        this["$container"];
        this["$contents"];
        this["autoplayIntervalId"];
        this["resizeWindowIntervalId"];
        this["currentTab"];
        this["BrowserDetection"] = e["zozo"]["core"]["browser"];
        this["Hash"] = e["zozo"]["core"]["hashHelper"];
        this["lastWindowHeight"];
        this["lastWindowWidth"];
        this["responsive"]
    };
    var s = {
        pluginName: "zozoTabs",
        elementSpacer: "<span class='z-tab-spacer' style='clear: both;display: block;'></span>",
        commaRegExp: /,/g,
        space: " ",
        responsive: {
            largeDesktop: 1200,
            desktop: 960,
            tablet: 720,
            phone: 480
        },
        modes: {
            tabs: "tabs",
            stacked: "stacked",
            menu: "menu",
            slider: "slider"
        },
        states: {
            closed: "z-state-closed",
            open: "z-state-open",
            active: "z-state-active"
        },
        events: {
            click: "click",
            mousover: "mouseover",
            touchend: "touchend",
            touchstart: "touchstart",
            touchmove: "touchmove"
        },
        animation: {
            effects: {
                fade: "fade",
                none: "none",
                slideH: "slideH",
                slideV: "slideV",
                slideLeft: "slideLeft",
                slideRight: "slideRight",
                slideTop: "slideTop",
                slideDown: "slideDown"
            },
            types: {
                css: "css",
                jquery: "jquery"
            }
        },
        classes: {
            prefix: "z-",
            wrapper: "z-tabs",
            tabGroup: "z-tabs-nav",
            tab: "z-tab",
            first: "z-first",
            last: "z-last",
            left: "z-left",
            right: "z-right",
            firstCol: "z-first-col",
            lastCol: "z-last-col",
            firstRow: "z-first-row",
            lastRow: "z-last-row",
            active: "z-active",
            link: "z-link",
            container: "z-container",
            content: "z-content",
            shadows: "z-shadows",
            bordered: "z-bordered",
            dark: "z-dark",
            spaced: "z-spaced",
            rounded: "z-rounded",
            themes: ["gray", "black", "blue", "crystal", "green", "silver", "red", "orange", "deepblue", "white"],
            flatThemes: ["flat-turquoise", "flat-emerald", "flat-peter-river", "flat-amethyst", "flat-wet-asphalt", "flat-green-sea", "flat-nephritis", "flat-belize-hole", "flat-wisteria", "flat-midnight-blue", "flat-sun-flower", "flat-carrot", "flat-alizarin", "flat-graphite", "flat-concrete", "flat-orange", "flat-pumpkin", "flat-pomegranate", "flat-silver", "flat-asbestos", "flat-zozo-red"],
            styles: ["contained", "pills", "underlined", "clean", "minimal"],
            orientations: ["vertical", "horizontal"],
            sizes: ["mini", "small", "medium", "large", "xlarge", "xxlarge"],
            positions: {
                top: "top",
                topLeft: "top-left",
                topCenter: "top-center",
                topRight: "top-right",
                topCompact: "top-compact",
                bottom: "bottom",
                bottomLeft: "bottom-left",
                bottomCenter: "bottom-center",
                bottomRight: "bottom-right",
                bottomCompact: "bottom-compact"
            }
        }
    }, o = "flat",
        u = "ready",
        a = "error",
        f = "select",
        l = "activate",
        c = "deactivate",
        h = "hover",
        p = "beforeSend",
        d = "contentLoad",
        v = "contentUrl",
        m = "disabled",
        g = "z-icon-menu",
        y = "z-disabled",
        b = "z-stacked",
        w = "z-icons-light",
        E = "z-icons-dark",
        S = "z-spinner",
        x = "underlined",
        T = "contained",
        N = "clean",
        C = "pills",
        k = "vertical",
        L = "horizontal",
        A = "top-left",
        O = "top-right",
        M = "top",
        _ = "bottom",
        D = "bottom-right",
        P = "bottom-left",
        H = "mobile",
        B = "z-multiline",
        j = "transition",
        F = "z-animating",
        I = "z-dropdown-arrow",
        q = "responsive",
        R = "z-content-inner";
    i["prototype"] = {
        defaults: {
            delayAjax: 50,
            animation: {
                duration: 600,
                effects: "slideH",
                easing: "easeInQuad",
                type: "css",
                mobileDuration: 0
            },
            autoContentHeight: true,
            autoplay: {
                interval: 0,
                smart: true
            },
            bordered: true,
            dark: false,
            cacheAjax: true,
            deeplinking: false,
            defaultTab: "tab1",
            event: s["events"]["click"],
            maxRows: 3,
            minWidth: 200,
            minWindowWidth: 480,
            manualTabId: false,
            mobileAutoScrolling: null,
            mobileNav: true,
            mobileMenuIcon: null,
            mode: s["modes"]["tabs"],
            multiline: false,
            hashAttribute: "data-link",
            position: s["classes"]["positions"]["topLeft"],
            orientation: L,
            ready: function () {},
            responsive: true,
            responsiveDelay: 0,
            rounded: false,
            shadows: true,
            theme: "silver",
            urlBased: false,
            scrollToContent: false,
            select: function () {},
            spaced: false,
            deactivate: function () {},
            beforeSend: function () {},
            contentLoad: function () {},
            next: null,
            prev: null,
            error: function () {},
            noTabs: false,
            size: "medium",
            style: T,
            tabRatio: 1.03,
            tabRatioCompact: 1.031,
            original: {
                itemWidth: 0,
                itemMinWidth: null,
                itemMaxWidth: null,
                groupWidth: 0,
                initGroupWidth: 0,
                itemD: 0,
                itemM: 0,
                firstRowWidth: 0,
                lastRowItems: 0,
                count: 0,
                contentMaxHeight: null,
                contentMaxWidth: null,
                navHeight: null,
                position: null,
                bottomLeft: null,
                tabGroupWidth: 0
            },
            animating: false
        },
        init: function () {
            var r = this;
            r["settings"] = e["extend"](true, {}, r["defaults"], r["options"], r["metadata"], r["attrdata"]);
            if (r["settings"]["contentUrls"] != null) {
                r["$elem"]["find"]("> div > div")["each"](function (t, n) {
                    e(n)["data"](v, r["settings"]["contentUrls"][t])
                })
            }
            U["initAnimation"](r, true);
            U["updateClasses"](r);
            U["checkWidth"](r, true);
            U["bindEvents"](r);
            U["initAutoPlay"](r);
            e["zozo"]["core"]["plugins"]["easing"](r);
            if (r["settings"]["deeplinking"] === true) {
                if (n["location"]["hash"]) {
                    var i = r["Hash"]["get"](r["tabID"]);
                    if (i != null) {
                        U["showTab"](r, i)
                    } else {
                        U["showTab"](r, r["settings"]["defaultTab"])
                    }
                } else {
                    U["showTab"](r, r["settings"]["defaultTab"])
                } if (typeof e(t)["hashchange"] != "undefined") {
                    e(t)["hashchange"](function () {
                        var e = r["Hash"]["get"](r["tabID"]);
                        if (!r["currentTab"] || r["currentTab"]["attr"](r["settings"]["hashAttribute"]) !== e) {
                            U["showTab"](r, e)
                        }
                    })
                } else {
                    e(t)["bind"]("hashchange", function () {
                        var e = r["Hash"]["get"](r["tabID"]);
                        if (!r["currentTab"] || r["currentTab"]["attr"](r["settings"]["hashAttribute"]) !== e) {
                            U["showTab"](r, e)
                        }
                    })
                }
            } else {
                if (r["settings"]["noTabs"] === true) {
                    U["showContent"](r, U["getActive"](r, 0))
                } else {
                    U["showTab"](r, r["settings"]["defaultTab"])
                }
            }
            U["checkWidth"](r);
            r["$elem"]["trigger"](u, r.$elem);
            return r
        },
        setOptions: function (t) {
            var n = this;
            n["settings"] = e["extend"](true, n["settings"], t);
            U["initAnimation"](n);
            U["updateClasses"](n, true);
            U["checkWidth"](n, false, true);
            U["initAutoPlay"](n);
            return n
        },
        add: function (e, t, n) {
            var r = this;
            var i = U["create"](e, t);
            i["tab"]["appendTo"](r.$tabGroup)["hide"]()["fadeIn"](300)["css"]("display", "");
            i["content"]["appendTo"](r.$container);
            U["updateClasses"](r);
            n && r["settings"]["deeplinking"] === true && i["tab"]["attr"](r["settings"]["hashAttribute"], n);
            U["bindEvent"](r, i["tab"]);
            setTimeout(function () {
                U["checkWidth"](r, false, true)
            }, 350);
            return r
        },
        insertAfter: function (e, t, n) {
            var r = this;
            return r
        },
        insertBefore: function (e, t, n) {
            var r = this;
            return r
        },
        remove: function (t) {
            var n = this;
            var r = t - 1;
            var i = n["$tabs"]["eq"](r);
            var s = n["$contents"]["eq"](r);
            s["remove"]();
            i["fadeOut"](300, function () {
                e(this)["remove"]();
                U["updateClasses"](n)
            });
            setTimeout(function () {
                U["checkWidth"](n, false, true)
            }, 350);
            return n
        },
        enable: function (e) {
            var t = this;
            var n = t["$tabs"]["eq"](e);
            if (n["length"]) {
                n["removeClass"](y);
                n["data"](m, false)
            }
            return t
        },
        disable: function (e) {
            var t = this;
            var n = t["$tabs"]["eq"](e);
            if (n["length"]) {
                n["addClass"](y);
                n["data"](m, true)
            }
            return t
        },
        select: function (e) {
            var t = this;
            if (t["settings"]["animating"] !== true) {
                if (t["settings"]["noTabs"] === true) {
                    U["showContent"](t, U["getActive"](t, e))
                } else {
                    U["changeHash"](t, t["$tabs"]["eq"](e)["attr"](t["settings"]["hashAttribute"]))
                }
            }
            return t
        },
        first: function () {
            var e = this;
            e["select"](U["getFirst"]());
            return e
        },
        prev: function () {
            var t = this;
            var n = U["getActiveIndex"](t);
            if (n <= U["getFirst"](t)) {
                t["select"](U["getLast"](t))
            } else {
                t["select"](n - 1);
                e["zozo"]["core"]["debug"]["log"]("prev tab : " + (n - 1))
            }
            return t
        },
        next: function (t) {
            t = t ? t : this;
            var n = U["getActiveIndex"](t);
            var r = parseInt(U["getLast"](t));
            if (n >= r) {
                t["select"](U["getFirst"]())
            } else {
                t["select"](n + 1);
                e["zozo"]["core"]["debug"]["log"]("next tab : " + (n + 1))
            }
            return t
        },
        last: function () {
            var e = this;
            e["select"](U["getLast"](e));
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
        refresh: function () {
            var e = this;
            e["$contents"]["filter"](".z-active")["css"]({
                display: "block"
            })["show"]();
            U["checkWidth"](e);
            return e
        }
    };
    var U = {
        initAnimation: function (t, n) {
            var r = e["zozo"]["core"]["utils"]["toArray"](s["animation"]["effects"]);
            if (e["inArray"](t["settings"]["animation"]["effects"], r) < 0) {
                t["settings"]["animation"]["effects"] = s["animation"]["effects"]["slideH"]
            }
            if (jQuery["browser"]["mobile"]) {
                t["settings"]["shadows"] = false
            }
            if (e["zozo"]["core"]["support"]["css"]["transition"] === false) {
                t["settings"]["animation"]["type"] = s["animation"]["types"]["jquery"];
                if (jQuery["browser"]["mobile"]) {
                    t["settings"]["animation"]["duration"] = 0
                }
            }
            if (t["settings"]["animation"]["effects"] === s["animation"]["effects"]["none"] && n === true) {
                t["settings"]["animation"]["duration"] = 0
            }
        },
        updateClasses: function (t, n) {
            t["$elem"]["find"]("*")["stop"](true, true);
            t["tabID"] = t["$elem"]["attr"]("id");
            t["$tabGroup"] = t["$elem"]["find"]("> ul")["addClass"](s["classes"]["tabGroup"])["not"](".z-tabs-mobile")["addClass"]("z-tabs-desktop");
            t["$tabs"] = t["$tabGroup"]["find"]("> li");
            t["$container"] = t["$elem"]["find"]("> div");
            t["$contents"] = t["$container"]["find"]("> div");
            if (t["$tabGroup"]["length"] <= 0) {
                t["settings"]["noTabs"] = true
            }
            var r = e["zozo"]["core"]["support"]["css"]["transition"];
            var i = t["settings"]["noTabs"];
            t["$container"]["addClass"](s["classes"]["container"])["css"]({
                _transition: ""
            });
            t["$contents"]["addClass"](s["classes"]["content"]);
            t["$contents"]["each"](function (t, n) {
                var r = e(n);
                r["css"]({
                    left: "",
                    top: "",
                    opacity: "",
                    display: "",
                    _transition: ""
                });
                r["hasClass"](s["classes"]["active"]) && r["show"]()["css"]({
                    display: "block",
                    _transition: ""
                })
            });
            if (i != true) {
                t["$tabs"]["each"](function (n, r) {
                    var i = e(r);
                    i["removeClass"](s["classes"]["first"])["removeClass"](s["classes"]["last"])["removeClass"](s["classes"]["left"])["removeClass"](s["classes"]["right"])["removeClass"](s["classes"]["firstCol"])["removeClass"](s["classes"]["lastCol"])["removeClass"](s["classes"]["firstRow"])["removeClass"](s["classes"]["lastRow"])["css"]({
                        width: "",
                        "float": ""
                    })["addClass"](s["classes"]["tab"])["find"]("a")["addClass"](s["classes"]["link"]);
                    U["isTabDisabled"](i) && t["disable"](n);
                    t["settings"]["deeplinking"] === false && e(r)["attr"](t["settings"]["hashAttribute"], "tab" + (n + 1))
                });
                t["$tabs"]["filter"]("li:first-child")["addClass"](s["classes"]["first"]);
                t["$tabs"]["filter"]("li:last-child")["addClass"](s["classes"]["last"])
            }
            var u = e["zozo"]["core"]["utils"]["toArray"](s["classes"]["positions"]);
            t["$elem"]["removeClass"](s["classes"]["wrapper"])["removeClass"](s["classes"]["rounded"])["removeClass"](s["classes"]["shadows"])["removeClass"](s["classes"]["spaced"])["removeClass"](s["classes"]["bordered"])["removeClass"](s["classes"]["dark"])["removeClass"](B)["removeClass"](w)["removeClass"](E)["removeClass"](b)["removeClass"](o)["removeClass"](s["classes"]["styles"]["join"](s["space"]))["removeClass"](s["classes"]["orientations"]["join"](s["space"]))["removeClass"](u["join"]()["replace"](s["commaRegExp"], s["space"]))["removeClass"](s["classes"]["sizes"]["join"](s["space"]))["removeClass"](s["classes"]["themes"]["join"](s["space"]))["removeClass"](s["classes"]["flatThemes"]["join"](s["space"]))["addClass"](h)["addClass"](t["settings"]["style"])["addClass"](t["settings"]["size"])["addClass"](t["settings"]["theme"]);
            U["isFlatTheme"](t) && t["$elem"]["addClass"](o);
            U["isLightTheme"](t) ? t["$elem"]["addClass"](E) : t["$elem"]["addClass"](w);
            t["settings"]["rounded"] === true && t["$elem"]["addClass"](s["classes"]["rounded"]);
            t["settings"]["shadows"] === true && t["$elem"]["addClass"](s["classes"]["shadows"]);
            t["settings"]["bordered"] === true && t["$elem"]["addClass"](s["classes"]["bordered"]);
            t["settings"]["dark"] === true && t["$elem"]["addClass"](s["classes"]["dark"]);
            t["settings"]["spaced"] === true && t["$elem"]["addClass"](s["classes"]["spaced"]);
            t["settings"]["multiline"] === true && t["$elem"]["addClass"](B);
            U["checkPosition"](t);
            if (t["$elem"]["find"]("> ul." + "z-tabs-mobile")["length"]) {
                t["$mobileNav"] = t["$elem"]["find"]("> ul." + "z-tabs-mobile")
            } else {
                t["$mobileNav"] = e("<ul class='z-tabs-nav z-tabs-mobile'><li><a class='z-link' style='text-align: left;'><span class='z-title'>Overview</span><span class='z-arrow'></span></a></li></ul>")
            } if (t["$mobileNav"]) {
                t["$tabGroup"]["before"](t.$mobileNav);
                if (t["$elem"]["find"]("> i." + I)["length"]) {
                    t["$mobileDropdownArrow"] = t["$elem"]["find"]("> i." + I)
                } else {
                    t["$mobileDropdownArrow"] = e("<i class='z-dropdown-arrow'></i>")
                }
                t["$tabGroup"]["before"](t.$mobileDropdownArrow)
            }
            jQuery["browser"]["mobile"] && t["$elem"]["removeClass"](h)
        },
        checkPosition: function (t) {
            t["$container"]["appendTo"](t.$elem);
            t["$tabGroup"]["prependTo"](t.$elem);
            t["$elem"]["find"]("> span.z-tab-spacer")["remove"]();
            t["$elem"]["addClass"](s["classes"]["wrapper"]);
            var n = U["isTop"](t);
            t["$contents"]["each"](function (t, n) {
                var r = e(n);
                var i = R;
                if (!r["find"]("> div." + R)["length"]) {
                    if (r["hasClass"]("z-row")) {
                        r["removeClass"]("z-row");
                        i = "z-row " + R
                    }
                    r["wrapInner"]("<div class='" + i + "'></div>");
                    e["zozo"]["core"]["content"]["check"](r)
                }
            });
            if (t["settings"]["orientation"] === k) {
                if (t["settings"]["position"] !== O) {
                    t["settings"]["position"] = A
                }
            } else {
                t["settings"]["orientation"] = L;
                if (n === false) {
                    t["$tabGroup"]["appendTo"](t.$elem);
                    e(s["elementSpacer"])["appendTo"](t.$elem);
                    t["$container"]["prependTo"](t.$elem)
                }
            }
            t["$elem"]["addClass"](t["settings"]["orientation"]);
            t["$elem"]["addClass"](t["settings"]["position"]);
            if (n) {
                t["$elem"]["addClass"](M)
            } else {
                t["$elem"]["addClass"](_)
            }
        },
        bindEvents: function (n) {
            var r = n["settings"]["animation"]["effects"] === s["animation"]["effects"]["none"] ? 0 : n["settings"]["animation"]["duration"];
            n["$tabs"]["each"](function () {
                var r = e(this);
                var i = r["find"]("a")["attr"]("href");
                var s = r["find"]("a")["attr"]("target");
                if (!e["trim"](i)["length"]) {
                    U["bindEvent"](n, r)
                } else {
                    r["on"]("ztap", {
                        data: n["settings"]["event"]
                    }, function (n) {
                        e["trim"](s)["length"] ? t["open"](i, s) : t["location"] = i;
                        n["preventDefault"]()
                    })
                }
            });
            e(t)["resize"](function () {
                if (n["lastWindowWidth"] !== e(t)["width"]()) {
                    clearInterval(n["resizeWindowIntervalId"]);
                    n["resizeWindowIntervalId"] = setTimeout(function () {
                        n["lastWindowHeight"] = e(t)["height"]();
                        n["lastWindowWidth"] = e(t)["width"]();
                        U["checkWidth"](n)
                    }, n["settings"]["responsiveDelay"])
                }
            });
            var i = n["settings"]["next"];
            if (i != null) {
                e(i)["on"](s["events"]["click"], function (e) {
                    e["preventDefault"]();
                    n["next"]()
                })
            }
            var o = n["settings"]["prev"];
            if (o != null) {
                e(o)["on"](s["events"]["click"], function (e) {
                    e["preventDefault"]();
                    n["prev"]()
                })
            }
            if (n["$mobileNav"]) {
                n["$mobileNav"]["find"]("li")["on"]("ztap", {
                    data: n["settings"]["event"]
                }, function (e) {
                    e["preventDefault"]();
                    if (n["$mobileNav"]["hasClass"](s["states"]["closed"])) {
                        n["$mobileNav"]["removeClass"](s["states"]["closed"]);
                        n["$tabGroup"]["removeClass"]("z-hide-menu");
                        U["mobileNavAutoScroll"](n)
                    } else {
                        n["$mobileNav"]["addClass"](s["states"]["closed"]);
                        n["$tabGroup"]["addClass"]("z-hide-menu")
                    }
                    U["refreshParents"](n, r)
                })
            }
            n["lastWindowHeight"] = e(t)["height"]();
            n["lastWindowWidth"] = e(t)["width"]();
            n["$elem"]["bind"](u, n["settings"]["ready"]);
            n["$elem"]["bind"](f, n["settings"]["select"]);
            n["$elem"]["bind"](c, n["settings"]["deactivate"]);
            n["$elem"]["bind"](a, n["settings"]["error"]);
            n["$elem"]["bind"](d, n["settings"]["contentLoad"])
        },
        bindEvent: function (n, r) {
            r["on"]("ztap", {
                data: n["settings"]["event"]
            }, function (i) {
                i["preventDefault"]();
                if (n["settings"]["autoplay"] !== false && n["settings"]["autoplay"] != null) {
                    if (n["settings"]["autoplay"]["smart"] === true) {
                        n["stop"]()
                    }
                }
                U["changeHash"](n, r["attr"](n["settings"]["hashAttribute"]));
                if (U["allowAutoScrolling"](n) === true && U["isMobile"](n)) {
                    e(t["opera"] ? "html" : "html, body")["animate"]({
                        scrollTop: n["$elem"]["offset"]()["top"] + n["settings"]["mobileAutoScrolling"]["contentTopOffset"]
                    }, 0)
                }
            })
        },
        mobileNavAutoScroll: function (n) {
            if (U["allowAutoScrolling"](n) === true) {
                e(t["opera"] ? "html" : "html, body")["animate"]({
                    scrollTop: n["$mobileNav"]["offset"]()["top"] + n["settings"]["mobileAutoScrolling"]["navTopOffset"]
                }, 0)
            }
            return n
        },
        showTab: function (e, t) {
            if (t != null && e["settings"]["animating"] !== true) {
                var n = e["$tabs"]["filter"]("li[" + e["settings"]["hashAttribute"] + "=" + t + "]");
                var r = e["$tabs"]["index"](n);
                var i = U["getActive"](e, r);
                if (i["enabled"] && i["preIndex"] !== i["index"] && e["settings"]["noTabs"] !== true) {
                    e["currentTab"] = n;
                    e["$tabs"]["removeClass"](s["classes"]["active"]);
                    e["currentTab"]["addClass"](s["classes"]["active"]);
                    U["mobileNav"](e, false, i["index"]);
                    if (i["contentUrl"]) {
                        if (i["preIndex"] === -1) {
                            i["content"]["css"]({
                                opacity: "",
                                left: "",
                                top: "",
                                position: "relative"
                            })["show"]()
                        }
                        U["ajaxRequest"](e, i)
                    } else {
                        U["showContent"](e, i)
                    }
                }
            }
        },
        getActiveIndex: function (e) {
            var t;
            if (e["settings"]["noTabs"] === true) {
                t = e["$container"]["find"](">div." + s["classes"]["active"])["index"]()
            } else {
                if (e["currentTab"]) {
                    t = parseInt(e["currentTab"]["index"]())
                } else {
                    t = e["$tabGroup"]["find"]("li." + s["classes"]["active"])["index"]()
                }
            }
            return t
        },
        getActive: function (t, n) {
            var r = U["getActiveIndex"](t);
            var i = t["$contents"]["eq"](n);
            var o = t["$tabs"]["eq"](n);
            var u = t["$tabs"]["eq"](r);
            var a = e["zozo"]["core"]["support"]["css"]["transition"];
            var f = t["settings"]["animation"]["effects"] === s["animation"]["effects"]["none"] ? 0 : t["settings"]["animation"]["duration"];
            var l = {
                index: n,
                tab: o,
                content: i,
                contentInner: i["find"]("> .z-content-inner"),
                enabled: U["isTabDisabled"](o) === false,
                contentUrl: i["data"](v),
                noAnimation: false,
                transition: a,
                duration: f,
                preIndex: r,
                preTab: u,
                preContent: t["$contents"]["eq"](r)
            };
            return l
        },
        ajaxRequest: function (t, n) {
            var r = {};
            e["ajax"]({
                type: "GET",
                cache: t["settings"]["cacheAjax"] === true,
                url: n["contentUrl"],
                dataType: "html",
                data: r,
                beforeSend: function (e, n) {
                    t["$container"]["append"]('<span class="' + S + '"></span>')
                },
                error: function (e, r, i) {
                    if (e["status"] == 404) {
                        n["contentInner"]["html"]("<h4 style='color:red;'>Sorry, error: 404 - the requested content could not be found.</h4>")
                    } else {
                        n["contentInner"]["html"]("<h4 style='color:red;'>An error occurred: " + r + "\nError: " + e + " code: " + e["status"] + "</h4>")
                    }
                    t["settings"]["error"] && typeof t["settings"]["error"] == typeof Function && t["$elem"]["trigger"](a, e)
                },
                complete: function (e, r) {
                    setTimeout(function () {
                        U["showContent"](t, n);
                        t["$container"]["find"](">." + S)["remove"]()
                    }, t["settings"]["delayAjax"])
                },
                success: function (e, r, i) {
                    setTimeout(function () {
                        n["contentInner"]["html"](e);
                        t["$elem"]["trigger"](d, {
                            tab: n["tab"],
                            content: n["content"],
                            index: n["index"]
                        });
                        console["dir"](n)
                    }, t["settings"]["delayAjax"])
                }
            });
            return t
        },
        showContent: function (e, t) {
            if (t["preIndex"] !== t["index"] && e["settings"]["animating"] !== true) {
                e["settings"]["animating"] = true;
                e["$contents"]["removeClass"](s["classes"]["active"]);
                t["content"]["addClass"](s["classes"]["active"]);
                if (t["preIndex"] === -1) {
                    z["init"](e, t)
                } else {
                    var n = U["getElementSize"](t["preContent"])["height"];
                    var r = U["getElementSize"](t["content"])["height"];
                    var i = U["getContentHeight"](e, null, true)["height"];
                    if (e["settings"]["orientation"] === L && e["settings"]["autoContentHeight"] === true) {
                        i = n > r ? n : r
                    }
                    var o = e["settings"]["animation"]["effects"] === s["animation"]["effects"]["slideH"] || e["settings"]["animation"]["effects"] === s["animation"]["effects"]["slideRight"] ? e["$container"]["width"]() : o = i;
                    if (t["preIndex"] < t["index"] && e["settings"]["animation"]["effects"] === s["animation"]["effects"]["slideV"]) {
                        var u = U["isLarger"](n, r);
                        u > o && (o = u)
                    }
                    var a = -o;
                    var f = o;
                    if (t["preIndex"] > t["index"]) {
                        a = o;
                        f = -o
                    }
                    z["before"](e, t);
                    if (e["settings"]["animation"]["effects"] === s["animation"]["effects"]["slideH"]) {
                        U["animate"](e, t["preContent"], null, {
                            left: a + "px"
                        });
                        U["animate"](e, t["content"], {
                            left: f + "px"
                        }, {
                            left: 0 + "px"
                        })
                    } else {
                        if (e["settings"]["animation"]["effects"] === s["animation"]["effects"]["slideV"]) {
                            U["animate"](e, t["preContent"], null, {
                                left: 0,
                                top: a + "px"
                            });
                            U["animate"](e, t["content"], {
                                left: 0,
                                top: f + "px"
                            }, {
                                top: 0 + "px"
                            })
                        } else {
                            if (e["settings"]["animation"]["effects"] === s["animation"]["effects"]["slideRight"]) {} else {
                                if (e["settings"]["animation"]["effects"] === s["animation"]["effects"]["slideTop"]) {
                                    U["animate"](e, t["preContent"], {
                                        opacity: 1
                                    }, {
                                        left: 0,
                                        top: -o + "px",
                                        opacity: 0
                                    });
                                    U["animate"](e, t["content"], {
                                        left: 0,
                                        top: -o + "px",
                                        opacity: 0
                                    }, {
                                        top: 0 + "px",
                                        opacity: 1
                                    })
                                } else {
                                    if (e["settings"]["animation"]["effects"] === s["animation"]["effects"]["fade"]) {
                                        U["animate"](e, t["preContent"], {
                                            display: "block"
                                        }, {
                                            opacity: 0
                                        });
                                        U["animate"](e, t["content"], {
                                            display: "block",
                                            opacity: 0
                                        }, {
                                            opacity: 1
                                        })
                                    } else {
                                        if (e["settings"]["animation"]["effects"] === s["animation"]["effects"]["none"]) {
                                            e["$contents"]["css"]({
                                                position: "absolute",
                                                left: 0,
                                                top: 0
                                            })["removeClass"](s["classes"]["active"])["hide"]()["eq"](t["index"])["addClass"](s["classes"]["active"])["css"]({
                                                position: "relative"
                                            })["show"]()
                                        }
                                    }
                                }
                            }
                        }
                    }
                    z["after"](e, t)
                }
            }
        },
        refreshParents: function (t, n) {
            setTimeout(function () {
                t["$elem"]["parents"](".z-tabs")["each"](function (t, n) {
                    e(n)["data"]("zozoTabs")["refresh"]()
                })
            }, n)
        },
        animate: function (t, n, r, i, s, o) {
            e["zozo"]["core"]["utils"]["animate"](t, n, r, i, s, o)
        },
        mobileNav: function (e, t, n) {
            if (n !== null && e["$mobileNav"]) {
                e["$mobileNav"]["find"]("> li > a > span.z-title")["html"](e["$tabs"]["eq"](n)["find"]("a")["html"]())
            }
            if (t === true) {
                setTimeout(function () {
                    e["$mobileNav"]["removeClass"](s["states"]["closed"])
                }, e["settings"]["animation"]["mobileDuration"]);
                e["$tabGroup"]["removeClass"]("z-hide-menu");
            } else {
                e["$mobileNav"] && e["$mobileNav"]["addClass"](s["states"]["closed"]);
                e["$tabGroup"]["addClass"]("z-hide-menu")
            }
        },
        setResponsiveDimension: function (e, t, n) {
            var r = e["$container"];
            e["settings"]["original"]["count"] = parseInt(e["$tabs"]["size"]());
            if (!n) {
                e["settings"]["original"]["itemD"] = parseInt(r["width"]() / e["settings"]["original"]["itemWidth"]);
                e["settings"]["original"]["itemM"] = e["settings"]["original"]["itemWidth"] + e["settings"]["original"]["itemM"]
            }
            e["settings"]["original"]["firstRowWidth"] = e["settings"]["original"]["itemWidth"] / (parseInt(e["settings"]["original"]["itemD"]) * e["settings"]["original"]["itemWidth"]) * 100;
            e["settings"]["original"]["itemCount"] = parseInt(e["settings"]["original"]["itemD"]) * parseInt(e["settings"]["original"]["count"] / parseInt(e["settings"]["original"]["itemD"]));
            e["settings"]["original"]["lastItem"] = 100 / (parseInt(e["settings"]["original"]["count"]) - parseInt(e["settings"]["original"]["itemCount"]));
            e["settings"]["original"]["navHeight"] = e["settings"]["original"]["itemD"] * parseInt(e["$tabs"]["eq"](0)["innerHeight"]()) + (e["settings"]["original"]["itemM"] > 0 ? e["$tabs"]["eq"](0)["innerHeight"]() : 0);
            e["settings"]["original"]["bottomLeft"] = e["settings"]["original"]["count"] - (e["settings"]["original"]["count"] - e["settings"]["original"]["itemCount"]);
            e["settings"]["original"]["rows"] = e["settings"]["original"]["count"] > e["settings"]["original"]["itemCount"] ? parseInt(e["settings"]["original"]["itemCount"] / e["settings"]["original"]["itemD"]) + 1 : parseInt(e["settings"]["original"]["itemCount"] / e["settings"]["original"]["itemD"]);
            e["settings"]["original"]["lastRowItems"] = e["settings"]["original"]["count"] - e["settings"]["original"]["itemCount"] * (e["settings"]["original"]["rows"] - 1);
            e["settings"]["original"]["itemsPerRow"] = e["settings"]["original"]["itemCount"] / e["settings"]["original"]["rows"];
            if (r["width"]() > t && !n) {
                e["settings"]["original"]["itemD"] = e["settings"]["original"]["count"];
                e["settings"]["original"]["itemM"] = 0;
                e["settings"]["original"]["rows"] = 1;
                e["settings"]["original"]["itemCount"] = e["settings"]["original"]["count"]
            }
            return e
        },
        checkWidth: function (t, n, r) {
            var i = 0;
            var s = t["$container"];
            var o = U["isCompact"](t);
            var u = 0;
            var a = t["settings"]["tabRatio"];
            var f = t["settings"]["tabRatioCompact"];
            t["$tabs"]["each"](function (r) {
                var s = e(this)["outerWidth"](true) * a;
                o && (s = s * f);
                if (n === true) {
                    if (s > t["settings"]["original"]["itemWidth"]) {
                        t["settings"]["original"]["itemWidth"] = s;
                        t["settings"]["original"]["itemMaxWidth"] = s
                    }
                    if (s < t["settings"]["original"]["itemMinWidth"]) {
                        t["settings"]["original"]["itemMinWidth"] = s
                    }
                }
                u = u + e(this)["innerHeight"]();
                i = i + s
            });
            if (n === true) {
                i = i + t["settings"]["original"]["itemWidth"] * 0
            }
            t["settings"]["original"]["count"] = parseInt(t["$tabs"]["size"]());
            t["settings"]["original"]["groupWidth"] = i;
            U["setResponsiveDimension"](t, t["settings"]["original"]["groupWidth"]);
            if (t["settings"]["original"]["count"] > 3 && t["settings"]["original"]["lastRowItems"] === 1) {
                t["settings"]["original"]["itemD"] = t["settings"]["original"]["itemD"] - 1;
                t["settings"]["original"]["itemM"] = s["width"]() % t["settings"]["original"]["itemWidth"];
                U["setResponsiveDimension"](t, t["settings"]["original"]["groupWidth"], true)
            }
            if (n === true || r === true) {
                t["settings"]["original"]["initGroupWidth"] = t["settings"]["original"]["groupWidth"];
                if (U["isCompact"](t)) {
                    var l = 100 / t["settings"]["original"]["count"];
                    t["$tabs"]["each"](function () {
                        e(this)["css"]({
                            width: l + "%"
                        })
                    })
                }
                t["settings"]["original"]["position"] = t["settings"]["position"]
            }
            if (t["settings"]["responsive"] === true) {
                U["responsive"](t, n)
            }
            var c = U["isCompact"](t) && !U["isMobile"](t);
            var h = U["isResponsive"](t) && t["BrowserDetection"]["isIE"](7) ? {
                "float": "none",
                width: "auto"
            } : {
                "float": ""
            };
            var p = t["$elem"]["hasClass"](q);
            t["$tabs"]["each"](function (n) {
                if ((p === true && n + 1 === t["settings"]["original"]["itemD"] || n + 1 === t["settings"]["original"]["count"]) && c) {
                    e(this)["css"](h)
                } else {
                    e(this)["css"]({
                        "float": ""
                    })
                }
            });
            if (t["settings"]["orientation"] === k) {
                U["setContentHeight"](t, null, true)
            }
        },
        checkModes: function (t) {
            var n = U["isCompact"](t);
            if (t["settings"]["mode"] === s["modes"]["stacked"]) {
                t["$elem"]["addClass"](b);
                t["$elem"]["addClass"](q);
                t["$tabs"]["css"]({
                    width: ""
                });
                t["$mobileNav"] && t["$mobileNav"]["hide"]()
            } else {
                if (n) {
                    var r = 100 / t["settings"]["original"]["count"];
                    t["$tabs"]["each"](function () {
                        e(this)["css"]({
                            "float": "",
                            width: r + "%"
                        })
                    })
                } else {
                    t["$tabs"]["each"](function () {
                        e(this)["css"]({
                            "float": "",
                            width: ""
                        })
                    })
                }
            }
        },
        getContentHeight: function (t, n, r) {
            var i = t["settings"]["autoContentHeight"];
            var s = {
                width: 0,
                height: 0
            };
            if (i != true) {
                t["$contents"]["each"](function (t, n) {
                    var r = e(n);
                    var i = U["getElementSize"](r);
                    i["height"] > s["height"] && (s["height"] = i["height"]);
                    i["width"] > s["width"] && (s["width"] = i["width"])
                })
            } else {
                var o = t["$elem"]["find"]("> .z-container > .z-content.z-active");
                if (n != null) {
                    o = n
                }
                s["height"] = U["getElementSize"](o)["height"]
            } if (t["settings"]["orientation"] === k && !U["isMobile"](t)) {
                var u = 0;
                t["$tabs"]["each"](function (t) {
                    u = u + parseInt(e(this)["height"]()) + parseInt(e(this)["css"]("border-top-width")) + parseInt(e(this)["css"]("border-bottom-width"))
                });
                s["height"] = U["isLarger"](s["height"], t["$tabGroup"]["innerHeight"]());
                s["height"] = U["isLarger"](s["height"], u)
            }
            return s
        },
        setContentHeight: function (t, n, r) {
            var i = U["getContentHeight"](t, n, r);
            t["settings"]["original"]["contentMaxHeight"] = i["height"];
            t["settings"]["original"]["contentMaxWidth"] = i["width"];
            var o = t["settings"]["animation"]["effects"] === s["animation"]["effects"]["none"] || r === true ? 0 : t["settings"]["animation"]["duration"];
            var u = t["settings"]["autoContentHeight"];
            var a = e["zozo"]["core"]["support"]["css"]["transition"];
            var f = {
                _transition: "none",
                height: t["settings"]["original"]["contentMaxHeight"] + "px",
                "min-height": t["settings"]["original"]["contentMaxHeight"] + "px"
            };
            if (r === true) {
                t["$container"]["css"](f)
            } else {
                U["animate"](t, t.$container, null, f, {})
            }
            return t
        },
        responsive: function (n, r) {
            var i = e(t)["width"]();
            var o = U["isTop"](n);
            var u = U["isCompact"](n);
            var a = n["settings"]["original"]["initGroupWidth"] >= n["$container"]["width"]();
            var f = n["settings"]["original"]["rows"] > n["settings"]["maxRows"];
            var l = i <= n["settings"]["minWindowWidth"];
            var c = !n["BrowserDetection"]["isIE"](8) && n["settings"]["mobileNav"] === true && n["$mobileNav"] != null;
            var h = n["settings"]["original"]["count"];
            var p = n["settings"]["original"]["itemCount"];
            var d = n["settings"]["original"]["itemD"];
            var v = n["settings"]["original"]["rows"];
            n["$elem"]["removeClass"](b);
            n["$tabs"]["removeClass"](s["classes"]["left"])["removeClass"](s["classes"]["right"])["removeClass"](s["classes"]["firstCol"])["removeClass"](s["classes"]["lastCol"])["removeClass"](s["classes"]["firstRow"])["removeClass"](s["classes"]["lastRow"]);
            if (n["settings"]["orientation"] === L) {
                var m = u && parseInt(n["settings"]["original"]["count"] * n["settings"]["original"]["itemWidth"]) >= n["$container"]["width"]();
                var g = !u && a;
                var y = m || g;
                if (y) {
                    (v === h || n["settings"]["mode"] === s["modes"]["stacked"]) && n["$elem"]["addClass"](b);
                    n["$tabs"]["each"](function (t) {
                        var r = e(this);
                        var i = t + 1;
                        if (n["settings"]["original"]["itemM"] > 0) {
                            if (i <= p) {
                                r["css"]({
                                    "float": "",
                                    width: n["settings"]["original"]["firstRowWidth"] + "%"
                                })
                            } else {
                                r["css"]({
                                    "float": "",
                                    width: n["settings"]["original"]["lastItem"] + "%"
                                })
                            } if (o === true) {
                                t === d - 1 ? r["addClass"](s["classes"]["right"]) : r["removeClass"](s["classes"]["right"])
                            } else {
                                i === h && r["addClass"](s["classes"]["right"]);
                                t === n["settings"]["original"]["bottomLeft"] && r["addClass"](s["classes"]["left"])
                            } if (v > 1 && d !== 1) {
                                (i === 1 || i > d && i % d === 1) && r["addClass"](s["classes"]["firstCol"]);
                                (i === h || i >= d && i % d === 0) && r["addClass"](s["classes"]["lastCol"]);
                                i <= d && r["addClass"](s["classes"]["firstRow"]);
                                i > d * (v - 1) && r["addClass"](s["classes"]["lastRow"])
                            }
                        }
                    });
                    U["switchResponsiveClasses"](n, true)
                } else {
                    if (u) {
                        var w = 100 / n["settings"]["original"]["count"];
                        n["$tabs"]["each"](function () {
                            e(this)["css"]({
                                "float": "",
                                width: w + "%"
                            })
                        })
                    } else {
                        n["$tabs"]["each"](function () {
                            e(this)["css"]({
                                "float": "",
                                width: ""
                            })
                        })
                    }
                    U["switchResponsiveClasses"](n, false)
                } if (i >= 1200 && n["responsive"] != s["responsive"]["largeDesktop"]) {
                    n["responsive"] = s["responsive"]["largeDesktop"];
                    U["switchMenu"](n, false)
                }
                if (n["responsive"] != s["responsive"]["phone"] && c && (l || f)) {
                    n["responsive"] = "auto";
                    n["$elem"]["removeClass"](q);
                    n["$tabs"]["each"](function () {
                        e(this)["css"]({
                            width: ""
                        })
                    });
                    n["$tabs"]["filter"]("li:first-child")["addClass"](s["classes"]["first"]);
                    n["$tabs"]["filter"]("li:last-child")["addClass"](s["classes"]["last"]);
                    U["switchMenu"](n, true)
                }
            } else {
                if (c === true && (l || parseInt(n["$elem"]["width"]() - n["settings"]["original"]["itemWidth"]) < n["settings"]["minWidth"])) {
                    U["switchMenu"](n, true)
                } else {
                    U["switchMenu"](n, false)
                }
            }
            U["refreshParents"](n, 0)
        },
        switchResponsiveClasses: function (e, t) {
            var n = U["isTop"](e);
            var r = e["settings"]["original"]["position"];
            var i = s["classes"]["positions"]["topLeft"];
            var o = s["classes"]["positions"]["bottomLeft"];
            if (t === true) {
                e["$elem"]["addClass"](q);
                U["switchMenu"](e, false);
                e["$elem"]["removeClass"](r)
            } else {
                n === true ? e["$elem"]["removeClass"](i)["addClass"](r) : e["$elem"]["removeClass"](o)["addClass"](r);
                U["switchMenu"](e, false);
                e["$elem"]["removeClass"](q);
                e["$tabs"]["removeClass"](s["classes"]["last"])["filter"]("li:last-child")["addClass"](s["classes"]["last"])
            }
        },
        switchMenu: function (t, n) {
            var r = s["classes"]["themes"];
            var i = s["classes"]["sizes"];
            var o = e["zozo"]["core"]["utils"]["toArray"](s["classes"]["positions"]);
            t["$elem"]["removeClass"](r["join"](s["space"]));
            if (n === true) {
                t["$mobileNav"] && t["$mobileNav"]["addClass"](s["states"]["closed"])["show"]();
                t["$tabGroup"]["addClass"]("z-hide-menu");
                t["$elem"]["addClass"](H);
                t["$elem"]["removeClass"](t["settings"]["orientation"]);
                t["$elem"]["removeClass"](t["settings"]["position"]);
                t["settings"]["style"] === x ? t["$elem"]["addClass"]("m-" + t["settings"]["theme"]) : t["$elem"]["addClass"](t["settings"]["theme"])
            } else {
                t["$elem"]["addClass"](t["settings"]["orientation"]);
                t["$elem"]["addClass"](t["settings"]["theme"]);
                t["$elem"]["addClass"](t["settings"]["position"]);
                t["$mobileNav"] && t["$mobileNav"]["removeClass"](s["states"]["closed"]);
                t["$tabGroup"]["removeClass"]("z-hide-menu");
                t["$tabs"]["filter"]("li:first-child")["addClass"](s["classes"]["first"]);
                t["$elem"]["removeClass"](H);
                t["$mobileNav"] && t["$mobileNav"]["hide"]()
            }
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
        changeHash: function (n, r) {
            if (n["settings"]["animating"] !== true) {
                if (n["settings"]["deeplinking"] === true) {
                    if (typeof e(t)["hashchange"] != "undefined") {
                        n["Hash"]["set"](n["tabID"], r)
                    } else {
                        if (n["BrowserDetection"]["isIE"](7)) {
                            U["showTab"](n, r)
                        } else {
                            n["Hash"]["set"](n["tabID"], r)
                        }
                    }
                } else {
                    U["showTab"](n, r)
                }
            }
        },
        getFirst: function (e) {
            return 0
        },
        getLast: function (e) {
            if (e["settings"]["noTabs"] === true) {
                return parseInt(e["$container"]["children"]("div")["size"]() - 1)
            }
            return parseInt(e["$tabGroup"]["children"]("li")["size"]() - 1)
        },
        create: function (t, n) {
            var r = e("<li><a>" + t + "</a></li>");
            var i = e("<div>" + n + "</div>");
            return {
                tab: r,
                content: i
            }
        },
        isCompact: function (e) {
            return e["settings"]["position"] === s["classes"]["positions"]["topCompact"] || e["settings"]["position"] === s["classes"]["positions"]["bottomCompact"]
        },
        isTop: function (e) {
            if (e["settings"]["original"]["position"] === null) {
                e["settings"]["original"]["position"] = e["settings"]["position"]
            }
            return e["settings"]["original"]["position"]["indexOf"]("top") >= 0
        },
        isLightTheme: function (t) {
            var n = ["red", "deepblue", "blue", "green", "orange", "black"];
            var r = true;
            var i = U["isFlatTheme"](t);
            if (t["settings"]["style"] !== x) {
                e["inArray"](t["settings"]["theme"], n) > -1 && (r = false);
                i && (r = false)
            }
            return r
        },
        isFlatTheme: function (e) {
            return e["settings"]["theme"]["indexOf"]("flat") >= 0
        },
        isResponsive: function (e) {
            return e["$elem"]["hasClass"](q) === true
        },
        isMobile: function (e) {
            return e["$elem"]["hasClass"](H) === true
        },
        isTabDisabled: function (e) {
            return e["hasClass"](y) || e["data"](m) === true
        },
        allowAutoScrolling: function (e) {
            return e["settings"]["mobileAutoScrolling"] != null && e["settings"]["mobileAutoScrolling"] != false
        },
        getElementSize: function (e) {
            var t = {
                width: 0,
                height: 0
            };
            if (e == null || e["length"] == 0) {
                return t
            }
            if (e["is"](":visible") === false) {
                t["height"] = e["show"]()["find"](">.z-content-inner")["innerHeight"]();
                t["width"] = e["show"]()["find"](">.z-content-inner")["outerWidth"]();
                if (t["height"] >= 0) {}
                e["hide"]()
            } else {
                t["height"] = e["find"](">.z-content-inner")["innerHeight"]();
                t["width"] = e["find"](">.z-content-inner")["outerWidth"]();
                if (t["height"] >= 0) {}
            }
            e["hasClass"]("z-video") && (t["height"] = e["innerHeight"]());
            return t
        },
        getWidth: function (e) {
            if (e == null || e["length"] == 0) {
                return 0
            }
            e = e["find"]("a");
            var t = e["outerWidth"]();
            t += parseInt(e["css"]("margin-left"), 10) + parseInt(e["css"]("margin-right"), 10);
            t += parseInt(e["css"]("borderLeftWidth"), 10) + parseInt(e["css"]("borderRightWidth"), 10);
            return t
        },
        isLarger: function (e, t) {
            var n = e;
            if (e < t) {
                n = t
            }
            return n
        }
    };
    var z = {
        init: function (t, n) {
            t["$contents"]["hide"]();
            n["content"]["css"]({
                opacity: "",
                left: "",
                top: "",
                position: "relative"
            })["show"]();
            setTimeout(function () {
                t["$container"]["find"](".z-tabs")["each"](function (t, n) {
                    e(n)["data"]("zozoTabs")["refresh"]()
                });
                t["$elem"]["trigger"](f, {
                    tab: n["tab"],
                    content: n["content"],
                    index: n["index"]
                });
                t["settings"]["animating"] = false
            }, n["duration"] >= 0 ? 200 : n["duration"]);
            if (t["settings"]["orientation"] === k) {
                U["setContentHeight"](t, n["content"], true)
            }
            return t
        },
        before: function (t, n) {
            setTimeout(function () {
                n["content"]["find"](".z-tabs")["each"](function (t, n) {
                    e(n)["data"]("zozoTabs")["refresh"]()
                })
            }, 50);
            if (t["settings"]["animation"]["effects"] !== s["animation"]["effects"]["none"]) {
                U["setContentHeight"](t, n["preContent"], true);
                U["setContentHeight"](t, n["content"])
            }
            t["$container"]["addClass"](F);
            n["preContent"]["css"]({
                position: "absolute",
                display: "block",
                left: 0,
                top: 0
            });
            n["content"]["css"]({
                position: "absolute",
                display: "block"
            });
            return t
        },
        after: function (e, t) {
            setTimeout(function () {
                t["content"]["css"]({
                    position: "relative"
                });
                t["preContent"]["css"]({
                    display: "none"
                })
            }, t["duration"]);
            setTimeout(function () {
                e["$elem"]["trigger"](f, {
                    tab: t["tab"],
                    content: t["content"],
                    index: t["index"]
                });
                e["$elem"]["trigger"](c, {
                    tab: t["preTab"],
                    content: t["preContent"],
                    index: t["preIndex"]
                });
                var n = e["settings"]["orientation"] === k ? {
                    height: ""
                } : {
                    height: "",
                    "min-height": "",
                    overflow: ""
                };
                e["$container"]["css"](n);
                e["$container"]["removeClass"](F);
                setTimeout(function () {
                    e["$contents"]["removeClass"](s["classes"]["active"])["eq"](t["index"])["addClass"](s["classes"]["active"]);
                    e["settings"]["animating"] = false;
                    e["$contents"]["stop"](true, true)
                })
            }, t["duration"] + 50);
            return e
        }
    };
    i["defaults"] = i["prototype"]["defaults"];
    e["fn"]["zozoTabs"] = function (t) {
        return this["each"](function () {
            if (r == e(this)["data"](s["pluginName"])) {
                var n = (new i(this, t))["init"]();
                e(this)["data"](s["pluginName"], n)
            }
        })
    };
    t["zozo"]["tabs"] = i;
    e(n)["ready"](function () {
        e("[data-role='z-tabs']")["each"](function (t, n) {
            if (!e(n)["zozoTabs"]()) {
                e(n)["zozoTabs"]()
            }
        })
    })
})(jQuery, window, document);
(function (e) {
    function n(e) {
        return typeof e == "object" ? e : {
            top: e,
            left: e
        }
    }
    var t = e.scrollTo = function (t, n, r) {
        e(window).scrollTo(t, n, r)
    };
    t.defaults = {
        axis: "xy",
        duration: parseFloat(e.fn.jquery) >= 1.3 ? 0 : 1,
        limit: true
    };
    t.window = function (t) {
        return e(window)._scrollable()
    };
    e.fn._scrollable = function () {
        return this.map(function () {
            var t = this,
                n = !t.nodeName || e.inArray(t.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"]) != -1;
            if (!n) return t;
            var r = (t.contentWindow || t).document || t.ownerDocument || t;
            return /webkit/i.test(navigator.userAgent) || r.compatMode == "BackCompat" ? r.body : r.documentElement
        })
    };
    e.fn.scrollTo = function (r, i, s) {
        if (typeof i == "object") {
            s = i;
            i = 0
        }
        if (typeof s == "function") s = {
            onAfter: s
        };
        if (r == "max") r = 9e9;
        s = e.extend({}, t.defaults, s);
        i = i || s.duration;
        s.queue = s.queue && s.axis.length > 1;
        if (s.queue) i /= 2;
        s.offset = n(s.offset);
        s.over = n(s.over);
        return this._scrollable().each(function () {
            function d(e) {
                u.animate(c, i, s.easing, e && function () {
                    e.call(this, r, s)
                })
            }
            if (r == null) return;
            var o = this,
                u = e(o),
                a = r,
                l, c = {}, p = u.is("html,body");
            switch (typeof a) {
            case "number":
            case "string":
                if (/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(a)) {
                    a = n(a);
                    break
                }
                a = e(a, this);
                if (!a.length) return;
            case "object":
                if (a.is || a.style) l = (a = e(a)).offset()
            }
            e.each(s.axis.split(""), function (e, n) {
                var r = n == "x" ? "Left" : "Top",
                    i = r.toLowerCase(),
                    f = "scroll" + r,
                    v = o[f],
                    m = t.max(o, n);
                if (l) {
                    c[f] = l[i] + (p ? 0 : v - u.offset()[i]);
                    if (s.margin) {
                        c[f] -= parseInt(a.css("margin" + r)) || 0;
                        c[f] -= parseInt(a.css("border" + r + "Width")) || 0
                    }
                    c[f] += s.offset[i] || 0;
                    if (s.over[i]) c[f] += a[n == "x" ? "width" : "height"]() * s.over[i]
                } else {
                    var y = a[i];
                    c[f] = y.slice && y.slice(-1) == "%" ? parseFloat(y) / 100 * m : y
                } if (s.limit && /^\d+$/.test(c[f])) c[f] = c[f] <= 0 ? 0 : Math.min(c[f], m);
                if (!e && s.queue) {
                    if (v != c[f]) d(s.onAfterFirst);
                    delete c[f]
                }
            });
            d(s.onAfter)
        }).end()
    };
    t.max = function (t, n) {
        var r = n == "x" ? "Width" : "Height",
            i = "scroll" + r;
        if (!e(t).is("html,body")) return t[i] - e(t)[r.toLowerCase()]();
        var s = "client" + r,
            o = t.ownerDocument.documentElement,
            u = t.ownerDocument.body;
        return Math.max(o[i], u[i]) - Math.min(o[s], u[s])
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
(function () {
    function e(e) {
        function t(e) {
            var t = e.charCodeAt(0);
            if (t !== 92) return t;
            var n = e.charAt(1);
            return (t = c[n]) ? t : "0" <= n && n <= "7" ? parseInt(e.substring(1), 8) : n === "u" || n === "x" ? parseInt(e.substring(2), 16) : e.charCodeAt(1)
        }

        function n(e) {
            if (e < 32) return (e < 16 ? "\\x0" : "\\x") + e.toString(16);
            e = String.fromCharCode(e);
            if (e === "\\" || e === "-" || e === "[" || e === "]") e = "\\" + e;
            return e
        }

        function r(e) {
            for (var r = e.substring(1, e.length - 1).match(/\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\[0-3][0-7]{0,2}|\\[0-7]{1,2}|\\[\S\s]|[^\\]/g), e = [], i = [], s = r[0] === "^", o = s ? 1 : 0, u = r.length; o < u; ++o) {
                var a = r[o];
                if (/\\[bdsw]/i.test(a)) e.push(a);
                else {
                    var a = t(a),
                        f;
                    o + 2 < u && "-" === r[o + 1] ? (f = t(r[o + 2]), o += 2) : f = a;
                    i.push([a, f]);
                    f < 65 || a > 122 || (f < 65 || a > 90 || i.push([Math.max(65, a) | 32, Math.min(f, 90) | 32]), f < 97 || a > 122 || i.push([Math.max(97, a) & -33, Math.min(f, 122) & -33]))
                }
            }
            i.sort(function (e, t) {
                return e[0] - t[0] || t[1] - e[1]
            });
            r = [];
            a = [NaN, NaN];
            for (o = 0; o < i.length; ++o) u = i[o], u[0] <= a[1] + 1 ? a[1] = Math.max(a[1], u[1]) : r.push(a = u);
            i = ["["];
            s && i.push("^");
            i.push.apply(i, e);
            for (o = 0; o < r.length; ++o) u = r[o], i.push(n(u[0])), u[1] > u[0] && (u[1] + 1 > u[0] && i.push("-"), i.push(n(u[1])));
            i.push("]");
            return i.join("")
        }

        function i(e) {
            for (var t = e.source.match(/\[(?:[^\\\]]|\\[\S\s])*]|\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\\d+|\\[^\dux]|\(\?[!:=]|[()^]|[^()[\\^]+/g), n = t.length, i = [], u = 0, a = 0; u < n; ++u) {
                var f = t[u];
                f === "(" ? ++a : "\\" === f.charAt(0) && (f = +f.substring(1)) && f <= a && (i[f] = -1)
            }
            for (u = 1; u < i.length; ++u) - 1 === i[u] && (i[u] = ++s);
            for (a = u = 0; u < n; ++u) f = t[u], f === "(" ? (++a, i[a] === void 0 && (t[u] = "(?:")) : "\\" === f.charAt(0) && (f = +f.substring(1)) && f <= a && (t[u] = "\\" + i[a]);
            for (a = u = 0; u < n; ++u) "^" === t[u] && "^" !== t[u + 1] && (t[u] = "");
            if (e.ignoreCase && o)
                for (u = 0; u < n; ++u) f = t[u], e = f.charAt(0), f.length >= 2 && e === "[" ? t[u] = r(f) : e !== "\\" && (t[u] = f.replace(/[A-Za-z]/g, function (e) {
                    e = e.charCodeAt(0);
                    return "[" + String.fromCharCode(e & -33, e | 32) + "]"
                }));
            return t.join("")
        }
        for (var s = 0, o = !1, u = !1, a = 0, f = e.length; a < f; ++a) {
            var l = e[a];
            if (l.ignoreCase) u = !0;
            else if (/[a-z]/i.test(l.source.replace(/\\u[\da-f]{4}|\\x[\da-f]{2}|\\[^UXux]/gi, ""))) {
                o = !0;
                u = !1;
                break
            }
        }
        for (var c = {
            b: 8,
            t: 9,
            n: 10,
            v: 11,
            f: 12,
            r: 13
        }, h = [], a = 0, f = e.length; a < f; ++a) {
            l = e[a];
            if (l.global || l.multiline) throw Error("" + l);
            h.push("(?:" + i(l) + ")")
        }
        return RegExp(h.join("|"), u ? "gi" : "g")
    }

    function t(e) {
        function t(e) {
            switch (e.nodeType) {
            case 1:
                if (n.test(e.className)) break;
                for (var u = e.firstChild; u; u = u.nextSibling) t(u);
                u = e.nodeName;
                if ("BR" === u || "LI" === u) r[o] = "\n", s[o << 1] = i++, s[o++ << 1 | 1] = e;
                break;
            case 3:
            case 4:
                u = e.nodeValue, u.length && (u = a ? u.replace(/\r\n?/g, "\n") : u.replace(/[\t\n\r ]+/g, " "), r[o] = u, s[o << 1] = i, i += u.length, s[o++ << 1 | 1] = e)
            }
        }
        var n = /(?:^|\s)nocode(?:\s|$)/,
            r = [],
            i = 0,
            s = [],
            o = 0,
            u;
        e.currentStyle ? u = e.currentStyle.whiteSpace : window.getComputedStyle && (u = document.defaultView.getComputedStyle(e, q).getPropertyValue("white-space"));
        var a = u && "pre" === u.substring(0, 3);
        t(e);
        return {
            a: r.join("").replace(/\n$/, ""),
            c: s
        }
    }

    function n(e, t, n, r) {
        t && (e = {
            a: t,
            d: e
        }, n(e), r.push.apply(r, e.e))
    }

    function r(t, r) {
        function i(e) {
            for (var t = e.d, f = [t, "pln"], l = 0, c = e.a.match(o) || [], h = {}, p = 0, d = c.length; p < d; ++p) {
                var v = c[p],
                    m = h[v],
                    g = void 0,
                    y;
                if (typeof m === "string") y = !1;
                else {
                    var b = s[v.charAt(0)];
                    if (b) g = v.match(b[1]), m = b[0];
                    else {
                        for (y = 0; y < a; ++y)
                            if (b = r[y], g = v.match(b[1])) {
                                m = b[0];
                                break
                            }
                        g || (m = "pln")
                    } if ((y = m.length >= 5 && "lang-" === m.substring(0, 5)) && !(g && typeof g[1] === "string")) y = !1, m = "src";
                    y || (h[v] = m)
                }
                b = l;
                l += v.length;
                if (y) {
                    y = g[1];
                    var w = v.indexOf(y),
                        E = w + y.length;
                    g[2] && (E = v.length - g[2].length, w = E - y.length);
                    m = m.substring(5);
                    n(t + b, v.substring(0, w), i, f);
                    n(t + b + w, y, u(m, y), f);
                    n(t + b + E, v.substring(E), i, f)
                } else f.push(t + b, m)
            }
            e.e = f
        }
        var s = {}, o;
        (function () {
            for (var n = t.concat(r), i = [], u = {}, a = 0, f = n.length; a < f; ++a) {
                var l = n[a],
                    c = l[3];
                if (c)
                    for (var h = c.length; --h >= 0;) s[c.charAt(h)] = l;
                l = l[1];
                c = "" + l;
                u.hasOwnProperty(c) || (i.push(l), u[c] = q)
            }
            i.push(/[\S\s]/);
            o = e(i)
        })();
        var a = r.length;
        return i
    }

    function i(e) {
        var t = [],
            n = [];
        e.tripleQuotedStrings ? t.push(["str", /^(?:'''(?:[^'\\]|\\[\S\s]|''?(?=[^']))*(?:'''|$)|"""(?:[^"\\]|\\[\S\s]|""?(?=[^"]))*(?:"""|$)|'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$))/, q, "'\""]) : e.multiLineStrings ? t.push(["str", /^(?:'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$)|`(?:[^\\`]|\\[\S\s])*(?:`|$))/, q, "'\"`"]) : t.push(["str", /^(?:'(?:[^\n\r'\\]|\\.)*(?:'|$)|"(?:[^\n\r"\\]|\\.)*(?:"|$))/, q, "\"'"]);
        e.verbatimStrings && n.push(["str", /^@"(?:[^"]|"")*(?:"|$)/, q]);
        var i = e.hashComments;
        i && (e.cStyleComments ? (i > 1 ? t.push(["com", /^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/, q, "#"]) : t.push(["com", /^#(?:(?:define|elif|else|endif|error|ifdef|include|ifndef|line|pragma|undef|warning)\b|[^\n\r]*)/, q, "#"]), n.push(["str", /^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h|[a-z]\w*)>/, q])) : t.push(["com", /^#[^\n\r]*/, q, "#"]));
        e.cStyleComments && (n.push(["com", /^\/\/[^\n\r]*/, q]), n.push(["com", /^\/\*[\S\s]*?(?:\*\/|$)/, q]));
        e.regexLiterals && n.push(["lang-regex", /^(?:^^\.?|[!+-]|!=|!==|#|%|%=|&|&&|&&=|&=|\(|\*|\*=|\+=|,|-=|->|\/|\/=|:|::|;|<|<<|<<=|<=|=|==|===|>|>=|>>|>>=|>>>|>>>=|[?@[^]|\^=|\^\^|\^\^=|{|\||\|=|\|\||\|\|=|~|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\s*(\/(?=[^*/])(?:[^/[\\]|\\[\S\s]|\[(?:[^\\\]]|\\[\S\s])*(?:]|$))+\/)/]);
        (i = e.types) && n.push(["typ", i]);
        e = ("" + e.keywords).replace(/^ | $/g, "");
        e.length && n.push(["kwd", RegExp("^(?:" + e.replace(/[\s,]+/g, "|") + ")\\b"), q]);
        t.push(["pln", /^\s+/, q, " \r\n	 "]);
        n.push(["lit", /^@[$_a-z][\w$@]*/i, q], ["typ", /^(?:[@_]?[A-Z]+[a-z][\w$@]*|\w+_t\b)/, q], ["pln", /^[$_a-z][\w$@]*/i, q], ["lit", /^(?:0x[\da-f]+|(?:\d(?:_\d+)*\d*(?:\.\d*)?|\.\d\+)(?:e[+-]?\d+)?)[a-z]*/i, q, "0123456789"], ["pln", /^\\[\S\s]?/, q], ["pun", /^.[^\s\w"-$'./@\\`]*/, q]);
        return r(t, n)
    }

    function s(e, t) {
        function n(e) {
            switch (e.nodeType) {
            case 1:
                if (i.test(e.className)) break;
                if ("BR" === e.nodeName) r(e), e.parentNode && e.parentNode.removeChild(e);
                else
                    for (e = e.firstChild; e; e = e.nextSibling) n(e);
                break;
            case 3:
            case 4:
                if (a) {
                    var t = e.nodeValue,
                        u = t.match(s);
                    if (u) {
                        var f = t.substring(0, u.index);
                        e.nodeValue = f;
                        (t = t.substring(u.index + u[0].length)) && e.parentNode.insertBefore(o.createTextNode(t), e.nextSibling);
                        r(e);
                        f || e.parentNode.removeChild(e)
                    }
                }
            }
        }

        function r(e) {
            function t(e, n) {
                var r = n ? e.cloneNode(!1) : e,
                    i = e.parentNode;
                if (i) {
                    var i = t(i, 1),
                        s = e.nextSibling;
                    i.appendChild(r);
                    for (var o = s; o; o = s) s = o.nextSibling, i.appendChild(o)
                }
                return r
            }
            for (; !e.nextSibling;)
                if (e = e.parentNode, !e) return;
            for (var e = t(e.nextSibling, 0), n;
                (n = e.parentNode) && n.nodeType === 1;) e = n;
            f.push(e)
        }
        var i = /(?:^|\s)nocode(?:\s|$)/,
            s = /\r\n?|\n/,
            o = e.ownerDocument,
            u;
        e.currentStyle ? u = e.currentStyle.whiteSpace : window.getComputedStyle && (u = o.defaultView.getComputedStyle(e, q).getPropertyValue("white-space"));
        var a = u && "pre" === u.substring(0, 3);
        for (u = o.createElement("LI"); e.firstChild;) u.appendChild(e.firstChild);
        for (var f = [u], l = 0; l < f.length; ++l) n(f[l]);
        t === (t | 0) && f[0].setAttribute("value", t);
        var c = o.createElement("OL");
        c.className = "linenums";
        for (var h = Math.max(0, t - 1 | 0) || 0, l = 0, p = f.length; l < p; ++l) u = f[l], u.className = "L" + (l + h) % 10, u.firstChild || u.appendChild(o.createTextNode(" ")), c.appendChild(u);
        e.appendChild(c)
    }

    function o(e, t) {
        for (var n = t.length; --n >= 0;) {
            var r = t[n];
            b.hasOwnProperty(r) ? window.console && console.warn("cannot override language handler %s", r) : b[r] = e
        }
    }

    function u(e, t) {
        if (!e || !b.hasOwnProperty(e)) e = /^\s*</.test(t) ? "default-markup" : "default-code";
        return b[e]
    }

    function a(e) {
        var n = e.g;
        try {
            var r = t(e.h),
                i = r.a;
            e.a = i;
            e.c = r.c;
            e.d = 0;
            u(n, i)(e);
            var s = /\bMSIE\b/.test(navigator.userAgent),
                n = /\n/g,
                o = e.a,
                a = o.length,
                r = 0,
                f = e.c,
                l = f.length,
                i = 0,
                c = e.e,
                h = c.length,
                e = 0;
            c[h] = a;
            var p, d;
            for (d = p = 0; d < h;) c[d] !== c[d + 2] ? (c[p++] = c[d++], c[p++] = c[d++]) : d += 2;
            h = p;
            for (d = p = 0; d < h;) {
                for (var v = c[d], m = c[d + 1], g = d + 2; g + 2 <= h && c[g + 1] === m;) g += 2;
                c[p++] = v;
                c[p++] = m;
                d = g
            }
            for (c.length = p; i < l;) {
                var y = f[i + 2] || a,
                    b = c[e + 2] || a,
                    g = Math.min(y, b),
                    w = f[i + 1],
                    E;
                if (w.nodeType !== 1 && (E = o.substring(r, g))) {
                    s && (E = E.replace(n, "\r"));
                    w.nodeValue = E;
                    var S = w.ownerDocument,
                        x = S.createElement("SPAN");
                    x.className = c[e + 1];
                    var T = w.parentNode;
                    T.replaceChild(x, w);
                    x.appendChild(w);
                    r < y && (f[i + 1] = w = S.createTextNode(o.substring(g, y)), T.insertBefore(w, x.nextSibling))
                }
                r = g;
                r >= y && (i += 2);
                r >= b && (e += 2)
            }
        } catch (N) {
            "console" in window && console.log(N && N.stack ? N.stack : N)
        }
    }
    var f = ["break,continue,do,else,for,if,return,while"],
        l = [
            [f, "auto,case,char,const,default,double,enum,extern,float,goto,int,long,register,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile"], "catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof"
        ],
        c = [l, "alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,dynamic_cast,explicit,export,friend,inline,late_check,mutable,namespace,nullptr,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where"],
        h = [l, "abstract,boolean,byte,extends,final,finally,implements,import,instanceof,null,native,package,strictfp,super,synchronized,throws,transient"],
        p = [h, "as,base,by,checked,decimal,delegate,descending,dynamic,event,fixed,foreach,from,group,implicit,in,interface,internal,into,is,lock,object,out,override,orderby,params,partial,readonly,ref,sbyte,sealed,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,var"],
        l = [l, "debugger,eval,export,function,get,null,set,undefined,var,with,Infinity,NaN"],
        d = [f, "and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None"],
        v = [f, "alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END"],
        f = [f, "case,done,elif,esac,eval,fi,function,in,local,set,then,until"],
        m = /^(DIR|FILE|vector|(de|priority_)?queue|list|stack|(const_)?iterator|(multi)?(set|map)|bitset|u?(int|float)\d*)/,
        g = /\S/,
        y = i({
            keywords: [c, p, l, "caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END" + d, v, f],
            hashComments: !0,
            cStyleComments: !0,
            multiLineStrings: !0,
            regexLiterals: !0
        }),
        b = {};
    o(y, ["default-code"]);
    o(r([], [
        ["pln", /^[^<?]+/],
        ["dec", /^<!\w[^>]*(?:>|$)/],
        ["com", /^<\!--[\S\s]*?(?:--\>|$)/],
        ["lang-", /^<\?([\S\s]+?)(?:\?>|$)/],
        ["lang-", /^<%([\S\s]+?)(?:%>|$)/],
        ["pun", /^(?:<[%?]|[%?]>)/],
        ["lang-", /^<xmp\b[^>]*>([\S\s]+?)<\/xmp\b[^>]*>/i],
        ["lang-js", /^<script\b[^>]*>([\S\s]*?)(<\/script\b[^>]*>)/i],
        ["lang-css", /^<style\b[^>]*>([\S\s]*?)(<\/style\b[^>]*>)/i],
        ["lang-in.tag", /^(<\/?[a-z][^<>]*>)/i]
    ]), ["default-markup", "htm", "html", "mxml", "xhtml", "xml", "xsl"]);
    o(r([
        ["pln", /^\s+/, q, " 	\r\n"],
        ["atv", /^(?:"[^"]*"?|'[^']*'?)/, q, "\"'"]
    ], [
        ["tag", /^^<\/?[a-z](?:[\w-.:]*\w)?|\/?>$/i],
        ["atn", /^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i],
        ["lang-uq.val", /^=\s*([^\s"'>]*(?:[^\s"'/>]|\/(?=\s)))/],
        ["pun", /^[/<->]+/],
        ["lang-js", /^on\w+\s*=\s*"([^"]+)"/i],
        ["lang-js", /^on\w+\s*=\s*'([^']+)'/i],
        ["lang-js", /^on\w+\s*=\s*([^\s"'>]+)/i],
        ["lang-css", /^style\s*=\s*"([^"]+)"/i],
        ["lang-css", /^style\s*=\s*'([^']+)'/i],
        ["lang-css", /^style\s*=\s*([^\s"'>]+)/i]
    ]), ["in.tag"]);
    o(r([], [
        ["atv", /^[\S\s]+/]
    ]), ["uq.val"]);
    o(i({
        keywords: c,
        hashComments: !0,
        cStyleComments: !0,
        types: m
    }), ["c", "cc", "cpp", "cxx", "cyc", "m"]);
    o(i({
        keywords: "null,true,false"
    }), ["json"]);
    o(i({
        keywords: p,
        hashComments: !0,
        cStyleComments: !0,
        verbatimStrings: !0,
        types: m
    }), ["cs"]);
    o(i({
        keywords: h,
        cStyleComments: !0
    }), ["java"]);
    o(i({
        keywords: f,
        hashComments: !0,
        multiLineStrings: !0
    }), ["bsh", "csh", "sh"]);
    o(i({
        keywords: d,
        hashComments: !0,
        multiLineStrings: !0,
        tripleQuotedStrings: !0
    }), ["cv", "py"]);
    o(i({
        keywords: "caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END",
        hashComments: !0,
        multiLineStrings: !0,
        regexLiterals: !0
    }), ["perl", "pl", "pm"]);
    o(i({
        keywords: v,
        hashComments: !0,
        multiLineStrings: !0,
        regexLiterals: !0
    }), ["rb"]);
    o(i({
        keywords: l,
        cStyleComments: !0,
        regexLiterals: !0
    }), ["js"]);
    o(i({
        keywords: "all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,true,try,unless,until,when,while,yes",
        hashComments: 3,
        cStyleComments: !0,
        multilineStrings: !0,
        tripleQuotedStrings: !0,
        regexLiterals: !0
    }), ["coffee"]);
    o(r([], [
        ["str", /^[\S\s]+/]
    ]), ["regex"]);
    window.prettyPrintOne = function (e, t, n) {
        var r = document.createElement("PRE");
        r.innerHTML = e;
        n && s(r, n);
        a({
            g: t,
            i: n,
            h: r
        });
        return r.innerHTML
    };
    window.prettyPrint = function (e) {
        function t() {
            for (var n = window.PR_SHOULD_USE_CONTINUATION ? f.now() + 250 : Infinity; l < r.length && f.now() < n; l++) {
                var i = r[l],
                    o = i.className;
                if (o.indexOf("prettyprint") >= 0) {
                    var o = o.match(h),
                        u, p;
                    if (p = !o) {
                        p = i;
                        for (var d = void 0, v = p.firstChild; v; v = v.nextSibling) var m = v.nodeType,
                        d = m === 1 ? d ? p : v : m === 3 ? g.test(v.nodeValue) ? p : d : d;
                        p = (u = d === p ? void 0 : d) && "CODE" === u.tagName
                    }
                    p && (o = u.className.match(h));
                    o && (o = o[1]);
                    p = !1;
                    for (d = i.parentNode; d; d = d.parentNode)
                        if ((d.tagName === "pre" || d.tagName === "code" || d.tagName === "xmp") && d.className && d.className.indexOf("prettyprint") >= 0) {
                            p = !0;
                            break
                        }
                    p || ((p = (p = i.className.match(/\blinenums\b(?::(\d+))?/)) ? p[1] && p[1].length ? +p[1] : !0 : !1) && s(i, p), c = {
                        g: o,
                        h: i,
                        i: p
                    }, a(c))
                }
            }
            l < r.length ? setTimeout(t, 250) : e && e()
        }
        for (var n = [document.getElementsByTagName("pre"), document.getElementsByTagName("code"), document.getElementsByTagName("xmp")], r = [], i = 0; i < n.length; ++i)
            for (var o = 0, u = n[i].length; o < u; ++o) r.push(n[i][o]);
        var n = q,
            f = Date;
        f.now || (f = {
            now: function () {
                return +(new Date)
            }
        });
        var l = 0,
            c, h = /\blang(?:uage)?-([\w.]+)(?!\S)/;
        t()
    };
    window.PR = {
        createSimpleLexer: r,
        registerLangHandler: o,
        sourceDecorator: i,
        PR_ATTRIB_NAME: "atn",
        PR_ATTRIB_VALUE: "atv",
        PR_COMMENT: "com",
        PR_DECLARATION: "dec",
        PR_KEYWORD: "kwd",
        PR_LITERAL: "lit",
        PR_NOCODE: "nocode",
        PR_PLAIN: "pln",
        PR_PUNCTUATION: "pun",
        PR_SOURCE: "src",
        PR_STRING: "str",
        PR_TAG: "tag",
        PR_TYPE: "typ"
    }
})();
$(document).ready(function () {
    prettyPrint();
    if (document.documentElement.clientWidth > 1024) {
        $("#nav-wrap").removeClass("navbar-fixed-top")
    }
    switchHeader();
    $(window).scroll(function () {
        $("#nav-wrap").addClass("navbar-fixed-top");
        switchHeader()
    });
    $('body.home header a[href = "/"]').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 300, "easeInOutCirc");
        return false
    });
    $("header .nav a").click(function () {
        var e = $(this).attr("href");
        $("html, body").animate({
            scrollTop: $(e).offset().top
        }, 300, "easeInOutCirc");
        return false
    });
    $(".expand .show").click(function (e) {
        e.preventDefault();
        var t = $(this).parents(".expand");
        var n = $(this).html();
        if ($(t).hasClass("expanded")) {
            $(t).removeClass("expanded");
            $(".code-sample", t).slideUp(100);
            $(".details-list", t).slideUp(100);
            n = n.replace("Hide", "Show").replace("minus", "plus")
        } else {
            n = n.replace("Show", "Hide").replace("plus", "minus");
            $(t).addClass("expanded");
            $(".code-sample", t).slideDown(400);
            $(".details-list", t).slideDown(400)
        }
        $(this).html(n)
    })
});
var _hContent = "<div> <h4>Overview</h4> <p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.</p> <blockquote>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally</blockquote> <p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. </p></div><div> <h4>Features</h4> <p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.</p> <blockquote>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally</blockquote> <p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. </p></div><div> <h4>Documentation</h4> <p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.</p> <blockquote>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally</blockquote> <p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. </p></div><div> <h4>Themes</h4> <p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.</p> <blockquote>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally</blockquote> <p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. </p></div><div> <h4>Purchase</h4> <p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.</p> <blockquote>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally</blockquote> <p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. </p></div>";
var _vContent = " <div> <h4>Overview</h4> <p>Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally.</p> <blockquote>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.</blockquote> </div> <div> <h4>Features</h4> <p>Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally.</p> <blockquote>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.</blockquote> </div> <div> <h4>Documentation</h4> <p>Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally.</p> <blockquote>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.</blockquote> </div> <div> <h4>Examples</h4> <p>Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally.</p> <blockquote>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.</blockquote> </div> <div> <h4>Themes</h4> <p>Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally.</p> <blockquote>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.</blockquote> </div> <div> <h4>Purchase</h4> <p>Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally.</p> <blockquote>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.</blockquote> </div>";
$(".h-content").html(_hContent);
$(".v-content").html(_vContent);
$(document).ready(function () {
    var e = function (e, t, n) {
        if (e === "position" || e === "orientation") {
            if ($(".switcher-box.orientation a.active").attr("data-value") === "horizontal") {
                $(".switcher-box.position a").fadeIn()
            } else {
                $(".switcher-box.position a").not(".o-o-v").fadeOut("fast");
                $(".switcher-box.position a.o-o-v").fadeIn("fast")
            }
        }
    };
    var t = function (e, t, n, r) {
        var t = e.parent().attr("data-option");
        var n = e.attr("data-value");
        if (t === "type" || t === "easing" || t === "effects") {
            if ($(".switcher-box.animation.type a.active").attr("data-value") === "jquery") {
                $(".animation.easing").fadeIn()
            } else {
                $(".animation.easing").fadeOut("fast")
            } if (t === "effects") {
                if ($(".switcher-box.animation.effects a.active").attr("data-value") != "none") {
                    $(".switcher-box.duration").parents(".row").fadeIn();
                    if ($(".switcher-box.animation.easing a.active").attr("data-value") === "jquery") {
                        $(".switcher-box.easing").parents(".row").fadeIn()
                    }
                } else {
                    $(".switcher-box.easing").parents(".row").fadeOut("fast");
                    $(".switcher-box.duration").parents(".row").fadeOut("fast")
                }
            }
        }
    };
    $(".switcher-box a").on("click", function (t) {
        t.preventDefault();
        $(this).addClass("active").parent().find("a").not($(this)).removeClass("active");
        var n = $(this).parent().attr("data-option");
        var r = $(this).attr("data-value");
        var i = $.parseJSON('{"' + n + '": "' + r + '"}');
        $(this).parents("section").find(".z-tabs").each(function (t, s) {
            $(s).data("zozoTabs").setOptions(i);
            e(n, r, $(s).data("zozoTabs"))
        });
        $(this).parents("section").find(".z-accordion").each(function (e, t) {
            $(t).data("zozoAccordion").setOptions(i)
        })
    });
    $(".config-group .autoplay a").bind("click", function (e) {
        e.preventDefault();
        $(".autoplay .z-tabs").data("zozoTabs")[$(this).attr("data-value")]()
    });
    $(".config-group .animation.effects a").bind("click", function (e) {
        e.preventDefault();
        t($(this));
        $(".animation .z-tabs").data("zozoTabs").setOptions({
            animation: {
                effects: $(this).attr("data-value")
            }
        })
    });
    $(".config-group .animation.type a").bind("click", function (e) {
        e.preventDefault();
        t($(this));
        $(".animation .z-tabs").data("zozoTabs").setOptions({
            animation: {
                type: $(this).attr("data-value")
            }
        })
    });
    $(".config-group .animation.duration a").bind("click", function (e) {
        e.preventDefault();
        t($(this));
        $(".animation .z-tabs").data("zozoTabs").setOptions({
            animation: {
                duration: parseInt($(this).attr("data-value"))
            }
        })
    });
    $(".config-group .animation.easing a").bind("click", function (e) {
        e.preventDefault();
        $(".animation .z-tabs").data("zozoTabs").setOptions({
            animation: {
                easing: $(this).attr("data-value")
            }
        })
    });
    $(".config-group #easeType").change(function (e) {
        $(".animation .z-tabs").data("zozoTabs").setOptions({
            animation: {
                easing: $(this).val()
            }
        })
    });
    $(".ajax > .add").click(function () {
        $(".ajax .z-tabs").data("zozoTabs").add("New Tab", "New Tab Content ...<br>")
    });
    $(".ajax > .remove").click(function () {
        $(".ajax .z-tabs").data("zozoTabs").remove(0)
    });
    $(document).on("mouseenter", ".media-box", function (e) {
        $(this).find(".mask").stop(true, true).fadeIn()
    }).on("mouseleave", ".media-box", function (e) {
        $(this).find(".mask").stop(true, true).fadeOut()
    })
});
$(document).ready(function () {
    function e() {
        var e = $(window).width(),
            t = false;
        if (e > 1e3) {
            var n = $(".mini-btn");
            n.hover(function () {
                $(this).animate({
                    opacity: 1
                }, 300)
            }, function () {
                $(this).animate({
                    opacity: .95
                }, 300)
            }).click(function (e) {
                e.preventDefault();
                $("html, body").animate({
                    scrollTop: 0
                }, 300, "easeInOutCirc")
            });
            $(window).scroll(function () {
                if ($(window).scrollTop() > 200) {
                    n.css("display", "block")
                } else {
                    n.css("display", "none")
                }
            })
        }
    }
    e();
    $(window).resize(function () {
        e()
    })
});
$(document).ready(function () {
    $("[data-role='z-ui-tabs']").each(function (e, t) {
        $(t).zozoTabs({
            theme: "blue",
            orientation: "horizontal",
            style: "underlined",
            size: "medium",
            defaultTab: "tab1",
            animation: {
                duration: 200,
                effects: "slideV"
            }
        })
    })
});
