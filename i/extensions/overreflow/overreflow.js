/*!
 *
 * # BiB/i Extension: OverReflow
 *
 * - "Overlays Reflowable Content Layers on Pre-Paginated Book"
 * - Copyright (c) Satoru MATSUSHIMA - http://bibi.epub.link/ or https://github.com/satorumurmur/bibi
 * - Licensed under the MIT license. - http://www.opensource.org/licenses/mit-license.php
 */
Bibi.x({
    name: "OverReflow",
    description: "Overlays Reflowable Content Layers on Pre-Paginated Book",
    version: "0.1.0",
    build: 20150902.0003
})(function () {
    E.bind("bibi:loaded-package-document", function () {
        X.OverReflow.Layer = R.Sub.appendChild(sML.create("div", {
            className: "overreflow-layer hidden",
            Frames: [],
            open: function (e) {
                R.Sub.style.display = "block", X.OverReflow.Layer.Frames.forEach(function (r) {
                    r.style.display = r == e.OverReflow.Frame ? "block" : "none"
                }), setTimeout(function () {
                    sML.removeClass(X.OverReflow.Layer, "hidden"), sML.removeClass(X.OverReflow.Bar, "hidden")
                }, 0)
            },
            close: function () {
                sML.addClass(X.OverReflow.Layer, "hidden"), sML.addClass(X.OverReflow.Bar, "hidden"), setTimeout(function () {
                    R.Sub.style.display = ""
                }, 250)
            }
        })), X.OverReflow.Bar = R.Sub.appendChild(sML.create("div", {className: "overreflow-bar"})), X.OverReflow.Closer = X.OverReflow.Bar.appendChild(sML.create("span", {
            className: "overreflow-closer",
            innerHTML: "Close"
        })), X.OverReflow.Closer.addEventListener("click", function () {
            X.OverReflow.Layer.close()
        })
    }), E.bind("bibi:loaded-item", function (e) {
        if (e.ItemRef["bibi:overreflow"] && /^idref:/.test(e.ItemRef["bibi:overreflow"])) {
            if (e.stamp("OverReflow Prepare Start"), e.OverReflow = {}, e.OverReflow.IDRef = e.ItemRef["bibi:overreflow"].replace(/^idref:(.*)/, "$1"), !B.Package.Manifest.items[e.OverReflow.IDRef]) return e.stamp("OverReflow Prepare Error");
            e.OverReflow.idref = e.ItemRef["bibi:overreflow"], e.OverReflow.Path = O.getPath(B.Package.Dir, B.Package.Manifest.items[e.OverReflow.IDRef].href), e.OverReflow.URI = B.Zipped ? B.getDataURI(e.OverReflow.Path) : B.Path + "/" + e.OverReflow.Path, e.OverReflow.Frame = X.OverReflow.Layer.appendChild(sML.create("iframe", {
                className: "overreflow-frame",
                scrolling: "auto",
                allowtransparency: "true",
                src: e.OverReflow.URI,
                onload: function () {
                    var e = this.contentDocument.documentElement, r = this.contentDocument.body;
                    e.addEventListener("click", X.OverReflow.Layer.close, !1), sML.each(r.getElementsByTagName("a"), function () {
                        this.addEventListener("click", function (e) {
                            e.stopPropagation()
                        }, !1)
                    })
                }
            })), e.OverReflow.Opener = e.ItemBox.appendChild(sML.create("span", {
                className: "overreflow-opener",
                Item: e,
                innerHTML: '<a href="' + e.OverReflow.URI + '">Open</a>'
            }, {}, {
                click: function () {
                    X.OverReflow.Layer.open(this.Item)
                }
            })), X.OverReflow.Layer.Frames.push(e.OverReflow.Frame), e.stamp("OverReflow Prepare End")
        }
    })
});