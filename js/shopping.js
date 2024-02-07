let btns = document.querySelectorAll("button");
let contents = document.querySelectorAll(".content"); 
let ul = document.createElement("ul")
ul.classList.add("carts-product")
document.querySelector('.box-added-carts .product-info').appendChild(ul)
contents.forEach(content => {
    if(content.classList.contains("last-content")) {
        content.style.cssText = "margin-bottom:0; border-bottom:none;"
    }
})

function storeBox(btn) {
    localStorage.setItem("btn", btn.parentElement.parentElement.innerHTML);
}


btns.forEach(btn => {
    let img = btn.parentElement.previousElementSibling.children[0].firstElementChild;    
    let picked_P = btn.parentElement.previousElementSibling.lastElementChild.firstElementChild;
    let picked_span = btn.parentElement.previousElementSibling.lastElementChild.lastElementChild;
    let product = document.createElement("img")
    
    btn.addEventListener("click", (e) => {
            btn.classList.add("active")
            btn.classList.add("added")
            if(btn.classList.contains("active")) {
                btn.innerHTML = `<i class="fa-solid fa-check"></i>`;
                btn.disabled = true;
            }

            let li = document.createElement("li");
            li.classList.add("active");
            
            let image = document.createElement("div")
                image.classList.add("image")
                li.appendChild(image);

                setTimeout(function() {
                    li.style.cssText = "transform:scale(.9);";
                }, 100)

                product.src = img.src

                image.appendChild(product);

                let li_info = document.createElement("div")
                li_info.classList.add("li-info");
                li_info.style.cssText = "transform:scale(0);"
                li.appendChild(li_info)

                let li_P = picked_P.cloneNode(true)
                li_info.appendChild(li_P);

                li_span = picked_span.cloneNode(true)
                li_info.appendChild(li_span);

                setTimeout(function() {
                    scale(li_info)
                }, 1000)


                let count_slider = document.createElement("div") 
                count_slider.className = "slider"

                let dwn = document.createElement("span")
                dwn.classList.add("dwn")
                dwn.textContent = "<"
                count_slider.appendChild(dwn);

                let primaryPrice = parseInt(li_info.children[1].children[1].children[0].textContent) 

                dwn.addEventListener("click" , () => {
                    --countNum.textContent
                    li_info.children[1].children[1].children[0].textContent = `${(parseInt(li_info.children[1].children[1].children[0].textContent) - primaryPrice)}$`
                    storeData(ul)
                    if(countNum.textContent === "0"){
                        li.classList.remove("active");

                        if(!li.classList.contains("active")) {
                            li.style.cssText = "transform:scale(0);"

                            setTimeout(() => {
                                li.remove();
                                storeData(ul);
                            },500);
                        }
                        btn.classList.remove("active")

                        setTimeout(() => {
                            btn.textContent = "Add Cart"
                        },700)
                        
                        if(btn.textContent === "Add Cart") {
                            btn.disabled = false
                        }
                    }
                })

                let countNum = document.createElement("span")
                countNum.textContent = "1"
                countNum.classList.add("num-slider")
                count_slider.appendChild(countNum)

                let up = document.createElement("span")
                up.classList.add("up")
                up.textContent = ">"
                count_slider.appendChild(up)

                up.addEventListener("click", () => {
                    li_info.children[1].children[1].children[0].textContent = `${++up.previousElementSibling.textContent * primaryPrice}$`
                    storeData(ul)
                })

                li_info.children[1].children[1].appendChild(count_slider);

                ul.appendChild(li);
                storeBox(btn)
                storeData(ul)
        });

    });

    function storeData(ul) {
        localStorage.setItem("carts", ul.innerHTML)
    };

    function scale(li) {
        li.style.cssText = "transform:scale(.9);"
    };

    
    let all_prices = document.querySelectorAll(".primary-price")
    
    if(localStorage.getItem("carts")) {
        ul.innerHTML = localStorage.getItem("carts");
        [...ul.children].forEach(li => {
            scale(li);
            scale(li.children[1]);

            let price_li = li.children[1].children[1].children[1].children[0];

            let dwn = li.children[1].children[1].children[1].children[1].children[0];
            
            let num = li.children[1].children[1].children[1].children[1].children[1];
            
            let up = li.children[1].children[1].children[1].children[1].children[2];
            
                up.addEventListener("click", () => {
                    ++up.previousElementSibling.textContent
                    price_li.textContent = `${price_li.getAttribute("value") * num.textContent}$`;
                    storeData(ul)
                });

                dwn.addEventListener("click", () => {
                    --dwn.nextElementSibling.textContent
                    price_li.textContent = `${parseInt(price_li.textContent) - price_li.getAttribute("value")}$`
                    storeData(ul)
                    
                    if(num.textContent === "0") {
                        li.classList.remove("active");
                        if(!li.classList.contains("active")) {
                            li.style.cssText = "transform:scale(0);"

                            setTimeout(() => {
                                li.remove();
                                storeData(ul) 
                            },500);
                        }

                        all_prices.forEach(ele => {
                                
                            if(price_li.getAttribute("value") === ele.getAttribute("value")) {
                                ele.parentElement.parentElement.parentElement.parentElement.nextElementSibling.children[0].textContent = "Add Cart";
                                
                                ele.parentElement.parentElement.parentElement.parentElement.nextElementSibling.children[0].disabled = false

                                ele.parentElement.parentElement.parentElement.parentElement.nextElementSibling.children[0].classList.remove("active")
                            }
                        })
                    }
                });
                all_prices.forEach(ele => {
                    if(price_li.getAttribute("value") === ele.getAttribute("value")) {
                        let added = `<i class="fa-solid fa-check"></i>`
                        ele.parentElement.parentElement.parentElement.parentElement.nextElementSibling.children[0].innerHTML = added;

                        btns.forEach(btn => {
                            if(btn.innerHTML === added) {
                                btn.classList.add("active")
                                btn.disabled = true
                            }
                        })
                    } 
                })
        });
    };