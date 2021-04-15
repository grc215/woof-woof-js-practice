let dogInfo = document.querySelector("#dog-info")

fetch("http://localhost:3000/pups")
  .then(res => res.json())
  .then((pupsArr) => {
    pupsArr.forEach((pupsObj) => {
      console.log(pupsObj)
        pups = pupsArr
      addName(pupsObj)
    })
  })

  function addName (pup) {
      let nameSpan = document.createElement("span")
      nameSpan.innerText = pup.name
      //console.log(pup.name)
      dogInfo.append(nameSpan)

      //Event Listener in the same level  
      nameSpan.addEventListener("click", (evt) => {
        console.log("DOGGS")
    
        let dogImg = document.createElement("img")
        dogImg.src = pup.image
    
        let dogHeader = document.createElement("h2")
        dogHeader.innerText = pup.name
    
        let dogButton = document.createElement("button")
        //dogButton.innerText = "Good Boy!"
        let dogStatus = pup.isGoodDog
        console.log(dogStatus)
        if  (dogStatus === true) {
            dogButton.innerText = "Good dog!"
        } else if (dogStatus === false){
            dogButton.innerText = "Bad dog!"
        }
        console.log(dogButton.innerText)
        dogInfo.append(dogImg, dogHeader, dogButton)

        dogButton.addEventListener("click", (evt) => {
            if  (dogStatus === true) {
                dogButton.innerText = "Bad boy!"
                dogStatus = false
            } else if (dogStatus === false){
                dogButton.innerText = "Good dog!"
                dogStatus = true
            }
            fetch(`http://localhost:3000/pups/${pup.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                isGoodDog: dogStatus
                })
            })
            .then(res => res.json())
        
        })
    })
        

        





  }

  