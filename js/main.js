const theme = 'theme';
const dataTheme = 'data-theme'
const themeTab = ".theme-drawer-tab"
const switcherBTN=".switcher-btn"
const [dark,light,open,active] = ['dark','light','open','active'];

const modalOpen = '[data-open]';
const modalClose = '[data-close]';
const dataFilter ='[data-filter]';
const portfolioData ='[data-item]';
const isVisible = 'is-visible';

const htmlRoot = document.documentElement;


// Theme Panel setup

const toggleTheme = document.querySelector(themeTab);
const switcher =document.querySelectorAll(switcherBTN);
const currentTheme = localStorage.getItem(theme);

const setActive = (element , selector) =>{
    if(document.querySelector(`${selector}.${active}`) !== null) {
        document.querySelector(`${selector}.${active}`).classList.remove(active);
    }
    element.classList.add(active);
};
const setTheme = (val) => {
   htmlRoot.setAttribute(dataTheme,val);
   localStorage.setItem(theme,val);
};
if(currentTheme){
    htmlRoot.setAttribute(dataTheme,currentTheme);
    switcher.forEach((btn) =>{
        btn.classList.remove(active);
    })
    currentTheme === dark ? switcher[1].classList.add(active):switcher[0].classList.add(active);
}

toggleTheme.addEventListener('click',function (){
    const themePanel = this.parentElement.parentElement;
    !themePanel.className.includes(open) ? themePanel.classList.add(open): themePanel.classList.remove(open);
});

for (const elm of switcher) {
    elm.addEventListener('click',function (){
        const toggle = this.dataset.toggle;
        // set active state
        setActive(elm,switcherBTN);
        setTheme(toggle);
    })
}

class PortfolioItem {
    copyPH = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, magnam!";
    constructor (
        type,
        id,
        imgURL,imgAlt,
        filterType,
        title,
        copy1= this.copyPH,
        copy2= this.copyPH
    ) {
    this.type = type;
    this.id = id;
    this.imgURL = imgURL;
    this.imgAlt = imgAlt;
    this.filterType = filterType;
    this.title = title;
    this.copy1 = copy1;
    this.copy2 = copy2;

    }

}
const porfolioItemData =[];
[
    ["web","web-1","./assets/img/portfolio-1.jpg","portfolio-icon","Web Development","Food Website"],
    ["app","app-1","./assets/img/portfolio-2.jpg","portfolio-icon","App Development","Skate App"],
    ["web","web-2","./assets/img/portfolio-3.jpg","portfolio-icon","Web Development","Restaurant Website"],
    ["ui","ui-1","./assets/img/portfolio-4.jpg","portfolio-icon","UI Design","Cool Design"],
    ["app","app-2","./assets/img/portfolio-5.jpg","portfolio-icon","App Development","Game App"],
    ["web","web-3","./assets/img/portfolio-6.jpg","portfolio-icon","Web Development","Website thing"],
    ["app","app-3","./assets/img/portfolio-7.jpg","portfolio-icon","App Development","Money App"],
    ["ui","ui-2","./assets/img/portfolio-8.jpg","portfolio-icon","UI Design","Fantastic Design"],
].forEach((item)=>{
porfolioItemData.push(new PortfolioItem(...item))
})

function createPortfolioItem(portfolioData) {
    const portfolioGrid = document.querySelector('#main-portfolio-grid');
    portfolioData.forEach((portfolioItem) => {
        const {type,id:itemID,imgURL,imgAltText,filterType,title} = portfolioItem;
        const portfolioCard = document.createElement("div");
        portfolioCard.classList.add("portfolio-card")
        portfolioCard.setAttribute('data-item',type);
        portfolioCard.setAttribute('data-open',itemID);
        const portfolioCardBody = document.createElement("div");
        portfolioCardBody.classList.add("card-body");
        portfolioCardBody.innerHTML = `<img src="${imgURL}" alt="${imgAltText}">
                   <div class="card-popup-box">
                       <div class="filter-type">${filterType}</div>
                       <h3>${title}</h3>
                    </div>`;
        portfolioCard.appendChild(portfolioCardBody);
        portfolioGrid.appendChild(portfolioCard);
    })

}
createPortfolioItem(porfolioItemData);

// Portfolio Object Section
const filterLinks = document.querySelectorAll(dataFilter);
const portfolioItems = document.querySelectorAll(portfolioData);
const searchInput = document.querySelector('#search');

searchInput.addEventListener("keyup", (event) => {
    const searchInput = event.target.value.toLowerCase().trim();
    portfolioItems.forEach((card)=>{
        card.dataset.item.includes(searchInput)
            ? card.style.display = 'block'
            :card.style.display ='none'
    })
})
for (const filterLink of filterLinks) {
    filterLink.addEventListener("click" , function (){
        setActive(filterLink,'.filter-link');
        const filter = this.dataset.filter;
        portfolioItems.forEach((card) =>{
            if (filter === 'all') card.style.display ='block';
            else if (card.dataset.item === filter ) { card.style.display = 'block'}
            else {card.style.display = 'none'}
        })
    })

}

/* Modal Selectors*/
const openModal = document.querySelectorAll(modalOpen);
const closeModal = document.querySelectorAll(modalClose);

// Full Page Modal open Buttons
for (const elm of openModal) {
    elm.addEventListener("click",function () {
        const fullscreenModals =['about','contact'];
        const modalId = this.dataset.open;
        console.log(modalId);
        const portfolioData = porfolioItemData.find(item => item.id === modalId);
        if (!fullscreenModals.includes(modalId)) createPortfolioModal(portfolioData);
        document.getElementById(modalId).classList.add(isVisible);
    })
}
for (const elm of closeModal) {
    elm.addEventListener("click",function (){
        this.parentElement.parentElement.parentElement.classList.remove(isVisible);
    })
}

// Portfolio Modal

function createPortfolioModal (portfolioModalData) {
    const modalGroup = document.querySelector('#portfolio-modal-group');
   const {title,id:ID,imgURL,imgAlt,copy1,copy2} = portfolioModalData;
    const modal = document.createElement("div");
    modal.setAttribute("data-animation","slideInOutTop");
    modal.classList.add('modal');
    modal.id = ID;
    modal.innerHTML = `<div class="modal-inner">
           <header class="modal-header">
               <h3>${title}</h3>
               <i class="fas fa-times" data-close></i>
           </header>
           <div class="modal-body">
               <div class="modal-img-wrapper">
                   <img src="${imgURL}" alt="${imgAlt}">
               </div>
               <div class="modal-text-wrapper">
                   <p> <strong> ${title}</strong></p>
                   <p> ${copy1}</p>
                   <p> ${copy2}</p>
               </div>
           </div>
       </div>`
    modalGroup.appendChild(modal);
}

function removeModal(e) {
    const modalGroup = document.querySelector('#portfolio-modal-group');
    if (e.target === document.querySelector('.modal.is-visible')) {
        document.querySelector('.modal.is-visible').classList.remove(isVisible);
        const modalToDelete = modalGroup.childNodes[0];
        modalToDelete.remove()
    }
}

document.addEventListener('click',(e) => {
    removeModal(e);
});
document.addEventListener('keyup',(e) => {
    if (e.key === 'Escape') removeModal(e)
});



