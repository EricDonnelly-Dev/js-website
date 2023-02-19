const theme = 'theme';
const dataTheme = 'data-theme'
const themeTab = ".theme-drawer-tab"
const switcherBTN=".switcher-btn"
const [dark,light,open,active] = ['dark','light','open','active'];

const modalOpen = '[data-open]';
const modalClose = '[data-close]';
const isVisible = 'is-visible'

const htmlRoot = document.documentElement;


// Theme Panel setup

const toggleTheme = document.querySelector(themeTab);
const switcher =document.querySelectorAll(switcherBTN);
const currentTheme = localStorage.getItem(theme);

const setActive = (element , selector) =>{
    if(document.querySelector(`${selector}.${active}`) !== null) {
        document.querySelector(`${selector}.${active}`).classList.remove(active);
        element.classList.add(active);
        }
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

/* Modal Selectors*/

const openModal = document.querySelectorAll(modalOpen);
const closeModal = document.querySelectorAll(modalClose);
// Full Page Modal open Buttons
for (const elm of openModal) {
    elm.addEventListener("click",function () {
        const modalId = this.dataset.open;
        document.getElementById(modalId).classList.add(isVisible);
    })
}
for (const elm of closeModal) {
    elm.addEventListener("click",function (){
        this.parentElement.parentElement.classList.remove(isVisible);
    })
}





