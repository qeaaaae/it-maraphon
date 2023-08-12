let burgerBtn = document.querySelector(".burger__menu")
let burgerMenu = document.querySelector(".nav__links")
let menuOpened = false
let activePaginationCircle = document.querySelector("#first__circle")
let storyParts = [".title", ".text", ".description"]
let activeStory = "#first__history"
const allCircle = document.querySelectorAll(".circle")
const scrollPagination = {
    "first__circle": "#first__history",
    "second__circle": "#second__history",
    "third__circle": "#third__history",
    "fourth__circle": "#fourth__history",
    "fifth__circle": "#fifth__history",
    "sixth__circle": "#sixth__history",
    "seventh__circle": "#seventh__history",
}
const historySections = document.querySelectorAll(".history")

const cb = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            currentCircle = getObjectKey(scrollPagination, `#${entry.target.id}`)
            selectCircle(currentCircle)
            clearStory()
            selectStory(`#${entry.target.id}`)

        }
    })
}

const sectionObserver = new IntersectionObserver(cb, {
    "rootMargin": "-15% 0% -15% 0%",
    "threshold": "1"
})

historySections.forEach((el) => sectionObserver.observe(el))

allCircle.forEach(function(el) {
    el.onclick = () => {
        document.querySelector(scrollPagination[el.id]).scrollIntoView({
            behavior: 'smooth',
            block: 'center' 
        })
        selectCircle(el.id)
        clearStory()
        selectStory(scrollPagination[el.id])
    }
})

function selectStory(story) {
    document.querySelector(`${story} .history__cirle`).classList.add("active__history__circle")
    storyParts.forEach(function(el) {
        document.querySelector(`${story} ${el}`).classList.add("active");
    })
    activeStory = story
}

function clearStory() {
    document.querySelector(`${activeStory} .history__cirle`).classList.remove("active__history__circle")
    storyParts.forEach(function(el) {
        document.querySelector(`${activeStory} ${el}`).classList.remove("active");
    })
}

function selectCircle(el) {
    activePaginationCircle.classList.remove("active__circle")
    activePaginationCircle = document.getElementById(el)
    activePaginationCircle.classList.add("active__circle")
}

function getObjectKey(obj, value) {
    return Object.keys(obj).find(key => obj[key] === value);
}

burgerBtn.onclick = () => {
    if (menuOpened) {
        burgerBtn.classList.remove("open")
        burgerMenu.classList.add("close")
        menuOpened = false
    } else {
        burgerBtn.classList.add("open")
        burgerMenu.classList.remove("close")
        menuOpened = true
    }
}
