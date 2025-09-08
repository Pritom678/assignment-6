
const getElement = (id) => {
    
    return document.getElementById(id);
}

// get all categories
const allCategories = getElement('category-container');


const loadCategory = () => {
    fetch('https://openapi.programming-hero.com/api/categories')
    .then(res => res.json())
    .then(data => {
        const categories = data.categories;
        showCategory(categories)

    })
    .catch(err => {
        console.log(err)
    })
}

//spinner

const manageSpinner = (status) =>{
    if(status == true){
        getElement('spinner').classList.remove('hidden')
        getElement('plant-container').classList.add('hidden')
    }
    else{
        getElement('plant-container').classList.remove('hidden')
        getElement('spinner').classList.add('hidden')
    }
}







const showCategory = (categories) => {
    
    categories.forEach(cat => {
        allCategories.innerHTML += `
        <li id="${cat.id}" class="pl-2 font-semibold hover:bg-[#15803D] hover:border border-green-500 hover:text-white">${cat.category_name}</li>
        `
    });
    //event delegation
    allCategories.addEventListener('click', (e) =>{
        const allLi = document.querySelectorAll('li')

        allLi.forEach(li => {
            li.classList.remove('bg-[#15803D]')
            li.classList.remove('text-white')
        });

        if(e.target.localName === 'li'){
            e.target.classList.add('bg-[#15803D]')
            e.target.classList.add('text-white')
            loadPlantsByCategory(e.target.id)
        }
    })
}




//all plants by categories
const plantsByCategory = getElement('plant-container')

const loadPlantsByCategory = (categoryId) => {
    manageSpinner(true)
    fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
    .then(res => res.json())
    .then(data => {

        showLoadPlantsByCategory(data.plants)
    })
    .catch(err => {
        console.log(err)
    })
}
// modal
const loadPlantDetail = (id) =>{
    const url = `https://openapi.programming-hero.com/api/plant/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
        showPlantDetail(data.plants)
    })
}

const showPlantDetail = (word) =>{
    // console.log(word)
    const detailBox = getElement('details-container');
    detailBox.innerHTML= `
                    <img src="${word.image}" class="rounded-xl h-30 w-full object-cover" alt="">
                    <h1 class="card-title">${word.name}</h1>
                    <p>${word.description}</p>
    `;
    getElement('my_modal_5').showModal();
}


const showLoadPlantsByCategory = (trees) => {
    // console.log(trees)
    plantsByCategory.innerHTML = ''
    trees.forEach(tree => {
        plantsByCategory.innerHTML += `
                    
                        <div id="${tree.id}" class="card bg-base-100 shadow-sm p-3">
                        <figure onclick ="loadPlantDetail(${tree.id})" class="p-2">
                            <img
                            src="${tree.image}"
                            class="rounded-xl h-32 w-full object-cover" />
                        </figure>
                        <div onclick ="loadPlantDetail(${tree.id})" class="card-body items-center text-center">
                            <h2 class="card-title">${tree.name}</h2>
                            <p>${tree.description}</p>
                        </div>
                        <div onclick ="loadPlantDetail(${tree.id})" class="flex justify-between items-center p-5">
                            <h1 class="text-[#15803D] bg-[#DCFCE7] rounded-full p-2 font-semibold">${tree.category}</h1>
                            <h1 class="font-semibold">৳${tree.price}</h1>
                        </div>
                            <div class="card-actions">
                                <button class="btn w-full bg-[#15803D] text-white">Add to Card</button>
                            </div>
                        </div>
                    
        `
    });
    manageSpinner(false)
}


const loadAllPlants = () =>{
    manageSpinner(true)
    fetch('https://openapi.programming-hero.com/api/plants')
    .then(res => res.json())
    .then(data => {
        showLoadAllPlants(data.plants)
    })
}

const showLoadAllPlants = (trees) =>{
    plantsByCategory.innerHTML = ''
    trees.forEach(tree => {
        plantsByCategory.innerHTML += `
                    
                        <div id="${tree.id}" class="card bg-base-100 shadow-sm p-3">
                        <figure onclick ="loadPlantDetail(${tree.id})" class="p-2">
                            <img
                            src="${tree.image}"
                            class="rounded-xl h-32 w-full object-cover" />
                        </figure>
                        <div onclick ="loadPlantDetail(${tree.id})" class="card-body items-center text-center">
                            <h2 class="card-title">${tree.name}</h2>
                            <p>${tree.description}</p>
                        </div>
                        <div onclick ="loadPlantDetail(${tree.id})" class="flex justify-between items-center p-5">
                            <h1 class="text-[#15803D] bg-[#DCFCE7] rounded-full p-2 font-semibold">${tree.category}</h1>
                            <h1 class="font-semibold">৳${tree.price}</h1>
                        </div>
                            <div class="card-actions">
                                <button class="btn w-full bg-[#15803D] text-white">Add to Card</button>
                            </div>
                        </div>
                    
        `
    });
    manageSpinner(false)
}


//cart details
let carts = []

const cartContainer = getElement('cart-container');
const cartTotal = getElement('total-cart')

plantsByCategory.addEventListener('click', (e)=>{
    if(e.target.innerText === 'Add to Card'){
        
        handleCart(e);
    }
})
 const handleCart = (e) => {
        const title = e.target.parentNode.parentNode.children[1].children[0].innerText;
        const price = e.target.parentNode.parentNode.children[2].children[1].innerText;
        const id = e.target.parentNode.parentNode.id;
        
        const existingItems = carts.filter(cart => cart.id === id);
        if(existingItems.length === 0){
            carts.push({
            title: title,
            price: price,
            id: id
        })
        showCarts(carts)
        }

        
 }

const showCarts = (carts) => {
    cartContainer.innerHTML='';
    carts.forEach(cart => {
        cartContainer.innerHTML += `
        <div class="flex justify-between items-center p-3 rounded-lg bg-[#DCFCE7] my-3">
                        <div >
                            <h1 class="text-lg font-semibold">${cart.title}</h1>
                            <p class="text-sm font-semibold">${cart.price}</p>
                        </div>
                        <div>
                            <i onclick = "handleDeleteCart(${cart.id})" class="fa-solid fa-xmark"></i>
                        </div>
                    </div>
        `
    });

    const total = carts.reduce((sum, cart) => {
        const priceNum = parseFloat(cart.price.replace('৳','')) || 0;
        return sum + priceNum;
    }, 0)
    cartTotal.textContent = `Total: ৳${total}`;
}

const handleDeleteCart = (cartId) => {
    const filterCarts = carts.filter(cart =>  cart.id != cartId)
    
    carts = filterCarts;
    // console.log(carts)
    showCarts(carts)
} 

loadCategory();
loadAllPlants();