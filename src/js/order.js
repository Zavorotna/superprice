// document.addEventListener("DOMContentLoaded", function () {
//     const getBaseUrl = () => {
//         const path = window.location.pathname;
//         if (path.includes('order')) {
//             return '../'
//         } else if (path.includes('cabinet')) {
//             return './'
//         }
//         return './'
//     };

//     function fetchCities(districtId, regionId, searchText) {
//         // console.log(regionId);
//         let baseUrl = getBaseUrl(),
//             url = `${baseUrl}get-ukr-poshta-cities?region_id=${regionId}&district_id=${districtId}`;
//         fetch(url, {
//                 method: 'GET',
//                 headers: {
//                     'accept': 'application/json',
//                     'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
//                 }
//             })
//             .then(response => response.json())
//             .then(data => {
//                 UkrPoshtaCityList.innerHTML = '';
//                 VillageList.innerHTML = '';
//                 data.forEach(city => {
//                     if (type === 'City') {
//                         if (city.description.toLowerCase().startsWith(searchText) && city.settlement_type.toLowerCase().includes('місто')) {
//                             const listItem = document.createElement('li');
//                             listItem.textContent = city.settlement_type + ' ' + city.description;
//                             listItem.setAttribute('data-value', city.settlement_id);
//                             listItem.classList.add('py-2', 'px-3', 'hover:bg-gray-100', 'cursor-pointer');
//                             listItem.addEventListener('click', function () {
//                                 UkrPoshtaCityInput.value = city.description;
//                                 CityName.value = city.description;
//                                 CityRefHidden.value = city.settlement_id;
//                                 UkrPoshtaCityList.classList.add('d-none');
//                                 UkrPoshtaBranchesInput.value = '';
//                                 UkrPoshtaBranchesList.innerHTML = '';
//                             });
//                             UkrPoshtaCityList.appendChild(listItem);
//                         }
//                     } else {
//                         if (city.description.toLowerCase().startsWith(searchText) && !city.settlement_type.toLowerCase().includes('місто')) {
//                             const listItem = document.createElement('li');
//                             listItem.textContent = city.settlement_type + ' ' + city.description;
//                             listItem.setAttribute('data-value', city.settlement_id);
//                             listItem.classList.add('py-2', 'px-3', 'hover:bg-gray-100', 'cursor-pointer');
//                             listItem.addEventListener('click', function () {
//                                 VillageInput.value = city.settlement_type + ' ' + city.description;
//                                 VillageRef.value = city.settlement_id;
//                                 VillageList.classList.add('d-none');
//                                 UkrPoshtaBranchesInput.value = '';
//                                 UkrPoshtaBranchesList.innerHTML = '';
//                             });
//                             VillageList.appendChild(listItem);
//                         }
//                     }
//                 });
//                 if (UkrPoshtaCityList.children.length > 0) {
//                     UkrPoshtaCityList.classList.remove('d-none');
//                 } else {
//                     VillageList.classList.remove('d-none');
//                 }
//             })
//             .catch(error => console.error('Error:', error));
//     }

//     function fetchBranches(cityId, searchText) {
//         let baseUrl = getBaseUrl(),
//             url = `${baseUrl}get-ukr-poshta-branches?cityId=${cityId}`;
//         fetch(url, {
//                 method: 'GET',
//                 headers: {
//                     'accept': 'application/json',
//                     'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
//                 }
//             })
//             .then(response => response.json())
//             .then(data => {
//                 UkrPoshtaBranchesList.innerHTML = '';
//                 // console.log(data);
//                 data.forEach(branch => {
//                     const listItem = document.createElement('li');
//                     if (branch.POSTOFFICE_UA.toLowerCase().includes(searchText.toLowerCase()) || branch.STREET_UA_VPZ.toLowerCase().includes(searchText.toLowerCase())) {
//                         listItem.textContent = branch.POSTOFFICE_UA + (branch.STREET_UA_VPZ ? ' ' + branch.STREET_UA_VPZ : '');
//                         listItem.setAttribute('data-value', branch.POSTOFFICE_UA);
//                         listItem.classList.add('py-2', 'px-3', 'hover:bg-gray-100', 'cursor-pointer');
//                         listItem.addEventListener('click', function () {
//                             UkrPoshtaBranchesInput.value = branch.POSTOFFICE_UA + (branch.STREET_UA_VPZ ? ' ' + branch.STREET_UA_VPZ : '');
//                             BranchRefHidden.value = branch.POSTOFFICE_ID;
//                             UkrPoshtaBranchesList.classList.add('d-none');
//                         });
//                         UkrPoshtaBranchesList.appendChild(listItem);
//                     }
//                 });
//                 if (UkrPoshtaBranchesList.children.length > 0) {
//                     UkrPoshtaBranchesList.classList.remove('d-none');
//                 }
//             })
//             .catch(error => console.error('Error:', error));
//     }

//     function fetchDistricts(regionId, searchText) {
//         // console.log(regionId);
//         let baseUrl = getBaseUrl(),
//             url = `${baseUrl}get-ukr-poshta-districts?regionId=${regionId}`;
//         fetch(url, {
//                 method: 'GET',
//                 headers: {
//                     'accept': 'application/json',
//                     'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
//                 }
//             })
//             .then(response => response.json())
//             .then(data => {
//                 DistrictList.innerHTML = '';
//                 data.forEach(district => {
//                     const listItem = document.createElement('li');
//                     if (district.description.toLowerCase().includes(searchText.toLowerCase())) {
//                         listItem.textContent = district.description;
//                         listItem.setAttribute('data-value', district.district_id);
//                         listItem.classList.add('py-2', 'px-3', 'hover:bg-gray-100', 'cursor-pointer');
//                         listItem.addEventListener('click', function () {
//                             DistrictInput.value = this.textContent;
//                             DistrictRef.value = district.district_id;
//                             DistrictList.classList.add('d-none');
//                             VillageInput.value = '';
//                             VillageList.innerHTML = '';
//                         });
//                         DistrictList.appendChild(listItem);
//                     }
//                 });
//                 if (DistrictList.children.length > 0) {
//                     DistrictList.classList.remove('d-none');
//                 }
//             })
//             .catch(error => console.error('Error:', error));
//     }

//     function fetchStreets(cityId, searchText) {
//         let baseUrl = getBaseUrl(),
//             url = `${baseUrl}get-ukr-poshta-streets?cityId=${cityId}`;
//         fetch(url, {
//                 method: 'GET',
//                 headers: {
//                     'accept': 'application/json',
//                     'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
//                 }
//             })
//             .then(response => response.json())
//             .then(data => {
//                 StreetList.innerHTML = '';
//                 data.forEach(street => {
//                     const listItem = document.createElement('li');
//                     if (street.STREET_UA.toLowerCase().includes(searchText.toLowerCase())) {
//                         listItem.textContent = street.SHORTSTREETTYPE_UA + ' ' + street.STREET_UA;
//                         listItem.setAttribute('data-value', street.DISTRICT_ID);
//                         listItem.classList.add('py-2', 'px-3', 'hover:bg-gray-100', 'cursor-pointer');
//                         listItem.addEventListener('click', function () {
//                             StreetInput.value = this.textContent;
//                             StreetRef.value = street.STREET_ID;
//                             StreetList.classList.add('d-none');
//                             House.value = '';
//                             Flat.value = '';
//                         });
//                         StreetList.appendChild(listItem);
//                     }
//                 });
//                 if (StreetList.children.length > 0) {
//                     StreetList.classList.remove('d-none');
//                 }
//             })
//             .catch(error => console.error('Error:', error));
//     }

//     function MeestFetchCities(regionId, searchText) {
//         let baseUrl = getBaseUrl(),
//             url = `${baseUrl}meest/cities`;
//         fetch(url, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
//                 },
//                 body: JSON.stringify({
//                     regionId: regionId
//                 })
//             })
//             .then(response => response.json())
//             .then(data => {
//                 MeestCityList.innerHTML = '';
//                 data.forEach(city => {
//                     if (city.description.toLowerCase().includes(searchText)) {
//                         const listItem = document.createElement('li');
//                         listItem.textContent = city.description + ' ' + city.city_type.toLowerCase();
//                         listItem.setAttribute('data-value', city.city_id);
//                         listItem.classList.add('py-2', 'px-3', 'hover:bg-gray-100', 'cursor-pointer');
//                         listItem.addEventListener('click', function () {
//                             MeestCityInput.value = city.description;
//                             CityRefHidden.value = city.city_id;
//                             MeestCityList.classList.add('d-none');
//                             MeestBranchesInput.value = '';
//                             MeestBranchesList.innerHTML = '';
//                         });
//                         MeestCityList.appendChild(listItem);
//                     }
//                 });
//                 if (MeestCityList.children.length > 0) {
//                     MeestCityList.classList.remove('d-none');
//                 }
//             })
//             .catch(error => console.error('Error:', error));
//     }

//     function MeestFetchBranches(cityId, searchText) {
//         let baseUrl = getBaseUrl(),
//             url = `${baseUrl}meest/branches`;
//         fetch(url, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
//                 },
//                 body: JSON.stringify({
//                     cityId: cityId
//                 })
//             })
//             .then(response => response.json())
//             .then(data => {
//                 MeestBranchesList.innerHTML = '';
//                 data.forEach(branch => {
//                     const listItem = document.createElement('li');
//                     if (branch.branch_type.toLowerCase().includes(searchText) || branch.address.toLowerCase().includes(searchText)) {
//                         listItem.textContent = branch.branch_type + ' ' + branch.address;
//                         listItem.setAttribute('data-value', branch.branch_id);
//                         listItem.classList.add('py-2', 'px-3', 'hover:bg-gray-100', 'cursor-pointer');
//                         listItem.addEventListener('click', function () {
//                             MeestBranchesInput.value = branch.branch_type + ' ' + branch.address;
//                             BranchRefHidden.value = branch.branch_id;
//                             MeestBranchesList.classList.add('d-none');
//                         });
//                         MeestBranchesList.appendChild(listItem);
//                     }
//                 });
//                 if (MeestBranchesList.children.length > 0) {
//                     MeestBranchesList.classList.remove('d-none');
//                 }
//             })
//             .catch(error => console.error('Error:', error));
//     }

//     function NovaPoshtaFetchCities(regionRef, searchText) {
//         // console.log("region NP");
//         let baseUrl = getBaseUrl(),
//             url = `${baseUrl}get-nova-poshta-cities`;
//         fetch(url, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
//                 },
//                 body: JSON.stringify({
//                     region_ref: regionRef,
//                     findByString: searchText
//                 })
//             })
//             .then(response => response.json())
//             .then(data => {
//                 NovaPoshtaCityList.innerHTML = '';
//                 data.forEach(city => {
//                     // console.log(city)
//                     if (type === 'City') {
//                         if (city.description.toLowerCase().includes(searchText) && city.settlement_type_description.toLowerCase().includes('місто')) {
//                             const listItem = document.createElement('li');
//                             listItem.textContent = city.settlement_type_description + ' ' + city.description;
//                             listItem.setAttribute('data-value', city.ref);
//                             listItem.classList.add('py-2', 'px-3', 'hover:bg-gray-100', 'cursor-pointer');
//                             listItem.addEventListener('click', function () {
//                                 NovaPoshtaCityInput.value = city.description;
//                                 CityName.value = city.description
//                                 CityRefHidden.value = city.ref;
//                                 NovaPoshtaCityList.classList.add('d-none');
//                                 MeestBranchesInput.value = '';
//                                 NovaPoshtaBranchesList.innerHTML = '';
//                             });
//                             NovaPoshtaCityList.appendChild(listItem);
//                         }
//                     }
//                 });
//                 if (NovaPoshtaCityList.children.length > 0) {
//                     NovaPoshtaCityList.classList.remove('d-none');
//                 }
//             })
//             .catch(error => console.error('Error:', error));
//     }

//     function NovaPoshtaFetchBranches(cityRef, searchText, settlementType) {
//         // console.log("np city");
//         let baseUrl = getBaseUrl(),
//             url = `${baseUrl}get-nova-poshta-branches`;
//         const categoryOfWarehouse = document.getElementById('categoryOfWarehouse').value;
//         fetch(url, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
//                 },
//                 body: JSON.stringify({
//                     city_ref: cityRef,
//                     search: searchText,
//                     settlementType: settlementType
//                 })
//             })
//             .then(response => response.json())
//             .then(data => {
//                 NovaPoshtaBranchesList.innerHTML = '';
//                 data.forEach(branch => {
//                     if (categoryOfWarehouse === 'Postomat' && branch.type_of_warehouse.toLowerCase().includes('f9316480-5f2d-425d-bc2c-ac7cd29decf0')) {
//                         if (branch.description.toLowerCase().includes(searchText)) {
//                             const listItem = document.createElement('li');
//                             listItem.textContent = branch.description;
//                             listItem.setAttribute('data-value', branch.ref);
//                             listItem.classList.add('py-2', 'px-3', 'hover:bg-gray-100', 'cursor-pointer');
//                             listItem.addEventListener('click', function () {
//                                 NovaPoshtaBranchesInput.value = this.textContent;
//                                 BranchRefHidden.value = branch.ref;
//                                 BranchNumber.value = branch.number;
//                                 NovaPoshtaBranchesList.classList.add('d-none');
//                             });
//                             NovaPoshtaBranchesList.appendChild(listItem);
//                         }
//                     } else if (categoryOfWarehouse === 'Branch' && !branch.type_of_warehouse.toLowerCase().includes('f9316480-5f2d-425d-bc2c-ac7cd29decf0')) {
//                         if (branch.description.toLowerCase().includes(searchText)) {
//                             const listItem = document.createElement('li');
//                             listItem.textContent = branch.description;
//                             listItem.setAttribute('data-value', branch.ref);
//                             listItem.classList.add('py-2', 'px-3', 'hover:bg-gray-100', 'cursor-pointer');
//                             listItem.addEventListener('click', function () {
//                                 NovaPoshtaBranchesInput.value = this.textContent;
//                                 BranchRefHidden.value = branch.ref;
//                                 BranchNumber.value = branch.number;
//                                 NovaPoshtaBranchesList.classList.add('d-none');
//                             });
//                             NovaPoshtaBranchesList.appendChild(listItem);
//                         }
//                     }
//                 });
//                 if (NovaPoshtaBranchesList.children.length > 0) {
//                     NovaPoshtaBranchesList.classList.remove('d-none');
//                 }
//             })
//             .catch(error => console.error('Error:', error));
//     }

//     function NovaPoshtaFetchStreets(CityName, searchText) {
//         let baseUrl = getBaseUrl(),
//             url = `${baseUrl}get-nova-poshta-streets`;
//         fetch(url, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
//                 },
//                 body: JSON.stringify({
//                     city_name: CityName,
//                     search: searchText
//                 })
//             })
//             .then(response => response.json())
//             .then(data => {
//                 StreetList.innerHTML = '';
//                 data.forEach(street => {
//                     if (street.Description.toLowerCase().includes(searchText) || street.StreetsType.toLowerCase().includes(searchText) || (street.StreetsType + ' ' + street.Description).toLowerCase().includes(searchText)) {
//                         const listItem = document.createElement('li');
//                         listItem.textContent = street.StreetsType + ' ' + street.Description;
//                         listItem.setAttribute('data-value', street.Ref);
//                         listItem.classList.add('py-2', 'px-3', 'hover:bg-gray-100', 'cursor-pointer');
//                         listItem.addEventListener('click', function () {
//                             StreetInput.value = this.textContent;
//                             StreetRef.value = street.Ref;
//                             StreetList.classList.add('d-none');
//                         });
//                         StreetList.appendChild(listItem);
//                     }
//                 });
//                 if (StreetList.children.length > 0) {
//                     StreetList.classList.remove('d-none');
//                 }
//             })
//             .catch(error => console.error('Error:', error));
//     }

//     function NovaPoshtaFetchDiscticts(regionRef, searchText) {
//         // console.log(regionRef);
//         let baseUrl = getBaseUrl(),
//             url = `${baseUrl}get-nova-poshta-settlement-districts`;
//         fetch(url, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
//                 },
//                 body: JSON.stringify({
//                     region_ref: regionRef,
//                     search: searchText
//                 })
//             })
//             .then(response => response.json())
//             .then(data => {
//                 DistrictList.innerHTML = '';
//                 data.forEach(district => {
//                     if (district.description.toLowerCase().includes(searchText)) {
//                         const listItem = document.createElement('li');
//                         listItem.textContent = district.description + ' район';
//                         listItem.setAttribute('data-value', district.ref);
//                         listItem.classList.add('py-2', 'px-3', 'hover:bg-gray-100', 'cursor-pointer');
//                         listItem.addEventListener('click', function () {
//                             DistrictInput.value = this.textContent;
//                             DistrictRef.value = district.ref;
//                             DistrictList.classList.add('d-none');
//                         });
//                         DistrictList.appendChild(listItem);
//                     }
//                 });
//                 if (DistrictList.children.length > 0) {
//                     DistrictList.classList.remove('d-none');
//                 }
//             })
//             .catch(error => console.error('Error:', error));
//     }

//     function NovaPoshtaFetchVillages(districtRef, searchText) {
//         // console.log(districtRef);
//         let baseUrl = getBaseUrl(),
//             url = `${baseUrl}get-nova-poshta-settlement-villages`;
//         fetch(url, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
//                 },
//                 body: JSON.stringify({
//                     district_ref: districtRef,
//                     search: searchText
//                 })
//             })
//             .then(response => response.json())
//             .then(data => {
//                 VillageList.innerHTML = '';
//                 data.forEach(village => {
//                     if ((village.description.toLowerCase().includes(searchText) || village.settlement_type_description.toLowerCase().includes(searchText) || (village.settlement_type_description + ' ' + village.description).toLowerCase().includes(searchText)) && !village.settlement_type_description.toLowerCase().includes('місто')) {
//                         const listItem = document.createElement('li');
//                         listItem.textContent = village.settlement_type_description + ' ' + village.description;
//                         listItem.setAttribute('data-value', village.ref);
//                         listItem.classList.add('py-2', 'px-3', 'hover:bg-gray-100', 'cursor-pointer');
//                         listItem.addEventListener('click', function () {
//                             CityName.value = village.description
//                             VillageInput.value = this.textContent;
//                             VillageRef.value = village.ref;
//                             VillageList.classList.add('d-none');
//                         });
//                         VillageList.appendChild(listItem);
//                     }
//                 });
//                 if (VillageList.children.length > 0) {
//                     VillageList.classList.remove('d-none');
//                 }
//             })
//             .catch(error => console.error('Error:', error));
//     }

//     function removeNP() {
//         NovaPoshtaRegionSelect.removeAttribute("required")
//         NovaPoshtaBranchesInput.removeAttribute("required")
//         DistrictInput.removeAttribute("required")
//         NovaPoshtaCityInput.removeAttribute("required")
//         VillageInput.removeAttribute("required")
//         StreetInput.removeAttribute("required")
//         House.removeAttribute("required")
//     }

//     function removeMeest() {
//         MeestRegionSelect.removeAttribute("required")
//         MeestCityInput.removeAttribute("required")
//         MeestBranchesInput.removeAttribute("required")
//         House.removeAttribute("required")
//         StreetInput.removeAttribute("required")
//     }

//     function removeUP() {
//         DistrictInput.removeAttribute("required")
//         VillageInput.removeAttribute("required")
//         UkrPoshtaCityInput.removeAttribute("required")
//         UkrPoshtaRegionSelect.removeAttribute("required")
//         UkrPoshtaBranchesInput.removeAttribute("required")
//         StreetInput.removeAttribute("required")
//         House.removeAttribute("required")
//     }

//     function showForm(radioElement) {
//         hideAllForms()
//         resetRadioButtons()
//         resetDeliveryLocation()
//         radioElement.style.display = "flex"
//         radioElement.querySelectorAll("input").forEach(radioItem => {
//             radioItem.addEventListener("change", function () {
//                 removeMeest()
//                 removeNP()
//                 removeUP()
//                 formContainer.style.display = "none"
//                 deliveryContainerCityVilage.style.display = "flex"
//                 deliveryContainerCityVilage.querySelectorAll("input").forEach(itemDelivery => {
//                     // removeMeest()
//                     // removeNP()
//                     // removeUP()
//                     itemDelivery.style.display = "block"
//                     itemDelivery.setAttribute("required", true)
//                     itemDelivery.addEventListener("input", function () {
//                         if (radioElement == radioNovaPoshta) {
//                             formContainer.style.display = "block"
//                         } else {
//                             formContainer.style.display = "grid"
//                         }
//                     })
//                     document.querySelectorAll('input[name="delivery_location_type"]').forEach(radio => radio.checked = false)
//                 })
//             })

//         })
//     }

//     const ukrPoshta = document.querySelector('#ukrPoshta'),
//         novaPoshta = document.querySelector('#novaPoshta'),
//         meest = document.querySelector('#meest'),
//         radioNovaPoshta = document.querySelector("#novaPost"),
//         radioUkrPoshta = document.querySelector("#ukrPostRadio"),
//         radioMeest = document.querySelector("#meestPostRadioBtn"),
//         deliveryContainerCityVilage = document.querySelector("#delivery_location_type_container"),
//         formContainer = document.querySelector(".form-order-container")

//     const hideAllForms = () => {
//         [radioMeest, radioUkrPoshta, radioNovaPoshta, deliveryContainerCityVilage, formContainer].forEach(el => el.style.display = "none")
//     }

//     const resetRadioButtons = () => {
//         // console.log("скидає пошту в старому коді");
//         document.querySelectorAll('input[name="delivery_type"]').forEach(radio => radio.checked = false)
//         document.querySelectorAll('input[name="delivery_type"]').forEach(radio => radio.required = false)
//         document.querySelectorAll('input[name="delivery_type"]').forEach(radio => radio.name = false)

//     }
//     const resetDeliveryLocation = () => {
//         document.querySelectorAll('input[name="delivery_location_type"]').forEach(radio => radio.required = false)
//         document.querySelectorAll('input[name="delivery_location_type"]').forEach(radio => radio.checked = false)

//     }

//     hideAllForms()

//     ukrPoshta.addEventListener("change", function () {
//         showForm(radioUkrPoshta)
//         radioUkrPoshta.querySelectorAll("input").forEach(ukrItem => {
//             ukrItem.setAttribute("required", true)
//             ukrItem.setAttribute("name", "delivery_type")
//         })
//     })

//     novaPoshta.addEventListener("change", function () {
//         showForm(radioNovaPoshta)
//         radioNovaPoshta.querySelectorAll("input").forEach(novaItem => {
//             novaItem.setAttribute("required", true)
//             novaItem.setAttribute("name", "delivery_type")
//         })

//         const poshtomat = document.querySelector("#poshtomat")
//         poshtomat.addEventListener("click", function () {
//             deliveryContainerCityVilage.querySelector(".village-block").style.display = "none"
//             deliveryContainerCityVilage.querySelector(".village-block").removeAttribute("name")
//         })

//         radioNovaPoshta.querySelectorAll("input[name='delivery_type']").forEach(radioItem => {
//             radioItem.addEventListener("change", function () {
//                 if (radioItem.id !== "poshtomat") {
//                     deliveryContainerCityVilage.querySelector(".village-block").style.display = "flex"
//                     deliveryContainerCityVilage.querySelector(".village-block").setAttribute("required", true)
//                 }
//             })
//         })
//     })

//     meest.addEventListener("change", function () {
//         removeMeest()
//         removeNP()
//         removeUP()
//         hideAllForms()
//         resetRadioButtons()
//         radioMeest.style.display = "flex"
//         radioMeest.querySelectorAll("input").forEach(radioItem => {
//             radioItem.setAttribute("name", "delivery_type")
//             radioItem.setAttribute("required", true)
//             radioItem.addEventListener("change", function () {
//                 removeMeest()
//                 removeNP()
//                 removeUP()
//                 let selectedDeliveryType = event.target.value,
//                     poshtaAndDelivery = selectedDeliveryType.split("_"),
//                     poshta = poshtaAndDelivery[0],
//                     delivery = poshtaAndDelivery[1],
//                     type = "City"
//                 updateFormVisibility(poshta, delivery, type)
//                 deliveryContainerCityVilage.querySelectorAll("input").forEach(itemDelivery => {
//                     resetDeliveryLocation()
//                     itemDelivery.style.display = "none"
//                 })
//                 formContainer.style.display = "block"
//             })
//         })
//     })

//     if (document.querySelector('.cabinet-top-prodaz')) {
//         const topProdazMain = document.querySelector('.top-prodaz-main.cabinet-top-prodaz'),
//             descriptionAboutUs = document.querySelector('.cabinet-cart-product'),
//             originalParent = topProdazMain.parentElement,
//             originalNextSibling = topProdazMain.nextElementSibling

//         function moveTopProdazMain() {
//             if (window.innerWidth <= 1024) {
//                 if (topProdazMain && topProdazMain.parentElement !== descriptionAboutUs) {
//                     descriptionAboutUs.appendChild(topProdazMain)
//                 }
//             } else {
//                 originalParent.appendChild(topProdazMain)
//             }
//         }

//         moveTopProdazMain()
//         window.addEventListener('resize', moveTopProdazMain)

//     }
//     if (document.querySelector('#userPhone')) {
//         const phoneInput = document.querySelector('#userPhone')

//         phoneInput.addEventListener('input', function () {
//             let phoneNumber = phoneInput.value.trim()
//             const mask = "+380"

//             if (!phoneNumber.startsWith(mask)) {
//                 phoneNumber = mask + phoneNumber
//             }

//             let cleanedValue = phoneNumber.replace(/[^\d+]/g, "")

//             if (cleanedValue.length > 13) {
//                 cleanedValue = cleanedValue.slice(0, 13)
//             }

//             const validInput = isValidPhoneNumber(cleanedValue)

//             if (validInput && cleanedValue.length === 13) {
//                 phoneInput.style.borderColor = 'green'
//             } else {
//                 phoneInput.style.borderColor = 'red'
//             }
//         })
//     }


//     function isValidPhoneNumber(phoneNumber) {
//         return /^\+?(\d{2})?([(]?\d{3}[)]?)\s?[-]?\s?(?:\d{3})\s?[-]?(?:\s?\d{2})\s?[-]?(?:\s?\d{2})$/.test(phoneNumber)
//     }

//     const inputMasks = document.querySelectorAll(".inputMask")

//     inputMasks.forEach(function (inputMask) {
//         inputMask.addEventListener("click", function () {
//             if (!inputMask.value) {
//                 inputMask.value = "+380"
//             }
//         })

//         inputMask.addEventListener("input", function () {
//             let inputValue = inputMask.value
//             let cleanedValue = inputValue.replace(/[^\d+]/g, "")

//             inputMask.value = cleanedValue

//             if (cleanedValue.length > 13) {
//                 inputMask.value = cleanedValue.slice(0, 13)
//             }

//             if (!cleanedValue.startsWith("+380")) {
//                 inputMask.value = "+380" + cleanedValue.slice(3)
//             }
//         })
//     })

//     const RegistrationCheckbox = document.getElementById('registration');
//     const PasswordFields = document.getElementById('password_fields');
//     const PhoneInput = document.getElementById('user_phone');

//     if (RegistrationCheckbox) {
//         RegistrationCheckbox.addEventListener('change', function () {
//             if (this.checked) {
//                 PasswordFields.classList.remove('d-none');
//             } else {
//                 PasswordFields.classList.add('d-none');
//             }
//         });
//     }


//     const Region = document.getElementById('region');
//     const CityName = document.getElementById('city_name');
//     const BranchNumber = document.getElementById('branch_number');
//     const CityRefHidden = document.getElementById('city_ref');
//     const BranchRefHidden = document.getElementById('branch_ref');
//     const MeestContainer = document.getElementById('meest_container');
//     const MeestBranchesContainer = document.getElementById('meest_branch_div');
//     const MeestRegionSelect = document.getElementById('meest_region_ref');
//     const MeestCityInput = document.getElementById('meest_city_input');
//     const MeestBranchesInput = document.getElementById('meest_branches_input');
//     const MeestCityList = document.getElementById('meest_city_list');
//     const MeestBranchesList = document.getElementById('meest_branches_list');
//     const MeestCityhDiv = document.getElementById('meest_city_div');
//     const MeestCityBranchDiv = document.getElementById('meest_branch_div');
//     const NovaPoshtaContainer = document.getElementById('nova_poshta_container');
//     const NovaPoshtaRegionSelect = document.getElementById('nova_poshta_region_ref');
//     const NovaPoshtaBranchDiv = document.getElementById('nova_poshta_branch_div');
//     const NovaPoshtaCityDiv = document.getElementById('nova_poshta_city_div');
//     const NovaPoshtaCityInput = document.getElementById('nova_poshta_city_input');
//     const NovaPoshtaBranchesInput = document.getElementById('nova_poshta_branches_input');
//     const NovaPoshtaCityBranchContainer = document.getElementById('nova_postha_city_and_branch');
//     const NovaPoshtaCityList = document.getElementById('nova_poshta_city_list');
//     const NovaPoshtaBranchesList = document.getElementById('nova_poshta_branches_list');
//     const UkrPoshtaBranchDiv = document.getElementById('ukr_poshta_branch_div');
//     const UkrPoshtaCityDiv = document.getElementById('ukr_poshta_city_div');
//     const UkrPoshtaRegionSelect = document.getElementById('ukr_poshta_region_ref');
//     const UkrPoshtaRegionSelectContainer = document.getElementById('ukr_poshta_region_select');
//     const UkrPoshtaCityInput = document.getElementById('ukr_poshta_city_input');
//     const UkrPoshtaBranchesInput = document.getElementById('ukr_poshta_branches_input');
//     const UkrPoshtaCityList = document.getElementById('ukr_poshta_city_list');
//     const UkrPoshtaBranchesList = document.getElementById('ukr_poshta_branches_list');
//     const AddressContainerStreet = document.getElementById('address_container-street');
//     const AddressContainerBuild = document.getElementById('address_container-build');
//     const AddressContainerKv = document.getElementById('address_container-kv');
//     const DeliveryTypeInputs = document.querySelectorAll('input[name="delivery_type"]');
//     const DeliveryLocationTypeRadios = document.querySelectorAll('input[name="delivery_location_type"]');
//     const DeliveryLocationVillage = document.getElementById('delivery_location_village');
//     const DeliveryLocationVillageDistrict = document.getElementById('delivery_location_village-district');
//     const DeliveryLocationVillageRef = document.getElementById('delivery_location_village-ref');
//     const StreetInput = document.getElementById('street_input');
//     const StreetList = document.getElementById('street_list');
//     const StreetRef = document.getElementById('street_ref');
//     const DistrictInput = document.getElementById('district_input');
//     const DistrictList = document.getElementById('district_list');
//     const DistrictRef = document.getElementById('district_ref');
//     const VillageInput = document.getElementById('village_input');
//     const VillageList = document.getElementById('village_list');
//     const VillageRef = document.getElementById('village_ref');
//     const House = document.getElementById('house');
//     const Flat = document.getElementById('flat');

//     NovaPoshtaRegionSelect.addEventListener('change', function () {
//         NovaPoshtaCityInput.value = '';
//         CityRefHidden.value = '';
//         BranchRefHidden.value = '';
//         NovaPoshtaBranchesInput.value = '';
//         NovaPoshtaCityList.innerHTML = '';
//         NovaPoshtaBranchesList.innerHTML = '';
//         StreetInput.value = '';
//         StreetList.value = '';
//         StreetRef.value = '';
//         DistrictInput.value = '';
//         DistrictList.value = '';
//         DistrictRef.value = '';
//         VillageInput.value = '';
//         VillageList.value = '';
//         VillageRef.value = '';
//         CityName.value = '';
//         House.value = '';
//         Flat.value = '';
//     });
//     MeestRegionSelect.addEventListener('change', function () {
//         MeestCityInput.value = '';
//         MeestBranchesInput.value = '';
//         MeestCityList.innerHTML = '';
//         MeestBranchesList.innerHTML = '';
//     });
//     UkrPoshtaRegionSelect.addEventListener('change', function () {
//         UkrPoshtaCityInput.value = '';
//         UkrPoshtaBranchesInput.value = '';
//         UkrPoshtaCityList.innerHTML = '';
//         UkrPoshtaBranchesList.innerHTML = '';
//         StreetInput.value = '';
//         StreetList.value = '';
//         StreetRef.value = '';
//         DistrictInput.value = '';
//         DistrictList.value = '';
//         DistrictRef.value = '';
//         VillageInput.value = '';
//         VillageList.value = '';
//         VillageRef.value = '';
//         CityName.value = '';
//         House.value = '';
//         Flat.value = '';
//     })

//     document.addEventListener('click', function (event) {
//         const isClickInsideDistrictList = DistrictList.contains(event.target) || event.target === DistrictInput;
//         const isClickInsideVillageList = VillageList.contains(event.target) || event.target === VillageInput;
//         const isClickInsideStreetList = StreetList.contains(event.target) || event.target === StreetInput;

//         if (!isClickInsideDistrictList) {
//             DistrictList.classList.add('d-none');
//         }

//         if (!isClickInsideVillageList) {
//             VillageList.classList.add('d-none');
//         }

//         if (!isClickInsideStreetList) {
//             StreetList.classList.add('d-none');
//         }
//     });
//     let type

//     function setType() {
//         DeliveryLocationTypeRadios.forEach(radio => {
//             if (radio.checked) {
//                 if (radio.value === 'City') {
//                     type = radio.value;
//                     CityRefHidden.value = '';
//                     CityName.value = '';
//                     BranchRefHidden.value = '';
//                     BranchNumber.value = '';
//                     NovaPoshtaBranchesInput.value = '';
//                     NovaPoshtaBranchesList.innerHTML = '';
//                     UkrPoshtaCityInput.value = '';
//                     UkrPoshtaCityList.innerHTML = '';
//                     UkrPoshtaBranchesInput.value = '';
//                     UkrPoshtaBranchesList.innerHTML = '';
//                     DistrictInput.value = '';
//                     DistrictList.value = '';
//                     DistrictRef.value = '';
//                     VillageInput.value = '';
//                     VillageList.value = '';
//                     VillageRef.value = '';
//                     StreetInput.value = '';
//                     StreetList.value = '';
//                     StreetRef.value = '';
//                     House.value = '';
//                     Flat.value = '';
//                 } else if (radio.value === 'Village') {
//                     type = radio.value;
//                     CityRefHidden.value = '';
//                     CityName.value = '';
//                     NovaPoshtaCityInput.value = '';
//                     NovaPoshtaCityList.innerHTML = '';
//                     BranchRefHidden.value = '';
//                     BranchNumber.value = '';
//                     NovaPoshtaBranchesInput.value = '';
//                     NovaPoshtaBranchesList.innerHTML = '';
//                     UkrPoshtaCityInput.value = '';
//                     UkrPoshtaCityList.innerHTML = '';
//                     UkrPoshtaBranchesInput.value = '';
//                     UkrPoshtaBranchesList.innerHTML = '';
//                     DistrictInput.value = '';
//                     DistrictList.value = '';
//                     DistrictRef.value = '';
//                     StreetInput.value = '';
//                     StreetList.value = '';
//                     StreetRef.value = '';
//                     House.value = '';
//                     Flat.value = '';
//                 }
//             }
//         });
//     }

//     let currentInputHandler = null;
//     let currentFocusHandler = null;

//     updateFormVisibility()
//     setType()


//     DeliveryTypeInputs.forEach(input => {
//         // console.log("input");
//         input.removeEventListener('change', handleDeliveryTypeChange);
//         input.addEventListener('change', handleDeliveryTypeChange);
//     });

//     DeliveryLocationTypeRadios.forEach(radio => {
//         // console.log("radio");
//         radio.removeEventListener('change', handleLocationTypeChange);
//         radio.addEventListener('change', handleLocationTypeChange);
//     });

//     function handleDeliveryTypeChange(event) {
//         let selectedDeliveryType = event.target.value,
//             poshtaAndDelivery = selectedDeliveryType.split("_"),
//             poshta = poshtaAndDelivery[0],
//             delivery = poshtaAndDelivery[1],
//             selectedRadio = Array.from(document.querySelectorAll('input[name="delivery_location_type"]')).find(radio => radio.checked)
//         if (selectedRadio) {
//             type = selectedRadio.value
//         }
//         updateFormVisibility(poshta, delivery, type)
//     }

//     function handleLocationTypeChange(event) {
//         let selectedRadio = event.target
//         // console.log(selectedRadio);
//         if (selectedRadio) {
//             type = selectedRadio.value
//         }
//         let selectedDeliveryType = Array.from(document.querySelectorAll('input[name="delivery_type"]')).find(radio => radio.checked)
//         let poshtaAndDelivery = selectedDeliveryType.value.split("_"),
//             poshta = poshtaAndDelivery[0],
//             delivery = poshtaAndDelivery[1]
//         updateFormVisibility(poshta, delivery, type)
//     }

//     function updateFormVisibility(poshta, delivery, type) {
//         // console.log(poshta, type, delivery);
//         const inputCategoryOfWarehouse = document.getElementById('categoryOfWarehouse');

//         if (currentInputHandler) {
//             StreetInput.removeEventListener('input', currentInputHandler);
//         }
//         if (currentFocusHandler) {
//             StreetInput.removeEventListener('focus', currentFocusHandler);
//         }

//         DeliveryLocationTypeRadios.forEach(radio => {
//             if (radio.checked) {
//                 if (type === 'City') {
//                     currentInputHandler = function () {
//                         if (poshta === 'NovaPoshta') {
//                             const searchText = this.value.trim().toLowerCase();
//                             if (CityName.value && searchText.length >= 0) {
//                                 NovaPoshtaFetchStreets(CityName.value, searchText);
//                             } else {
//                                 StreetList.innerHTML = '';
//                                 StreetList.classList.add('d-none');
//                             }
//                         } else if (poshta === 'UkrPoshta') {
//                             let cityId;
//                             if (type === 'City') {
//                                 cityId = CityRefHidden.value;
//                             } else if (type === 'Village') {
//                                 cityId = VillageRef.value;
//                             }
//                             const searchText = this.value.trim().toLowerCase();
//                             if (cityId && searchText.length >= 0) {
//                                 fetchStreets(cityId, searchText);
//                             } else {
//                                 VillageList.innerHTML = '';
//                                 VillageList.classList.add('d-none');
//                             }
//                         }
//                     };

//                     currentFocusHandler = function () {
//                         if (poshta === 'NovaPoshta') {
//                             if (StreetInput.value.trim().length === 0) {
//                                 // console.log(StreetInput.value.trim().length);
//                                 NovaPoshtaFetchStreets(CityName.value, '');
//                             } else if (StreetList.children.length > 0) {
//                                 StreetList.classList.remove('d-none');
//                             }
//                         } else if (poshta === 'UkrPoshta') {
//                             let cityId;
//                             if (type === 'City') {
//                                 cityId = CityRefHidden.value;
//                             } else if (type === 'Village') {
//                                 cityId = VillageRef.value;
//                             }
//                             if (VillageInput.value.trim().length === 0) {
//                                 // console.log(VillageInput.value.trim().length);
//                                 fetchStreets(cityId, '');
//                             } else if (VillageList.children.length > 0) {
//                                 VillageList.classList.remove('d-none');
//                             }
//                         }
//                     };

//                     StreetInput.addEventListener('input', currentInputHandler);
//                     StreetInput.addEventListener('focus', currentFocusHandler);
//                 }
//             }
//         });

//         if (currentInputHandler) {
//             VillageInput.removeEventListener('input', currentInputHandler);
//         }
//         if (currentFocusHandler) {
//             VillageInput.removeEventListener('focus', currentFocusHandler);
//         }

//         DeliveryLocationTypeRadios.forEach(radio => {
//             if (radio.checked) {
//                 if (type === 'Village') {
//                     currentInputHandler = function () {
//                         if (poshta === 'NovaPoshta') {
//                             const districtRef = DistrictRef.value;
//                             const searchText = this.value.trim().toLowerCase();
//                             if (districtRef && searchText.length >= 0) {
//                                 NovaPoshtaFetchVillages(districtRef, searchText);
//                             } else {
//                                 VillageList.innerHTML = '';
//                                 VillageList.classList.add('d-none');
//                             }
//                         } else if (poshta === 'UkrPoshta') {
//                             const districtId = DistrictRef.value;
//                             const searchText = this.value.trim().toLowerCase();
//                             if (districtId && searchText.length >= 0) {
//                                 // console.log(districtId)
//                                 fetchCities(districtId, '', searchText);
//                             } else {
//                                 VillageList.innerHTML = '';
//                                 VillageList.classList.add('d-none');
//                             }
//                         }
//                     };

//                     currentFocusHandler = function () {
//                         if (poshta === 'NovaPoshta') {
//                             const districtRef = DistrictRef.value;
//                             if (VillageInput.value.trim().length === 0) {
//                                 // console.log(VillageInput.value.trim().length);
//                                 NovaPoshtaFetchVillages(districtRef, '');
//                             } else if (VillageList.children.length > 0) {
//                                 VillageList.classList.remove('d-none');
//                             }
//                         } else if (poshta === 'UkrPoshta') {
//                             const districtId = DistrictRef.value;
//                             if (VillageInput.value.trim().length === 0) {
//                                 // console.log(districtId);
//                                 fetchCities(districtId, '', '');
//                             } else if (VillageList.children.length > 0) {
//                                 VillageList.classList.remove('d-none');
//                             }
//                         }
//                     };

//                     VillageInput.addEventListener('input', currentInputHandler);
//                     VillageInput.addEventListener('focus', currentFocusHandler);
//                 }
//             }
//         });
//         if (poshta === 'NovaPoshta') {
//             const showCityElements = () => {
//                 DistrictInput.removeAttribute("required")
//                 VillageInput.removeAttribute("required")
//                 NovaPoshtaRegionSelect.setAttribute("required", true)
//                 NovaPoshtaCityInput.setAttribute("required", true)
//                 NovaPoshtaBranchDiv.style.display = 'grid'
//                 NovaPoshtaCityDiv.style.display = 'grid'
//                 DeliveryLocationVillageDistrict.style.display = 'none'
//                 DeliveryLocationVillageRef.style.display = 'none'
//             }

//             const showVillageElements = () => {
//                 NovaPoshtaCityInput.removeAttribute("required")
//                 NovaPoshtaRegionSelect.setAttribute("required", true)
//                 VillageInput.setAttribute("required", true)
//                 DistrictInput.setAttribute("required", true)
//                 NovaPoshtaBranchDiv.style.display = 'grid'
//                 NovaPoshtaCityDiv.style.display = 'none'
//                 DeliveryLocationVillageDistrict.style.display = 'block'
//                 DeliveryLocationVillageRef.style.display = 'block'
//                 const parentElement = NovaPoshtaBranchDiv.parentNode
//                 parentElement.insertBefore(DeliveryLocationVillageDistrict, NovaPoshtaBranchDiv)
//                 parentElement.insertBefore(DeliveryLocationVillageRef, NovaPoshtaBranchDiv);
//             }

//             NovaPoshtaContainer.classList.remove('d-none')
//             NovaPoshtaContainer.style.display = 'grid'
//             NovaPoshtaCityBranchContainer.style.display = 'grid'
//             MeestContainer.classList.add('d-none')
//             UkrPoshtaCityDiv.classList.add('d-none')
//             UkrPoshtaBranchDiv.classList.add('d-none')
//             UkrPoshtaRegionSelectContainer.classList.add('d-none')
//             NovaPoshtaBranchDiv.style.display = 'grid'
//             AddressContainerStreet.style.display = 'none'
//             AddressContainerBuild.style.display = 'none'
//             AddressContainerKv.style.display = 'none'
//             NovaPoshtaCityDiv.style.display = 'grid'
//             DeliveryLocationVillageDistrict.style.display = 'none'
//             DeliveryLocationVillageRef.style.display = 'none'
//             NovaPoshtaBranchesInput.placeholder = 'Введіть назву відділення'
//             inputCategoryOfWarehouse.value = 'Branch'

//             if (delivery === 'branch') {
//                 NovaPoshtaBranchesInput.setAttribute("required", true)
//                 document.querySelector('#nova_poshta_branch_div label').textContent = 'Відділення Нової Пошти *'
//                 type === 'City' ? showCityElements() : showVillageElements()
//             } else if (delivery === 'postomat') {
//                 document.querySelector("#vilage").removeAttribute("required")
//                 NovaPoshtaBranchesInput.setAttribute("required", true)
//                 AddressContainerStreet.style.display = 'none'
//                 AddressContainerBuild.style.display = 'none'
//                 AddressContainerKv.style.display = 'none'
//                 document.querySelector('#nova_poshta_branch_div label').textContent = 'Поштомат Нової Пошти *'
//                 NovaPoshtaBranchesInput.placeholder = 'Введіть назву поштомата'
//                 inputCategoryOfWarehouse.value = 'Postomat'
//                 NovaPoshtaContainer.style.display = 'grid'
//                 type === 'City' ? showCityElements() : showVillageElements()
//             } else if (delivery === 'courier') {
//                 NovaPoshtaBranchesInput.removeAttribute("required")
//                 House.setAttribute("required", true)
//                 StreetInput.setAttribute("required", true)
//                 NovaPoshtaBranchDiv.style.display = 'none'
//                 AddressContainerStreet.style.display = 'block'
//                 AddressContainerBuild.style.display = 'block'
//                 AddressContainerKv.style.display = 'block'
//                 NovaPoshtaCityBranchContainer.appendChild(AddressContainerStreet)
//                 NovaPoshtaCityBranchContainer.appendChild(AddressContainerBuild)
//                 NovaPoshtaCityBranchContainer.appendChild(AddressContainerKv)
//                 inputCategoryOfWarehouse.value = ''
//                 type === 'City' ? showCityElements() : showVillageElements()
//                 if (type === 'City') {
//                     NovaPoshtaCityInput.setAttribute("required", true)
//                     NovaPoshtaCityDiv.style.display = 'grid'
//                     NovaPoshtaBranchDiv.style.display = "none"
//                     DeliveryLocationVillageDistrict.style.display = 'none'
//                     DeliveryLocationVillageRef.style.display = 'none'
//                 } else if (type === 'Village') {
//                     NovaPoshtaBranchDiv.style.display = "none"
//                     NovaPoshtaCityDiv.style.display = 'none'
//                     DeliveryLocationVillageDistrict.style.display = 'block'
//                     DeliveryLocationVillageRef.style.display = 'block'
//                 }
//             }

//             if (NovaPoshtaRegionSelect && Region) {
//                 // console.log(NovaPoshtaRegionSelect);
//                 NovaPoshtaRegionSelect.addEventListener('change', function () {
//                     Region.value = this.selectedOptions[0].text
//                 })
//             }

//             NovaPoshtaCityInput.addEventListener('input', function () {
//                 const regionRef = NovaPoshtaRegionSelect.value,
//                     searchText = this.value.trim().toLowerCase()

//                 if (regionRef && searchText.length >= 0) {
//                     NovaPoshtaFetchCities(regionRef, searchText)
//                 } else {
//                     NovaPoshtaCityList.innerHTML = ''
//                     NovaPoshtaCityList.classList.add('d-none')
//                 }
//             })

//             NovaPoshtaCityInput.addEventListener('focus', function () {
//                 const regionId = NovaPoshtaRegionSelect.value;

//                 if (regionId && NovaPoshtaCityInput.value.trim().length === 0) {
//                     NovaPoshtaFetchCities(regionId, '');
//                 } else if (NovaPoshtaCityList.children.length > 0) {
//                     NovaPoshtaCityList.classList.remove('d-none');
//                 }
//             });

//             NovaPoshtaBranchesInput.addEventListener('input', function () {
//                 let cityRef,
//                     settlementType
//                 if (type === 'City') {
//                     cityRef = CityRefHidden.value;
//                     settlementType = 'місто';
//                 } else {
//                     cityRef = VillageRef.value;
//                     settlementType = 'село';
//                 }
//                 const searchText = this.value.trim().toLowerCase();
//                 if (cityRef && searchText.length >= 0) {
//                     NovaPoshtaFetchBranches(cityRef, searchText, settlementType);
//                 } else {
//                     NovaPoshtaBranchesList.innerHTML = '';
//                     NovaPoshtaBranchesList.classList.add('d-none');
//                 }
//             });

//             NovaPoshtaBranchesInput.addEventListener('focus', function () {
//                 let cityRef,
//                     settlementType
//                 if (type === 'City') {
//                     cityRef = CityRefHidden.value;
//                     settlementType = 'місто';
//                 } else {
//                     cityRef = VillageRef.value;
//                     settlementType = 'село';
//                 }
//                 if (NovaPoshtaBranchesInput.value.trim().length === 0) {
//                     NovaPoshtaFetchBranches(cityRef, '', settlementType);
//                 } else if (NovaPoshtaBranchesList.children.length > 0) {
//                     NovaPoshtaBranchesList.classList.remove('d-none');
//                 }
//             });

//             DistrictInput.addEventListener('input', function () {
//                 const regionRef = NovaPoshtaRegionSelect.value,
//                     searchText = this.value.trim().toLowerCase()

//                 if (regionRef && searchText.length >= 0) {
//                     NovaPoshtaFetchDiscticts(regionRef, searchText);
//                 } else {
//                     DistrictList.innerHTML = '';
//                     DistrictList.classList.add('d-none');
//                 }
//             });

//             DistrictInput.addEventListener('focus', function () {
//                 const regionRef = NovaPoshtaRegionSelect.value;
//                 if (regionRef && DistrictInput.value.trim().length === 0) {
//                     NovaPoshtaFetchDiscticts(regionRef, '');
//                 } else if (DistrictList.children.length > 0) {
//                     DistrictList.classList.remove('d-none');
//                 }
//             });

//             document.addEventListener('click', function (event) {
//                 const isClickInsideCityList = NovaPoshtaCityList.contains(event.target) || event.target === NovaPoshtaCityInput;
//                 const isClickInsideBranchesList = NovaPoshtaBranchesList.contains(event.target) || event.target === NovaPoshtaBranchesInput;

//                 if (!isClickInsideCityList) {
//                     NovaPoshtaCityList.classList.add('d-none');
//                 }

//                 if (!isClickInsideCityList) {
//                     NovaPoshtaCityList.classList.add('d-none');
//                 }

//                 if (!isClickInsideBranchesList) {
//                     NovaPoshtaBranchesList.classList.add('d-none');
//                 }
//             });


//         } else if (poshta === 'Meest') {
//             removeNP()
//             removeUP()
//             // console.log("meest");
//             MeestCityBranchDiv.style.display = 'block';
//             MeestCityhDiv.style.display = 'block';
//             NovaPoshtaContainer.classList.add('d-none');
//             MeestContainer.classList.remove('d-none');
//             UkrPoshtaCityDiv.classList.add('d-none')
//             UkrPoshtaRegionSelectContainer.classList.add('d-none')
//             DeliveryLocationVillageDistrict.style.display = "none"
//             DeliveryLocationVillageRef.style.display = "none"
//             UkrPoshtaBranchDiv.classList.add('d-none')
//             MeestRegionSelect.setAttribute("required", true)
//             MeestCityInput.setAttribute("required", true)
//             if (delivery === 'branch') {
//                 MeestBranchesInput.setAttribute("required", true)
//                 MeestBranchesContainer.style.display = 'grid';
//                 AddressContainerStreet.style.display = 'none'
//                 AddressContainerBuild.style.display = 'none'
//                 AddressContainerKv.style.display = 'none'
//                 document.querySelector('#meest_branch_div label').textContent = 'Відділення Meest';
//                 MeestBranchesInput.placeholder = 'Введіть назву відділення';
//                 inputCategoryOfWarehouse.value = '';
//             } else if (delivery === 'courier') {
//                 House.setAttribute("required", true)
//                 StreetInput.setAttribute("required", true)
//                 MeestBranchesContainer.style.display = 'none';
//                 AddressContainerStreet.style.display = 'block'
//                 AddressContainerBuild.style.display = 'block'
//                 AddressContainerKv.style.display = 'block'
//                 inputCategoryOfWarehouse.value = '';
//                 MeestContainer.appendChild(AddressContainerStreet)
//                 MeestContainer.appendChild(AddressContainerBuild)
//                 MeestContainer.appendChild(AddressContainerKv)
//             }

//             MeestCityInput.addEventListener('input', function () {
//                 const regionId = MeestRegionSelect.value;
//                 const searchText = this.value.trim().toLowerCase();

//                 if (regionId && searchText.length >= 1) {
//                     MeestFetchCities(regionId, searchText);
//                 } else {
//                     MeestCityList.innerHTML = '';
//                     MeestCityList.classList.add('d-none');
//                 }
//             });

//             MeestCityInput.addEventListener('focus', function () {
//                 const regionId = MeestRegionSelect.value;
//                 if (regionId && MeestCityInput.value.trim().length === 0) {
//                     MeestFetchCities(regionId, '');
//                 } else if (MeestCityList.children.length > 0) {
//                     MeestCityList.classList.remove('d-none');
//                 }
//             });

//             MeestBranchesInput.addEventListener('input', function () {
//                 const cityId = CityRefHidden.value;
//                 const searchText = this.value.trim().toLowerCase();
//                 if (cityId && searchText.length > 1) {
//                     MeestFetchBranches(cityId, searchText);
//                 } else {
//                     MeestBranchesList.innerHTML = '';
//                     MeestBranchesList.classList.add('d-none');
//                 }
//             });

//             MeestBranchesInput.addEventListener('focus', function () {
//                 const cityId = CityRefHidden.value;
//                 if (cityId && MeestBranchesInput.value.trim().length === 0) {
//                     MeestFetchBranches(cityId, '');
//                 } else if (MeestBranchesList.children.length > 0) {
//                     MeestBranchesList.classList.remove('d-none');
//                 }
//             });

//             document.addEventListener('click', function (event) {
//                 const isClickInsideCityList = MeestCityList.contains(event.target) || event.target === MeestCityInput;
//                 const isClickInsideBranchesList = MeestBranchesList.contains(event.target) || event.target === MeestBranchesInput;

//                 if (!isClickInsideCityList) {
//                     MeestCityList.classList.add('d-none');
//                 }

//                 if (!isClickInsideBranchesList) {
//                     MeestBranchesList.classList.add('d-none');
//                 }
//             });

//             if (MeestRegionSelect && Region) {
//                 MeestRegionSelect.addEventListener('change', function () {
//                     Region.value = this.selectedOptions[0].text;
//                 });
//             }


//         } else if (poshta === 'UkrPoshta') {
//             // console.log(removeNP());
//             removeNP()
//             removeMeest()
//             const showCityElements = () => {
//                 DistrictInput.removeAttribute("required")
//                 VillageInput.removeAttribute("required")
//                 UkrPoshtaCityInput.setAttribute("required", true)
//                 DeliveryLocationVillageDistrict.style.display = 'none';
//                 DeliveryLocationVillageRef.style.display = 'none';
//                 UkrPoshtaCityDiv.classList.remove('d-none');
//             };
//             const showVillageElements = () => {
//                 DistrictInput.setAttribute("required", true)
//                 VillageInput.setAttribute("required", true)
//                 UkrPoshtaCityInput.removeAttribute("required")
//                 DeliveryLocationVillageDistrict.style.display = 'block';
//                 DeliveryLocationVillageRef.style.display = 'block';
//                 UkrPoshtaCityDiv.classList.add('d-none');
//                 const parentElement = UkrPoshtaBranchDiv.parentNode;
//                 parentElement.insertBefore(DeliveryLocationVillageDistrict, UkrPoshtaBranchDiv);
//                 parentElement.insertBefore(DeliveryLocationVillageRef, UkrPoshtaBranchDiv);

//             };

//             UkrPoshtaRegionSelect.setAttribute("required", true)
//             UkrPoshtaCityDiv.style.display = 'grid';
//             UkrPoshtaBranchDiv.style.display = 'grid';
//             NovaPoshtaContainer.style.display = 'none';
//             MeestContainer.classList.add('d-none');
//             UkrPoshtaBranchDiv.classList.remove('d-none')
//             UkrPoshtaCityDiv.classList.remove('d-none')
//             UkrPoshtaRegionSelectContainer.classList.remove('d-none')
//             DeliveryLocationVillageDistrict.style.display = 'none';
//             DeliveryLocationVillageRef.style.display = 'none';
//             AddressContainerStreet.style.display = 'none'
//             AddressContainerBuild.style.display = 'none'
//             AddressContainerKv.style.display = 'none'

//             if (delivery === 'exspresBranch' || delivery === 'branch') {
//                 type === 'City' ? showCityElements() : showVillageElements();
//                 if (type === 'City' || type === 'Village') {
//                     UkrPoshtaBranchesInput.setAttribute("required", true)
//                 }
//                 UkrPoshtaBranchDiv.style.display = 'grid';
//                 AddressContainerStreet.style.display = 'none'
//                 AddressContainerBuild.style.display = 'none'
//                 AddressContainerKv.style.display = 'none'
//                 document.querySelector('#ukr_poshta_branch_div label').textContent = 'Відділення УкрПошта';
//                 UkrPoshtaCityInput.placeholder = 'Введіть назву відділення';
//             } else if (delivery === 'exspresCourier' || delivery === 'courier') {
//                 type === 'City' ? showCityElements() : showVillageElements();
//                 UkrPoshtaBranchesInput.removeAttribute("required")
//                 StreetInput.setAttribute("required", true)
//                 House.setAttribute("required", true)
//                 UkrPoshtaBranchDiv.style.display = 'none';
//                 const formContainer = document.querySelector(".form-order-container")
//                 AddressContainerStreet.style.display = 'block'
//                 AddressContainerBuild.style.display = 'block'
//                 AddressContainerKv.style.display = 'block'
//                 formContainer.appendChild(AddressContainerStreet)
//                 formContainer.appendChild(AddressContainerBuild)
//                 formContainer.appendChild(AddressContainerKv)
//             }

//             if (UkrPoshtaRegionSelect && Region) {
//                 UkrPoshtaRegionSelect.addEventListener('change', function () {
//                     Region.value = this.selectedOptions[0].text;
//                 });
//             }

//             UkrPoshtaCityInput.addEventListener('input', function () {
//                 const regionId = UkrPoshtaRegionSelect.value;
//                 const searchText = this.value.trim().toLowerCase();
//                 // console.log("+_+");
//                 if (regionId && searchText.length > 0) {
//                     fetchCities('', regionId, searchText);
//                 } else {
//                     UkrPoshtaCityList.innerHTML = '';
//                     UkrPoshtaCityList.classList.add('d-none');
//                 }
//             });

//             UkrPoshtaCityInput.addEventListener('focus', function () {
//                 const regionId = UkrPoshtaRegionSelect.value;
//                 if (regionId && UkrPoshtaCityInput.value.trim().length === 0) {
//                     // console.log("---");
//                     fetchCities('', regionId, '');
//                 } else if (UkrPoshtaCityInput.children.length >= 0) {
//                     UkrPoshtaCityList.classList.remove('d-none');
//                 }
//             });

//             UkrPoshtaBranchesInput.addEventListener('input', function () {
//                 const searchText = this.value.trim().toLowerCase();
//                 let cityId;
//                 if (type === 'City') {
//                     cityId = CityRefHidden.value;
//                 } else if (type === 'Village') {
//                     cityId = VillageRef.value;
//                 }
//                 if (cityId && searchText.length > 0) {
//                     fetchBranches(cityId, searchText);
//                 } else {
//                     UkrPoshtaBranchesList.innerHTML = '';
//                     UkrPoshtaBranchesList.classList.add('d-none');
//                 }
//             });

//             UkrPoshtaBranchesInput.addEventListener('focus', function () {
//                 let cityId;
//                 if (type === 'City') {
//                     cityId = CityRefHidden.value;
//                 } else if (type === 'Village') {
//                     cityId = VillageRef.value;
//                 }
//                 if (UkrPoshtaBranchesInput.value.trim().length === 0) {
//                     fetchBranches(cityId, '');
//                 } else if (UkrPoshtaBranchesList.children.length >= 0) {
//                     UkrPoshtaBranchesList.classList.remove('d-none');
//                 }
//             });

//             DistrictInput.addEventListener('input', function () {
//                 const regionRef = UkrPoshtaRegionSelect.value;
//                 const searchText = this.value.trim().toLowerCase();

//                 if (regionRef && searchText.length >= 0) {
//                     fetchDistricts(regionRef, searchText);
//                 } else {
//                     DistrictList.innerHTML = '';
//                     DistrictList.classList.add('d-none');
//                 }
//             });

//             DistrictInput.addEventListener('focus', function () {
//                 const regionRef = UkrPoshtaRegionSelect.value;
//                 if (regionRef && DistrictInput.value.trim().length === 0) {
//                     // console.log("+++++++");
//                     fetchDistricts(regionRef, '');
//                 } else if (DistrictList.children.length > 0) {
//                     DistrictList.classList.remove('d-none');
//                 }
//             });

//             document.addEventListener('click', function (event) {
//                 const isClickInsideCityList = UkrPoshtaCityList.contains(event.target) || event.target === UkrPoshtaCityInput;
//                 const isClickInsideBranchesList = UkrPoshtaBranchesList.contains(event.target) || event.target === UkrPoshtaBranchesInput;

//                 if (!isClickInsideCityList) {
//                     UkrPoshtaCityList.classList.add('d-none');
//                 }

//                 if (!isClickInsideBranchesList) {
//                     UkrPoshtaBranchesList.classList.add('d-none');
//                 }
//             });

//         }
//     }

//     const populateUkrPoshtaForm = (data) => {

//         const ukrPoshtaId = document.querySelector("#ukrPoshta"),
//             radioUkrPoshtaCabinet = document.querySelector("#ukrPostRadio")
//             ukrPoshtaId.setAttribute('checked', true)
//             let deliveryMethod = radioUkrPoshtaCabinet.querySelectorAll('input')
//             deliveryMethod.forEach(itemDeliveryCab => {
//                 if (itemDeliveryCab.getAttribute("data-method") === data.delivery_method) {
//                     itemDeliveryCab.setAttribute("checked", true)
//                     showForm(radioUkrPoshtaCabinet)
//                     deliveryContainerCityVilage.style.display = "flex"
                    
//                     const villageData = document.querySelector("#vilage");
//                     if (data.settlementType !== "місто") {
//                         villageData.setAttribute("data-type", data.settlementType);
//                     }
//                 deliveryContainerCityVilage.querySelectorAll("input").forEach(itemDelivery => {
//                     if (itemDelivery.getAttribute("data-type") === data.settlementType) {
//                         console.log(itemDelivery)
//                         itemDelivery.checked = true
//                         formContainer.style.display = "grid"
//                     }
//                 })
//             }
//         })
//         radioUkrPoshta.querySelectorAll("input").forEach(ukrItem => {
//             ukrItem.setAttribute("required", true)
//             ukrItem.setAttribute("name", "delivery_type")
//         })
//         document.querySelector('#ukr_poshta_region_ref').value = data.regionRef || ""
//         document.querySelector('#ukr_poshta_city_input').value = data.settlement || ""
//         document.querySelector('#ukr_poshta_branches_input').value = data.branch || ""
//         document.querySelector('#district_input').value = data.district || ""
//         document.querySelector('#village_input').value = data.settlement || ""
//         document.querySelector('#street_input').value = data.street || ""
//         document.querySelector('#house').value = data.house || ""
//         document.querySelector('#flat').value = data.flat || ""
//         document.querySelector('#district_ref').value = data.districtRef || ""
//         document.querySelector('#village_ref').value = data.settlementRef || ""
//         document.querySelector('#street_ref').value = data.streetRef || ""

//         document.querySelector("#region").value = data.region || ""
//         document.querySelector("#city_name").value = data.settlement || ""
//         document.querySelector("#city_ref").value = data.settlementRef || ""
//         document.querySelector("#branch_ref").value = data.branchRef || ""

//     }

//     const populateNovaPoshtaForm = (data) => {
//         const novaPoshtaId = document.querySelector("#novaPoshta"),
//             radioNovaPoshta = document.querySelector("#novaPost")
//         const villageData = document.querySelector("#vilage")
//         villageData.setAttribute("data-type", data.settlementType)
//         novaPoshtaId.checked = true
//         let deliveryMethodNP = document.querySelectorAll('#novaPost input')
//         deliveryMethodNP.forEach(itemDeliveryCabNP => {
//             if (itemDeliveryCabNP.getAttribute("data-method") === data.delivery_method) {
//                 itemDeliveryCabNP.setAttribute("checked", true)
//                 showForm(radioNovaPoshta)
//                 deliveryContainerCityVilage.style.display = "flex"
//                 deliveryContainerCityVilage.querySelectorAll("input").forEach(itemDelivery => {
//                     if (itemDelivery.getAttribute("data-type") === data.settlementType) {
//                         itemDelivery.checked = true
//                         formContainer.style.display = "block"
//                     }
//                 })
//             }
//         })
//         radioNovaPoshta.querySelectorAll("input").forEach(novaItem => {
//             novaItem.setAttribute("required", true)
//             novaItem.setAttribute("name", "delivery_type")
//         })

//         const poshtomat = document.querySelector("#poshtomat")
//         poshtomat.addEventListener("click", function () {
//             deliveryContainerCityVilage.querySelector(".village-block").style.display = "none"
//             deliveryContainerCityVilage.querySelector(".village-block").removeAttribute("name")
//         })

//         radioNovaPoshta.querySelectorAll("input[name='delivery_type']").forEach(radioItem => {
//             radioItem.addEventListener("change", function () {
//                 if (radioItem.id !== "poshtomat") {
//                     deliveryContainerCityVilage.querySelector(".village-block").style.display = "flex"
//                     deliveryContainerCityVilage.querySelector(".village-block").setAttribute("required", true)
//                 }
//             })
//         })
//         document.querySelector('#nova_poshta_region_ref').value = data.regionRef || ""
//         document.querySelector('#nova_poshta_city_input').value = data.settlement || ""
//         document.querySelector('#nova_poshta_branches_input').value = data.branch || ""
//         document.querySelector('#district_input').value = data.district || ""
//         document.querySelector('#village_input').value = data.settlement || ""
//         document.querySelector('#street_input').value = data.street || ""
//         document.querySelector('#house').value = data.house || ""
//         document.querySelector('#flat').value = data.flat || ""
//         document.querySelector('#district_ref').value = data.districtRef || ""
//         document.querySelector('#village_ref').value = data.settlementRef || ""
//         document.querySelector('#street_ref').value = data.streetRef || ""

//         document.querySelector("#region").value = data.region || ""
//         document.querySelector("#city_name").value = data.settlement || ""
//         document.querySelector("#city_ref").value = data.settlementRef || ""
//         document.querySelector("#branch_ref").value = data.branchRef || ""
//     }

//     const populateMeestForm = (data) => {
//         const meestPoshtaId = document.querySelector("#meest"),
//             radioMeest = document.querySelector("#meestPostRadioBtn")
//         meestPoshtaId.checked = true
//         radioMeest.style.display = "flex"
//         let deliveryMethodMeest = radioMeest.querySelectorAll('input')
//         deliveryMethodMeest.forEach(itemDeliveryCabMeest => {
//             if (itemDeliveryCabMeest.getAttribute("data-method") === data.delivery_method) {
//                 itemDeliveryCabMeest.setAttribute("checked", true)
//                 itemDeliveryCabMeest.setAttribute("name", "delivery_type")
//                 itemDeliveryCabMeest.setAttribute("required", true)
//                 itemDeliveryCabMeest.addEventListener("change", function (e) {
//                     deliveryContainerCityVilage.querySelectorAll("input").forEach(itemDelivery => {
//                         resetDeliveryLocation()
//                         itemDelivery.style.display = "none"
//                     })
//                 })
//                 formContainer.style.display = "block"
//             }
//         })

//         document.querySelector('#meest_region_ref').value = data.regionRef || ""
//         document.querySelector('#meest_city_input').value = data.settlement || ""
//         document.querySelector('#meest_branches_input').value = data.branch || ""
//         document.querySelector('#district_input').value = data.district || ""
//         document.querySelector('#village_input').value = data.settlement || ""
//         document.querySelector('#street_input').value = data.street || ""
//         document.querySelector('#house').value = data.house || ""
//         document.querySelector('#flat').value = data.flat || ""
//         document.querySelector('#district_ref').value = data.districtRef || ""
//         document.querySelector('#village_ref').value = data.settlementRef || ""
//         document.querySelector('#street_ref').value = data.streetRef || ""

//         document.querySelector("#region").value = data.region || ""
//         document.querySelector("#city_name").value = data.settlement || ""
//         document.querySelector("#city_ref").value = data.settlementRef || ""
//         document.querySelector("#branch_ref").value = data.branchRef || ""

//     }

//     function clearFields() {
//         const formContainer = document.querySelectorAll(".form-order-container input")
//         const formContainerSelect = document.querySelectorAll(".form-order-container select")

//         formContainer.forEach(itemInput => {
//             itemInput.value = ""
//         })
//         formContainerSelect.forEach(itemInput => {
//             itemInput.value = ""
//         })
//         document.querySelector("#region").value = ""
//         document.querySelector("#city_name").value = ""
//         document.querySelector("#city_ref").value = ""
//         document.querySelector("#branch_ref").value = ""
//     }

//     function handleUserData(data) {
//         let deliveryType = data.settlementType === 'місто' ? "City" : "Village"

//         if (data.delivery_name === "UkrPoshta") {
//             populateUkrPoshtaForm(data)
//         } else if (data.delivery_name === "NovaPoshta") {
//             populateNovaPoshtaForm(data)
//         } else if (data.delivery_name === "Meest") {
//             populateMeestForm(data)
//         }

//         updateFormVisibility(data.delivery_name, data.delivery_method, deliveryType)


//         document.querySelectorAll('.delivery_cabinet input[type="radio"]').forEach(radio => {
//             radio.addEventListener('change', clearFields)
//         })
//     }
//     let timer
//     const delay = 1000

//     function collectAndSendData() {
//         const isFormComplete = document.querySelector('#userPhone').value !== "" &&
//             document.querySelector('#name').value !== "" &&
//             document.querySelector('#lastname').value !== "" &&
//             document.querySelector('input[name="delivery_type"]:checked') &&
//             document.querySelector('input[name="poshta"]:checked') &&
//             document.querySelector('#region').value !== "" &&
//             document.querySelector('#cost_delivery').value !== "" &&
//             document.querySelector('input[name="payment_method_id"]:checked')
//             let branchNumber = '';
//             if (document.querySelector("input[id='novaPoshta']:checked")) {
//                 branchNumber = document.querySelector('#branch_number').value !== ''
//             }
//         let ukrPoshtaField,
//             novaPoshtaField,
//             meestField
//         if(document.querySelector('input[name="delivery_type"]:checked') && document.querySelector('input[name="delivery_type"]:checked').value == 'UkrPoshta_exspresBranch' && document.querySelector('input[name="delivery_location_type"]:checked') && document.querySelector('input[name="delivery_location_type"]:checked').value == "City" || document.querySelector('input[name="delivery_type"]:checked') && document.querySelector('input[name="delivery_type"]:checked').value == 'UkrPoshta_branch' && document.querySelector('input[name="delivery_location_type"]:checked') && document.querySelector('input[name="delivery_location_type"]:checked').value == "City") {
//             ukrPoshtaField = document.querySelector("#ukr_poshta_region_ref").value !== "" &&
//                 document.querySelector("#ukr_poshta_city_input").value !== "" &&
//                 document.querySelector("#ukr_poshta_branches_input").value !== ""
//         } else if (document.querySelector('input[name="delivery_type"]:checked') && document.querySelector('input[name="delivery_type"]:checked').value == 'UkrPoshta_exspresBranch' && document.querySelector('input[name="delivery_location_type"]:checked') && document.querySelector('input[name="delivery_location_type"]:checked').value == "Village" || document.querySelector('input[name="delivery_type"]:checked') && document.querySelector('input[name="delivery_type"]:checked').value == 'UkrPoshta_branch' && document.querySelector('input[name="delivery_location_type"]:checked') && document.querySelector('input[name="delivery_location_type"]:checked').value == "Village") {
//             ukrPoshtaField = document.querySelector("#ukr_poshta_region_ref").value !== "" &&
//                 document.querySelector("#district_input").value !== "" &&
//                 document.querySelector("#village_input").value !== "" &&
//                 document.querySelector("#ukr_poshta_branches_input").value !== ""
//             }
            
//         if(document.querySelector('input[name="delivery_type"]:checked') && document.querySelector('input[name="delivery_type"]:checked').value == 'UkrPoshta_exspresCourier' && document.querySelector('input[name="delivery_location_type"]:checked') && document.querySelector('input[name="delivery_location_type"]:checked').value == "City" || document.querySelector('input[name="delivery_type"]:checked') && document.querySelector('input[name="delivery_type"]:checked').value == 'UkrPoshta_courier' && document.querySelector('input[name="delivery_location_type"]:checked') && document.querySelector('input[name="delivery_location_type"]:checked').value == "City") {
//             ukrPoshtaField = document.querySelector("#ukr_poshta_region_ref").value !== "" &&
//                 document.querySelector("#ukr_poshta_city_input").value !== "" &&
//                 document.querySelector("#street_input").value !== "" &&
//                 document.querySelector("#house").value !== "" &&
//                 document.querySelector("#flat").value !== "" 
//         } else if (document.querySelector('input[name="delivery_type"]:checked') && document.querySelector('input[name="delivery_type"]:checked').value == 'UkrPoshta_exspresCourier' && document.querySelector('input[name="delivery_location_type"]:checked') && document.querySelector('input[name="delivery_location_type"]:checked').value == "Village" || document.querySelector('input[name="delivery_type"]:checked') && document.querySelector('input[name="delivery_type"]:checked').value == 'UkrPoshta_courier' && document.querySelector('input[name="delivery_location_type"]:checked') && document.querySelector('input[name="delivery_location_type"]:checked').value == "Village") {
//             ukrPoshtaField = document.querySelector("#ukr_poshta_region_ref").value !== "" &&
//                 document.querySelector("#district_input").value !== "" &&
//                 document.querySelector("#village_input").value !== "" &&
//                 document.querySelector("#street_input").value !== "" &&
//                 document.querySelector("#house").value !== "" &&
//                 document.querySelector("#flat").value !== "" 

//         }
//         if(document.querySelector('input[name="delivery_type"]:checked') && document.querySelector('input[name="delivery_type"]:checked').value == 'NovaPoshta_branch' && document.querySelector('input[name="delivery_location_type"]:checked') && document.querySelector('input[name="delivery_location_type"]:checked').value == "City" || document.querySelector('input[name="delivery_type"]:checked') && document.querySelector('input[name="delivery_type"]:checked').value == 'NovaPoshta_postomat' && document.querySelector('input[name="delivery_location_type"]:checked') && document.querySelector('input[name="delivery_location_type"]:checked').value == "City"){
//             novaPoshtaField = document.querySelector("#nova_poshta_region_ref").value !== "" &&
//                 document.querySelector("#nova_poshta_city_input").value !== "" &&
//                 document.querySelector("#nova_poshta_branches_input").value !== "" 
//         } else if (document.querySelector('input[name="delivery_type"]:checked') && document.querySelector('input[name="delivery_type"]:checked').value == 'NovaPoshta_branch' && document.querySelector('input[name="delivery_location_type"]:checked') && document.querySelector('input[name="delivery_location_type"]:checked').value == "Village") {
//             novaPoshtaField = document.querySelector("#nova_poshta_region_ref").value !== "" &&
//                 document.querySelector("#district_input").value !== "" &&
//                 document.querySelector("#village_input").value !== "" &&
//                 document.querySelector("#nova_poshta_branches_input").value !== "" 
//         }

//         if(document.querySelector('input[name="delivery_type"]:checked') && document.querySelector('input[name="delivery_type"]:checked').value == 'NovaPoshta_courier' && document.querySelector('input[name="delivery_location_type"]:checked') && document.querySelector('input[name="delivery_location_type"]:checked').value == "City") {
//             novaPoshtaField = document.querySelector("#nova_poshta_region_ref").value !== "" &&
//                 document.querySelector("#nova_poshta_city_input").value !== "" &&
//                 document.querySelector("#street_input").value !== "" &&
//                 document.querySelector("#house").value !== "" &&
//                 document.querySelector("#flat").value !== "" 
//         } else if (document.querySelector('input[name="delivery_type"]:checked') && document.querySelector('input[name="delivery_type"]:checked').value == 'NovaPoshta_courier' && document.querySelector('input[name="delivery_location_type"]:checked') && document.querySelector('input[name="delivery_location_type"]:checked').value == "City") {
//             novaPoshtaField = document.querySelector("#nova_poshta_region_ref").value !== "" &&
//             document.querySelector("#district_input").value !== "" &&
//             document.querySelector("#village_input").value !== "" &&
//             document.querySelector("#street_input").value !== "" &&
//             document.querySelector("#house").value !== "" &&
//             document.querySelector("#flat").value !== "" 
//         }

//         if(document.querySelector('input[name="delivery_type"]:checked') && document.querySelector('input[name="delivery_type"]:checked').value == 'Meest_branch') {
//             meestField = document.querySelector("#meest_region_ref").value !== "" &&
//                 document.querySelector("#meest_city_input").value !== "" &&
//                 document.querySelector("#meest_branches_input").value !== ""
//         }else if(document.querySelector('input[name="delivery_type"]:checked') && document.querySelector('input[name="delivery_type"]:checked').value == 'Meest_courier')
//             meestField = document.querySelector("#meest_region_ref").value !== "" &&
//                 document.querySelector("#meest_city_input").value !== "" &&
//                 document.querySelector("#street_input").value !== "" &&
//                 document.querySelector("#house").value !== "" &&
//                 document.querySelector("#flat").value !== "" 
//         if (isFormComplete && ukrPoshtaField  || isFormComplete && novaPoshtaField || isFormComplete && meestField) {
//             // console.log(meestField, isFormComplete);
//             return
//         }

//         if (document.querySelector('#userPhone').value != "" || document.querySelector('#email').value != "") {

//             let hiddenForm = document.querySelector('#hiddenForm')

//             document.querySelector('#nameHid').value = document.querySelector('#name').value || ""
//             document.querySelector('#lastnameHid').value = document.querySelector('#lastname').value || ""
//             document.querySelector('#secnameHid').value = document.querySelector('#secondName').value || ""
//             document.querySelector('#phoneHid').value = document.querySelector('#userPhone').value || ""
//             document.querySelector('#commentOrderHid').value = document.querySelector('#commentOrder').value || ""
//             //reg ref
//             if(document.querySelector('#nova_poshta_region_ref')) {
//                 document.querySelector("#region_refHid").value = document.querySelector('#nova_poshta_region_ref').value || ""
//             }
//             if(document.querySelector('#meest_region_ref')) {
//                 document.querySelector("#region_refHid").value = document.querySelector('#meest_region_ref').value || ""
//             }
//             if(document.querySelector('#ukr_poshta_region_ref')) {
//                 document.querySelector("#region_refHid").value = document.querySelector('#ukr_poshta_region_ref').value || ''
//             }
//             //branches
//             if(document.querySelector('#ukr_poshta_branches_input')) {
//                 document.querySelector("#branchesHid").value = document.querySelector('#ukr_poshta_branches_input').value || ""
//             }
//             if(document.querySelector('#nova_poshta_branches_input')) {
//                 document.querySelector("#branchesHid").value = document.querySelector('#nova_poshta_branches_input').value || ""
//             }
//             if(document.querySelector('#meest_branches_input')) {
//                 document.querySelector("#branchesHid").value = document.querySelector('#ukr_poshta_branches_input').value || ""
//             }
//             // district_input
//             if(document.querySelector('#district_input')) {
//                 document.querySelector("#districtHid").value = document.querySelector('#district_input').value || ""
//             }
//             //district_ref
//             if(document.querySelector('#district_ref')) {
//                 document.querySelector("#districtRefHid").value = document.querySelector('#district_ref').value || ""
//             }
//             // street_input
//             if(document.querySelector('#street_input')) {
//                 document.querySelector("#streetHid").value = document.querySelector('#street_input').value || ""
//             }
//             // street_ref
//             if(document.querySelector('#street_ref')) {
//                 document.querySelector("#street_refHid").value = document.querySelector('#street_ref').value || ""
//             }
//             //house
//             if(document.querySelector('#house')) {
//                 document.querySelector("#houseHid").value = document.querySelector('#house').value || ""
//             }
//             // flat
//             if(document.querySelector('#flat')) {
//                 document.querySelector("#flatHid").value = document.querySelector('#flat').value || ""
//             }

//             if(document.querySelector('input[name="payment_method_id"]:checked')) {
//                 document.querySelector('#paymentHid').value = document.querySelector('input[name="payment_method_id"]:checked').value || ""
//             }
//             if (document.querySelector('input[name="delivery_type"]:checked')) {
//                 document.querySelector('#deliveryTypeHid').value = document.querySelector('input[name="delivery_type"]:checked').value || ""
//             }
//             if (document.querySelector('input[name="poshta"]:checked')) {
//                 document.querySelector('#deliveryMethodHid').value = document.querySelector('input[name="poshta"]:checked').value || ""
//             }
//             if (document.querySelector('#delivery_location_type')) {
//                 document.querySelector('#deliveryLocHid').value = document.querySelector('input[name="delivery_location_type"]:checked').value || ""
//             }
//             document.querySelector('#regionHid').value = document.querySelector('#region').value || ""
//             document.querySelector('#city_nameHid').value = document.querySelector('#city_name').value || ""
//             document.querySelector('#city_refHid').value = document.querySelector('#city_ref').value || ""
//             document.querySelector('#branch_refHid').value = document.querySelector('#branch_ref').value || ""
//             if (document.querySelector("input[id='novaPoshta']:checked")) {
//                 document.querySelector('#branch_numberHid').value = document.querySelector('#branch_number').value || ""
//             }
//             let formData = new FormData(hiddenForm),
//                 dataObject = {}
//             formData.forEach((value, key) => {
//                 dataObject[key] = value
//             })
//             fetch('./../order/store-unfinished-order', {
//                     method: 'POST',
//                     body: JSON.stringify(dataObject),
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
//                     }
//                 })
//                 .then(response => response.json())
//                 .then(data => {
//                     console.log('Дані успішно відправлено:', data)
//                 })
//                 .catch(error => {
//                     console.error('Помилка відправлення даних:', error)
//                 })
//         }
//     }
//     if(document.querySelector("#submitButton")) {
//         const subminOrder = document.querySelector("#submitButton")
//         subminOrder.addEventListener('click', () => {
//             clearTimeout(timer)
//             timer = setTimeout(collectAndSendData, delay)
//         })
//     }
//     if( document.querySelector("#submitButtonMobile")) {
//         const subminOrderMobile = document.querySelector("#submitButtonMobile")
//         subminOrderMobile.addEventListener('click', () => {
//             clearTimeout(timer)
//             timer = setTimeout(collectAndSendData, delay)
//         })
//     }

//     const clearButton = document.getElementById('clearButton');
//     const form = document.getElementById('order-form');

//     if (clearButton) {
//         clearButton.addEventListener('click', (event) => {
//             event.preventDefault(); // Зупинити стандартну поведінку посилання
//             const orderForm = document.querySelectorAll("#order-form input")
//             orderForm.forEach(inputOrder => {
//                 inputOrder.value = ""
//                 inputOrder.checked = false
//             })
//             hideAllForms()
//             clearFields()
//         });
//     }




//     if (document.querySelector("#userIdCabinet")) {
//         let userIdCabinetValue = document.querySelector('#userIdCabinet').value,
//             userData = JSON.parse(userIdCabinetValue),
//             userId = userData.id
//         // console.log(userIdCabinetValue)
//         fetch(`./../api/userAddress/${userId}`)
//             .then(response => response.json())
//             .then(data => {
//                 // console.log(data)
//                 handleUserData(data)
//             })
//     }
//     if (document.querySelector("#userIdCab")) {
//         let userIdCabValue = document.querySelector('#userIdCab').value,
//             userData = JSON.parse(userIdCabValue),
//             userIdCab = userData.id
//         fetch(`././api/userAddress/${userIdCab}`)
//             .then(response => response.json())
//             .then(data => {
//                 // console.log(data)
//                 handleUserData(data)
//             })
//     }

// });
