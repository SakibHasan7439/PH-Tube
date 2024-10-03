function getTimeStr(time){
    const hour = parseInt(time /3600);
    let remainingSecond = parseInt(time % 3600);
    let remainingMinute = parseInt(remainingSecond / 60);
    remainingSecond = remainingSecond % 60;
    return `${hour} hour ${remainingMinute} minute ${remainingSecond} second ago`;
}

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

const loadCategoryVideos = async(id) =>{
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`);
        const data = await res.json();
        displayVideos(data.category);

    }catch(err){
        console.log("ERROR", err);
    }

}

// show loadCatagories
const displayCatagories = (data) =>{

    const categoryContainer = document.getElementById("categories");
    const items = data.map(item => {
        const buttonContainer = document.createElement("div");
        buttonContainer.innerHTML = 
        `
            <button onclick="loadCategoryVideos(${item.category_id})" class="btn">
                ${item.category}
            </button>
        `

        categoryContainer.appendChild(buttonContainer);
    })
}

// show loadVideos
const displayVideos = (videos) =>{
    const videoContainer = document.getElementById("videos");
    videoContainer.innerHTML = "";

    const items = videos.map(video => {
        const card = document.createElement("div");
        card.classList = "card card-compact";
        card.innerHTML = `
            <figure class="h-[200px] relative">
            <img class="h-full w-full object-cover" 
            src="${video?.thumbnail}"
            alt="videos" />
            <div class="absolute bottom-2 right-2 bg-black px-2 rounded text-white">
                <p>${video?.others?.posted_date !== "" ? `${getTimeStr(video?.others?.posted_date)}`: ""}</p>
            </div>
            </figure>
            <div class="px-0 py-2 flex gap-2">
                <div class="w-10">
                    <img class="w-full h-10 rounded-full object-cover" src="${video?.authors[0]?.profile_picture}" />
                </div>
                <div>
                    <h2 class="card-title font-bold">${video?.title}</h2>
                    <div class="flex gap-2 items-center">
                        <p class="text-gray-500">${video?.authors[0]?.profile_name}</p>
                        ${video?.authors[0]?.verified == true ? `<img class="w-[20px] object-cover" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" alt="verify icon" />` : ""}
                        
                    </div>
                    <p class="text-gray-500">${video?.others?.views}</p>
                </div>
            </div>
        `
        videoContainer.appendChild(card);
    })
}

loadCatagories();
loadVideos();