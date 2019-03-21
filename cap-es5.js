'use strict';

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var INPUT = {
  TEXT: '<input>',
  TEXTAREA: '<textarea>'
};
var TAG = {
  BR: '<br>',
  DIV: '<div>'
};
var INPUT_CLASS_NAME = 'copyTextInput';
var SUCCESS_MSG_ID = 'copySuccessMsg';

var cap =
/*#__PURE__*/
function () {
  function cap() {
    _classCallCheck(this, cap);
  }

  _createClass(cap, null, [{
    key: "init",
    value: function init(customOptions) {
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
        lineBreak: true,
        onReady: null,
        onSuccess: null
      };
      this.options = $.extend(true, {}, this.default, customOptions);
    }
  }, {
    key: "copy",
    value: function copy(elem, customOptions) {
      if (customOptions) {
        this.options = $.extend(true, {}, this.default, customOptions);
      }

      if (this.options.onReady) {
        this.options.onReady();
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

      if (this.options.onSuccess) {
        this.options.onSuccess();
      }
    }
  }, {
    key: "iosCopy",
    value: function iosCopy(textInput) {
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
  }, {
    key: "removeElem",
    value: function removeElem(elem) {
      var existingCopyTextInput = $(elem);

      if (existingCopyTextInput) {
        existingCopyTextInput.remove();
      }
    }
  }, {
    key: "createTextInput",
    value: function createTextInput(elem) {
      var target = $(elem)[0];
      var dom = this.options.lineBreak ? $(INPUT.TEXTAREA) : $(this.options.input.type);
      dom.val(this.options.lineBreak ? this.parseLineBreak(target.innerHTML) : target.innerHTML);
      dom.addClass(INPUT_CLASS_NAME);
      var res = dom[0]
      target.appendChild(res);
      return dom;
    }
  }, {
    key: "parseLineBreak",
    value: function parseLineBreak(html) {
      var re = new RegExp(TAG.BR, "g");
      return html.replace(re, '\r');
    }
  }, {
    key: "generateSuccessMsg",
    value: function generateSuccessMsg(elem) {
      this.removeElem('#' + SUCCESS_MSG_ID);
      var dom = $(TAG.DIV);
      dom.attr('id', SUCCESS_MSG_ID);
      dom.text(this.options.successMessage.text);
      $(this.options.successMessage.position != null ? this.options.successMessage.position : elem).after(dom[0]);

      if (this.options.successMessage.timeout > -1) {
        setTimeout(function () {
          dom.remove();
        }, this.options.successMessage.timeout);
      }
    }
  }]);

  return cap;
}();