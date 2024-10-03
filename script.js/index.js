function getTimeStr(time){
    const hour = parseInt(time /3600);
    let remainingSecond = parseInt(time % 3600);
    let remainingMinute = parseInt(remainingSecond / 60);
    remainingSecond = remainingSecond % 60;
    return `${hour} hour ${remainingMinute} minute ${remainingSecond} second ago`;
}

const activeButton = () =>{
    const buttons = document.getElementsByClassName("category-btn");

    for(let button of buttons){
        if(button.classList.contains("active")){
            button.classList.remove("active");
        }
    }
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
const loadVideos = async(searchText = "") =>{
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`);
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
        (()=>{
            activeButton();
            const activeBtn = document.getElementById(`btn-${id}`);
            activeBtn.classList.add("active");
            displayVideos(data.category);
        })();

    }catch(err){
        console.log("ERROR", err);
    }

}

const loadDetails = async(videoId) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`);
    const data = await res.json();
    displayDetails(data.video);
}

const displayDetails = (video) =>{
    const detailsContainer = document.getElementById("modal-content");
    detailsContainer.innerHTML = `
        <img class="mb-2" src="${video.thumbnail}" />
        <p>${video.description}</p>
    `
    document.getElementById("customModal").showModal();
}

// show loadCatagories
const displayCatagories = (data) =>{

    const categoryContainer = document.getElementById("categories");
    const items = data.map(item => {
        const buttonContainer = document.createElement("div");
        buttonContainer.innerHTML = 
        `
            <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class="btn category-btn">
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

    if(videos.length === 0){
        videoContainer.classList.remove("grid")
        videoContainer.innerHTML = `
            <div class="flex w-full flex-col min-h-[300px] justify-center items-center">
                <img class="mb-4" src="icons/Icon.png" alt="icon" />
                <h3 class="text-slate-600 font-bold text-4xl text-center lg:w-[30rem]">Opos!! Sorry, There is no content here</h3>
            </div>
        `;
        return;

    }else {
        videoContainer.classList.add("grid");
    }

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
                    <button onclick="loadDetails('${video.video_id}')" class="btn btn-sm btn-error text-white">details</button>
                </div>
            </div>
        `
        videoContainer.appendChild(card);
    })
}

document.getElementById("searchVideo").addEventListener("keyup", (event)=>{
    loadVideos(event.target.value);
})


const sortVideos = async() =>{
    const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/videos');
    const data = await res.json();
    const sortVideo = data?.videos.sort((a, b)=>{
        const first = parseInt(a?.others?.views.slice(0, -1)*1000);
        const second = parseInt(b?.others?.views.slice(0, -1)*1000);

        return  second - first;
    });

    displayVideos(sortVideo);
}

const sortBtn = document.getElementById("sortBtn");
sortBtn.addEventListener("click", sortVideos);
const webpageLogo = document.getElementById("webpageLogo");
webpageLogo.addEventListener("click", ()=>{
    location.reload();
})

loadCatagories();
loadVideos();