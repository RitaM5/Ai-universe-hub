const fetchData = () => {
    document.getElementById("spinner").classList.remove("hidden")
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    fetch(url)
        .then(res => res.json())
        .then(data =>{ 
            document.getElementById("spinner").classList.add("hidden")
            displayData(data.data)
        });
}
fetchData()
const displayData = (data) => {
    console.log(data);
    const cardContent = document.getElementById("card-components");
    const featuresAdd = document.getElementById('feature-add');
    const hideButtton = document.getElementById('hide-btn');
    data.tools.slice(0,6).forEach(cardData => {
        const { id, image, name, features, description, published_in } = cardData;
        const card = document.createElement('div');
        card.innerHTML = `    
        <div class="w-full max-sm:mx-auto max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <img class="p-8 rounded-t-lg h-52 mx-auto w-80" src="${image}" alt="" />
        <div class="px-16 h-32">
        <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Features</h2>
           <ol class=" max-w-md space-y-1 text-gray-500 list-decimal list-inside dark:text-gray-400">
           <li class="text-sm">${features[0] ? features[0] : 'not found'}</li>
           <li class="text-sm">${features[1] ? features[1] : 'not found'}</li>
           <li class="text-sm">${features[2] ? features[2] : 'not found'}</li>
           </ol>
        </div>
        <hr class="h-px my-8 bg-gray-200 w-72 mx-auto border-0 dark:bg-gray-700">
        <div>
        <div>
        <h1>${name}</h1>
        <p>${published_in}</p>
        </div>
        
        </div>
        </div>
        `
        cardContent.appendChild(card);
    });

}
