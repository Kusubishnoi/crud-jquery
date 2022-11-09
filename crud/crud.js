// ------GET DATA--------
$(document).ready(function(){
    function loaddoc(){
     var file=JSON.parse(localStorage.getItem("file"))
     if(file!=null && file.length>0){
         hdata();
     }
     else{
         $.get("https://jsonplaceholder.typicode.com/posts",function(data){
         localStorage.setItem("file",JSON.stringify(data));
             hdata();
         })
     }
    }
 
     loaddoc();
//  ------CREATE TABLE-------
 function hdata(){
     var file= JSON.parse(localStorage.getItem("file"));
     var table="<table class='table table-striped' id='myTable'>";
      var tableheadArr=["userId","id","title","body"];
      var tablehead = "<thead><tr>"; 
 
     console.log(table);
 
 
 
 for (var i = 0; i < tableheadArr.length; i++) {
     var tab = "<th>" + tableheadArr[i] + "</th>";
     tablehead += tab;
   }
   tablehead += "<th>Action</th></thead></tr>";
   table += tablehead;
   table += "<tbody>";
   for (let i = 0; i < file.length; i++) {
       table += "<tr><td>" + file[i].userId + "</td><td>" + file[i].id + "</td><td>" + file[i].title + "</td><td>" + file[i].body+ 
           "</td><td>" + "<button type='button' class='editbtn' data-bs-toggle='modal' data-bs-target='#myModal' ><i class='fa fa-pencil-square-o edit' aria-hidden='true'></i></button>" + "<button type='button' class='deletebtn' ><i class='fa fa-trash-o delete' aria-hidden='true'></i></button>" + "</td></tr>";
   }
   table += "</tbody></table>";
   $("#test").append(table);
 }

// ---DATA TABLE----
$('#myTable').DataTable();



 // ----ADD DATA----
$("#submit").click(function(){
    debugger
    // if(!$("#form").valid()){
    //     return;
    // }
    var file= JSON.parse(localStorage.getItem("file"));
   let userId = $("#userId").val();
    let id = $("#id").val();
    let title = $("#title").val();
    let body = $("#body").val();
    
    if(id==null || id=="" ){                 
        var input={
            "id":file.length + 1,
            
            "userId":userId,
            "title":title,
            "body":body,
           
       
     };
        file.push(input);
        localStorage.setItem("file", JSON.stringify(file));
        window.location.reload();

   }

    else {
        var input={
            "id":id,
            "userId":userId,
            "title":title,
            "body":body,
            
    }
    objIndex = file.findIndex(obj => obj.id == id);
    file.splice(objIndex, 1, input);
    localStorage.setItem("file", JSON.stringify(file));

    window.location.reload();
}
});



// ------DELETE------

$(".deletebtn").on("click", function (id) {
    var text = "Are you sure you want to Delete !";
    if (confirm(text) == true) {
        var file = JSON.parse(localStorage.getItem('file'));
        var x = $(this).parent().parent().index();
        console.log(x);
        file.splice(x, 1);
        localStorage.setItem('file', JSON.stringify(file));
        window.location.reload();
    }
})





// ---------EDIT--------
$(".editbtn").on("click", function (id){
    var file = JSON.parse(localStorage.getItem("file"));
    var id = $(this).parent().parent().children().eq(1).html();
    objIndex = file.findIndex(obj=>obj.id == id);
    console.log(objIndex);

   $("#id").val(id);
   var userId = file[objIndex].userId;
   $("#userId").val(userId);
   var title = file[objIndex].title;
   $("#title").val(title);
   var body= file[objIndex].body;
   $("#body").val(body);
   

   
     

});

// ----DELETE ALL---

$(".deleteall").on("click" , function (){
    var file = JSON.parse(localStorage.getItem("file"));
    file.splice(0);
    localStorage.setItem("file", JSON.stringify(file));
    var Table = document.getElementById("myTable");
    Table.innerHTML = "<table><thead><tr><th>Nothing to show<th></tr></thead></table>";
    $('#myTable').DataTable();
})
});













 

 
 
 
 
    
    
    