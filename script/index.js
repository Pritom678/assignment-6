
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

const showCategory = (categories) => {
    allCategories.innerHTML = '';
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
    fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
    .then(res => res.json())
    .then(data => {
        showPlantByCategory(data.plants)
    })
    .catch(err => {
        console.log(err)
    })
}
const loadPlantDetail = (id) =>{
    const url = `https://openapi.programming-hero.com/api/plant/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
        showPlantDetail(data.plants)
    })
}

const showPlantDetail = (word) =>{
    console.log(word)
    const detailBox = getElement('details-container');
    detailBox.innerHTML= `
                    <img src="${word.image}" class="rounded-xl h-30 w-full object-cover" alt="">
                    <h1 class="card-title">${word.name}</h1>
                    <p>${word.description}</p>
    `;
    getElement('my_modal_5').showModal();
}


const showPlantByCategory = (plants) =>{
    plantsByCategory.innerHTML = '';
    plants.forEach(plant => {
        plantsByCategory.innerHTML += `
                    <div onclick="loadPlantDetail(${plant.id})" class="card bg-base-100 w-full shadow-lg p-2">
                    <figure class="p-3">
                        <img
                        src="${plant.image}"
                        class="rounded-xl h-30 w-full object-cover" />
                    </figure>
                    <div class="card-body items-center text-center">
                        <h2 class="card-title">${plant.name}</h2>
                        <p class="text-xs">${plant.description}</p>
                        <div class ="flex items-center gap-10">
                            <h1 class="text-sm text-[#15803D] bg-[#DCFCE7] rounded-full p-2 border">${plant.category}</h1>
                            <h1 class="font-bold">৳${plant.price}</h1>
                        </div>
                    </div>
                    <div class="card-actions">
                        <button class="btn bg-[#15803D] text-white w-full rounded-full">Add to Card</button>
                        </div>
                    </div>
        `;
    });
}


loadCategory();
loadPlantsByCategory();