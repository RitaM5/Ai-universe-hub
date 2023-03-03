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
        <img class="p-8 rounded-t-lg h-52 mx-auto w-96" src="${image}" alt="" />
        <div class="px-8 h-32">
        <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Features</h2>
           <ol class=" max-w-md space-y-1 text-gray-500 list-decimal list-inside dark:text-gray-400">
           <li class="text-sm">${features[0] ? features[0] : 'not found'}</li>
           <li class="text-sm">${features[1] ? features[1] : 'not found'}</li>
           <li class="text-sm">${features[2] ? features[2] : 'not found'}</li>
           </ol>
        </div>
        <hr class="h-px my-8 bg-gray-200 w-80 mx-auto border-0 dark:bg-gray-700">
        <div class="flex justify-between px-8 mb-5">
        <div>
        <h1 class="font-semibold">${name}</h1>
        <p class="flex gap-1 mt-2">
        <img src="https://img.icons8.com/small/20/null/calendar.png"/>
         ${published_in}
        </p>
        </div>
        <label for="my-modal-3" class="" onclick="cardDetails('${id}')">
        <img src="https://img.icons8.com/color/48/null/circled-right--v1.png"/>
        </label>
        <input type="checkbox" id="my-modal-3" class="modal-toggle" />
        <div class="modal">
        <div class="modal-box relative" id="modal-body">

        </div>
        </div> 
        </div>
        </div>
        `
        cardContent.appendChild(card);
    });

}
const cardDetails = (id) =>{
    let url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => showcardDetails(data.data));
}
const showcardDetails = (singleData) =>{
      console.log(singleData);
      const {id, tool_name, image_link, accuracy, description, integrations, pricing} = singleData
      document.getElementById("modal-body").innerHTML = `
      <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
      <div>
      </div>
      `
}