document.addEventListener('mouseup',function(event)
{
    var sel = window.getSelection().toString();
    var reg = /\\u[0-9a-fA-F]+/;

    if(sel.length && sel.match(reg))
    {
        chrome.extension.sendRequest({'message':'setText','data': sel},function(response){});
    }
    else
    {
        chrome.extension.sendRequest({'message':'resetText','data': null},function(response){});
    }
});
