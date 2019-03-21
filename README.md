## Copy And Play
A customizable, cross platform and easy to use text copying library.

### Demo
https://ivanhoe-dev.github.io/copy-and-play/

### Installation

npm install copy-and-play

### Usage
1. Import your Jquery and `cap.js` itself

        <script src="http://code.jquery.com/jquery-3.3.1.js"></script>
        <script type="text/javascript" src="cap.js"></script>
	
2. As `cap.js` contains ES6 code, if you want to support old browsers and IE, please import 'cap-es5.js' instead

3. Call `cap.init()` if you want to apply settings globally

4. By calling `cap.copy(selector,[settings])`, a text will be copied.

|  Parameter Name |Type   |Description|
| ------------ | ------------ | ------------ |
| selector  | Jquery selector string   |the target to be copied|
|  settings (optional) |  JSON |the settings apply to this copy action locally|

### Settings JSON
An example of the setting JSON:

    {
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
	}

### Settings Details
|Option   |Type   |Description   |Default value
| ------------ | ------------ | ------------ |------------ |
|  input.visible | boolean  | The visibility of HTML input after copied  | false|
| input.type  |  enum  | The HTML input type: **<br></br-1>INPUT.TEXT  <br></br-1> INPUT.TEXTAREA**|INPUT.TEXTAREA |
|  successMessage.enable |  boolean | Enable of successfully copied message  |true|
| successMessage.text  | string   | Content of success message  |Copied to clipboard|
|  successMessage.position | Jquery selector string  | The position of the success message  |null|
| successMessage.timeout  | integer  |  The milliseconds of disappearing the successmessage <br></br-1>**-1** : not disappear |1000|
|  lineBreak |  boolean | enable of remaining line break of the  target text |true|
|  onReady |  function | callback before the copy action perform  |null|
|  onSuccess |  function | callback after the copy action perform   |null|

### Line Break
Line break can be remained and copied by the option `lineBreak`
However, as it only supports with a `textarea`, if you want to support copying line break, the library will set the input type as `textarea` by itself

### Browser Support
The library is compatible with Safari 11(IOS11), IE 11, Mozilla Firefox 65.0, Google chrome 72.0

### Author
[ivanhoe-dev](https://github.com/ivanhoe-dev "ivanhoe-dev") 
2019-03-20
