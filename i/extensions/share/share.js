/*!
 *
 * # BiB/i Extension: Share
 *
 * - Copyright (c) Satoru MATSUSHIMA - http://bibi.epub.link or https://github.com/satorumurmur/bibi
 * - Licensed under the MIT license. - http://www.opensource.org/licenses/mit-license.php
 */
Bibi.x({
    name: "Share",
    description: "Share the webpage which is holding BiB/i or embedded books through SNS.",
    author: "Satoru MATSUSHIMA (@satorumurmur)",
    version: "2.0.0",
    build: Bibi.build
})(function () {
    var e = I.createButtonGroup({Area: I.Menu.R, Sticky: !0}), t = e.addButton({
        Type: "toggle",
        Labels: {
            "default": {"default": "Share", ja: "シェア"},
            active: {"default": "Close Share-Menu", ja: "シェアメニューを閉じる"}
        },
        Help: !0,
        Icon: '<span class="bibi-icon bibi-icon-share"></span>'
    }), a = I.createSubPanel({
        Opener: t, id: "bibi-subpanel_share", open: function () {
            sML.each(this.querySelectorAll(".parent-title"), function () {
                this.innerHTML = U["parent-title"]
            }), sML.each(this.querySelectorAll(".book-title"), function () {
                this.innerHTML = document.title
            })
        }, getShareURI: function (e, t) {
            var a = "", o = "";
            switch (e) {
                case"Parent":
                    a = U["parent-title"], o = U["parent-uri"];
                    break;
                case"Book":
                    a = document.title, o = O.ReadiedURL
            }
            switch (t) {
                case"Twitter":
                    return "https://twitter.com/intent/tweet?url=" + encodeURIComponent(o) + "&text=" + encodeURIComponent(a) + "&hashtags=bibipub";
                case"Facebook":
                    return "https://www.facebook.com/sharer.php?u=" + encodeURIComponent(o);
                case"Google+":
                    return "https://plus.google.com/share?url=" + encodeURIComponent(o)
            }
            return ""
        }
    }), o = function (e, t, o) {
        var n = {
            Type: "link",
            Labels: {"default": {"default": t}},
            Icon: '<span class="bibi-icon bibi-icon-' + t.replace("+", "Plus") + '"></span>',
            href: "",
            target: "_blank",
            action: function () {
                this.href = a.getShareURI(e, t)
            }
        };
        if (!O.Mobile && "Twitter" != t) {
            var i = "_blank", r = 560, l = 500;
            switch (t) {
                case"Facebook":
                    i = "FBwindow", l = 480;
                    break;
                case"Google+":
                    i = "G+window", r = 400
            }
            n.on = {
                click: function (e) {
                    return e.preventDefault(), window.open(encodeURI(decodeURI(this.href)), i, "width=" + r + ", height=" + l + ", menubar=no, toolbar=no, scrollbars=yes"), !1
                }
            }
        }
        return n
    };
    U["parent-uri"] && a.addSection({
        Labels: {
            "default": {
                "default": "Share the Embedded Webpage",
                ja: "埋め込まれたページをシェア"
            }
        }, ButtonGroup: {Tiled: !0, Buttons: [o("Parent", "Twitter"), o("Parent", "Facebook"), o("Parent", "Google+")]}
    }).querySelector(".bibi-h-label").appendChild(sML.create("small", {className: "parent-title"})), a.addSection({
        Labels: {
            "default": {
                "default": "Share This Book",
                ja: "この本をシェア"
            }
        }, ButtonGroup: {Tiled: !0, Buttons: [o("Book", "Twitter"), o("Book", "Facebook"), o("Book", "Google+")]}
    }).querySelector(".bibi-h-label").appendChild(sML.create("small", {className: "book-title"})), O.Head.appendChild(sML.create("script", {
        async: "async",
        src: "//platform.twitter.com/widgets.js"
    }))
});