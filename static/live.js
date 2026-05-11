let runs = 120;
let wickets = 3;
let overs = 12.0;

setInterval(async () => {

    // Simulate live updates
    runs += Math.floor(Math.random() * 6);
    wickets += Math.random() > 0.9 ? 1 : 0;
    if (wickets > 10) wickets = 10;

    overs += 0.3;
    if (overs > 20) overs = 20;

    // Update UI
    document.getElementById("score").innerText = `${runs}/${wickets}`;
    document.getElementById("overs").innerText = `${overs.toFixed(1)} overs`;

    let rr = (runs / overs).toFixed(2);
    document.getElementById("runrate").innerText = `Run Rate: ${rr}`;

    // 🔥 Call Flask API
    try {
        const res = await fetch("/api/predict_score", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                battingTeam: "Mumbai Indians",
                bowlingTeam: "Chennai Super Kings",
                currentRuns: runs,
                currentWickets: wickets,
                overs: overs
            })
        });

        const data = await res.json();

        document.getElementById("prediction").innerText =
            `Predicted Score: ${data.predicted_min} - ${data.predicted_max}`;

    } catch (error) {
        document.getElementById("prediction").innerText =
            "Prediction unavailable (start backend)";
    }

}, 3000);