const API_KEY = "f5479693f89043faaee8354f731dd25b";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchnews("Education"));

async function fetchnews(query) {
  const res = await fetch(`${url}${query}&apikey=${API_KEY}`);
  const data = await res.json();
  console.log(data.articles);
  binddata(data.articles);
}

function binddata(articles) {
  const cardscontainer = document.getElementById("cards-container");
  const newsCardTemplate = document.getElementById("template-news-card");
  cardscontainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const cardClone = newsCardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    cardscontainer.appendChild(cardClone);
  });
}

function fillDataInCard(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDesc = cardClone.querySelector("#news-desc");
  const readMore = cardClone.querySelector("#read-more-button");

  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;
  newsSource.innerHTML = article.source.name;
  readMore.href = article.url;
}

function onNavItemClick(id) {
  fetchnews(id);
}

function reload() {
  window.location.reload();
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("news-input");

searchButton.addEventListener("click", () => {
  const query = searchText.value;

  if (!query) return;
  fetchnews(query);
});
