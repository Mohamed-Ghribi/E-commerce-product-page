const cartIcon = document.querySelector(".cartIcon")
const cart = document.querySelector(".cart")
const productSlider = document.querySelector(".mainImg")
const images = document.querySelector(".images")
const imgSelector = images.querySelectorAll("img")
const increment = document.querySelector('.increment')
const decrement = document.querySelector(".decrement")
const quantity = document.querySelector(".quantity")
const addToCart = document.querySelector(".addToCart")
const Qty = document.querySelector(".Qty")
const cartContainer = document.querySelector(".cartContainer")
const empty = document.querySelector(".empty")
const deleteBtn = document.querySelector(".deleteBtn")
const checkoutBtn = document.querySelector(".CheckoutBtn")
const currentImg  = document.querySelector(".currentImg")
const overlay =  document.querySelector(".overlay")
const close = document.querySelector(".close")
const rightArrow = document.querySelector(".right")
const leftArrow = document.querySelector(".left")
const imgSelector2 = document.querySelector(".imgSelector")
const images2 = imgSelector2.querySelectorAll("img")
const overlayMainImg = document.querySelector(".overlayMainImg")
const left2 = document.querySelector(".left2")
const right2 = document.querySelector(".right2")
const mainImg = document.querySelector(".mainImg")
const menuBar = document.querySelector(".menuBar")
const menuList =document.querySelector(".menuList")
const xmark = document.querySelector(".fa-xmark")
function UpdateCart(){
if(cartContainer.children.length === 2){
    empty.classList.remove("hidden")
    checkoutBtn.classList.add("hidden")
}else{
    empty.classList.add("hidden")
    checkoutBtn.classList.remove("hidden")
}
}

cartIcon.addEventListener("click",()=>{
  cart.classList.toggle("hidden")
})
imgSelector.forEach(element =>{
    element.addEventListener("click",function(){
        imgSelector.forEach(elmt=>{
            elmt.classList.remove("active")
        })
        let source = element.getAttribute("src")
        element.classList.add("active")
        productSlider.setAttribute("src",source.replace("-thumbnail",""))
    })
})
increment.addEventListener("click",function(){
    quantity.textContent = parseInt(quantity.textContent) + 1;
})
decrement.addEventListener("click",function(){
    if(parseInt(quantity.textContent) < 2){
        quantity.textContent = 1
    }else{
        quantity.textContent = parseInt(quantity.textContent) - 1;
    }
})

addToCart.addEventListener("click",function(){
   if(cartContainer.querySelector(".cartItem")){
     const cartItem = cartContainer.querySelector(".cartItem")
     const qtyValue = cartItem.querySelector(".qtyValue")
     const total = cartItem.querySelector(".total")
     qtyValue.textContent = quantity.textContent
     total.textContent = "$" + (parseInt(qtyValue.textContent) * 125.00).toFixed(2)
   }else{
    let div = document.createElement("div");
   let totalPrice = parseInt(quantity.textContent) * 125.00;
   let imageSource ="";
    [...images.children].forEach(element =>{
    if(element.classList.contains("active")){
       imageSource = element.getAttribute("src")
    }
   })
   div.classList.add("cartItem")
   div.innerHTML = ` <img src="${imageSource}" alt="">
    <div class="itemInfo">
        <p>Fall Limited Edition Sneakers</p>
        <p><span class="prixUnitaire">$125.00</span>*<span class="qtyValue">${quantity.textContent}</span><span class="total" style="color: black;">$${parseFloat(totalPrice).toFixed(2)}</span></p>
    </div>
    <i class="fa-solid fa-trash deleteBtn"></i>`
   cartContainer.prepend(div)
   Qty.innerHTML = quantity.textContent;
   Qty.classList.remove("hidden")
   UpdateCart()
   }
})

document.addEventListener("click",function(e){
    if(e.target.classList.contains("deleteBtn")){
      const item = e.target.closest(".cartItem")
      item.remove()
      Qty.innerHTML = 0;
      Qty.classList.add("hidden")
      UpdateCart()
    }
})
currentImg.addEventListener("click",()=>{
  overlay.classList.remove("hidden")
})
close.addEventListener("click",function(){
    overlay.classList.add("hidden")
})

function nextImage(container,imagesList){
    let nextImg = null
    for( const element of imagesList){
        if(element.classList.contains("active")){
           nextImg = element.nextElementSibling;
            element.classList.remove("active");
            break;
        }
        
    }
    if(nextImg === null){
         nextImg = imagesList[0];
         
    }
     nextImg.classList.add("active")
    let src = nextImg.getAttribute("src").replace("-thumbnail","")
    container.setAttribute("src",src)
}

function previousImage(container,imagesList){
  let nextImg = null
    for(const element of imagesList){
        if(element.classList.contains("active")){
          nextImg = element.previousElementSibling;
          element.classList.remove("active")
          break
        }  
    }
    if(nextImg === null){
        nextImg = imagesList[imagesList.length-1]
    }
    nextImg.classList.add("active")
    container.setAttribute("src",nextImg.getAttribute("src").replace("-thumbnail",""))
}

rightArrow.addEventListener("click",function(){
    nextImage(overlayMainImg,images2)
})

leftArrow.addEventListener("click",function(){
    previousImage(overlayMainImg,images2)
})

left2.addEventListener("click",function(e){
    e.stopPropagation()
    previousImage(mainImg,images2)
})
right2.addEventListener("click",function(e){
    e.stopPropagation()
    nextImage(mainImg,images2)
})
images2.forEach(element=>{
    element.addEventListener("click",function(){
        images2.forEach(item =>{
            if(item.classList.contains("active")){
                item.classList.remove("active")
            }
        })
        let attribute = element.getAttribute("src").replace("-thumbnail","")
        overlayMainImg.setAttribute("src",attribute)
        element.classList.add("active")
    })
})

menuBar.addEventListener("click",function(){
  menuList.style.left = "0";
})

xmark.addEventListener("click",function(){
    menuList.style.left = "-200px"
})
