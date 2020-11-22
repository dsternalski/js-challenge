challenge = {
    modifications: {
        addCode: {
            banner: {
                code: {
                    element: 'div',
                    id: 'banner',
                    class: 'banner_1',
                    innerhtml: [
                        '<select name="qty" id="qty">',
                            '<option value="1">1</option>',
                            '<option value="2">2</option>',
                        '</select>',
                        '<div class="button_1 a-section a-spacing-small">',
                            '<span class="a-button a-button-primary a-button-icon"><span class="a-button-inner"><i class="a-icon a-icon-cart"></i><input name="submit.add-to-cart" title="Add to Shopping Basket" class="a-button-input" type="submit" aria-labelledby="a-autoid-2-announce"><span class="a-button-text a-text-left" aria-hidden="true" id="a-autoid-2-announce">Add to Basket</span></span></span>',
                        '</div>'
                    ]
                },
                prependTo: ['#a-page']
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
        x__isInViewport:function(elem) {
            var bounding = elem.getBoundingClientRect();
            return (
                bounding.top >= 0 &&
                bounding.left >= 0 &&
                bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        },
        bannerDisplay:function() {
            var cThis = this;
            var banner = document.getElementsByClassName('banner_1'), oBtn = document.getElementById('buybox.addToCart');
            var intvl = setInterval(function(){
                if(banner.length) {
                    clearInterval(intvl);
                    display = function() {
                        if(cThis.x__isInViewport(oBtn)) {
                            document.getElementById("banner").classList.add("hide");
                        } else {
                            document.getElementById("banner").classList.remove("hide");
                        }
                    };
                    display();
                    window.addEventListener('scroll', function() {
                        display();
                    });
                }
            }, 200);
        },
        dropdownClick:function() {
            var banner = document.getElementsByClassName('banner_1'), oDropDown = document.getElementById('mobileQuantityDropDown');
            var intvl = setInterval(function(){
                if(banner.length && oDropDown.length) {
                    clearInterval(intvl);
                    var qty = document.getElementById('qty');
                    qty.addEventListener("change", function(){
                        console.log("We have a change!");
                        console.log('Qty from banner:', qty.value);
                    });
                }
            }, 200);
        },
        addToBasketClick:function() {
            var btn = document.getElementsByClassName('button_1');
            var intvl = setInterval(function(){
                if(btn.length) {
                    clearInterval(intvl);
                    console.log(btn, btn.length);
                    var original = document.getElementById('buybox.addToCart');
                    btn[0].addEventListener('click', function(e){
                        document.getElementById('add-to-cart-button').click();
                        // NEED TO LOOK AT AJAX FOR SENDING QTY.
                    });
                }
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
