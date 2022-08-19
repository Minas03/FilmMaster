import filmsData from "./Datas/data.js"

const cardDiv = document.querySelector('.card-div')

const searchInput = document.querySelector('.input')

let button = document.querySelector('.favourite')

let film = document.querySelector('.film')

let arr = []


function getData() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(filmsData)
    }, 1000)
  })
}

const data = await getData()

searchInput.addEventListener('input', () => {
  let searched = filmsData.results.filter((item) =>
    item.title.toLowerCase().includes(searchInput.value.toLowerCase()))
  render(searched)
})

function render(data) {
  cardDiv.innerHTML = ''
  let filterUrlData = data.filter((item) => {
    if (item.imageurl.length) {
      return item.imageurl
    }
  }).forEach((element) => {
    let card = document.createElement('div');
    card.classList.add('card')

    let img = document.createElement('img')
    img.src = element.imageurl

    let title = document.createElement('p')
    title.textContent = element.title

    let genre = document.createElement('span')
    genre.textContent = element.genre

    let hearth = document.createElement('h2')
    hearth.innerHTML = arr.includes(element) ? '❤️' : '🤍'
    hearth.className = 'hearth'
    hearth.addEventListener('click', () => {
      if (arr.includes(element)) {
        hearth.innerHTML = '🤍'
        arr = arr.filter(item => item !== element)
      } else {
        hearth.innerHTML = '❤️'
        arr.push(element)
      }
    })

    card.append(hearth, img, title, genre)
    cardDiv.append(card)
  })

  if (!data.length) {
    let p = document.createElement('p')
    p.innerHTML = 'Your favourite list is empty'
    cardDiv.append(p)
    p.className = 'empty'
  }
}

button.addEventListener('click', () => {
  render(arr)
})

film.addEventListener('click', () => {
  render(filmsData.results)
})

render(filmsData.results)