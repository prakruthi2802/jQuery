$(function(){
    
    if(localStorage.getItem("students")==null){
    
        localStorage.setItem("students",JSON.stringify([]));
    
    }
    
    showRegistredStudents();
    
    dialog=$("#dialog").dialog({
        autoOpen:false,
        height:500,
        width:500,
        modal:true
    });
    
    
    $(".regstu").click(function(){
        dialog.dialog("open");
    });
    
    $("#dob").datepicker({
        changeYear:true,
        changeMonth:true,
        maxDate:"0d"
    });
    
    
    
    $(".submit").click(function(){
    var isValid =$("#regform").validate({
        
        
      rules:{
          
          usn:{
              required:true,
              maxlength:10,
              minlength:5,
          },
          
          name:{
          required:true,
              maxlength:10,
              minlength:5,
      },
        
          
          email:{
          required:true,
         email:true,
      },
        
          
          mobile:{
          required:true,
          maxlength:10,
          minlength:10,
      },
        
  
          courses:{
          required:true,
      },
        
          
          percentage:{
          required:true,
              max:100,
              min:50,

      },
          dob:{
              required:true,
          }
        
     
      },
        messages:{
            usn:{
                required:"Usn can't be empty",
                maxlength:"Usn must have maximum of 10 characters",
                minlength:"Enter atleast of 5 characters",
            },
                           
             name:{
                required:"Name can't be empty",
                maxlength:"Name must have maximum of 10 characters",
                minlength:"Enter atleast of 5 characters",
            } ,             
                           
                           
              email:{
                required:"Email can't be empty",
                email:"Enter a valid email",
                  
            },           
             mobile:{
                required:"Mobile can't be empty",
                 maxlength:"Enter maximum of 10 characters",
                 minlength:" Enter minimum of 10 characters",
            },              
                           
             course:{
                required:"Select any course",
            },              
                           
              percentage:{
                required:"Percentage can't be empty",
               max:"over qualified",
                  min:"not eligible",
            },  
            dob:{
                required:"DOB can't be empty",
            }
        }
           
    }).form();
            if(isValid){
                var usn=$("#usn").val();
                var name=$("#name").val();
                var email=$("#email").val();
                var mobile=$("#mobile").val();
                var courses=$("#courses").val();
                var percentage=$("#percentage").val();
                var dob=$("#dob").val();
                $(".reset").click();
                
                student={
                    
                    
                    "usn":usn,
                    "name":name,
                    "email":email,
                    "mobile":mobile,
                    "courses":courses,
                    "percentage":percentage,
                    "dob":dob,
                }
                var students=getDataFromLocalStorage();
                students.push(student);
                
                updateLocalStorageData(students);
                showRegistredStudents();
                dialog.dialog("close");
                
                return false;
                
            }     
                     
            });
    
    
    function showRegistredStudents(){
        var students=getDataFromLocalStorage();
        var data ="";
        if(students.length == 0){
            data ="<h3> No students registred yet....</h3>"
        }else{
            data +="<table id='regstudents'><thead><tr>";
            data += "<th>#</th>";
            data += "<th>USN</th>";
            data += "<th>Name</th>";
            data += "<th>Email</th>";
            data += "<th>Mobile</th>";
            data += "<th>Course</th>";
            data += "<th>Percentage</th>";
            data += "<th>DOB</th>";
            data +="</tr></thead>";
            for(var i=0;i<students.length;i++){
                var j=i+1;
                data +="<tr>";
                data +="<td>"+j+"</td>";
                data +="<td>"+students[i].usn+"</td>";
                data +="<td>"+students[i].name+"</td>";
                data +="<td>"+students[i].email+"</td>";
                data +="<td>"+students[i].mobile+"</td>";
                data +="<td>"+students[i].courses+"</td>";
                data +="<td>"+students[i].percentage+"</td>";
                data +="<td>"+students[i].dob+"</td>";
                data +="</tr>";
            }
            data+="</table>";
            
        }
        $("#content").html(data);
        $("#regstudents").dataTable({
            "pageLength":2
        });
        
            
    
       
    }
    function getDataFromLocalStorage(){
        var students=JSON.parse(localStorage.getItem("students"));
        return students;
    }
    function updateLocalStorageData(updatedStudentsArr){
        localStorage.setItem("students",JSON.stringify(updatedStudentsArr));
    }
                 
});