// import 'isomorphic-fetch'
// var fetch = require('whatwg-fetch')
document.addEventListener('DOMContentLoaded', () => {

  let url = "http://localhost:3000/api/v1/notes"
  URL=url;
  console.log("JS has loaded");
  fetch(url)
  // .this(res=>console.log(res))
  .then(res=>res.json())
  // .then(json=>console.log(json))
  .then(json=>listNotes(json))

})

function listNotes(notes){
  NOTES = notes  //notes is array
  // console.log("We are in listNotes");
  // console.log(notes[0]);
  // console.log(typeof notes);
  document.querySelector("#allNotes").innerHTML = ""
  notes.forEach(function(note){
    let title=note.title
    let user = note.user.name
    // console.log( user + " " +title);
    let allNotes = document.querySelector("#allNotes")
    // allNotes.innerHTML += ( `<li data-id=${note.id}>${user} - ${title}</li>`)
    allNotes.innerHTML += ( `<li class="note" data-id=${note.id}>${title}</a></li>`)

  });
  addEventListenerToNotes()
}//listNotes

function addEventListenerToNotes(){
  let notes = document.querySelectorAll(".note")
  // console.log("Insude addEventListenerToNotes");
  // console.log(notes);
  notes.forEach(function(note){
    // console.log(note)
    //add addEventListener
    note.addEventListener("click",function(e){
      console.log(e); //target.dataset.id
      let id = e.target.dataset.id
      console.log(id);
      // console.log(NOTES.find(function(notty){
      //   return notty.id === id
      // }))
      let desiredNote = NOTES.find(function(notty){
        return notty.id == id
      })
      // console.log(desiredNote); //now display note:title and note:body
      let pageDisplay = document.querySelector("#noteContents")
//////////////////////////////////////////////////////////////////////////////// added after Arbi


      // console.log(pageDisplay);
      pageDisplay.innerHTML = `<h2>${desiredNote.title}</h2>`
      pageDisplay.innerHTML += `<p>${desiredNote.body}</p>`
      // I think we should generate the buttons on demand**************
      pageDisplay.innerHTML += `<button type="button" id="editNote">EDIT NOTE</button>`
      pageDisplay.innerHTML += `<button type="button" id="deleteNote">DELETE NOTE</button>`
      //addEventListener to edit *****************************
      let editButton = document.querySelector("#editNote")
      // console.log(editButton);
      editButton.addEventListener("click",()=>{editNote(id)})
      //addEventListener to delete ***************************
      let deleteButton = document.querySelector("#deleteNote")
      deleteButton.addEventListener("click",()=>{deleteNote(id)})

//////////////////////////////////////////////////////////////////////////////// above added after Arbi
    })//note.addEventListener
  })//notes.forEach
}//addEventListenerToNotes


//////////////////////////////////////////////////////////////////////////////// added after Arbi
function editNote(id){console.log("editNote:" +id);
  //aquire some edit
  noteDiv = document.querySelector("#noteContents")
  // text = noteDiv.innerText
  // console.log(text); //also gets button and title text
  // console.log(NOTES[id]);
  let title = NOTES[id-1]["title"]
  let body = NOTES[id-1]["body"]
  noteDiv.innerHTML = `<textarea id="editTitleData" rows="1" cols="101">${title}</textarea><br>`
  noteDiv.innerHTML += `<textarea id="editBodyData" rows="10" cols="101">${body}</textarea><br>`
  noteDiv.innerHTML += `<button type="button" id="editNote">Submit</button>`
  noteDiv.innerHTML += `<button type="button" id="cancelEdit">Cancel Edit</button>`
  document.querySelector("#editNote").addEventListener("click",()=>{submitEdit(id)})
  document.querySelector("#cancelEdit").addEventListener("click",()=>{displayNote(id)})
  //with fetch patch/post the edit
  // refresh everything
} //editNote
function submitEdit(id){console.log("EDIT SUBMITTED FOR " +id);
  let title = document.querySelector("#editTitleData").value
  let body = document.querySelector("#editBodyData").value
  // console.log(title);
  // console.log(body);
  //********************************************************EDIT BELOW
  // let data = {}
  let url = URL + "/" + id
  let options = {id:id,title:title,body:body} //{ id:}
  // console.log(options);
  // console.log(url);
  fetch(url,{
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    // method: "PUT",
    body: JSON.stringify(options)
  }).then(res => res.json())
    .then(json => {updatePageAfterEdit(id,json)})

 //  fetch('https://api.github.com/gists', {
 //   method: 'post',
 //   body: JSON.stringify(opts)
 // })
 function updatePageAfterEdit(id,oldjson){
   console.log("inside updatePageAfterEdit");
   // console.log(oldjson);
   fetch(URL)
   .then(res=>res.json())
   .then(json=>listNotes(json))
   .then(updateDivAfterEdit(id,oldjson))
   // .then(displayNote(id-1))
   // .then(setTimeout(function(){displayNote(id-1) } ),1000 )
   // setTimeout(function(){ alert("Hello"); }, 3000);

 }
 function updateDivAfterEdit(id,oldjson){
   // console.log(id);
   // console.log(oldjson);
   let pageDisplay = document.querySelector("#noteContents")

   // console.log(pageDisplay);
   pageDisplay.innerHTML = `<h2>${oldjson.title}</h2>`
   pageDisplay.innerHTML += `<p>${oldjson.body}</p>`
   // I think we should generate the buttons on demand**************
   pageDisplay.innerHTML += `<button type="button" id="editNote">EDIT NOTE</button>`
   pageDisplay.innerHTML += `<button type="button" id="deleteNote">DELETE NOTE</button>`
   //addEventListener to edit *****************************
   let editButton = document.querySelector("#editNote")
   // console.log(editButton);
   editButton.addEventListener("click",()=>{editNote(id)})
   //addEventListener to delete ***************************
   let deleteButton = document.querySelector("#deleteNote")
   deleteButton.addEventListener("click",()=>{deleteNote(id)})

 }



  //********************************************************EDIT ABOVE
}//submitEdit
function displayNote(id){
  noteDiv = document.querySelector("#noteContents")
  noteDiv.innerHTML = `<h2>${ NOTES[id]["title"]}</h2>`
  noteDiv.innerHTML += `<p>${ NOTES[id]["body"]}</p>`
  noteDiv.innerHTML += `<button type="button" id="editNote">EDIT NOTE</button>`
  noteDiv.innerHTML += `<button type="button" id="deleteNote">DELETE NOTE</button>`
  let editButton = document.querySelector("#editNote")
  editButton.addEventListener("click",()=>{editNote(id)})
  let deleteButton = document.querySelector("#deleteNote")
  deleteButton.addEventListener("click",()=>{deleteNote(id)})

}//end displayNote
function deleteNote(id){console.log("deleteNote called:" +id)
//with fetch delete
// refresh everything
} //deleteNote
//////////////////////////////////////////////////////////////////////////////// above added after Arbi
// document.querySelector('li[data-id="4"]').dataset.id = 17
// document.querySelector('li[data-id="17"]')
// <li data-id=​"17">​vsparrow - Vester libero inventore bos nobis dolorum degenero solus.​</li>​

//Listing all of a user's notes on a sidebar --> For now, only create one user.
//  There will be no log in.
//When a user clicks on a note "preview" in the sidebar,
//   the full note body and any other details of the currently selected note should show on the page.
//Allow users to create, edit and delete notes.
