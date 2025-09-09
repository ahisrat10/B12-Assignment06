const loadAllCategories = async () => {
  const url = "https://openapi.programming-hero.com/api/categories";
  const res = await fetch(url);
  const data = await res.json();
  showAllCategories(data.categories);
};

const showAllCategories = async (data) => {
  const categoriesList = document.getElementById("categories-list");
  categoriesList.innerHTML = `<p id="category-0" class="text-white bg-[#15803D] rounded-sm p-2">All Trees</p>`;
  data.forEach((element) => {
    categoriesList.innerHTML += `
      <p id="category-${element.id}" 
      class="d-sm p-2">
      ${element.category_name}
      </p>
    `;
  });
};

loadAllCategories();

const loadAllPlants = async () => {
  const url = "https://openapi.programming-hero.com/api/plants";
  const res = await fetch(url);
  const data = await res.json();
  showAllPlants(data.plants);
};

showAllPlants = (data) => {
  const singlePlantCard = document.getElementById("single-plant-card");
  singlePlantCard.innerHTML = "";

  data.forEach((element) => {
    singlePlantCard.innerHTML += `
      <div class="card bg-base-100 shadow-sm">
                            <figure>
                                <img src="${element.image}" alt=""
                                    class="w-[316px] h-[180px] object-cover rounded-sm" />
                            </figure>
                            <div class="card-body gap-2">
                                <h2 class="card-title">${element.name}</h2>
                                <p class="text-[#00000080] overflow-hidden h-10">${element.description}</p>
                                <div class="flex items-center justify-between">
                                    <div class="badge bg-[#DCFCE7] text-[#15803D] py-2 px-3 ">${element.category}</div>
                                    <div>
                                        <p class="font-bold">৳${element.price}</p>
                                    </div>
                                </div>
                                <div class="card-actions justify-end">
                                    <button id="plant-id-${element.id}"
                                        class="btn bg-[#15803D] text-white w-full rounded-full mt-4 hover:bg-[#3C8A5A]">Add to
                                        Cart</button>
                                </div>
                            </div>
                        </div>
    `;
  });
};

loadAllPlants();