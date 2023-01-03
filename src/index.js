document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/dogs')
    .then(res => res.json())
    .then((data) => {
        let registeredDogs = document.getElementById('table-body')
        data.forEach(element => {
            let dogRow = document.createElement('tr')
            let dogName = document.createElement('td')
            let dogBreed = document.createElement('td')
            let dogSex = document.createElement('td')
            let dogEditButton = document.createElement('button')
            let dogEdit = document.createElement('td')
            dogEditButton.innerText = "Edit"
            let form = document.getElementById('dog-form')
            dogName.textContent = element.name
            dogBreed.textContent = element.breed
            dogSex.textContent = element.sex
            dogEdit.append(dogEditButton)
            dogRow.append(dogName)
            dogRow.append(dogBreed)
            dogRow.append(dogSex)
            dogRow.append(dogEdit)
            registeredDogs.append(dogRow)
            dogEditButton.addEventListener('click', () => {
                
                form.addEventListener('submit', (e) => {
                    e.preventDefault()
                    let newName = document.getElementById('name')
                    let newBreed = document.getElementById('breed')
                    let newSex = document.getElementById('sex')
                    
                    fetch(`http://localhost:3000/dogs/${element.id}`, {
                        method: 'PATCH',
                        headers: {
                                'Content-Type': 'application/json',
                                 },
                        body: JSON.stringify({
                            name: `${element.name}`,
                            breed: `${element.breed}`,
                            sex: `${element.sex}`
                        }),
                                })
                    .then((response) => response.json())
                    .then((data) => {
                    ;
                    
                        element.name = newName.value
                        element.breed = newBreed.value
                        element.sex = newSex.value
                        dogName.textContent = element.name
                        dogBreed.textContent = element.breed
                        dogSex.textContent = element.sex
                        data.name = element.name
                        data.breed = element.breed
                        data.sex = element.sex
                        dogRow.append(dogName)
                        dogRow.append(dogBreed)
                        dogRow.append(dogSex)
                        dogRow.append(dogEdit)
                        console.log('Success:', data)
                })
                    })
                })
            console.log(element)
        });
    })
})