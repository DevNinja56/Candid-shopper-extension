// global variable 
var copy_icon = false;


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        // console.log("message from popup.js")
        if(request.tool == 'copy-asin-from-search-results'){
            if(!copy_icon){
                var asin_icons = document.getElementsByClassName('a-size-base a-link-normal s-underline-text s-underline-link-text s-link-style a-text-normal');
                for(count = 0; count < asin_icons.length; count++){
                    let div = asin_icons[count];
                    div.insertAdjacentHTML('afterend', '<img id="copy_icon_'+count+'" src="https://cshopper.s3.amazonaws.com/cs_copy_productid.png" style="width:40%; cursor:pointer; margin:2%">');
                }
                for(count = 0; count < asin_icons.length; count++){
                    document.getElementById('copy_icon_'+count).addEventListener("click", copy_icon_click, false);
                }
                copy_icon = true;
            }
        	
        }
        else if(request.tool == 'highlight-asin-in-search-results'){
        	var asin = document.querySelector('[data-asin="'+request.asin+'"]').style.background = request.color;
        }
        else if(request.tool == 'url_exists'){
           // sending message to popup.js
            let message = {
                type: 'url',
                url: window.location.href
              };

            chrome.runtime.sendMessage({ type: "message", message });
        }
        else if(request.tool == 'send_html'){
            var html_content = document.documentElement.innerHTML;

            let message = {
                type: 'html_content',
                html: html_content
              };

            chrome.runtime.sendMessage({ type: "message", message });
        }
        
    }
);


function copy_icon_click(){
    var asin_id = findAncestor(this,'s-result-item');

    function findAncestor (el, cls) {
        while ((el = el.parentElement) && !el.classList.contains(cls));
        return el;
    }

    navigator.clipboard.writeText(asin_id.getAttribute('data-asin'));
    this.style.display = 'none';
    this.insertAdjacentHTML('afterend', '<img src="https://cshopper.s3.amazonaws.com/cs_copied.png" style="width:25%; cursor:pointer; margin: 1%">');

   
}