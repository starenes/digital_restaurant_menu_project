import {buttonsData, menu} from "./db.js"
import {calculatePrice,elements} from "./helpers.js"

//! fonksiyonlar 

const searchCategory = (e) =>{
    //* tıklama ve dataset e ulaştık v bir değişkene aktardık
    const category = e.target.dataset.category ;
   
    //* filter metodu : tüm dizi elemanlarından yalnızca kategori değeri butonun kategori değeri ile eşleşirse bu ürünleri getir.
    const filtredMenu = menu.filter((item) => (item.category) === category);
 if (category === "all") {
    renderMenuItems(menu);
 }else{
    renderMenuItems(filtredMenu);
 }

 renderButtons(category);
};

//! == iki eşit tipine bakmaz ===  üç eşit bakar kontrol eder arasındaki fark
//*? data özelliklerini nasıl alacağız. console.log(e.target.dataset.category) daha sonra değişkene aktar */
//! return; bir fonksiyondan dışarıya veri aktarmaya yarar. return kaldırıp normal parantez içindeded yazabilirsin. aşağıda olduğu gibi

//* ekrana menu elemanlarını aktaracak fonksiyondur.
//* gönderilen verileri dönüp her bir veri için bir a etiketi oluştur.


const renderMenuItems = (menuItems) =>{
let menuHTML = menuItems.map(
  (item) =>  
    `
            <a
            id="card"
            href="/productDetail.html?id=${item.id}&category=${item.category}&price=${item.price}"
            class="text-decoration-none text-black d-flex flex-column flex-md-row gab-2"
          >
            <img class="rounded shadow" src="${item.img}" alt="" />
            <div>
              <div class="d-flex justify-content-between align-items-center">
                <h5>${item.title}</h5>
                <p class="text-success">${item.price}</p>
              </div>
              <p class="lead">
            ${item.desc}</p>
            </div>
          </a>     
    `  
);
menuHTML = menuHTML.join("");
//*oluşturduğumuz menuHtml ekrana aktardık
elements.menuArea.innerHTML = menuHTML;
};
//*Yeni butonlar için buttonData içerisindeki verileri dönüp her bir veri içinbir button oluşturduk.

 const renderButtons = (active) => {
    console.log(active);
    elements.buttonsArea.innerHTML = "";
   buttonsData.forEach((btn) => { 
    //* her bir veri için bir html buton etiketi oluştur.
    const buttonEle = document.createElement("button");
    //* oluşturduğumuz butonlara class ekledik
    buttonEle.className = "btn btn-outline-dark filter-btn";
  //* oluşturduğumuz butonun içeriğini değiştirme
    buttonEle.textContent = btn.text;
    //*oluşturduğumuz butonun hangi kategoride olduğu bilgisini button elementine ekledik.
    buttonEle.dataset.category = btn.value;
//* eğer ki active kategorisiyle buton eşleşşirse ona farklı class ekle
    if(btn.value === active) {
      buttonEle.classList.add("bg-dark","text-light");
    }


    //* html e gönderme
    elements.buttonsArea.appendChild(buttonEle);
   });
 };
//! olay izleyicileri
//* sayfa yüklendiği anda renderMenuItems fonksiyonunu çalıştır ve menu parametresini gönder.
document.addEventListener("DOMContentLoaded", () => {
    renderButtons("all");
    renderMenuItems(menu);
  });
//* butonların bulunduğu alana tıklanıldında searchCategory foksiyonunu çalıştır.

 elements.buttonsArea.addEventListener("click",searchCategory);