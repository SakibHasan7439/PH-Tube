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

// create loadVideos
const loadVideos = async() =>{
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/videos');
        const data = await res.json();
        displayVideos(data.videos);

    }catch(err){
        console.log("ERROR", err);
    }
}

// show loadCatagories
const displayCatagories = (data) =>{

    const categoryContainer = document.getElementById("categories");
    const items = data.map(item => {
        const button = document.createElement("button");
        button.classList = "btn";
        button.innerText = item.category;
        categoryContainer.appendChild(button);
    })
}

// show loadVideos
const displayVideos = (videos) =>{
    const videoContainer = document.getElementById("videos");

    const items = videos.map(video => {
        const card = document.createElement("div");
        card.classList = "card card-compact";
        card.innerHTML = `
            <figure class="h-[200px]">
            <img class="h-full w-full object-cover" 
            src="${video?.thumbnail}"
            alt="videos" />
            </figure>
            <div class="px-0 py-2 flex gap-2">
                <div class="w-10">
                    <img class="w-full h-10 rounded-full object-cover" src="${video?.authors[0]?.profile_picture}" />
                </div>
                <div>
                    <h2 class="card-title">${video?.title}</h2>
                    <p class="flex-grow-0">${video?.authors[0]?.profile_name}</p>
                    <p class="flex-grow-0">${video?.others?.views}</p>
                </div>
            </div>
        `
        videoContainer.appendChild(card);
    })
}

loadCatagories();
loadVideos();