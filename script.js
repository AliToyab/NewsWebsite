const API_KEYS= "769bce2d18b92356046a0896b8995f20";
// const url="https://newsapi.org/v2/everything?q=";
const url="https://gnews.io/api/v4/search?q=";
window.addEventListener('load', ()=> fetchNews("India"));

function reload(){
    window.location.reload();
}

async function fetchNews(query){
    const res= await fetch(`${url}${query}&apikey=${API_KEYS}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles){
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');
    
    cardsContainer.innerHTML='';

    articles.forEach(article => {
        if(!article.image) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article){
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src= article.image;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;

    const date= new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML=`${article.source.name} • ${date} `;

    cardClone.firstElementChild.addEventListener("click", ()=>{
        window.open(article.url, "_blank");
    });
}

let curSeletedNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem=document.getElementById(id);
    curSeletedNav?.classList.remove("active");
    curSeletedNav=navItem;
    curSeletedNav.classList.add("active");
}

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('news-input');

searchButton.addEventListener('click', ()=>{
    const query= searchText.value;
    if(!query)  return;
    fetchNews(query);
    curSeletedNav?.classList.remove('active');
    curSeletedNav=null;
});
