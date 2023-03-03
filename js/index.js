const fetchData = () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    fetch(url)
        .then(res => res.json())
        .then(data => displayData(data.data));
}
fetchData()
const displayData = (data) => {
    console.log(data);
    const cardContent = document.getElementById("card-components");
    const featuresAdd = document.getElementById('feature-add');
    data.tools.forEach(cardData => {
        const {id, image, name, features, description, published_in} = cardData;
        features.map(feature=>{
            console.log(feature);
            const li = document.createComment('li')
            li.innerText = feature;
            featuresAdd.appendChild(li);
        })
        const card = document.createElement('div');
        card.innerHTML=`    
        <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <img class="p-8 rounded-t-lg h-52 mx-auto" src="${image}" alt="" />
        <div class="">
           <ol id="feature-add">
           </ol>
           <p></p>
        </div>
        <div>
        </div>
        </div>
        `
        cardContent.appendChild(card);
    });
  
}