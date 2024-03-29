/*!
 *
 * # BiB/i Extension: EPUBCFI Utilities
 *
 * - "EPUBCFI Utilities for BiB/i"
 * - Copyright (c) Satoru MATSUSHIMA - http://bibi.epub.link/ or https://github.com/satorumurmur/bibi
 * - Licensed under the MIT license. - http://www.opensource.org/licenses/mit-license.php
 */
Bibi.x({
    name: "EPUBCFI",
    description: "EPUBCFI Utilities",
    author: "Satoru MATSUSHIMA (@satorumurmur)",
    version: "0.1.0",
    build: 20150703.1341,
    CFIString: "",
    Current: 0,
    Log: !1,
    LogCorrection: !1,
    LogCancelation: !1,
    parse: function (t, e) {
        if (!t || "string" != typeof t) return null;
        try {
            t = decodeURIComponent(t)
        } catch (r) {
            return this.log(0, "Unregulated URIEncoding."), null
        }
        return e && "string" == typeof e && "function" == typeof this["parse" + e] || (e = "Fragment"), "Fragment" == e && (t = t.replace(/^(epubcfi\()?/, "epubcfi(").replace(/(\))?$/, ")")), this.CFIString = t, this.Current = 0, this.Log && (this.log(1, "BiB/i EPUB-CFI"), this.log(2, "parse"), this.log(3, "CFIString: " + this.CFIString)), this["parse" + e]()
    },
    parseFragment: function () {
        var t = this.Current, e = {};
        return this.parseString("epubcfi(") ? (e = this.parseCFI(), null === e ? this.cancel(t) : this.parseString(")") ? e : this.cancel(t, "Fragment")) : this.cancel(t, "Fragment")
    },
    parseCFI: function () {
        var t = this.Current, e = {Type: "CFI", Path: {}};
        if (e.Path = this.parsePath(), !e.Path) return this.cancel(t, "CFI");
        if (this.parseString(",")) {
            if (e.Start = this.parseLocalPath(), !e.Start.Steps.length && !e.Start.TermStep) return this.cancel(t, "CFI > Range");
            if (!this.parseString(",")) return this.cancel(t, "CFI > Range");
            if (e.End = this.parseLocalPath(), !e.End.Steps.length && !e.End.TermStep) return this.cancel(t, "CFI > Range")
        }
        return e
    },
    parsePath: function () {
        var t = this.Current, e = {Type: "Path", Steps: []}, r = {};
        return e.Steps[0] = this.parseStep(), e.Steps[0] && (r = this.parseLocalPath()) ? (e.Steps = e.Steps.concat(r.Steps), e) : this.cancel(t, "Path")
    },
    parseLocalPath: function () {
        var t = (this.Current, {Type: "LocalPath", Steps: []}), e = t, r = null, n = null;
        for (r = this.parseStep("Local"); null !== r && (e.Steps.push(r), r = this.parseStep("Local"));) if ("IndirectStep" == r.Type) {
            var i = {Type: "IndirectPath", Steps: []};
            e.Steps.push(i), e = i
        } else if ("TermStep" == r.Type) {
            n = r;
            break
        }
        return n && e.Steps.push(n), t.Steps.length ? t : null
    },
    parseStep: function (t) {
        var e = this.Current, r = {};
        if (this.parseString("/")) r.Type = "Step"; else if (t && this.parseString("!/")) r.Type = "IndirectStep"; else {
            if (!t || !this.parseString(":")) return this.cancel(e, "Step");
            r.Type = "TermStep"
        }
        if (r.Index = this.parseString(/^(0|[1-9][0-9]*)/), null === r.Index) return this.cancel(e, "Step");
        if (r.Index = parseInt(r.Index), this.parseString("[")) {
            if ("TermStep" != r.Type) {
                if (r.ID = this.parseString(/^[a-zA-Z_:][a-zA-Z0-9_:\-\.]+/), !r.ID) return this.cancel(e, "Step > Assertion > ID")
            } else {
                var n = [], i = null, s = /^((\^[\^\[\]\(\)\,\;\=])|[_a-zA-Z0-9%\- ])*/;
                if (n.push(this.parseString(s)), this.parseString(",") && n.push(this.parseString(s)), n[0] && (r.Preceding = n[0]), n[1] && (r.Following = n[1]), this.parseString(/^;s=/) && (i = this.parseString(/^[ab]/)), i && (r.Side = i), !r.Preceding && !r.Following && !r.Side) return this.cancel(e, "Step > Assertion > TextLocation")
            }
            if (!this.parseString("]")) return this.cancel(e, "Step > Assertion")
        }
        return r
    },
    parseString: function (t) {
        var e = null, r = !1;
        if (t instanceof RegExp) {
            var n = this.CFIString.substr(this.Current, this.CFIString.length - this.Current);
            t.test(n) && (r = !0, t = n.match(t)[0])
        } else this.CFIString.substr(this.Current, t.length) === t && (r = !0);
        return r && (this.Current += t.length, e = t), this.correct(e)
    },
    correct: function (t) {
        return this.Log && this.LogCorrection && t && this.log(3, t), t
    },
    cancel: function (t, e) {
        return this.Log && this.LogCancelation && this.log(4, "cancel: parse" + e + " (" + t + "-" + this.Current + "/" + this.CFIString.length + ")"), "number" == typeof t && (this.Current = t), null
    },
    log: function (t, e) {
        this.Log && console && console.log && (0 == t ? e = "[ERROR] " + e : 1 == t ? e = "---------------- " + e + " ----------------" : 2 == t ? e = e : 3 == t ? e = " - " + e : 4 == t && (e = "   . " + e), console.log("BiB/i EPUBCFI: " + e))
    },
    getDestination: function (t) {
        var e = X.EPUBCFI.parse(t);
        if (!e || e.Path.Steps.length < 2 || !e.Path.Steps[1].Index || e.Path.Steps[1].Index % 2 == 1) return null;
        var r = e.Path.Steps[1].Index / 2 - 1, n = null, i = null, s = null, a = null;
        return e.Path.Steps[2] && e.Path.Steps[2].Steps && (n = "", e.Path.Steps[2].Steps.forEach(function (t, r) {
            return "IndirectPath" == t.Type ? (a = t, !1) : "TermStep" == t.Type ? (s = t, !1) : (t.Index % 2 != 1 || (i = t.Index - 1, r == e.Path.Steps[2].Steps.length - 2)) && void (null === i && (n = t.ID ? "#" + t.ID : n + ">*:nth-child(" + t.Index / 2 + ")"))
        }), n && /^>/.test(n) && (n = "html" + n), n || (n = null)), {
            CFI: e,
            CFIString: t,
            ItemIndexInAll: r,
            ElementSelector: n,
            TextNodeIndex: i,
            TermStep: s,
            IndirectPath: a
        }
    }
});