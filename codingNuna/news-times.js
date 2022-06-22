let news = []

const getLatestNews = async()=>{
    let url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=business&page_size=10`);
    
    let header = new Headers({"x-api-key":"OuwSM5AQS1ndhDXqIzK6rOAyiYGS97os2V_0Kf7psfw"});

    let response = await fetch(url,{headers:header});
    let data = await response.json();
    news = data.articles
    console.log(news)
    
};

getLatestNews();

