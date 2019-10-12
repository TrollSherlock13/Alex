/*!
 *
 * # BiB/i Extension: FontSize
 *
 * - "FontSize Utility: Users can change font-size. Publishers can change default font-size."
 * - Copyright (c) Satoru MATSUSHIMA - http://bibi.epub.link or https://github.com/satorumurmur/bibi
 * - Licensed under the MIT license. - http://www.opensource.org/licenses/mit-license.php
 *
 */
Bibi.x({
    name: "FontSize",
    description: "Font Size Optimizer for BiB/i",
    author: "Satoru MATSUSHIMA (@satorumurmur)",
    version: "1.1.0",
    build: Bibi.build
})(function () {
    if (("number" != typeof X.Presets.FontSize["scale-per-step"] || X.Presets.FontSize["scale-per-step"] <= 1) && (X.Presets.FontSize["scale-per-step"] = 1.25), S["use-cookie"]) {
        var e = O.Cookie.remember(O.RootPath);
        e && e.FontSize && void 0 != e.FontSize.Step && (X.FontSize.Step = 1 * e.FontSize.Step)
    }
    ("number" != typeof X.FontSize.Step || X.FontSize.Step < -2 || 2 < X.FontSize.Step) && (X.FontSize.Step = 0), O.appendStyleSheetLink({
        className: "bibi-extension-stylesheet",
        id: "bibi-extension-stylesheet_FontSize",
        href: O.RootPath + "extensions/fontsize/fontsize.css"
    }), X.FontSize.changeItemFontSize = function (e, t) {
        e.FontSizeStyleRule && sML.CSS.deleteRule(e.FontSizeStyleRule, e.contentDocument), e.FontSizeStyleRule = sML.CSS.appendRule("html", "font-size: " + t + "px !important;", e.contentDocument)
    }, X.FontSize.changeItemFontSizeStep = function (e, t) {
        X.FontSize.changeItemFontSize(e, e.FontSize.Base * Math.pow(X.Presets.FontSize["scale-per-step"], t))
    }, E.bind("bibi:postprocessed-item-content", function (e) {
        if (e.FontSize = {Default: 1 * getComputedStyle(e.HTML).fontSize.replace(/[^\d]*$/, "")}, e.FontSize.Base = e.FontSize.Default, L.Preprocessed && (sML.UA.Chrome || sML.UA.InternetExplorer) ? Array.prototype.forEach.call(e.contentDocument.documentElement.querySelectorAll("body, body *"), function (t) {
            t.style.fontSize = parseInt(getComputedStyle(t).fontSize) / e.FontSize.Base + "rem"
        }) : O.editCSSRules(e.contentDocument, function (t) {
            if (t && t.selectorText && !/^@/.test(t.selectorText)) {
                try {
                    if (e.contentDocument.querySelector(t.selectorText) == e.HTML) return
                } catch (n) {
                }
                var i = {pt: / font-size: (\d[\d\.]*)pt; /, px: / font-size: (\d[\d\.]*)px; /};
                i.pt.test(t.cssText) && (t.style.fontSize = t.cssText.match(i.pt)[1] * (96 / 72) / e.FontSize.Base + "rem"), i.px.test(t.cssText) && (t.style.fontSize = t.cssText.match(i.px)[1] / e.FontSize.Base + "rem")
            }
        }), "number" == typeof X.Presets.FontSize.base && X.Presets.FontSize.base > 0) {
            var t = 0, n = {};
            sML.each(e.Body.querySelectorAll("p, p *"), function () {
                if (this.innerText.replace(/\s/g, "")) {
                    var e = Math.round(100 * getComputedStyle(this).fontSize.replace(/[^\d]*$/, "")) / 100;
                    n[e] || (n[e] = []), n[e].push(this)
                }
            });
            var i = 0;
            for (var o in n) n[o].length > i && (i = n[o].length, t = o);
            t && (e.FontSize.Base = e.FontSize.Base * (X.Presets.FontSize.base / t)), X.FontSize.changeItemFontSizeStep(e, X.FontSize.Step)
        } else 0 != X.FontSize.Step && X.FontSize.changeItemFontSizeStep(e, X.FontSize.Step)
    }), X.FontSize.ButtonGroup = I.createButtonGroup({
        Area: I.Menu.R,
        Sticky: !0,
        id: "bibi-buttongroup_fontsize"
    }), X.FontSize.Button = X.FontSize.ButtonGroup.addButton({
        Type: "toggle",
        Labels: {
            "default": {"default": "Change Font Size", ja: "文字サイズを変更"},
            active: {"default": "Close Font Size Menu", ja: "文字サイズメニューを閉じる"}
        },
        Icon: '<span class="bibi-icon bibi-icon-fontsize bibi-icon-fontsize-change"></span>',
        Help: !0
    }), X.FontSize.SubPanel = I.createSubPanel({
        Opener: X.FontSize.Button,
        id: "bibi-subpanel_fontsize",
        open: function () {
        }
    });
    var t = function () {
        var e = this, t = e.Step;
        t != X.FontSize.Step && (e.ButtonGroup.Busy = !0, X.FontSize.Step = t, S["use-cookie"] && O.Cookie.eat(O.RootPath, {FontSize: {Step: t}}), I.Panel.close(), I.Slider && I.Slider.close(), setTimeout(function () {
            R.layOut({
                Reset: !0, NoNotification: !0, before: function () {
                    R.Items.forEach(function (e) {
                        X.FontSize.changeItemFontSizeStep(e, t)
                    })
                }, callback: function () {
                    E.dispatch("bibi:changed-fontsize", {Step: t}), e.ButtonGroup.Busy = !1
                }
            })
        }, 88))
    };
    X.FontSize.SubPanel.Section = X.FontSize.SubPanel.addSection({
        Labels: {"default": {"default": "Choose Font Size", ja: "文字サイズを選択"}}, ButtonGroup: {
            Buttons: [{
                Type: "radio",
                Labels: {
                    "default": {
                        "default": '<span class="non-visual-in-label">Font Size:</span> Ex-Large',
                        ja: '<span class="non-visual-in-label">文字サイズ：</span>最大'
                    }
                },
                Icon: '<span class="bibi-icon bibi-icon-fontsize bibi-icon-fontsize-exlarge"></span>',
                Step: 2,
                action: t
            }, {
                Type: "radio",
                Labels: {
                    "default": {
                        "default": '<span class="non-visual-in-label">Font Size:</span> Large',
                        ja: '<span class="non-visual-in-label">文字サイズ：</span>大'
                    }
                },
                Icon: '<span class="bibi-icon bibi-icon-fontsize bibi-icon-fontsize-large"></span>',
                Step: 1,
                action: t
            }, {
                Type: "radio",
                Labels: {
                    "default": {
                        "default": '<span class="non-visual-in-label">Font Size:</span> Medium <small>(default)</small>',
                        ja: '<span class="non-visual-in-label">文字サイズ：</span>中<small>（初期値）</small>'
                    }
                },
                Icon: '<span class="bibi-icon bibi-icon-fontsize bibi-icon-fontsize-medium"></span>',
                Step: 0,
                action: t
            }, {
                Type: "radio",
                Labels: {
                    "default": {
                        "default": '<span class="non-visual-in-label">Font Size:</span> Small',
                        ja: '<span class="non-visual-in-label">文字サイズ：</span>小'
                    }
                },
                Icon: '<span class="bibi-icon bibi-icon-fontsize bibi-icon-fontsize-small"></span>',
                Step: -1,
                action: t
            }, {
                Type: "radio",
                Labels: {
                    "default": {
                        "default": '<span class="non-visual-in-label">Font Size:</span> Ex-Small',
                        ja: '<span class="non-visual-in-label">文字サイズ：</span>最小'
                    }
                },
                Icon: '<span class="bibi-icon bibi-icon-fontsize bibi-icon-fontsize-exsmall"></span>',
                Step: -2,
                action: t
            }]
        }
    }), X.FontSize.SubPanel.Section.ButtonGroup.Buttons.forEach(function (e) {
        e.Step == X.FontSize.Step && I.setUIState(e, "active")
    }), E.dispatch("bibi:created-fontsize-menu")
});