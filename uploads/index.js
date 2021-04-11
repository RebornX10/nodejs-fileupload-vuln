var flag = 1 
function f1() { alert("Yes. you are right ") } 
function f() { if(flag==1) { 
    Bn.style.top=90 
    Bn.style.left=500 
    flag=2 
} else if(flag==2) { 
    Bn.style.top=90 
    Bn.style.left=50 
    flag=3 
} else if(flag==3) { 
    Bn.style.top=235
    Bn.style.left=360 
    flag=1 
} }