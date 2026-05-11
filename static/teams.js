document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Handle Navigation Active States (from previous steps) ---
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach(nav => nav.classList.remove("active"));
    navLinks.forEach(link => {
        const linkPath = link.getAttribute("href");
        if (currentPath.includes(linkPath) || (currentPath.endsWith("/") && linkPath === "index.html")) {
            link.classList.add("active");
        }
    });

    // --- 2. Team Data & 2026 Squads ---
    // You can edit the players and stats here!
    const teamsData = {
        mi: {
            name: "Mumbai Indians",
            logo: "mi-logo.png",
            stats: "Trophies: 5 | Captain: Hardik Pandya",
            squad: ["Rohit Sharma", "Suryakumar Yadav", "Robin Minz", "Sherfane Rutherford", "Ryan Rickelton", "Quinton de Kock", "Danish Malewar", "Tilak Varma", "Hardik Pandya(C)", "Naman Dhir", "Raj Angad Bawa", "Mayank Rawat", "Krish Bhagat", "Corbin Bosch", "Will Jacks", "Shardul Thakur", "Trent Boult", "Mayank Markande", "Deepak Chahar", "Ashwani Kumar", "Raghu Sharma", "Mohammad Izhar", "Keshav Maharaj", "Allah Ghazanfar", "Jasprit Bumrah"]
        },
        csk: {
            name: "Chennai Super Kings",
            logo: "csk-logo.png",
            stats: "Trophies: 5 | Captain: Ruturaj Gaikwad",
            squad: ["Ruturaj Gaikwad(C)", "MS Dhoni", "Sanju Samson", "Dewald Brevis", "Kartik Sharma", "Sarfaraz Khan", "Urvil Patel", "Jamie Overton", "Ramakrishna Ghosh", "Prashant Veer", "Matthew Short", "Aman Khan", "Zak Foulkes", "Shivam Dube", "Khaleel Ahmed", "Noor Ahmad", "Anshul Kamboj", "Mukesh Choudhary", "Shreyas Gopal", "Gurjapneet Singh", "Akeal Hosein", "Matt Henry", "Rahul Chahar", "Spencer Johnson", "Akash Madhwal"]
        },
        rcb: {
            name: "Royal Challengers Bangalore",
            logo: "rcb-logo.png",
            stats: "Trophies: 1 | Captain: Rajat Patidar",
            squad: ["Rajat Patidar(C)", "Devdutt Padikkal", "Virat Kohli", "Phil Salt", "Jitesh Sharma", "Jordan Cox", "Krunal Pandya", "Swapnil Singh", "Tim David", "Romario Shepherd", "Jacob Bethell", "Venkatesh Iyer", "Satvik Deswal", "Mangesh Yadav", "Vicky Ostwal", "Vihaan Malhotra", "Kanishk Chouhan", "Josh Hazlewood", "Rasikh Dar", "Suyash Sharma", "Bhuvneshwar Kumar", "Nuwan Thushara", "Abhinandan Singh", "Jacob Duffy", "Yash Dayal"]
        },
        kkr: {
            name: "Kolkata Knight Riders",
            logo: "kkr-logo.png",
            stats: "Trophies: 3 | Captain: Ajinkya Rahane ",
            squad: ["Ajinkya Rahane(C)", "Rinku Singh", "Angkrish Raghuvanshi", "Manish Pandey", "Finn Allen", "Tejasvi Singh", "Rahul Tripathi", "Tim Seifert", "Rovman Powell", "Anukul Roy", "Cameron Green", "Sarthak Ranjan", "Daksh Kamra", "Rachin Ravindra", "Ramandeep Singh", "Sunil Narine", "Blessing Muzarabani", "Vaibhav Arora", "Matheesha Pathirana", "Kartik Tyagi", "Prashant Solanki", "Saurabh Dubey", "Navdeep Saini", "Umran Malik", "Varun Chakaravarthy"]
        },
        dc: {
            name: "Delhi Capitals",
            logo: "dc-logo.png",
            stats: "Trophies: 0 | Captain: Axar Patel",
            squad: ["KL Rahul", "Karun Nair", "David Miller", "Pathum Nissanka", "Sahil Parakh", "Prithvi Shaw", "Abishek Porel", "Tristan Stubbs", "Axar Patel(C)", "Sameer Rizvi", "Ashutosh Sharma", "Vipraj Nigam", "Ajay Mandal", "Tripurana Vijay", "Madhav Tiwari", "Nitish Rana", "Mitchell Starc", "T. Natarajan", "Mukesh Kumar", "Dushmantha Chameera", "Auqib Nabi", "Lungi Ngidi", "Kyle Jamieson", "Rehan Ahmed", "Kuldeep Yadav"]
        },
        rr: {
            name: "Rajasthan Royals",
            logo: "rr-logo.png",
            stats: "Trophies: 1 | Captain: Riyan Parag",
            squad: ["Shubham Dubey", "Vaibhav Sooryavanshi", "Donovan Ferreira", "Lhuan-dre Pretorius", "Ravi Singh", "Aman Rao Perala", "Shimron Hetmyer", "Yashasvi Jaiswal", "Dhruv Jurel", "Riyan Parag(C)", "Yudhvir Singh Charak", "Ravindra Jadeja", "Dasun Shanaka", "Jofra Archer", "Tushar Deshpande", "Kwena Maphaka", "Ravi Bishnoi", "Sushant Mishra", "Yash Raj Punja", "Vignesh Puthur", "Brijesh Sharma", "Adam Milne", "Kuldeep Sen", "Sandeep Sharma", "Nandre Burger"]
        },
        srh: {
            name: "Sunrisers Hyderabad",
            logo: "srh-logo.png",
            stats: "Trophies: 1 | Captain: Pat Cummins",
            squad: ["Ishan Kishan", "Aniket Verma", "Smaran Ravichandran", "Salil Arora", "Heinrich Klaasen", "Travis Head", "Harshal Patel", "Kamindu Mendis", "Harsh Dubey", "Shivang Kumar", "Krains Fuletra", "Liam Livingstone", "R.S. Ambrish", "Abhishek Sharma", "Nitish Kumar Reddy", "Pat Cummins(C)", "Zeeshan Ansari", "Jaydev Unadkat", "Eshan Malinga", "Sakib Hussain", "Onkar Tarmale", "Amit Kumar", "Praful Hinge", "Dilshan Madushanka", "Gerald Coetzee"]
        },
        pbks: {
            name: "Punjab Kings",
            logo: "pbks-logo.png",
            stats: "Trophies: 0 | Captain: Shreyas Iyer",
            squad: ["Shreyas Iyer(C)", "Nehal Wadhera", "Vishnu Vinod", "Harnoor Pannu", "Pyla Avinash", "Prabhsimran Singh", "Shashank Singh", "Marcus Stoinis", "Harpreet Brar", "Marco Jansen", "Azmatullah Omarzai", "Priyansh Arya", "Musheer Khan", "Suryansh Shedge", "Mitch Owen", "Cooper Connolly", "Ben Dwarshuis", "Arshdeep Singh", "Yuzvendra Chahal", "Vyshak Vijaykumar", "Yash Thakur", "Xavier Bartlett", "Pravin Dubey", "Vishal Nishad", "Lockie Ferguson"]
        },
        lsg: {
            name: "Lucknow Super Giants",
            logo: "lsg-logo.png",
            stats: "Trophies: 0 | Captain: Rishabh Pant",
            squad: ["Rishabh Pant(C)", "Aiden Markram", "Himmat Singh", "Matthew Breetzke", "Mukul Choudhary", "Akshat Raghuwanshi", "Josh Inglis", "Nicholas Pooran", "Mitchell Marsh", "Abdul Samad", "Shahbaz Ahmed", "Arshin Kulkarni", "Ayush Badoni", "Mohammad Shami", "Avesh Khan", "M. Siddharth", "Digvesh Singh", "Akash Singh", "Prince Yadav", "Arjun Tendulkar", "Anrich Nortje", "Naman Tiwari", "George Linde", "Mayank Yadav", "Mohsin Khan"]
        },
        gt: {
            name: "Gujarat Titans",
            logo: "gt-logo.png",
            stats: "Trophies: 1 | Captain: Shubman Gill",
            squad: ["Shubman Gill(C)", "Jos Buttler", "Kumar Kushagra", "Anuj Rawat", "Connor Esterhuizen", "Glenn Phillips", "Sai Sudharsan", "Nishant Sindhu", "Washington Sundar", "Mohd. Arshad Khan", "Sai Kishore", "Jayant Yadav", "Jason Holder", "Rahul Tewatia", "Shahrukh Khan", "Kagiso Rabada", "Mohammed Siraj", "Prasidh Krishna", "Manav Suthar", "Gurnoor Singh Brar", "Ishant Sharma", "Ashok Sharma", "Luke Wood", "Kulwant Khejroliya", "Rashid Khan"]
        }
    };

    // --- 3. Modal Logic ---
    const modal = document.getElementById("teamModal");
    const closeBtn = document.querySelector(".close-modal");
    const detailButtons = document.querySelectorAll(".btn-details");

    // Modal DOM elements to update
    const modalLogo = document.getElementById("modalLogo");
    const modalTeamName = document.getElementById("modalTeamName");
    const modalTeamStats = document.getElementById("modalTeamStats");
    const modalSquadList = document.getElementById("modalSquadList");

    // Open Modal and populate data
    detailButtons.forEach(button => {
        button.addEventListener("click", function() {
            // Get the team ID from the parent card's data attribute
            const teamId = this.closest(".team-card").getAttribute("data-team");
            const data = teamsData[teamId];

            if (data) {
                // Populate Header
                modalLogo.src = data.logo;
                modalTeamName.textContent = data.name;
                modalTeamStats.textContent = data.stats;

                // Populate Squad List
                modalSquadList.innerHTML = ""; // Clear old list
                data.squad.forEach(player => {
                    const div = document.createElement("div");
                    div.className = "squad-item";
                    div.innerHTML = `<i class="fa-solid fa-user"></i> ${player}`;
                    modalSquadList.appendChild(div);
                });

                // Show Modal
                modal.classList.add("active");
            }
        });
    });

    // Close Modal when clicking the X button
    closeBtn.addEventListener("click", () => {
        modal.classList.remove("active");
    });

    // Close Modal when clicking outside the box
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("active");
        }
    });
});