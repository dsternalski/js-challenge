challenge = {
    // The modifications objects holds all objects that modify the page.
    modifications: {
        // The addCode object relates to the addCode function.
        addCode: {
            // Banner is just the name of this object. The object name can change but would recommend using a meaningful name.
            banner: {
                code: {
                    element: 'div',
                    id: 'banner',
                    class: 'banner_1 hide',
                    innerhtml: [
                        '<p>Get 50% off <br>all Amazon products</p>',
                        '<p>Use code: <span>AZ50</span></p>',
                        '<p>T&Cs Apply</p>'
                    ]
                },
                prependTo: ['.s-search-results']
            },
        },
    },
    ftns: {
        // This is a dynamic function that gets the information from the modifications > addCode object. It allows the user to add code via the object and prepend the code to the specified element.
        addCode:function() {
            var add = challenge.modifications.addCode;
            var addObj = Object.keys(add);
            for(var a = 0; a < addObj.length; a++) {
                var code = add[addObj[a]].code, prepend = add[addObj[a]].prependTo;
                for(var b = 0; b < prepend.length; b++) {
                    // This code checks that code.element is there so that there are no errors in the console.
                    if(code.element) {
                        var newNode = document.createElement(code.element);
                        if(code.class) newNode.className = code.class;
                        if(code.id) newNode.setAttribute("id", code.id);
                        if(code.innerhtml) newNode.innerHTML = code.innerhtml.join(' ');
                        var referenceNode = document.querySelector(prepend[b]);
                        referenceNode.parentNode.insertBefore(newNode, referenceNode);
                    }
                }
            }
        },
        // This function moves the new banner to the relevent position in the list.
        moveAfterResult:function() {
            var banner = document.getElementById('banner');
            var intvl = setInterval(function(){
                if(banner) {
                    clearInterval(intvl);
                    // The count has been added to help identify the product that the new banner should sit under.
                    var asin = document.querySelectorAll('[data-asin]'), count = 0;

                    // This code here is for debugging.
                    if(asin) {
                        console.log("data-asin tag found");
                    } else {
                        console.log("data-asin not found");
                    }

                    // This code loops through all of the data-asin tags and adds the relevant classes.
                    for(var a = 0; a < asin.length; a++) {
                        var dataAsin = asin[a].getAttribute('data-asin'), classAsin = asin[a].getAttribute('class');
                        if(dataAsin && classAsin.match(/s-result-item/i)) {
                            count++;
                            document.querySelector('[data-asin="' + dataAsin + '"]').classList.add("product_" + count);
                            document.getElementById("banner").classList.remove("hide");
                        }
                    }
                    if(document.getElementsByClassName('product_1')) {
                        var product = document.querySelector('.product_2');
                        if(product) {
                            product.parentNode.insertBefore(banner, product);
                        } else {
                            // Note: Not sure that this is the best way, but I noticed that upon refresh, the test worked.
                            var url = window.location.href;
                            window.location.replace(url);
                        }
                    } else {
                        console.log("looking for .product_1");
                    }
                } else {
                    console.log("Banner not avaliable");
                }
            }, 200);
        },
        // This is the intialisation function that fires all functions (except itself and any function starting with x__) in the ftns object.
        init:function() {
            var thisObj = Object.keys(this);
            for(var a = 0; a < thisObj.length; a++) {
                if(thisObj[a] != 'init' && !thisObj[a].match(/x__/i)) {
                    this[thisObj[a]]();
                }
            }
        }
    }
};

// The if statement checks that the device is a mobile.
if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    // An intvl has been set so that test knows when to run and not rely on the 'on page load' option of the Chrome extension.
    var intvl = setInterval(function(){
        if(document.getElementById('a-page')) {
            clearInterval(intvl);
            console.log("Found");
            challenge.ftns.init();

            // Mutation changes.
            var targetNode = document.querySelector('.s-result-list') || document.querySelector('body');
            var config = {attributes:false, childList:true, subtree:false};
            var cURL = window.location.href;
            var callback = function(mutationsList, observer) {
                for(var mutation of mutationsList) {
                    var nURL = window.location.href;
                    if(nURL != cURL) {
                        console.log('URLS:', cURL, nURL);
                        challenge.ftns.init();
                        cURL = nURL;
                    }
                }
            };
            var observer = new MutationObserver(callback);
            observer.observe(targetNode, config);
        } else {
            console.log("Looking");
        }
    }, 200);
} else {
    console.log("Abort as is Desktop");
}
