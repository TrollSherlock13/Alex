/*!
 *
 * # BiB/i Extension: Loupe (for Pointing Devices)
 *
 * - "Zooming-in Utility: Users can zoom-in the book with pointing devices."
 * - Copyright (c) Satoru MATSUSHIMA - http://bibi.epub.link or https://github.com/satorumurmur/bibi
 * - Licensed under the MIT license. - http://www.opensource.org/licenses/mit-license.php
 *
 */
Bibi.x({
    name: "Loupe",
    description: "Zooming-in Feature for BiB/i with Pointing Devices",
    author: "Satoru MATSUSHIMA (@satorumurmur)",
    version: "1.0.0",
    build: Bibi.build
})(function () {
    O.Mobile || ("string" == typeof X.Presets.Loupe.mode && "with-keys" == X.Presets.Loupe.mode || (X.Presets.Loupe.mode = "pointer-only"), ("number" != typeof X.Presets.Loupe["max-scale"] || X.Presets.Loupe["max-scale"] <= 1) && (X.Presets.Loupe["max-scale"] = 4), ("with-keys" != X.Presets.Loupe.mode || S["use-keys"]) && (O.appendStyleSheetLink({
        className: "bibi-extension-stylesheet",
        id: "bibi-extension-stylesheet_Loupe",
        href: O.RootPath + "extensions/loupe/loupe.css"
    }), sML.edit(X.Loupe, {
        scale: function (o, e) {
            if ("number" != typeof o) return !1;
            if (o = Math.round(100 * o) / 100, o != R.Main.Transformation.Scale) {
                if (E.dispatch("bibi:changes-scale", o), 1 == o) this.transform({
                    Scale: 1,
                    Translation: {X: 0, Y: 0}
                }); else {
                    if ("active" != this.UIState) return !1;
                    e || (e = {
                        Coord: {
                            X: R.Main.offsetWidth / 2,
                            Y: R.Main.offsetHeight / 2
                        }
                    }), this.transform({
                        Scale: o,
                        Translation: {
                            X: e.Coord.X - (e.Coord.X - R.Main.Transformation.Translation.X) * (o / R.Main.Transformation.Scale),
                            Y: e.Coord.Y - (e.Coord.Y - R.Main.Transformation.Translation.Y) * (o / R.Main.Transformation.Scale)
                        }
                    })
                }
                E.dispatch("bibi:changed-scale", R.Main.Transformation.Scale)
            }
        }, transform: function (o) {
            o && (clearTimeout(this.Timer_onTransformEnd), sML.addClass(O.HTML, "transforming"), o.Translation.X > 0 && (o.Translation.X = 0), o.Translation.Y > 0 && (o.Translation.Y = 0), o.Translation.X < R.Main.offsetWidth * (1 - o.Scale) && (o.Translation.X = R.Main.offsetWidth * (1 - o.Scale)), o.Translation.Y < R.Main.offsetHeight * (1 - o.Scale) && (o.Translation.Y = R.Main.offsetHeight * (1 - o.Scale)), sML.style(R.Main, {
                transform: function (e) {
                    return o.Translation.X && o.Translation.Y ? e.push("translate(" + o.Translation.X + "px, " + o.Translation.Y + "px)") : o.Translation.X ? e.push("translateX(" + o.Translation.X + "px)") : o.Translation.Y && e.push("translateY(" + o.Translation.Y + "px)"), 1 != o.Scale && e.push("scale(" + o.Scale + ")"), e.join(" ")
                }([])
            }), R.Main.Transformation = o, this.Timer_onTransformEnd = setTimeout(function () {
                1 == R.Main.Transformation.Scale ? (sML.removeClass(O.HTML, "zoomed-in"), sML.removeClass(O.HTML, "zoomed-out")) : R.Main.Transformation.Scale < 1 ? (sML.removeClass(O.HTML, "zoomed-in"), sML.addClass(O.HTML, "zoomed-out")) : (sML.removeClass(O.HTML, "zoomed-out"), sML.addClass(O.HTML, "zoomed-in")), sML.removeClass(O.HTML, "transforming"), X.Loupe.onTransformEnd(), S["use-cookie"] && O.Cookie.eat(O.BookURL, {Loupe: {Transformation: R.Main.Transformation}})
            }, 345))
        }, isAvailable: function (o, e) {
            if (!L.Opened) return !1;
            if ("active" != this.UIState) return !1;
            if ("reflowable" == S.BRL) return !1;
            if ("CHECK-STEALTH" == o) {
                if (!I.KeyListener.ActiveKeys.Space && !X.Loupe.Dragging) return !1
            } else if ("TAP" == o) {
                if (!I.KeyListener.ActiveKeys.Space) return !1
            } else if ("MOVE" == o) {
                if (1 == R.Main.Transformation.Scale) return !1
            } else if (!R.PointerIsDowned) return !1;
            return !0
        }, onTransformEnd: function () {
            "with-keys" == X.Presets.Loupe.mode ? I.setUIState(X.Loupe.SubPanel.Sections[0].ButtonGroup.Buttons[1], 1 == R.Main.Transformation.Scale ? "disabled" : "default") : (I.setUIState(X.Loupe.ZoomInButton, R.Main.Transformation.Scale == X.Presets.Loupe["max-scale"] ? "disabled" : "default"), I.setUIState(X.Loupe.ZoomResetButton, 1 == R.Main.Transformation.Scale ? "disabled" : "default"), I.setUIState(X.Loupe.ZoomOutButton, 1 == R.Main.Transformation.Scale ? "disabled" : "default"))
        }, adjustScale: function (o) {
            return o < 1 ? 1 : o > X.Presets.Loupe["max-scale"] ? X.Presets.Loupe["max-scale"] : o
        }, ontapped: function (o) {
            if (!this.isAvailable("TAP", o)) return !1;
            var e = O.getBibiEvent(o);
            if (e.Target.tagName) {
                if (/bibi-menu|bibi-slider/.test(e.Target.id)) return !1;
                if (O.isAnchorContent(e.Target)) return !1;
                if ("horizontal" == S.RVM && e.Coord.Y > window.innerHeight - O.Scrollbars.Height) return !1
            }
            this.scale(this.adjustScale(R.Main.Transformation.Scale + .5 * (o.shiftKey ? -1 : 1)), e)
        }, onpointerdown: function (o) {
            this.PointerDownCoord = O.getBibiEvent(o).Coord, this.PointerDownTransformation = {
                Scale: R.Main.Transformation.Scale,
                Translation: {X: R.Main.Transformation.Translation.X, Y: R.Main.Transformation.Translation.Y}
            }
        }, onpointerup: function (o) {
            sML.removeClass(O.HTML, "dragging"), X.Loupe.Dragging = !1, delete this.PointerDownCoord, delete this.PointerDownTransformation
        }, onpointermove: function (o) {
            if (!this.isAvailable("MOVE", o)) return !1;
            if (1 != R.Main.Transformation.Scale && this.PointerDownCoord) {
                X.Loupe.Dragging = !0, sML.addClass(O.HTML, "dragging");
                var e = O.getBibiEvent(o);
                clearTimeout(this.Timer_TransitionRestore), sML.style(R.Main, {
                    transition: "none",
                    cursor: "move"
                }), this.transform({
                    Scale: R.Main.Transformation.Scale,
                    Translation: {
                        X: this.PointerDownTransformation.Translation.X + (e.Coord.X - this.PointerDownCoord.X),
                        Y: this.PointerDownTransformation.Translation.Y + (e.Coord.Y - this.PointerDownCoord.Y)
                    }
                }), this.Timer_TransitionRestore = setTimeout(function () {
                    sML.style(R.Main, {transition: "", cursor: ""})
                }, 234)
            }
        }
    }), I.isPointerStealth.addChecker(function () {
        return X.Loupe.isAvailable("CHECK-STEALTH")
    }), I.setToggleAction(X.Loupe, {
        onopened: function () {
            sML.addClass(O.HTML, "loupe-active"), sML.addClass(O.HTML, "loupe-" + X.Presets.Loupe.mode), "with-keys" == X.Presets.Loupe.mode && I.setUIState(this.SubPanel.Sections[0].ButtonGroup.Buttons[0], "active")
        }, onclosed: function () {
            this.scale(1), sML.removeClass(O.HTML, "loupe-" + X.Presets.Loupe.mode), sML.removeClass(O.HTML, "loupe-active"), "with-keys" == X.Presets.Loupe.mode && I.setUIState(this.SubPanel.Sections[0].ButtonGroup.Buttons[0], "default")
        }
    }), E.add("bibi:commands:activate-loupe", function () {
        X.Loupe.open()
    }), E.add("bibi:commands:deactivate-loupe", function () {
        X.Loupe.close()
    }), E.add("bibi:commands:toggle-loupe", function () {
        X.Loupe.toggle()
    }), E.add("bibi:commands:scale", function (o) {
        X.Loupe.scale(o)
    }), E.add("bibi:tapped", function (o) {
        X.Loupe.ontapped(o)
    }), E.add("bibi:downed-pointer", function (o) {
        X.Loupe.onpointerdown(o)
    }), E.add("bibi:upped-pointer", function (o) {
        X.Loupe.onpointerup(o)
    }), E.add("bibi:moved-pointer", function (o) {
        X.Loupe.onpointermove(o)
    }), E.add("bibi:changed-scale", function (o) {
        O.log("Changed Scale: " + o)
    }), X.Loupe.ButtonGroup = I.createButtonGroup({
        Area: I.Menu.R,
        Sticky: !0,
        Tiled: !0,
        id: "bibi-buttongroup_loupe"
    }), "with-keys" == X.Presets.Loupe.mode ? (X.Loupe.MenuButton = X.Loupe.ButtonGroup.addButton({
        Type: "toggle",
        Labels: {
            "default": {"default": "Zoom-in/out", ja: "拡大機能"},
            active: {"default": "Close Zoom-in/out Menu", ja: "拡大機能メニューを閉じる"}
        },
        Icon: '<span class="bibi-icon bibi-icon-loupe bibi-icon-loupe-menu"></span>',
        Help: !0
    }), X.Loupe.SubPanel = I.createSubPanel({
        Opener: X.Loupe.MenuButton, id: "bibi-subpanel_loupe", open: function () {
        }
    }), X.Loupe.SubPanel.addSection({
        Labels: {"default": {"default": "Zoom-in/out or Reset", ja: "拡大縮小とリセット"}},
        ButtonGroup: {
            Buttons: [{
                Type: "toggle",
                Labels: {
                    "default": {"default": "Zoom-in/out", ja: "拡大機能"},
                    active: {"default": "Zoom-in/out <small>(activated)</small>", ja: "拡大機能<small>（現在有効）</small>"}
                },
                Icon: '<span class="bibi-icon bibi-icon-loupe bibi-icon-loupe-zoomin"></span>',
                action: function () {
                    X.Loupe.toggle()
                }
            }, {
                Type: "normal",
                Labels: {"default": {"default": "Reset Zoom-in/out", ja: "元のサイズに戻す"}},
                Icon: '<span class="bibi-icon bibi-icon-loupe bibi-icon-loupe-reset"></span>',
                action: function () {
                    X.Loupe.scale(1)
                }
            }]
        },
        Notes: [{
            Position: "after",
            "default": {
                "default": ["<strong>Zoom-in/out is activated</strong>:", "* Space + Click to Zoom-in"].join("<br />"),
                ja: ["<strong>拡大機能が有効のとき</strong>：", "・スペースキーを押しながらクリックで拡大"].join("<br />")
            }
        }, {
            Position: "after",
            "default": {
                "default": ["<strong>Zoomed-in</strong>:", "* Space + Shift + Click to Zoom-out", "* Space + Drag to Move the Book"].join("<br />"),
                ja: ["<strong>拡大中</strong>：", "・スペース + Shift キーを押しながらクリックで縮小", "・スペースキーを押しながらドラッグで本を移動"].join("<br />")
            }
        }]
    })) : (X.Loupe.ZoomInButton = X.Loupe.ButtonGroup.addButton({
        Type: "normal",
        Labels: {"default": {"default": "Zoom-in", ja: "拡大する"}},
        Icon: '<span class="bibi-icon bibi-icon-loupe bibi-icon-loupe-zoomin"></span>',
        Help: !0,
        action: function () {
            X.Loupe.scale(X.Loupe.adjustScale(R.Main.Transformation.Scale + .5))
        }
    }), X.Loupe.ZoomResetButton = X.Loupe.ButtonGroup.addButton({
        Type: "normal",
        Labels: {"default": {"default": "Reset Zoom-in/out", ja: "元のサイズに戻す"}},
        Icon: '<span class="bibi-icon bibi-icon-loupe bibi-icon-loupe-reset"></span>',
        Help: !0,
        action: function () {
            X.Loupe.scale(1)
        }
    }), X.Loupe.ZoomOutButton = X.Loupe.ButtonGroup.addButton({
        Type: "normal",
        Labels: {"default": {"default": "Zoom-out", ja: "縮小する"}},
        Icon: '<span class="bibi-icon bibi-icon-loupe bibi-icon-loupe-zoomout"></span>',
        Help: !0,
        action: function () {
            X.Loupe.scale(X.Loupe.adjustScale(R.Main.Transformation.Scale - .5))
        }
    })), E.dispatch("bibi:created-loupe-menu"), E.dispatch("bibi:created-loupe")))
})()(function () {
    if (!O.Mobile) {
        if ("with-keys" == X.Presets.Loupe.mode && I.setUIState(X.Loupe.SubPanel.Sections[0].ButtonGroup.Buttons[0], "active"), X.Loupe.toggle(), S["use-cookie"]) try {
            X.Loupe.transform(O.Cookie.remember(O.BookURL).Loupe.Transformation)
        } catch (o) {
        }
        X.Loupe.onTransformEnd()
    }
});