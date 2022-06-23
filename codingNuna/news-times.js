let news = []

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
    console.log(news)
    
};

getLatestNews();


