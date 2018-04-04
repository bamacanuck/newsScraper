(function(a, b) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], b)
    } else {
        if (typeof exports === "object") {
            module.exports = b(require("jquery"))
        } else {
            a.bootbox = b(a.jQuery)
        }
    }
}(this, function init(i, c) {
    var m = {
        dialog: "<div class='bootbox modal' tabindex='-1' role='dialog'><div class='modal-dialog'><div class='modal-content'><div class='modal-body'><div class='bootbox-body'></div></div></div></div></div>",
        header: "<div class='modal-header'><h4 class='modal-title'></h4></div>",
        footer: "<div class='modal-footer'></div>",
        closeButton: "<button type='button' class='bootbox-close-button close' data-dismiss='modal' aria-hidden='true'>&times;</button>",
        form: "<form class='bootbox-form'></form>",
        inputs: {
            text: "<input class='bootbox-input bootbox-input-text form-control' autocomplete=off type=text />",
            textarea: "<textarea class='bootbox-input bootbox-input-textarea form-control'></textarea>",
            email: "<input class='bootbox-input bootbox-input-email form-control' autocomplete='off' type='email' />",
            select: "<select class='bootbox-input bootbox-input-select form-control'></select>",
            checkbox: "<div class='checkbox'><label><input class='bootbox-input bootbox-input-checkbox' type='checkbox' /></label></div>",
            date: "<input class='bootbox-input bootbox-input-date form-control' autocomplete=off type='date' />",
            time: "<input class='bootbox-input bootbox-input-time form-control' autocomplete=off type='time' />",
            number: "<input class='bootbox-input bootbox-input-number form-control' autocomplete=off type='number' />",
            password: "<input class='bootbox-input bootbox-input-password form-control' autocomplete='off' type='password' />"
        }
    };
    var f = {
        locale: "en",
        backdrop: "static",
        animate: true,
        className: null,
        closeButton: true,
        show: true,
        container: "body"
    };
    var h = {};
    function p(r) {
        var q = a[f.locale];
        return q ? q[r] : a.en[r]
    }
    function d(s, r, t) {
        s.stopPropagation();
        s.preventDefault();
        var q = i.isFunction(t) && t.call(r, s) === false;
        if (!q) {
            r.modal("hide")
        }
    }
    function j(s) {
        var q, r = 0;
        for (q in s) {
            r++
        }
        return r
    }
    function k(s, r) {
        var q = 0;
        i.each(s, function(t, u) {
            r(t, u, q++)
        })
    }
    function b(q) {
        var s;
        var r;
        if (typeof q !== "object") {
            throw new Error("Please supply an object of options")
        }
        if (!q.message) {
            throw new Error("Please specify a message")
        }
        q = i.extend({}, f, q);
        if (!q.buttons) {
            q.buttons = {}
        }
        s = q.buttons;
        r = j(s);
        k(s, function(v, u, t) {
            if (i.isFunction(u)) {
                u = s[v] = {
                    callback: u
                }
            }
            if (i.type(u) !== "object") {
                throw new Error("button with key " + v + " must be an object")
            }
            if (!u.label) {
                u.label = v
            }
            if (!u.className) {
                if (r <= 2 && t === r - 1) {
                    u.className = "btn-primary"
                } else {
                    u.className = "btn-default"
                }
            }
        });
        return q
    }
    function g(r, s) {
        var t = r.length;
        var q = {};
        if (t < 1 || t > 2) {
            throw new Error("Invalid argument length")
        }
        if (t === 2 || typeof r[0] === "string") {
            q[s[0]] = r[0];
            q[s[1]] = r[1]
        } else {
            q = r[0]
        }
        return q
    }
    function l(s, q, r) {
        return i.extend(true, {}, s, g(q, r))
    }
    function e(t, u, s, r) {
        var q = {
            className: "bootbox-" + t,
            buttons: o.apply(null, u)
        };
        return n(l(q, r, s), u)
    }
    function o() {
        var u = {};
        for (var s = 0, q = arguments.length; s < q; s++) {
            var t = arguments[s];
            var r = t.toLowerCase();
            var v = t.toUpperCase();
            u[r] = {
                label: p(v)
            }
        }
        return u
    }
    function n(q, s) {
        var r = {};
        k(s, function(t, u) {
            r[u] = true
        });
        k(q.buttons, function(t) {
            if (r[t] === c) {
                throw new Error("button key " + t + " is not allowed (options are " + s.join("\n") + ")")
            }
        });
        return q
    }
    h.alert = function() {
        var q;
        q = e("alert", ["ok"], ["message", "callback"], arguments);
        if (q.callback && !i.isFunction(q.callback)) {
            throw new Error("alert requires callback property to be a function when provided")
        }
        q.buttons.ok.callback = q.onEscape = function() {
            if (i.isFunction(q.callback)) {
                return q.callback.call(this)
            }
            return true
        }
        ;
        return h.dialog(q)
    }
    ;
    h.confirm = function() {
        var q;
        q = e("confirm", ["cancel", "confirm"], ["message", "callback"], arguments);
        q.buttons.cancel.callback = q.onEscape = function() {
            return q.callback.call(this, false)
        }
        ;
        q.buttons.confirm.callback = function() {
            return q.callback.call(this, true)
        }
        ;
        if (!i.isFunction(q.callback)) {
            throw new Error("confirm requires a callback")
        }
        return h.dialog(q)
    }
    ;
    h.prompt = function() {
        var y;
        var t;
        var v;
        var q;
        var w;
        var s;
        var u;
        q = i(m.form);
        t = {
            className: "bootbox-prompt",
            buttons: o("cancel", "confirm"),
            value: "",
            inputType: "text"
        };
        y = n(l(t, arguments, ["title", "callback"]), ["cancel", "confirm"]);
        s = (y.show === c) ? true : y.show;
        y.message = q;
        y.buttons.cancel.callback = y.onEscape = function() {
            return y.callback.call(this, null)
        }
        ;
        y.buttons.confirm.callback = function() {
            var A;
            switch (y.inputType) {
            case "text":
            case "textarea":
            case "email":
            case "select":
            case "date":
            case "time":
            case "number":
            case "password":
                A = w.val();
                break;
            case "checkbox":
                var z = w.find("input:checked");
                A = [];
                k(z, function(B, C) {
                    A.push(i(C).val())
                });
                break
            }
            return y.callback.call(this, A)
        }
        ;
        y.show = false;
        if (!y.title) {
            throw new Error("prompt requires a title")
        }
        if (!i.isFunction(y.callback)) {
            throw new Error("prompt requires a callback")
        }
        if (!m.inputs[y.inputType]) {
            throw new Error("invalid prompt type")
        }
        w = i(m.inputs[y.inputType]);
        switch (y.inputType) {
        case "text":
        case "textarea":
        case "email":
        case "date":
        case "time":
        case "number":
        case "password":
            w.val(y.value);
            break;
        case "select":
            var r = {};
            u = y.inputOptions || [];
            if (!i.isArray(u)) {
                throw new Error("Please pass an array of input options")
            }
            if (!u.length) {
                throw new Error("prompt with select requires options")
            }
            k(u, function(z, A) {
                var B = w;
                if (A.value === c || A.text === c) {
                    throw new Error("given options in wrong format")
                }
                if (A.group) {
                    if (!r[A.group]) {
                        r[A.group] = i("<optgroup/>").attr("label", A.group)
                    }
                    B = r[A.group]
                }
                B.append("<option value='" + A.value + "'>" + A.text + "</option>")
            });
            k(r, function(z, A) {
                w.append(A)
            });
            w.val(y.value);
            break;
        case "checkbox":
            var x = i.isArray(y.value) ? y.value : [y.value];
            u = y.inputOptions || [];
            if (!u.length) {
                throw new Error("prompt with checkbox requires options")
            }
            if (!u[0].value || !u[0].text) {
                throw new Error("given options in wrong format")
            }
            w = i("<div/>");
            k(u, function(z, A) {
                var B = i(m.inputs[y.inputType]);
                B.find("input").attr("value", A.value);
                B.find("label").append(A.text);
                k(x, function(C, D) {
                    if (D === A.value) {
                        B.find("input").prop("checked", true)
                    }
                });
                w.append(B)
            });
            break
        }
        if (y.placeholder) {
            w.attr("placeholder", y.placeholder)
        }
        if (y.pattern) {
            w.attr("pattern", y.pattern)
        }
        if (y.maxlength) {
            w.attr("maxlength", y.maxlength)
        }
        q.append(w);
        q.on("submit", function(z) {
            z.preventDefault();
            z.stopPropagation();
            v.find(".btn-primary").click()
        });
        v = h.dialog(y);
        v.off("shown.bs.modal");
        v.on("shown.bs.modal", function() {
            w.focus()
        });
        if (s === true) {
            v.modal("show")
        }
        return v
    }
    ;
    h.dialog = function(t) {
        t = b(t);
        var u = i(m.dialog);
        var r = u.find(".modal-dialog");
        var q = u.find(".modal-body");
        var x = t.buttons;
        var v = "";
        var w = {
            onEscape: t.onEscape
        };
        if (i.fn.modal === c) {
            throw new Error("$.fn.modal is not defined; please double check you have included the Bootstrap JavaScript library. See http://getbootstrap.com/javascript/ for more details.")
        }
        k(x, function(z, y) {
            v += "<button data-bb-handler='" + z + "' type='button' class='btn " + y.className + "'>" + y.label + "</button>";
            w[z] = y.callback
        });
        q.find(".bootbox-body").html(t.message);
        if (t.animate === true) {
            u.addClass("fade")
        }
        if (t.className) {
            u.addClass(t.className)
        }
        if (t.size === "large") {
            r.addClass("modal-lg")
        } else {
            if (t.size === "small") {
                r.addClass("modal-sm")
            }
        }
        if (t.title) {
            q.before(m.header)
        }
        if (t.closeButton) {
            var s = i(m.closeButton);
            if (t.title) {
                u.find(".modal-header").prepend(s)
            } else {
                s.css("margin-top", "-10px").prependTo(q)
            }
        }
        if (t.title) {
            u.find(".modal-title").html(t.title)
        }
        if (v.length) {
            q.after(m.footer);
            u.find(".modal-footer").html(v)
        }
        u.on("hidden.bs.modal", function(y) {
            if (y.target === this) {
                u.remove()
            }
        });
        u.on("shown.bs.modal", function() {
            u.find(".btn-primary:first").focus()
        });
        if (t.backdrop !== "static") {
            u.on("click.dismiss.bs.modal", function(y) {
                if (u.children(".modal-backdrop").length) {
                    y.currentTarget = u.children(".modal-backdrop").get(0)
                }
                if (y.target !== y.currentTarget) {
                    return
                }
                u.trigger("escape.close.bb")
            })
        }
        u.on("escape.close.bb", function(y) {
            if (w.onEscape) {
                d(y, u, w.onEscape)
            }
        });
        u.on("click", ".modal-footer button", function(z) {
            var y = i(this).data("bb-handler");
            d(z, u, w[y])
        });
        u.on("click", ".bootbox-close-button", function(y) {
            d(y, u, w.onEscape)
        });
        u.on("keyup", function(y) {
            if (y.which === 27) {
                u.trigger("escape.close.bb")
            }
        });
        i(t.container).append(u);
        u.modal({
            backdrop: t.backdrop ? "static" : false,
            keyboard: false,
            show: false
        });
        if (t.show) {
            u.modal("show")
        }
        return u
    }
    ;
    h.setDefaults = function() {
        var q = {};
        if (arguments.length === 2) {
            q[arguments[0]] = arguments[1]
        } else {
            q = arguments[0]
        }
        i.extend(f, q)
    }
    ;
    h.hideAll = function() {
        i(".bootbox").modal("hide");
        return h
    }
    ;
    var a = {
        bg_BG: {
            OK: "Ок",
            CANCEL: "Отказ",
            CONFIRM: "Потвърждавам"
        },
        br: {
            OK: "OK",
            CANCEL: "Cancelar",
            CONFIRM: "Sim"
        },
        cs: {
            OK: "OK",
            CANCEL: "Zrušit",
            CONFIRM: "Potvrdit"
        },
        da: {
            OK: "OK",
            CANCEL: "Annuller",
            CONFIRM: "Accepter"
        },
        de: {
            OK: "OK",
            CANCEL: "Abbrechen",
            CONFIRM: "Akzeptieren"
        },
        el: {
            OK: "Εντάξει",
            CANCEL: "Ακύρωση",
            CONFIRM: "Επιβεβαίωση"
        },
        en: {
            OK: "OK",
            CANCEL: "Cancel",
            CONFIRM: "OK"
        },
        es: {
            OK: "OK",
            CANCEL: "Cancelar",
            CONFIRM: "Aceptar"
        },
        et: {
            OK: "OK",
            CANCEL: "Katkesta",
            CONFIRM: "OK"
        },
        fa: {
            OK: "قبول",
            CANCEL: "لغو",
            CONFIRM: "تایید"
        },
        fi: {
            OK: "OK",
            CANCEL: "Peruuta",
            CONFIRM: "OK"
        },
        fr: {
            OK: "OK",
            CANCEL: "Annuler",
            CONFIRM: "D'accord"
        },
        he: {
            OK: "אישור",
            CANCEL: "ביטול",
            CONFIRM: "אישור"
        },
        hu: {
            OK: "OK",
            CANCEL: "Mégsem",
            CONFIRM: "Megerősít"
        },
        hr: {
            OK: "OK",
            CANCEL: "Odustani",
            CONFIRM: "Potvrdi"
        },
        id: {
            OK: "OK",
            CANCEL: "Batal",
            CONFIRM: "OK"
        },
        it: {
            OK: "OK",
            CANCEL: "Annulla",
            CONFIRM: "Conferma"
        },
        ja: {
            OK: "OK",
            CANCEL: "キャンセル",
            CONFIRM: "確認"
        },
        lt: {
            OK: "Gerai",
            CANCEL: "Atšaukti",
            CONFIRM: "Patvirtinti"
        },
        lv: {
            OK: "Labi",
            CANCEL: "Atcelt",
            CONFIRM: "Apstiprināt"
        },
        nl: {
            OK: "OK",
            CANCEL: "Annuleren",
            CONFIRM: "Accepteren"
        },
        no: {
            OK: "OK",
            CANCEL: "Avbryt",
            CONFIRM: "OK"
        },
        pl: {
            OK: "OK",
            CANCEL: "Anuluj",
            CONFIRM: "Potwierdź"
        },
        pt: {
            OK: "OK",
            CANCEL: "Cancelar",
            CONFIRM: "Confirmar"
        },
        ru: {
            OK: "OK",
            CANCEL: "Отмена",
            CONFIRM: "Применить"
        },
        sq: {
            OK: "OK",
            CANCEL: "Anulo",
            CONFIRM: "Prano"
        },
        sv: {
            OK: "OK",
            CANCEL: "Avbryt",
            CONFIRM: "OK"
        },
        th: {
            OK: "ตกลง",
            CANCEL: "ยกเลิก",
            CONFIRM: "ยืนยัน"
        },
        tr: {
            OK: "Tamam",
            CANCEL: "İptal",
            CONFIRM: "Onayla"
        },
        zh_CN: {
            OK: "OK",
            CANCEL: "取消",
            CONFIRM: "确认"
        },
        zh_TW: {
            OK: "OK",
            CANCEL: "取消",
            CONFIRM: "確認"
        }
    };
    h.addLocale = function(r, q) {
        i.each(["OK", "CANCEL", "CONFIRM"], function(t, s) {
            if (!q[s]) {
                throw new Error("Please supply a translation for '" + s + "'")
            }
        });
        a[r] = {
            OK: q.OK,
            CANCEL: q.CANCEL,
            CONFIRM: q.CONFIRM
        };
        return h
    }
    ;
    h.removeLocale = function(q) {
        delete a[q];
        return h
    }
    ;
    h.setLocale = function(q) {
        return h.setDefaults("locale", q)
    }
    ;
    h.init = function(q) {
        return init(q || i)
    }
    ;
    return h
}));
