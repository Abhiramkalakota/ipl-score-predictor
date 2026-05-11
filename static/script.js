document.addEventListener("DOMContentLoaded", () => {
    // Get the current page URL path (e.g., "/about.html")
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll(".nav-links a");

    // Remove active class from all links first
    navLinks.forEach(nav => nav.classList.remove("active"));

    // Loop through each link
    navLinks.forEach(link => {
        const linkPath = link.getAttribute("href");
        
        // If the browser URL includes the href of this link, make it active
        // Also handle the edge case where the URL ends in "/" for the home page
        if (currentPath.includes(linkPath) || (currentPath.endsWith("/") && linkPath === "index.html")) {
            link.classList.add("active");
        }
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const predictBtn = document.getElementById("predictBtn");
    
    if(predictBtn) {
        predictBtn.addEventListener("click", async () => {
            
            // 1. Loading State
            const originalText = predictBtn.innerHTML;
            predictBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Analyzing Data...';
            predictBtn.disabled = true;

            // 2. Gather Data from Form
            const matchData = {
                battingTeam: document.getElementById("battingTeam").value,
                bowlingTeam: document.getElementById("bowlingTeam").value,
                currentRuns: parseFloat(document.getElementById("currentRuns").value),
                currentWickets: parseInt(document.getElementById("currentWickets").value),
                overs: parseFloat(document.getElementById("oversCompleted").value)
            };

            try {
                // 3. Send Data to Flask Backend via POST
                const response = await fetch('/api/predict_score', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(matchData)
                });

                if (!response.ok) throw new Error("Network response was not ok");
                const result = await response.json();

                // 4. Update the Dashboard UI
                document.getElementById("resultScore").innerText = result.likely_score;
                document.getElementById("resultMessage").innerHTML = result.message;
                
                // Animate Confidence Bar
                document.getElementById("confidenceFill").style.width = `${result.confidence}%`;
                document.getElementById("resultConfidence").innerText = `${result.confidence}%`;

                // Calculate Projected Run Rate
                const projRR = (result.predicted_max / 20).toFixed(2);
                document.getElementById("projRunRate").innerText = projRR;

            } catch (error) {
                console.error("Prediction failed:", error);
                document.getElementById("resultMessage").innerHTML = "<span style='color: #EF4444;'>Error connecting to backend. Is Flask running?</span>";
            } finally {
                // 5. Restore Button State
                predictBtn.innerHTML = originalText;
                predictBtn.disabled = false;
            }
        });
    }
});