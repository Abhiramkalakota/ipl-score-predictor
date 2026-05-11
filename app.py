from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# --- DYNAMIC DATA ---
# In a real app, this would come from a database. 
# We pass this to teams.html so you don't have to write the HTML 10 times!
IPL_TEAMS = [
    {"id": "mi", "name": "Mumbai Indians", "est": "2008", "logo": "mi-logo.png"},
    {"id": "csk", "name": "Chennai Super Kings", "est": "2008", "logo": "csk-logo.png"},
    {"id": "rcb", "name": "Royal Challengers Bangalore", "est": "2008", "logo": "rcb-logo.png"},
    {"id": "kkr", "name": "Kolkata Knight Riders", "est": "2008", "logo": "kkr-logo.png"},
    {"id": "dc", "name": "Delhi Capitals", "est": "2008", "logo": "dc-logo.png"},
    {"id": "rr", "name": "Rajasthan Royals", "est": "2008", "logo": "rr-logo.png"},
    {"id": "srh", "name": "Sunrisers Hyderabad", "est": "2013", "logo": "srh-logo.png"},
    {"id": "pbks", "name": "Punjab Kings", "est": "2008", "logo": "pbks-logo.png"},
    {"id": "lsg", "name": "Lucknow Super Giants", "est": "2022", "logo": "lsg-logo.png"},
    {"id": "gt", "name": "Gujarat Titans", "est": "2022", "logo": "gt-logo.png"}
]

# --- PAGE ROUTES ---

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict')
def predict_page():
    return render_template('predict.html')

@app.route('/teams')
def teams_page():
    # Pass the python list to the HTML template using Jinja2
    return render_template('teams.html', teams_data=IPL_TEAMS)

@app.route('/about')
def about_page():
    return render_template('about.html')

@app.route('/live')
def live_page():
    return render_template('live.html')

# --- API ROUTES (For your JavaScript to talk to) ---

@app.route('/api/predict_score', methods=['POST'])
def predict_score():
    data = request.json
    
    batting_team = data.get('battingTeam')
    bowling_team = data.get('bowlingTeam')
    current_runs = int(data.get('currentRuns', 0))
    current_wickets = int(data.get('currentWickets', 0))
    overs = float(data.get('overs', 0.0))
    
    # --- MOCK ML MODEL LOGIC ---
    # Calculate remaining overs
    overs_remaining = 20.0 - overs
    if overs_remaining < 0: 
        overs_remaining = 0
    
    # Base calculation: assume ~9.5 runs per over for remaining overs
    projected_additional_runs = int(overs_remaining * 9.5)
    
    # Penalty for wickets lost
    wicket_penalty = current_wickets * 2
    
    final_projected_runs = current_runs + projected_additional_runs - wicket_penalty
    
    # Create a realistic score range
    predicted_min = final_projected_runs - 6
    predicted_max = final_projected_runs + 5
    
    response = {
        "predicted_min": predicted_min,
        "predicted_max": predicted_max,
        "confidence": 88, 
        "likely_score": f"{predicted_min} - {predicted_max}",
        "message": f"{batting_team} is projected to score between {predicted_min} and {predicted_max} runs against {bowling_team}."
    }
    
    return jsonify(response)
import random

@app.route('/api/live')
def live_data():

    runs = random.randint(100, 180)
    wickets = random.randint(2, 7)
    overs = round(random.uniform(10, 18), 1)

    runrate = round(runs / overs, 2)

    return jsonify({
        "batting_team": "Mumbai Indians",
        "bowling_team": "Chennai Super Kings",
        "runs": runs,
        "wickets": wickets,
        "overs": overs,
        "runrate": runrate
    })

# --- RUN THE APP ---
if __name__ == '__main__':
    # debug=True allows the server to auto-reload when you make code changes
    app.run(debug=True)