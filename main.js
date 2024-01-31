//api isteğini atacağımız url
var url = 'https://shazam.p.rapidapi.com/charts/track?locale=tr&pageSize=20&startFrom=0';
//isteği atarken göndermmiz gereken ayarlar
var options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'd3fd773b55msh3bf660a366e5698p1dd4c9jsn159d18de3ba3',
		'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
	}
};

// 1) Sayfa yüklenmesini izle
document.addEventListener("DOMContentLoaded", function(){
    // 2) Api'den müzik verilerini al
    fetch(url,options)
    // 3) Verileri İşle
    .then(function(res){
        return res.json();
    })
    // 4) Aldığımız verileri ekrana kart şeklinde bas
    .then(function(data){
        renderCards(data.tracks);
    });
});

const list = document.querySelector("#list")

//verileri ekrana basar
function renderCards(data){
    data.forEach((song) => {
        // 1) Div oluşturma
        const div = document.createElement("div");
        // 2) Karta veri ekle
        div.dataset.url = song.hub.actions.pop().uri;
        div.dataset.title = song.title;
        div.dataset.photo = song.images.coverart;

        // 3) class verme
        div.className = "card";

        // 4) içeriğini belirleme
        div.innerHTML = `
        <figure>
                        <img src="${song.images.coverart}">
                        <div class="play">
                            <i id="play-btn" class="bi bi-play-fill"></i>
                        </div>
                    </figure>

                    <h4>${song.subtitle}</h4>
                    <p>${song.title}</p>
        `;

        // 5) html'e divi gönder
        list.appendChild(div);
    })
}

//oynatma özelliği

//liste alanındaki tıklanmaları izle

list.addEventListener("click", function(e){
    //eğer tıklanan eleman oynat butonuysa müziği çal
    if(e.target.id === "play-btn"){
        //oynatılacak müziğin kartını al
        const card = e.target.closest(".card");
        //müziği çal
        renderMusic(card.dataset);
    }
})

var playinInfo = document.querySelector(".playing");
function renderMusic(song){
    playinInfo.innerHTML = `
    <div class="info">
            <img src="${song.photo}">
            
            <div>
                <p>Şuan Oynatılıyor</p>
                <h3>${song.title}</h3>
            </div>
        </div>

        <audio controls autoplay src="${song.url}"></audio>
    `;
}