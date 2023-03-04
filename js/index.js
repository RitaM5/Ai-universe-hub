let sortData =[]
const fetchData = (dataLimit) => {
    document.getElementById("spinner").classList.remove("hidden")
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            document.getElementById("spinner").classList.add("hidden")
            sortData = data.data.tools
            displayData(data.data.tools, dataLimit)
        });
}
const displayData = (data, dataLimit) => {
   // console.log(data);
    let cardContent = document.getElementById("card-components");
    cardContent.textContent = '';
    const showAll = document.getElementById("see-more");
    if (dataLimit && data.length > 6) {
        data = data.slice(0, 6);
        showAll.classList.remove('hidden');
    }
    else {
        showAll.classList.add('hidden');
    }
    data.forEach(cardData => {
        let { id, image, name, features, description, published_in } = cardData;
        let card = document.createElement('div');
        card.innerHTML = `    
        <div class="w-full h-full max-sm:mx-auto max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <img class="p-8 rounded-t-lg h-52 mx-auto w-96" src="${image}" alt="" />
        <div class="px-8">
        <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Features</h2>
           <ol id ="order-list" class="max-w-md space-y-1 text-gray-500 list-decimal dark:text-gray-400">
           ${features.map(feature => `<li>${feature ? feature : "not found"}</li>`)
            }
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
        <div class="modal-box relative w-11/12 max-w-5xl sm:mx-auto" id="modal-body">
        </div>
        </div> 
        </div>
        </div>
        `
        cardContent.appendChild(card);
    });

}
const cardDetails = (id) => {
    let url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => showcardDetails(data.data));
}
const showcardDetails = (singleData) => {
    console.log(singleData);
    const { id, tool_name, image_link, accuracy, description, features, integrations, pricing, input_output_examples } = singleData
    const featureItem = Object.values(features)
    document.getElementById("modal-body").innerHTML = `
      <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
      <div class="md:flex md:justify-around mt-4">
      <div class="card w-full bg-base-100 shadow-xl max-sm:mx-auto">
        <div class="card-body">
            <p class="text-1xl text-semibold">${description}</p>
            <div class="flex justify-around">
            ${pricing ? (pricing.map(priceData => `
                <div class="shadow-sm text-sm w-28 h-20 text-green-600 card bg-base-100 shadow-sm text-center p-2">
                <p>${priceData.price}</p>
                <p>${priceData.plan}</p>
                </div>
                `)) : "free of cost"
        }
            </div>
            <div class="md:flex md:justify-between">
             <div class="pb-6">
             <h1 class="text-2xl font-semibold">Features</h1>
             <ul class="list-decimal mt-2">
              ${featureItem.map(item => `<li>${item.feature_name ? item.feature_name : "not found"}</li>`)
        }
             </ul>
            </div>
            <div class="pl-4 pb-8">
            <h1 class="text-2xl font-semibold">Integrations</h1>
              <ol class="list-decimal mt-2 ml-3">
              ${integrations ? (integrations.map(inteData =>`<li>${inteData}</li>`))
            : "no data found"
        }
              </ol>
            </div>
             </div>
        </div>
     </div>
     <div class="card w-full bg-base-100 shadow-xl max-sm:mx-auto">
     <figure class="px-10 pt-10 relative">
     <p class="absolute right-0 top-0 mt-11 mr-11">
      <button class="px-6 rounded bg-red-600 text-white py-1">
      ${accuracy.score ? (accuracy.score * 100) + '% accuracy' : "0 accuracy"}
      </button>
     </p>
     <img src="${image_link[0]}" alt="" class="rounded-xl" />
     </figure>
        <div class="card-body justify-center items-center">
         <h1 class="font-semibold text-2xl text-center">${input_output_examples ? input_output_examples[0].input : "not found"}</h1>
         <p class="text-center">${input_output_examples ? input_output_examples[0].output : "not found"}
        </div>
     </div>
    </div>
      `
}
const callData = () => {
    fetchData(6)
}
callData()
// show all data
const showAllData = () => {
    fetchData()
}
// sort by date
const sortingAllData =  () => {
   const arrayOFobject = sortData;
      arrayOFobject.sort(sortFunction);
      displayData(arrayOFobject);
 }

  function sortFunction(a,b){  
    let dateA = new Date(a.published_in).getTime();
    let dateB = new Date(b.published_in).getTime();
    return dateA > dateB ? 1 : -1;  
  }; 
