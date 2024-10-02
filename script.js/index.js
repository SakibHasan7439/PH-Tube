// create loadCatagories
const loadCatagories = async() =>{
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories');
        const data = await res.json();
        displayCatagories(data?.categories);

    }catch(err){
        console.log("ERROR", err);
    }
}


const displayCatagories = (data) =>{

    const categoryContainer = document.getElementById("categories");
    const items = data.map(item => {
        const button = document.createElement("button");
        button.classList = "btn";
        button.innerText = item.category;
        categoryContainer.appendChild(button);
    })
}

loadCatagories();