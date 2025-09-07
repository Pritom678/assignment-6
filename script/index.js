
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
    //event delegation kora baki
}

//all plants by categories
const plantsByCategory = getElement('plant-container')

const loadPlantsByCategory = (category_id) => {
    fetch(`https://openapi.programming-hero.com/api/category/${category_id}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
    })
    .catch(err => {
        console.log(err)
    })
}


loadCategory();
loadPlantsByCategory();