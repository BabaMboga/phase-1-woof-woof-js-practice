document.addEventListener('DOMContentLoaded', () => {
    const dogBar = document.getElementById('dog-bar');
    const dogInfo = document.getElementById('dog-info');
    const filterButton = document.getElementById('good-dog-filter');

    // Fetch data from the server
    fetch('https://pseudo-data.onrender.com/pups')
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

                // Event listener for toggle good dog button
                const toggleButton = dogInfo.querySelector('button');
                toggleButton.addEventListener('click', () => toggleGoodDog(pup));
            };

            // Function to toggle good dog status
            const toggleGoodDog = (pup) => {
                pup.isGoodDog = !pup.isGoodDog;
                fetch(`https://pseudo-data.onrender.com/pups/${pup.id}`, {
                    method: 'PATCH',
                    headers: {
                        'ContentType' : 'application/json'
                    },
                    body: JSON.stringify({ isGoodDog: pup.isGoodDog})
                })
                .then(() => {
                    // Update button text
                    const toggleButton = dogInfo.querySelector('button');
                    toggleButton.textContent = pup.isGoodDog ? 'Good Dog!' : 'Bad Dog!';

                })
                .catch(error => console.error('Error toggling good dog status:', error));
            };

            //Function to render all pups
            const renderAllPups = () => {
                dogBar.innerHTML = '';
                data.forEach(pup => renderPup(pup));
            };

            // Initial render
            renderAllPups();

            // Event listener for filter button
            filterButton.addEventListener('click', () => {
                const filterText = filterButton.textContent;
                if (filterText.includes('OFF')) {
                    filterButton.textContent = 'Filter good dogs: ON';
                    renderAllPups();

                } else {
                    filterButton.textContent = 'Filter good dogs: OFF';
                    renderAllPups();
                }
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});