challenge = {
    modifications: {
        addCode: {
            banner: {
                code: {
                    element: 'div',
                    id: 'banner',
                    class: 'banner_1',
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
        addCode:function() {
            var add = challenge.modifications.addCode;
            var addObj = Object.keys(add);
            for(var a = 0; a < addObj.length; a++) {
                var code = add[addObj[a]].code, prepend = add[addObj[a]].prependTo;
                for(var b = 0; b < prepend.length; b++) {
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
        moveAfterResult:function() {
            var banner = document.getElementById('banner');
            var intvl = setInterval(function(){
                if(banner) {
                    clearInterval(intvl);
                    var asin = document.querySelectorAll('[data-asin]'), count = 0;
                    for(var a = 0; a < asin.length; a++) {
                        var dataAsin = asin[a].getAttribute('data-asin'), classAsin = asin[a].getAttribute('class');
                        if(dataAsin && classAsin.match(/s-result-item/i)) {
                            count++;
                            document.querySelector('[data-asin="' + dataAsin + '"]').classList.add("product_" + count);
                        }
                    }
                }
                var product = document.querySelector('.product_1');
                product.after(banner);
            }, 200);
        },
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
challenge.ftns.init();
