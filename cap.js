'use strict';
var INPUT = { TEXT: '<input>', TEXTAREA: '<textarea>' };
var TAG = { BR: '<br>', DIV: '<div>' }
var INPUT_CLASS_NAME = 'copyTextInput';
var SUCCESS_MSG_ID = 'copySuccessMsg';

class cap {
    static init(customOptions) {
        this.default = {
            input: {
                visible: false,
                type: INPUT.TEXTAREA
            },
            successMessage: {
                enable: true,
                text: 'Copied to clipboard',
                position: null,
                timeout: 1000
            },
            lineBreak: true
        };
        this.options = $.extend(true, {},
            this.default, customOptions);
    }

    static copy(elem, customOptions) {
        if (customOptions) {
            this.options = $.extend(true, {}, this.options, customOptions);
        }

        this.removeElem('.' + INPUT_CLASS_NAME);
        if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
            this.iosCopy(this.createTextInput(elem));
        } else {
            this.createTextInput(elem)[0].select();
        }

        document.execCommand('copy');

        if (!this.options.input.visible) {
            this.removeElem('.' + INPUT_CLASS_NAME);
        }

        if (this.options.successMessage.enable) {
            this.generateSuccessMsg(elem);
        }
    }

    static iosCopy(textInput) {
        var $input = textInput;
        $input.val();
        var el = $input.get(0);
        var editable = el.contentEditable;
        var readOnly = el.readOnly;
        el.contentEditable = true;
        el.readOnly = false;
        var range = document.createRange();
        range.selectNodeContents(el);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        el.setSelectionRange(0, 999999);
        el.contentEditable = editable;
        el.readOnly = readOnly;
    }

    static removeElem(elem) {
        var existingCopyTextInput = $(elem);
        if (existingCopyTextInput) {
            existingCopyTextInput.remove();
        }
    }

    static createTextInput(elem) {
        var target = $(elem)[0];
        var dom = this.options.lineBreak ? $(INPUT.TEXTAREA) : $(this.options.input.type);
        dom.val(this.options.lineBreak ? this.parseLineBreak(target.innerHTML) : target.innerHTML)
        dom.addClass(INPUT_CLASS_NAME);
        target.append(dom[0]);
        return dom;
    }

    static parseLineBreak(html) {
        var re = new RegExp(TAG.BR,"g");
        return html.replace(re, '\r');
    }

    static generateSuccessMsg(elem) {
        this.removeElem('#' + SUCCESS_MSG_ID);

        var dom = $(TAG.DIV);
        dom.attr('id', SUCCESS_MSG_ID)
        dom.text(this.options.successMessage.text);
        $(this.options.successMessage.position != null ? this.options.successMessage.position : elem).after(dom[0]);
        if (this.options.successMessage.timeout > -1) {
            setTimeout(function () { dom.remove() }, this.options.successMessage.timeout);
        }
    }
}