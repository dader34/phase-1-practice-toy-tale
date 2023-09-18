let addToy = false;

const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
const toyForm = document.querySelector(".add-toy-form")
addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyFormContainer.style.display = "block";
  } else {
    toyFormContainer.style.display = "none";
  }
});

toyForm.addEventListener("submit",(e)=>{
  e.preventDefault()
  const toy = {
    "name" : e.target.name.value,
    "image" : e.target.image.value,
    "likes" : 0,
  }
  postToy(toy)
})


const createToy = (toy) =>{
  const cardContainer = document.querySelector("#toy-collection")
  const toyContainer = document.createElement("div")
  toyContainer.classList.toggle("card")
  const toyName = document.createElement("h2")
  toyName.textContent = toy['name']
  const toyPic = document.createElement("img")
  toyPic.classList.toggle("toy-avatar")
  toyPic.src = toy['image']
  const toyLikes = document.createElement("p")
  toyLikes.textContent = toy['likes']
  const toyLikeButton = document.createElement("button")
  toyLikeButton.classList.toggle("like-btn")
  toyLikeButton.id = toy['id']
  toyLikeButton.textContent = "Like"
  toyLikeButton.addEventListener("click",()=>{
    updateLikes(toy,toyLikes.textContent)
    toyLikes.textContent = parseInt(toyLikes.textContent)+1
  })
  toyContainer.append(toyName,toyPic,toyLikes,toyLikeButton)
  cardContainer.append(toyContainer)
}

const loadToys = () =>{
  fetch("http://localhost:3000/toys",{
    headers:{
      "Accept":"application/json"
    }
  })
  .then(resp => resp.json())
  .then(body => {
    body.forEach(toy => {
      createToy(toy)
    });
  })
}

const updateLikes = (toy,likes) =>{
  const updatedToy = {"likes":parseInt(likes)+1}
  fetch(`http://localhost:3000/toys/${toy['id']}`,{
  method : "PATCH",
  headers:{
      "Content-Type":"application/json"
  },
  body: JSON.stringify(updatedToy) 
  })
}

const postToy = (toy) =>{
  fetch("http://localhost:3000/toys",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(toy)
  })
  .then(resp => resp.json())
  .then(body =>{
    createToy(body)
  })
}


loadToys()