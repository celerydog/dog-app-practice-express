const deleteText = document.querySelectorAll('.delete-button')
const thumbText = document.querySelectorAll('.upvote-button')

Array.from(deleteText).forEach((element) => {
  element.addEventListener('click', deleteDog)
})


Array.from(thumbText).forEach((element) => {
  element.addEventListener('click', addLike)
})


async function addLike() {
  const dName = this.parentNode.childNodes[1].innerText.trim()
  const dBreed = this.parentNode.childNodes[3].innerText.trim()
  const tLikes = Number(this.parentNode.childNodes[5].innerText)
  const id = this.parentNode.childNodes[13].innerText.trim()
  try {
    const response = await fetch('addOneLike', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'dogNameS': dName,
        'dogBreedS': dBreed,
        'likesS': tLikes
      })
    })
    const data = await response.json()
    console.log(data)
    location.reload()

  } catch (err) {
    console.log(err)
  }
}

async function deleteDog() {
  const dName = this.parentNode.childNodes[1].innerText.trim()
  const dBreed = this.parentNode.childNodes[3].innerText.trim()
  try {
    const response = await fetch('deleteDog', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'dogNameS': dName,
        'dogBreedS': dBreed
      })
    })
    location.reload()

  } catch (err) {
    console.log(err)
  }
}




async function addLikeImproved(dName, dBreed, tLikes) {
  // const dName = this.parentNode.childNodes[1].innerText
  // const dBreed = this.parentNode.childNodes[3].innerText
  // const tLikes = Number(this.parentNode.childNodes[5].innerText)
  // const id = this.parentNode.childNodes[6].innerText
  try {
    const response = await fetch('addOneLike', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'dogNameS': dName,
        'dogBreedS': dBreed,
        'likesS': tLikes
      })
    })
    location.reload()

  } catch (err) {
    console.log(err)
  }
}

async function deleteDogImproved(dName, dBreed){
    // const dName = this.parentNode.childNodes[1].innerText
    // const dBreed = this.parentNode.childNodes[3].innerText
    try{
        const response = await fetch('deleteDogImproved', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'dogNameS': dName,
              'dogBreedS': dBreed
            })
          })
        location.reload()

    }catch(err){
        console.log(err)
    }
}