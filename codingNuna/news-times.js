let news = []
let menus = document.querySelectorAll(".menus button")
menus.forEach(menu=> menu.addEventListener("click", (event)=>getNewsByTopic(event)))

let searchButton = document.getElementById("search-button")


const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
    };

const closeNav = () => {
document.getElementById("mySidenav").style.width = "0";
};

const openSearchBox = () => {
let inputArea = document.getElementById("input-area");
if (inputArea.style.display === "inline") {
    inputArea.style.display = "none";
} else {
    inputArea.style.display = "inline";
}
};

const getLatestNews = async()=>{
    let url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=business&page_size=10`);
    
    let header = new Headers({"x-api-key":"OuwSM5AQS1ndhDXqIzK6rOAyiYGS97os2V_0Kf7psfw"});

    let response = await fetch(url,{headers:header});
    let data = await response.json();
    news = data.articles
    console.log(news);

    render()
    
};

const getNewsByTopic = async(event)=>{
    let topic = event.target.textContent.toLowerCase()
    let url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10&topic=${topic}`)
    let header = new Headers({"x-api-key":"OuwSM5AQS1ndhDXqIzK6rOAyiYGS97os2V_0Kf7psfw"});
    let response = await fetch(url,{headers:header});
    let data = await response.json();
    news = data.articles
    render();
    console.log("토픽뉴스",data)
};

const getNewsByKeyword = async()=>{
    let keyword = document.getElementById("search-input").value;
    let url = new URL(`https://api.newscatcherapi.com/v2/search?q=${keyword}&page_size=10`)
    let header = new Headers({"x-api-key":"OuwSM5AQS1ndhDXqIzK6rOAyiYGS97os2V_0Kf7psfw"});
    let response = await fetch(url,{headers:header});
    let data = await response.json();
    news = data.articles
    render();
}

const render = ()=>{
    let newsHTML = '';
    newsHTML = news.map(item=>{
        return `<div class="row">
        <div class="col-lg-4">
            <img  class="news-image-size" src="${item.media || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"}">
        </div>
        <div class="col-lg-8">
            <h2>${item.title}</h2>
            <p>
                ${item.summary == null || item.summary == ""
                    ? "내용없음"
                    : item.summary.length > 200
                    ? item.summary.substring(0,200)+"..."
                    : item.summary}
            </p>
            <div>
                ${item.rights || "no source"}
                ${moment(item.published_date).fromNow()}
            </div>
        </div>
    </div>`
    }).join('');



    document.getElementById("news-board").innerHTML=newsHTML
}
searchButton.addEventListener("click",getNewsByKeyword)
getLatestNews();


