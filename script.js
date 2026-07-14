const SUPABASE_URL = "https://vblwnwlhhbzuvncxaxuv.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZibHdud2xoaGJ6dXZuY3hheHV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQwNDI2MTAsImV4cCI6MjA5OTYxODYxMH0.qDAtKNPqaMRBppHSAhCWn181Ml_1MfBlMk9NeRFELfI";

const db = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
const pages = document.querySelectorAll(".page");

const answers = {};

const bootLines = [
    "WeekendOS v2.3.1",
    "",
    "Initializing AI...",
    "Loading Coffee Database...",
    "Loading Fun Engine...",
    "Checking Weather...",
    "Calculating Fun Probability...",
    "",
    "Mission Ready ✔"
];

const bootText = document.getElementById("bootText");
const bootProgress = document.getElementById("bootProgress");
const continueBtn = document.getElementById("continueBtn");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function playBootSequence() {
    bootText.textContent = "";

    for (let i = 0; i < bootLines.length; i++) {
        bootText.textContent += bootLines[i] + "\n";
        bootProgress.style.width = `${((i + 1) / bootLines.length) * 100}%`;
        await sleep(700);
    }

    continueBtn.style.display = "inline-block";
}

playBootSequence();

function showPage(id){pages.forEach(p=>p.classList.remove('active'));document.getElementById(id).classList.add('active')}function answer(key, value) {
    answers[key] = value;

    document.querySelectorAll(".choice").forEach(button => {
        if (button.onclick.toString().includes(`'${key}','${value}'`)) {
            button.style.background = "#6d5dfc";
            button.style.borderColor = "#9b8cff";
        }
    });
}
async function runAnalysis() {

    showPage("analysis");

    const steps = [
        "Reading mission data...",
        "Coffee preference detected ✓",
        "Activity preference detected ✓",
        "Checking weather...",
        "Searching fun database...",
        "Estimating laughter probability...",
        "Calculating compatibility..."
    ];

    const text = document.getElementById("analysisText");
    const fill = document.getElementById("fill");

    for (let i = 0; i < steps.length; i++) {

        text.textContent = steps[i];

        fill.style.width = `${((i + 1) / steps.length) * 100}%`;

        await sleep(800);
    }

    showFinalResult();
}

function showFinalResult() {

    document.querySelector("#analysis .glass-card").innerHTML = `

        <h2>✅ MISSION APPROVED</h2>

        <h1>You should hang out this weekend.</h1>

        <p>
            After carefully analyzing every piece of available data,
            our AI has reached one conclusion.
        </p>

        <div class="mission-item">
            <span>Mission Success Probability</span>
            <strong>98%</strong>
        </div>

        <button onclick="submitChoice('im_in')">
            😄 I'm In
        </button>

        <button class="secondary"
                onclick="submitChoice('let_me_check')">

            📅 Let Me Check

        </button>

    `;
}

async function submitChoice(choice) {

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

const stars = document.getElementById("stars");

for (let i = 0; i < 120; i++) {
    const star = document.createElement("span");

    star.classList.add("star");

    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.animationDelay = Math.random() * 3 + "s";
    star.style.animationDuration = 2 + Math.random() * 3 + "s";

    stars.appendChild(star);
}
