
//declaring a variable to store img direction and assinging attributes to img element 
const welcomeImg = "images/AOEIIMeme.jpg";
document.querySelector("#welcome-img").setAttribute("src", welcomeImg);
document.querySelector("#welcome-img").setAttribute("alt", "AOEIIMeme")

//creating a list to store the list of units
let unitList = [];
//output
function output(list){
    //loop for each unit in the list and create elements to store name, attack, age and cost
    list.forEach(unit => {

        let article = document.createElement("article");
        let name = document.createElement("h3");
        name.textContent = unit.name;

        let description = document.createElement("p");
        description.textContent = unit.description;

        let age = document.createElement("h4");
        age.textContent = `Age:  ${unit.age}`;

        let attack = document.createElement("h4");
        attack.textContent = `Attack:  ${unit?.attack === undefined? "-":unit.attack}`;

        let cost = document.createElement("p");

        //If undefined attribute value is found, replace it to quantity zero
        cost.textContent = `Cost: 
            🌲 Wood: ${unit.cost?.Wood === undefined? 0: unit.cost.Wood} 
            💰  Gold: ${unit.cost?.Gold === undefined? 0: unit.cost.Gold} 
            🥩 Food: ${unit.cost?.Food === undefined? 0: unit.cost.Food}`
        
        //append child elements to the article element
        article.appendChild(name);
        article.appendChild(description);
        article.appendChild(age);
        article.appendChild(attack);
        article.appendChild(cost);

        //appending article to the units ID in the HTML
        document.querySelector("#units").appendChild(article);

    });

};
//defining url variable that use "https://cors-anywhere.herokuapp.com/" as a header to allow to access the API
const url = "https://cors-anywhere.herokuapp.com/age-of-empires-2-api.herokuapp.com/api/v1/units"

//created an async function to obtain the information from the object with fetch and call the ouput function to display elements in HTML.
async function getUnits(url){
    const response = await fetch(url);
    console.log(response)
    if (!response.ok){
        console.log("error")}

    unitList = await response.json();
    
    output(unitList.units)
    
};
getUnits(url);
//reset the unit div in the HTML to allow sorting
function reset() { document.getElementById("units").innerHTML = "" };
//function that sort each element in the object by its name, age or attack and calls ouput function to display new list on HTML
function sortBy () {
     reset()
    let order = document.getElementById("sortBy").value 
   
     let sorted = unitList.units.sort((a, b) => {
        return a[order] > b[order] ? 1 : a[order] < b[order] ? -1 : 0})
   
    
    output(sorted)
 
};
//created an Event listeres to act when user interacts with the sorting menu.
document.getElementById("sortBy").addEventListener("click", sortBy)