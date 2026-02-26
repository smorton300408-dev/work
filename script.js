// Step Data
const steps = [
  {
    name: "Opener",
    script: "Hi, is this [Business Name]? It's Summer calling from RSA Marketing. Have I caught you at a bad time?",
  },
  {
    name: "Permission Hook",
    script: "I was looking at your Google/website and noticed one thing that usually costs businesses calls or bookings. Can I tell you what it is?",
  },
  {
    name: "Observation",
    script: "Your [Observation] — if I could show you 2-3 fixes to improve this, would you want to see them?",
  },
  {
    name: "Qualify",
    script: "Quick questions so I don't waste your time: Are you taking on new customers right now? Where do most of your customers come from? If you improved one thing in the next 30 days, would it be more calls/bookings, more trust/reviews, or a better website?",
  },
  {
    name: "Book Audit",
    script: "Best next step is a 10-12 minute audit. I'll show you what's stopping you ranking and the plan to fix it. Are you free today at [Time 1] or [Time 2]?",
  },
  {
    name: "Same-Day Close",
    script: "We can start this week. Month 1 is paid upfront, minimum term is 6 months. Based on what you've told me, most businesses fit £299, but you can start smaller at £149. Do you want to start on £299, or keep it lighter at £149?",
  }
];

let currentStep = 0;
let observationText = "";

// Initialize
function showStep() {
  document.getElementById("step-indicator").innerText = "Step: " + steps[currentStep].name;
  let scriptLine = steps[currentStep].script;
  scriptLine = scriptLine.replace("[Observation]", observationText || "[Observation]");
  document.getElementById("script-line").innerText = scriptLine;
  document.getElementById("suggested-line").innerText = "";
}

showStep();

// Navigation
document.getElementById("next-step").addEventListener("click", () => {
  if (currentStep < steps.length - 1) {
    currentStep++;
    showStep();
  }
});

document.getElementById("prev-step").addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep--;
    showStep();
  }
});

document.getElementById("reset-call").addEventListener("click", () => {
  currentStep = 0;
  observationText = "";
  document.getElementById("observation-input").value = "";
  showStep();
});

// Business Reply Buttons
document.querySelectorAll(".reply-btn").forEach(button => {
  button.addEventListener("click", () => {
    document.getElementById("business-reply").value = button.innerText;
    generateResponse(button.innerText);
  });
});

// Submit typed reply
document.getElementById("submit-reply").addEventListener("click", () => {
  const reply = document.getElementById("business-reply").value;
  generateResponse(reply);
});

// Observation Suggestion
document.getElementById("suggest-issue").addEventListener("click", () => {
  const url = document.getElementById("observation-input").value;
  // For demo, simple simulated suggestion
  const commonIssues = ["Call button hard to see", "Low reviews", "Mobile booking unclear"];
  observationText = commonIssues[Math.floor(Math.random() * commonIssues.length)];
  document.getElementById("issue-suggestion").innerText = "Suggested Issue: " + observationText;
  showStep();
});

// Generate suggested response based on step and reply
function generateResponse(reply) {
  let response = "";
  if (currentStep === 0) { // Opener
    if (reply.toLowerCase().includes("busy")) {
      response = "No worries — I only need 20 seconds. Can I tell you why I called, and you can tell me if it’s relevant?";
    } else {
      response = "Great! Thanks for taking a moment.";
    }
  } else if (currentStep === 2) { // Observation
    if (reply.toLowerCase().includes("yes")) {
      response = "Perfect — that’s exactly what I help with. All it takes is a 10-minute audit.";
    } else {
      response = "No worries, just wanted to flag it in case it helps later.";
    }
  } else {
    response = "Next step: proceed as per script.";
  }
  document.getElementById("suggested-line").innerText = response;
}
