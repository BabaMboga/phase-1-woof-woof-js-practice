document.addEventListener('DOMContentLoaded', () => {
    const dogBar = document.getElementById('dog-bar');
    const dogInfo = document.getElementById('dog-info');
    const filterButton = document.getElementById('good-dog-filter');

    // Fetch data from the server
    fetch('http://lcoalhost:3000/pups')
        .then(response => response.json())
        .then(data => {
            // Function to render a single pup
            const renderPup = (pup) => {
                const pupSpan = document.createElement('span');
                pupSpan.textContent = pup.name;
                pupSpan.addEventListener('click', () => displayPupInfo(pup));
                dogBar.appendChild(pupSpan);
            };

            //Function to display pup info
            const displayPupInfo = (pup) => {
                dogInfo.innerHTML = `
                    <img src="${pup.image}" />
                    <h2>${pup.name}</h2>
                    <button>${pup.isGoodDog ? 'Good Dog!' : 'Bad Dog!'}</button>
                `;
            }
        })
})