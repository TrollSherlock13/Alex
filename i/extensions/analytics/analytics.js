/*!
 *
 * # BiB/i Extension: Analytics
 *
 * - "Track and Log. Powered by Google Analytics."
 * - Copyright (c) Satoru MATSUSHIMA - http://bibi.epub.link/ or https://github.com/satorumurmur/bibi
 * - Licensed under the MIT license. - http://www.opensource.org/licenses/mit-license.php
 */
Bibi.x({
    name: "Analytics",
    description: "Track and Log",
    author: "Satoru MATSUSHIMA (@satorumurmur)",
    version: Bibi.version,
    build: Bibi.build
})(function () {
    if ("string" == typeof X.Presets.Analytics["tracking-id"] && X.Presets.Analytics["tracking-id"]) {
        var e = location.origin + location.pathname + location.search;
        !function (e, t, i, n, a, o, r) {
            e.GoogleAnalyticsObject = a, e[a] = e[a] || function () {
                (e[a].q = e[a].q || []).push(arguments)
            }, e[a].l = 1 * new Date, o = t.createElement(i), r = t.getElementsByTagName(i)[0], o.async = 1, o.src = n, r.parentNode.insertBefore(o, r)
        }(window, document, "script", "//www.google-analytics.com/analytics.js", "ga"), ga("create", X.Presets.Analytics["tracking-id"], "auto", {allowLinker: !0}), ga("require", "linker"), ga("linker:autoLink", function (e) {
            return S["trustworthy-origins"].forEach(function (t) {
                e.push(t.replace(/^\w+:\/\//, ""))
            }), e
        }([])), E.add("bibi:loaded-navigation", function () {
            sML.each(I.Panel.BookInfo.Navigation.querySelectorAll("a"), function () {
                this.addEventListener("click", function () {
                    ga("send", {
                        hitType: "event",
                        eventCategory: "BiB/i: Clicked Navigation",
                        eventAction: e,
                        eventLabel: this.innerHTML.replace(/<[^>]*>/g, "") + ' - "' + this.getAttribute("data-bibi-original-href") + '"',
                        eventValue: void 0
                    })
                })
            })
        }), E.add("bibi:played:by-button", function () {
            ga("send", {
                hitType: "event",
                eventCategory: "BiB/i: Played by Button",
                eventAction: e,
                eventLabel: "on: " + S["parent-uri"].replace(/#.+$/, ""),
                eventValue: void 0
            })
        }), E.add("bibi:scrolled", function () {
            100 == R.Current.Percent && ga("send", {
                hitType: "event",
                eventCategory: "BiB/i: Read Through",
                eventAction: e,
                eventLabel: Date.now() - O.TimeCard.Origin,
                eventValue: void 0
            })
        })
    }
});