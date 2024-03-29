/*!
 *                                                                                                                                (℠)
 *  # Pipi: BiB/i Putter
 *
 *  - "Putting EPUBs in a Web Page with BiB/i."
 *  - (c) Satoru MATSUSHIMA - http://bibi.epub.link or https://github.com/satorumurmur/bibi
 *  - Licensed under the MIT license. - http://www.opensource.org/licenses/mit-license.php
 */
!function () {
    if (!window["bibi:pipi"]) {
        var e = window["bibi:pipi"] = {
            version: "0.999.9-r8",
            build: 201804031815,
            Status: "",
            Bibis: [],
            Anchors: [],
            Holders: [],
            Frames: [],
            TrustworthyOrigins: [location.origin],
            Loaded: 0
        };
        e.Path = function () {
            if (document.currentScript) return document.currentScript.src;
            var e = document.getElementsByTagName("script");
            return e[e.length - 1].src
        }(), e.embed = function () {
            e.Status = "Started";
            for (var t = document.body.querySelectorAll("a[data-bibi]"), i = t.length, n = 0; n < i; n++) if (t[n].getAttribute("href") && !t[n].Bibi) {
                var o = {Index: n, Number: n + 1}, a = o.Anchor = t[n];
                / bibi-anchor /.test(" " + a.className + " ") || (a.className = "bibi-anchor" + (a.className ? " " + a.className : "")), a.origin != location.origin && e.TrustworthyOrigins.push(a.origin), a.addEventListener("bibi:loaded", function (e) {
                    console.log("BiB/i: Loaded. - #" + e.detail.Number + ": " + e.detail.Anchor.href)
                }, !1), e.Anchors.push(a);
                var r = a.getAttribute("data-bibi-class"), s = a.getAttribute("data-bibi-id"),
                    d = a.getAttribute("data-bibi-style"), c = o.Holder = e.create("span", {
                        className: "bibi-holder" + (r ? " " + r : ""),
                        id: s ? s : "bibi-holder-" + (n + 1),
                        title: (a.innerText ? a.innerText + " " : "") + "(powered by BiB/i)"
                    });
                d && c.setAttribute("style", d), e.Holders.push(c);
                var u = new e.Fragments;
                u.add("parent-title", document.title), u.add("parent-uri", location.href), u.add("parent-origin", location.origin), u.add("parent-pipi-path", e.Path), u.add("parent-bibi-label", a.innerHTML), u.add("parent-holder-id", c.id), ["to", "nav", "reader-view-mode", "fix-reader-view-mode", "single-page-always", "autostart", "start-in-new-window", "use-full-height", "use-menubar", "use-nombre", "use-slider", "use-arrows", "use-keys", "use-swipe", "use-cookie", "preprocess-html-always"].forEach(function (e) {
                    var t = a.getAttribute("data-bibi-" + e);
                    if (t) {
                        var i;
                        switch (e) {
                            case"to":
                                i = /^[1-9][\d\-\.]*$/;
                                break;
                            case"nav":
                                i = /^[1-9]\d*$/;
                                break;
                            case"reader-view-mode":
                                i = /^(horizontal|vertical|paged)$/;
                                break;
                            default:
                                i = /^(true|false|yes|no|mobile|desktop)?$/
                        }
                        i.test(t) && u.add(e, t)
                    }
                });
                var b = a.getAttribute("href"), l = o.Frame = c.appendChild(e.create("iframe", {
                    className: "bibi-frame",
                    frameborder: "0",
                    scrolling: "auto",
                    allowfullscreen: "true",
                    src: b + (/#/.test(b) ? "," : "#") + u.make()
                }));
                l.addEventListener("load", function () {
                    e.Loaded++, this.Bibi.Anchor.dispatchEvent(new CustomEvent("bibi:loaded", {detail: this.Bibi})), "Timeouted" != e.Status && e.Loaded == e.Bibis.length && (e.Status = "Loaded", document.dispatchEvent(new CustomEvent("bibi:loaded", {detail: e})))
                }, !1), e.Frames.push(l), e.Bibis.push(o), l.Bibi = c.Bibi = a.Bibi = o
            }
            for (var n = 0, i = e.Bibis.length; n < i; n++) if (!e.Bibis[n].Embedded) {
                var o = e.Bibis[n];
                o.move = function (e) {
                    "number" == typeof Target && this.Frame.contentWindow.postMessage('{"bibi:commands:move":"' + e + '"}', this.Anchor.origin)
                }, o.focus = function (e) {
                    "string" != typeof e && "number" != typeof e || this.Frame.contentWindow.postMessage('{"bibi:commands:focus":"' + e + '"}', this.Anchor.origin)
                }, o.changeView = function (e) {
                    "string" == typeof Target && this.Frame.contentWindow.postMessage('{"bibi:commands:change-view":"' + e + '"}', this.Anchor.origin)
                }, o.togglePanel = function () {
                    this.Frame.contentWindow.postMessage('{"bibi:command:toggle-panel":""}', this.Anchor.origin)
                }, o.Anchor.style.display = "none", o.Anchor.parentNode.insertBefore(o.Holder, o.Anchor), o.Anchor.dispatchEvent(new CustomEvent("bibi:readied", {detail: o}))
            }
            return setTimeout(function () {
                "Loaded" != e.Status && (e.Status = "Timeouted", document.dispatchEvent(new CustomEvent("bibi:timed-out", {detail: e})))
            }, 12e3), e.Status = "Readied", document.dispatchEvent(new CustomEvent("bibi:readied", {detail: e})), e.Bibis
        }, e.encode = function (e) {
            return encodeURIComponent(e).replace("(", "_BibiKakkoOpen_").replace(")", "_BibiKakkoClose_")
        }, e.create = function (e, t) {
            var i = document.createElement(e);
            for (var n in t) i[n] = t[n];
            return i
        }, e.Fragments = function () {
            return this.Fragments = [], this.add = function (t, i) {
                this.Fragments.push(t + ":" + e.encode(i))
            }, this.make = function () {
                return this.Fragments.length ? "pipi(" + this.Fragments.join(",") + ")" : ""
            }, this
        }, (!window.CustomEvent || "function" != typeof window.CustomEvent && window.CustomEvent.toString().indexOf("CustomEventConstructor") === -1) && (window.CustomEvent = function (e, t) {
            t = t || {bubbles: !1, cancelable: !1, detail: void 0};
            var i = document.createEvent("CustomEvent");
            return i.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), i
        }, window.CustomEvent.prototype = window.Event.prototype), window.addEventListener("message", function (t) {
            if (t && t.data) for (var i = 0, n = e.TrustworthyOrigins.length; i < n; i++) if (t.origin == e.TrustworthyOrigins[i]) {
                var o = t.data;
                try {
                    if (o = JSON.parse(o), "object" != typeof o || !o) return !1;
                    for (var a in o) /^bibi:commands:/.test(a) && document.dispatchEvent(new CustomEvent(a, {detail: o[a]}));
                    return !0
                } catch (r) {
                }
                return !1
            }
        }, !1), document.getElementsByTagName("head")[0].appendChild(e.create("link", {
            rel: "stylesheet",
            id: "bibi-css",
            href: e.Path.replace(/\.js$/, ".css")
        })), document.addEventListener("bibi:readied", function (e) {
            console.log("BiB/i: Readied. - " + e.detail.Bibis.length + " Bibi" + (e.detail.Bibis.length > 1 ? "s" : "") + ".")
        }, !1), document.addEventListener("bibi:loaded", function (e) {
            console.log("BiB/i: Loaded. - " + e.detail.Bibis.length + " Bibi" + (e.detail.Bibis.length > 1 ? "s" : "") + ".")
        }, !1), document.addEventListener("bibi:timed-out", function (e) {
            console.log("BiB/i: Timed Out.")
        }, !1), document.addEventListener("DOMContentLoaded", e.embed, !1)
    }
}();