
function ValidateEmail(x) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(x))
  { document.querySelectorAll('small')[2].innerHTML=''
    return (true)
  }
  document.querySelectorAll('small')[2].innerHTML='invalid email address'
    return (false)
}










function validateform(){


    
    firstname=document.getElementById('firstName').value
    lastname=document.getElementById('lastName').value
    email=document.getElementById('email').value
    zip=document.getElementById('zip').value






    if(firstname ==''){
      document.querySelectorAll('small')[0].innerHTML='*firstname must not be empty'
        return false}
      if(firstname.length>0){
        document.querySelectorAll('small')[0].innerHTML=''
        }  
        if(lastname ==''){
            document.querySelectorAll('small')[1].innerHTML='*lastname must not be empty'
              return false}
            if(lastname.length>0){
              document.querySelectorAll('small')[1].innerHTML=''
              }  
            
    if(email ==''){
     document.querySelectorAll('small')[2].innerHTML='*email must not be empty'
      return false}
                if(email.length>0){
                  return ValidateEmail(email) 
                  }  
     
        
      
    

                      
    
     
    
   }