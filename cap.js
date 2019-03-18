var inputType = { text: 'input', textarea: 'textarea' };

class cap {
    constructor() { }

    static init(customOptions) {
        this._customOptions = customOptions;
    }

    static _options = {
        input: {
            visible: false,
            type: inputType.text
        },
        successMessage: {
            enable: true,
            text: 'Copied to clipboard',
            position: null,
            timeout: 1000
        },
        lineBreak: true
    };

    static getOptionByPropertyPath = function (options, propertyPath) {
        if (!propertyPath)
            return false;

        var properties = propertyPath.split('.');
        var obj = options;

        for (var i = 0; i < properties.length; i++) {
            var prop = properties[i];

            if (!obj || !obj.hasOwnProperty(prop)) {
                return null;
            } else {
                obj = obj[prop];
            }
        }

        return obj;
    };

    static getOption(propertyPath) {
        var customOption = this.getOptionByPropertyPath(this._customOptions, propertyPath);
        var defaultOption = this.getOptionByPropertyPath(this._options, propertyPath);
        return customOption == null ? defaultOption : customOption;
    }

    static copy(elem) {
        var existingCopyTextInput = document.querySelector('.copyTextInput');
        if(this.getOption('input.visible')&&existingCopyTextInput){
            existingCopyTextInput.remove();
        }

        var target = document.querySelector(elem);
        var dom = this.getOption('lineBreak') ? document.createElement(inputType.textarea) : document.createElement(this.getOption('input.type'));
        dom.value = this.getOption('lineBreak') ? this.parseLineBreak(target.innerHTML) : target.innerHTML;
        dom.className = 'copyTextInput';
        target.appendChild(dom);
        dom.select();
        document.execCommand('copy');
        if(!this.getOption('input.visible')){
            dom.remove();
        }

        if (this.getOption('successMessage.enable')) {
            this.generateSuccessMsg(elem);
        }
    }

    static parseLineBreak(html) {
        return html.replace('<br>','\r\n');
    }

    static generateSuccessMsg(elem) {
        var existingMsg = document.getElementById('copySuccessMsg');
        if (existingMsg) {
            existingMsg.remove();
        }

        var dom = document.createElement('div');
        dom.id = 'copySuccessMsg';
        dom.textContent = this.getOption('successMessage.text');
        var msgPosition = this.getOption('successMessage.position');
        document.querySelector(msgPosition != null ? msgPosition : elem).insertAfter(dom);
        if (this.getOption('successMessage.timeout') > -1) {
            setTimeout(function () { dom.remove() }, this.getOption('successMessage.timeout'));
        }
    }
}