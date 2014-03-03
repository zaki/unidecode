var seltext = null;
 
chrome.extension.onRequest.addListener(function(request, sender, sendResponse)
{
    switch(request.message)
    {
        case 'setText':
            window.seltext = request.data;
            console.log(request);
            decodeText();
        break;

        case 'resetText':
            window.seltext = null;
            resetText();
        break;

        default:
            sendResponse({data: 'Invalid arguments'});
        break;
    }
});

function decodeText(info, tab)
{
  var text = window.seltext;

  var r = /\\u([\d\w]{4})/gi;
  text = text.replace(r, function (match, grp) { return String.fromCharCode(parseInt(grp, 16)); } );
  text = unescape(text);

  chrome.tabs.executeScript({
    code: "var f = document.getElementById('unidecode');\
           if (f == null) {\
              var f = document.createElement('div');\
              var g = document.createElement('div');\
              f.setAttribute('id', 'unidecode');\
              g.setAttribute('id', 'unidecode-decoded');\
              f.appendChild(g);\
              document.body.insertBefore(f, document.body.firstChild);\
           };\
           document.getElementById('unidecode-decoded').innerHTML = '" + text + "';\
           "
  });
}
 
function resetText()
{
  chrome.tabs.executeScript({
    code: "var f = document.getElementById('unidecode');\
           if (f != null) {\
             document.body.removeChild(f);\
           };\
           "
  });
}
