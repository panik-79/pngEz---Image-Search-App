API_KEY = "CYP0rxFi_bx5axUZt1QiI3wPI0dW_GCzhfl0B-X4s2I";

const formEle = document.querySelector("form");
const inputEle = document.getElementById("search-input");
const searchResultEle = document.querySelector(".search-results");
const showMoreBtn = document.getElementById("show-more-btn");
let inputData = "" ;
let page = 1 ;


formEle.addEventListener("submit",(event) => {
    event.preventDefault();
    page = 1 ;
    getImages();
})

async function getImages(){

    inputData = inputEle.value;
    let temp = inputData;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${API_KEY}`;

    try{
        const response = await fetch(url);
        const data = await response.json();
        const results = data.results;

        results.map((result) => {
            const imageWrapper = document.createElement("div");
            imageWrapper.classList.add("image-card");
            const image = document.createElement("img");
            image.src = result.urls.small;
            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank" ;
            imageLink.textContent = result.alt_description;
            console.log(result);
    
            imageWrapper.appendChild(image);
            imageWrapper.appendChild(imageLink);
            searchResultEle.appendChild(imageWrapper);
        });
        page++;
        if(page > 1){
            showMoreBtn.style.display = "block" ;
        }
        if(page === 1){
            searchResultEle.innerHTML = "";
        }
    }
    catch(error){
        console.log(error);
    }

}

showMoreBtn.addEventListener("click", ()=>{
    getImages();
})