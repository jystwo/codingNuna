let news = []
let page = 1;
let total_pages=0
let menus = document.querySelectorAll(".menus button")
menus.forEach(menu=> menu.addEventListener("click", (event)=>getNewsByTopic(event)))

let searchButton = document.getElementById("search-button")
let url;

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

const getNews = async()=>{
    try{
        let header = new Headers({"x-api-key":"OuwSM5AQS1ndhDXqIzK6rOAyiYGS97os2V_0Kf7psfw"});
            url.searchParams.set("page",page)
            let response = await fetch(url,{headers:header});
            let data = await response.json();
            if(response.status == 200){
                if(data.total_hits == 0){
                    throw new Error("검색된 결과값이 없습니다.")
                }
                news = data.articles
                total_pages = data.total_pages;
                page = data.page;
                render();
                pagenation();
            } else{
                throw new Error(data.message)
            }
            
            
    }catch(error){
        console.log("잡힌 에러는",error.message)
        errorRender(error.message)
    }

    
}

const getLatestNews = async()=>{
    page = 1;
    url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=business&page_size=10`);
    
    getNews();
};

const getNewsByTopic = async(event)=>{
    page = 1
    let topic = event.target.textContent.toLowerCase()
    url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10&topic=${topic}`)
    getNews();
};

const searchNews = async()=>{
    page = 1;
    let keyword = document.getElementById("search-input").value;
    url = new URL(`https://api.newscatcherapi.com/v2/search?q=${keyword}&page_size=10`)
    getNews();
}

const render = ()=>{
    let newsHTML = '';
    newsHTML = news.map(item=>{
        return `<div class="row">
        <div class="col-lg-4">
            <img  class="news-image-size" src="${item.media || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"}"/>
        </div>
        <div class="col-lg-8">
        <a class="title" target="_blank" href="${item.link}">${
            item.title
        }</a
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

const errorRender = (message)=>{
    let errorHTML = `<div class="alert alert-danger text-center" role="alert">
    ${message}
    </div>`
    document.getElementById("news-board").innerHTML = errorHTML
}

const pagenation = ()=>{
    let pagenationHTML = ``
    let pageGroup = Math.ceil(page/5)
    let last = pageGroup*5
        if(last>total_pages){
            last= total_pages
        }
    let first = last - 4

if(first >=6){
    pagenationHTML = `<li class="page-item">
<a class="page-link" href="#js-bottom" aria-label="Previous" onclick="moveToPage(1)">
    <span aria-hidden="true">&lt;&lt;</span>
</a>
</li>
<li class="page-item">
<a class="page-link" href="#js-bottom" aria-label="Previous" onclick="moveToPage(${page-1})">
    <span aria-hidden="true">&lt;</span>
</a>
</li>`}
    for(let i =first;i<=last;i++){
        pagenationHTML += `<li class="page-item ${page==i?"active":""}"><a class="page-link" href="#js-bottom" onclick="moveToPage(${i})">${i}</a></li>`
    }
if(last < total_pages){pagenationHTML +=`<li class="page-item">
<a class="page-link" href="#js-bottom" aria-label="Next" onclick="moveToPage(${page+1})">
    <span aria-hidden="true">&gt;</span>
</a>
</li>
<li class="page-item">
<a class="page-link" href="#js-bottom" aria-label="Next" onclick="moveToPage(${total_pages})">
    <span aria-hidden="true">&gt;&gt;</span>
</a>
</li>`}

    document.querySelector(".pagenation").innerHTML = pagenationHTML;
}

const moveToPage = (pageNum)=>{
    page = pageNum
    getNews()
}
getLatestNews();


