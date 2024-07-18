const queryTransform = {
    "beach": "beaches",
    "beaches": "beaches",
    "temple": "temples",
    "temples": "temples",
    "country": "countries",
    "countries": "countries"
};

function basicDivContructor(items) {
    const divs = [];
    for (const item of items) {
        const div = document.createElement("div");
        div.classList.add("card");
        // div.innerHTML += `<img src="${item.imageUrl}" alt="hjh" width="640" height="320">`;
        div.innerHTML += `<img src="${item.imageUrl}" alt="hjh">`;
        div.innerHTML += `<h3>${item.name}</h3>`;
        div.innerHTML += `<p>${item.description}</p>`;
        divs.push(div);
    }
    return divs;
}

function showBeachesDiv(data) {
    return basicDivContructor(data);
}

function showTemplesDiv(data) {
    return basicDivContructor(data);
}

function showCountriesDiv(data) {
    const countryDivs = [];
    for (const { name, cities } of data) {
        const cityDivs = basicDivContructor(cities);
        const countryDiv = document.createElement("div");
        countryDiv.append(...cityDivs);
        countryDivs.push(countryDiv);
    }
    return countryDivs;
}

const showSearchResultDivs = {
    "beaches": showBeachesDiv,
    "temples": showTemplesDiv,
    "countries": showCountriesDiv,
};



function onSearch() {
    let searchQuery = document.getElementById("search-bar").value.toLowerCase().trim();
    const resultDiv = document.getElementById("search-result");
    resultDiv.innerHTML = "";

    searchQuery = queryTransform[searchQuery.toString()] ? queryTransform[searchQuery.toString()] : "";

    fetch("./travel_recommendation_api.json")
        .then(response => response.json())
        .then(result => {
            const data = result[searchQuery.toString()];
            // console.log(`data: ${JSON.stringify(data)}`);
            if (!data) return;

            const divs = showSearchResultDivs[searchQuery.toString()](data);
            // console.log(`divs: ${divs}`);
            for (const div of divs) {
                resultDiv.appendChild(div);
            }
        });

}

function btnClear() {
    document.getElementById("search-result").innerHTML = "";
}

document.getElementById('search-bar').addEventListener('keyup', event => {
    if (event.key === 'Enter') {
        onSearch();
    }
});
// e.addEventListener("input", searchCondition);
