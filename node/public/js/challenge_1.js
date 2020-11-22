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
        // This function looks for an element that is in the view port. It is also a function that is only run when called so does not run automatically.
        x__isInViewport:function(elem) {
            var bounding = elem.getBoundingClientRect();
            return (
                bounding.top >= 0 &&
                bounding.left >= 0 &&
                bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        },
        // This function works in conjunction with the x__isInViewport function and sets up the elements for running the above function.
        bannerDisplay:function() {
            var cThis = this;
            var banner = document.getElementsByClassName('banner_1'), oBtn = document.getElementById('buybox.addToCart');
            var intvl = setInterval(function(){
                if(banner.length && oBtn) {
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
        // This function controls the new drop down element in the banner and updates the quantity ensuring that when the user clicks the new add to basket button, the correct quantity is added.
        dropdownClick:function() {
            var banner = document.getElementsByClassName('banner_1'), oDropDown = document.getElementById('mobileQuantityDropDown');
            var intvl = setInterval(function(){
                if(banner.length && oDropDown.length) {
                    clearInterval(intvl);
                    var qty = document.getElementById('qty'), oQty = document.getElementById('quantity'), oQtyPrompt = document.getElementsByClassName('a-dropdown-prompt');
                    qty.addEventListener("change", function(){
                        oQty.value = qty.value;
                        oQtyPrompt[0].innerText = qty.value;
                    });
                }
            }, 200);
        },
        // This function controls the click of the new add to basket button.
        addToBasketClick:function() {
            var btn = document.getElementsByClassName('button_1');
            var intvl = setInterval(function(){
                if(btn.length) {
                    clearInterval(intvl);
                    var original = document.getElementById('buybox.addToCart');
                    btn[0].addEventListener('click', function(e){
                        document.getElementById('add-to-cart-button').click();
                    });
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

// An intvl has been set so that test knows when to run and not rely on the 'on page load' option of the Chrome extension.
var intvl = setInterval(function(){
    if(document.getElementById('a-page')) {
        clearInterval(intvl);
        console.log("Found");
        challenge.ftns.init();
    } else {
        console.log("Looking");
    }
}, 200);
