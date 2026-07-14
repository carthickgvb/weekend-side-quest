const SUPABASE_URL = "https://vblwnwlhhbzuvncxaxuv.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZibHdud2xoaGJ6dXZuY3hheHV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQwNDI2MTAsImV4cCI6MjA5OTYxODYxMH0.qDAtKNPqaMRBppHSAhCWn181Ml_1MfBlMk9NeRFELfI";

const db = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
const pages = document.querySelectorAll(".page");

const answers = {};

const t =
    `Hello Agent Darshana. 
    
    A special mission has been generated just for you...`;

let i = 0;
(function f(){if(i<t.length){typing.textContent+=t[i++];setTimeout(f,30)}})();function showPage(id){pages.forEach(p=>p.classList.remove('active'));document.getElementById(id).classList.add('active')}function answer(k,v){answers[k]=v;if(k==='drink'){q2.classList.remove('hidden')}else{showPage('loading');load()}}function load(){let p=0;status.textContent='Checking weather...';const x=setInterval(()=>{p+=2;fill.style.width=p+'%';if(p>=100){clearInterval(x);showPage('result')}},40)}async function submitChoice(choice) {

    answers.finalChoice = choice;

    console.log(answers);

    const { data, error } = await db
        .from("responses")
        .insert([
            {
                drink: answers.drink,
                activity: answers.activity,
                final_choice: choice
            }
        ]);

    if(error){

        console.error(error);

        alert("Something went wrong!");

        return;
    }

    alert("Mission response saved successfully! 🎉");
}