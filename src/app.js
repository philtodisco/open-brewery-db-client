const searchBtn = document.getElementById('search-btn')
const breweryList = document.getElementById('brewery-list')
const searchForm = document.getElementById('search-form')
const resultsContainer = document.getElementById('results-container')
let searchValue = ""
const listOfStates = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming']


let slowScroll = () => {
setTimeout(() => {
    resultsContainer.scrollIntoView({behavior: "smooth"})
    }, 100)
}

//this function displays API data as an HTML list
let displayData = (data) => {
    data.forEach(brewery => {
        let phone = brewery.phone
        // check if valid phone number
        if (phone === null || phone.length != 10) {
            phone = "Phone number unavailable"
        } else {
            // use regex to group and replace
            phone = phone.replace(/^(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
        }
        let listItemContainer = document.createElement("div")
        listItemContainer.classList.add('list-item-container')
        breweryList.appendChild(listItemContainer)
        // add clickable URL for each brewery
        if (brewery.website_url != null) {
            listItemContainer.addEventListener('click', () => window.open(`${brewery.website_url}`))
        } else if (brewery.website_url === null) {
            listItemContainer.addEventListener('click', () => alert('URL not found!'))
        }
        let listItemTitle = document.createElement("li")
        listItemTitle.classList.add("list-item-title")
        listItemTitle.textContent += `${brewery.name}`
        listItemContainer.appendChild(listItemTitle)
        let listItemBody = document.createElement("li")
        listItemBody.classList.add('list-item-body')
        listItemBody.textContent += `${brewery.street}\r\n${brewery.city}, ${brewery.state} ${brewery.postal_code}\r\n${phone}`
        listItemContainer.appendChild(listItemBody)
    })
    slowScroll()
}

//updates and stores the value of the search form in real time
searchForm.addEventListener("input", (e) => {
    searchValue = e.target.value
})

searchBtn.addEventListener('click', () => {
    searchBreweries()  
})

let searchBreweries = () => {
    if (searchValue == "") {
        return
    }
    if (searchValue <= 99999) {
        fetch(`https://api.openbrewerydb.org/breweries?by_postal=${searchValue}&per_page=100`)
        .then((response) => response.json())
        .then((data) => displayData(data))
        return 
    }

    // search by cities
    fetch(`https://api.openbrewerydb.org/breweries?by_city=${searchValue}&per_page=100`)
    .then((response) => response.json())
    .then((data) => {
        if (data != []) {
            displayData(data)
            return
        }
        fetch(`https://api.openbrewerydb.org/breweries/search?query=${searchValue}&per_page=100`)
        .then((response) => response.json())
        .then((data) => displayData(data))
    }) 
}