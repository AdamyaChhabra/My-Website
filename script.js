function scrollToAuth(){
    document.getElementById("auth").scrollIntoView({behavior:"smooth"});
}

let isLogin=false;

function toggleAuth(){
    isLogin=!isLogin;
    signupForm.classList.toggle("hidden");
    loginForm.classList.toggle("hidden");

    authTitle.innerText=isLogin?"Welcome Back":"Create Account";

    toggleText.innerHTML=isLogin
    ?`New here? <span onclick="toggleAuth()">Sign Up</span>`
    :`Already have an account? <span onclick="toggleAuth()">Login</span>`;
}

// SIGNUP
signupForm.addEventListener("submit", async(e)=>{
    e.preventDefault();

    const res=await fetch("http://localhost:5000/api/signup",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            name:name.value,
            email:email.value,
            password:password.value
        })
    });

    const data=await res.json();
    alert(data.message);
});

// LOGIN
loginForm.addEventListener("submit", async(e)=>{
    e.preventDefault();

    const res=await fetch("http://localhost:5000/api/login",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            email:loginEmail.value,
            password:loginPassword.value
        })
    });

    const data=await res.json();

    if(data.token){
        auth.classList.add("hidden");
        dashboard.classList.remove("hidden");
        loadDashboard();
    } else {
        alert(data.message);
    }
});

function loadDashboard(){
    workoutList.innerHTML="<li>Push Pull Legs</li><li>Cardio</li>";
    dietList.innerHTML="<li>High Protein</li><li>Balanced Diet</li>";
}

// AI
function generatePlan(){
    const bmi=(weight.value/(height.value*height.value)).toFixed(2);

    aiResult.innerHTML=`
    <p>BMI: ${bmi}</p>
    <p>Workout: Running + HIIT</p>
    <p>Diet: Protein + Clean Food</p>
    `;
}