/**
 * Cyber-Tech Main Script
 * Handles all interactivity, state management, and tools logic.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation & Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // 2. Terminal Animation
    

    // 3. Dashboard Counters
    animateCounters();

    // 4. Threats Data & Modals
    initThreats();

    // 5. Tools
    initPasswordStrength();
    initPasswordGenerator();
    initHashGenerator();
    initUrlChecker();

    // 6. Phishing Simulator
    initPhishingSimulator();

    // 7. Cyber Quiz
    initQuiz();

    // 8. Checklist
    initChecklist();

    // 9. Roadmap
    initRoadmap();
});

/* ==========================================================================
   TERMINAL ANIMATION
   ========================================================================== */
/* ==========================================================================
   DASHBOARD COUNTERS
   ========================================================================== */
function animateCounters() {
    const counters = [
        { id: 'stat-threats', target: 8 },
        { id: 'stat-tools', target: 4 },
        { id: 'stat-quiz', target: 10 },
        { id: 'stat-checklist', target: 10 }
    ];

    counters.forEach(counter => {
        const el = document.getElementById(counter.id);
        let count = 0;
        const interval = setInterval(() => {
            if (count < counter.target) {
                count++;
                el.innerText = count;
            } else {
                clearInterval(interval);
            }
        }, 150);
    });
}

/* ==========================================================================
   THREATS SECTION
   ========================================================================== */
const threatsData = [
    {
        id: "phishing",
        title: "Phishing",
        icon: "🎣",
        desc: "Fraudulent attempts to obtain sensitive information by disguising as a trustworthy entity.",
        risk: "High Risk",
        riskClass: "risk-high",
        what: "A social engineering attack where attackers deceive people into revealing sensitive data or installing malware.",
        how: "Attackers send emails or messages that look legitimate (e.g., from a bank), containing a malicious link or attachment.",
        signs: ["Urgent language", "Generic greetings", "Suspicious sender address", "Mismatched URLs"],
        prevent: ["Verify the sender", "Do not click unverified links", "Use spam filters", "Enable 2FA"]
    },
    {
        id: "malware",
        title: "Malware",
        icon: "🦠",
        desc: "Malicious software designed to disrupt, damage, or gain unauthorized access to a computer system.",
        risk: "High Risk",
        riskClass: "risk-high",
        what: "Software intentionally designed to cause disruption to a computer, server, client, or network.",
        how: "Infects systems through downloaded files, compromised websites, or vulnerabilities in software.",
        signs: ["Slow computer performance", "Unexpected pop-ups", "Disabled antivirus", "New unfamiliar icons"],
        prevent: ["Use reputable Antivirus", "Keep OS updated", "Don't download from untrusted sources"]
    },
    {
        id: "ransomware",
        title: "Ransomware",
        icon: "🔒",
        desc: "Malware that encrypts the victim's files, with the attacker demanding a ransom to restore access.",
        risk: "High Risk",
        riskClass: "risk-high",
        what: "A type of crypto-virology that threatens to publish data or perpetually block access to it unless a ransom is paid.",
        how: "Once executed, it quietly encrypts files. When done, it displays a lock screen with payment instructions.",
        signs: ["Inability to open files", "Files have strange extensions", "A ransom note appears on screen"],
        prevent: ["Regular offline backups", "Do not open suspicious attachments", "Network segmentation"]
    },
    {
        id: "ddos",
        title: "DDoS",
        icon: "🌐",
        desc: "Distributed Denial of Service attack aims to disrupt normal traffic by overwhelming the target.",
        risk: "Medium Risk",
        riskClass: "risk-med",
        what: "An attack where multiple compromised systems are used to target a single system, causing a denial of service.",
        how: "Botnets flood a target server with superfluous requests, overloading its capacity.",
        signs: ["Website becomes extremely slow", "Website goes entirely offline", "Unusual traffic spikes"],
        prevent: ["Use CDN services", "Implement rate limiting", "Configure firewalls to block bad traffic"]
    },
    {
        id: "sqli",
        title: "SQL Injection",
        icon: "🗄️",
        desc: "Code injection technique that might destroy or expose your database.",
        risk: "High Risk",
        riskClass: "risk-high",
        what: "A vulnerability in which an attacker interferes with the queries that an application makes to its database.",
        how: "Attackers input malicious SQL statements into input fields (like login forms) to manipulate the database.",
        signs: ["Database errors exposed to user", "Unauthorized data access or modification"],
        prevent: ["Use prepared statements (Parameterized Queries)", "Input validation and sanitization", "Principle of least privilege"]
    },
    {
        id: "xss",
        title: "Cross-Site Scripting",
        icon: "📜",
        desc: "Vulnerability that allows attackers to inject malicious scripts into webpages viewed by users.",
        risk: "Medium Risk",
        riskClass: "risk-med",
        what: "An attack where malicious scripts are injected into otherwise benign and trusted websites.",
        how: "An application includes untrusted data in a web page without proper validation or escaping.",
        signs: ["Unintended actions performed on behalf of user", "Stolen session cookies"],
        prevent: ["Escape untrusted data", "Use Content Security Policy (CSP)", "Validate input"]
    },
    {
        id: "bruteforce",
        title: "Brute Force",
        icon: "🔐",
        desc: "Trial-and-error method used to decode encrypted data such as passwords.",
        risk: "Medium Risk",
        riskClass: "risk-med",
        what: "An exhaustive search attack where an automated tool tries all possible password combinations.",
        how: "Tools rapidly submit hundreds of passwords per second until the correct one is found.",
        signs: ["Multiple failed login attempts in logs", "Account lockouts"],
        prevent: ["Strong password policies", "Account lockout mechanisms", "MFA/2FA implementation"]
    },
    {
        id: "social",
        title: "Social Engineering",
        icon: "🗣️",
        desc: "Psychological manipulation of people into performing actions or divulging confidential information.",
        risk: "High Risk",
        riskClass: "risk-high",
        what: "Exploiting human psychology rather than technical hacking techniques to gain access to systems or data.",
        how: "Impersonating IT staff, creating artificial emergencies, or baiting users with physical media.",
        signs: ["Requests for sensitive info over phone", "Pressure to act quickly", "Too good to be true offers"],
        prevent: ["Security awareness training", "Strict verification procedures", "A culture of security skepticism"]
    }
];

function initThreats() {
    const grid = document.getElementById('threat-grid');
    const modal = document.getElementById('threat-modal');
    const closeBtn = document.querySelector('.close-modal');

    // Render Cards
    threatsData.forEach(threat => {
        const card = document.createElement('div');
        card.className = 'threat-card glass-panel';
        card.innerHTML = `
            <div class="threat-icon">${threat.icon}</div>
            <h3>${threat.title}</h3>
            <span class="risk-level ${threat.riskClass}">${threat.risk}</span>
            <p>${threat.desc}</p>
            <button class="btn secondary-btn full-width mt-2" onclick="openThreatModal('${threat.id}')">Learn More</button>
        `;
        grid.appendChild(card);
    });

    // Close Modal Events
    closeBtn.onclick = () => modal.style.display = "none";
    window.onclick = (e) => {
        if (e.target == modal) modal.style.display = "none";
    }
}

window.openThreatModal = function(id) {
    const threat = threatsData.find(t => t.id === id);
    if (!threat) return;

    document.getElementById('modal-icon').innerText = threat.icon;
    document.getElementById('modal-title').innerText = threat.title;
    document.getElementById('modal-what').innerText = threat.what;
    document.getElementById('modal-how').innerText = threat.how;
    
    document.getElementById('modal-signs').innerHTML = threat.signs.map(s => `<li>${s}</li>`).join('');
    document.getElementById('modal-prevent').innerHTML = threat.prevent.map(p => `<li>${p}</li>`).join('');

    document.getElementById('threat-modal').style.display = "block";
}

/* ==========================================================================
   TOOLS: PASSWORD STRENGTH
   ========================================================================== */
function initPasswordStrength() {
    const input = document.getElementById('pw-check-input');
    const fill = document.getElementById('pw-strength-fill');
    const text = document.getElementById('pw-strength-text');
    
    const criteria = {
        length: { id: 'crit-length', re: /.{8,}/ },
        upper: { id: 'crit-upper', re: /[A-Z]/ },
        lower: { id: 'crit-lower', re: /[a-z]/ },
        number: { id: 'crit-number', re: /[0-9]/ },
        special: { id: 'crit-special', re: /[^A-Za-z0-9]/ }
    };

    input.addEventListener('input', () => {
        const val = input.value;
        let score = 0;

        if (val.length === 0) {
            fill.style.width = '0%';
            text.innerHTML = 'Strength: <span class="neutral">Unknown</span>';
            Object.values(criteria).forEach(c => {
                document.getElementById(c.id).className = 'invalid';
            });
            return;
        }

        Object.values(criteria).forEach(c => {
            const el = document.getElementById(c.id);
            if (c.re.test(val)) {
                el.className = 'valid';
                score++;
            } else {
                el.className = 'invalid';
            }
        });

        const percent = (score / 5) * 100;
        fill.style.width = `${percent}%`;

        if (score <= 2) {
            fill.style.backgroundColor = 'var(--danger)';
            text.innerHTML = 'Strength: <span style="color:var(--danger)">Weak</span>';
        } else if (score <= 4) {
            fill.style.backgroundColor = 'var(--warning)';
            text.innerHTML = 'Strength: <span style="color:var(--warning)">Medium</span>';
        } else {
            fill.style.backgroundColor = 'var(--success)';
            text.innerHTML = 'Strength: <span style="color:var(--success)">Strong</span>';
        }
    });
}

/* ==========================================================================
   TOOLS: PASSWORD GENERATOR
   ========================================================================== */
function initPasswordGenerator() {
    const slider = document.getElementById('pw-len-slider');
    const lenVal = document.getElementById('pw-len-val');
    const btn = document.getElementById('pw-gen-btn');
    const result = document.getElementById('pw-gen-result');
    const copyBtn = document.getElementById('pw-copy-btn');

    slider.addEventListener('input', () => { lenVal.innerText = slider.value; });

    btn.addEventListener('click', () => {
        const length = parseInt(slider.value);
        const useUpper = document.getElementById('pw-opt-upper').checked;
        const useLower = document.getElementById('pw-opt-lower').checked;
        const useNum = document.getElementById('pw-opt-numbers').checked;
        const useSym = document.getElementById('pw-opt-symbols').checked;

        const chars = {
            upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            lower: "abcdefghijklmnopqrstuvwxyz",
            num: "0123456789",
            sym: "!@#$%^&*()_+~`|}{[]:;?><,./-="
        };

        let charset = "";
        if (useUpper) charset += chars.upper;
        if (useLower) charset += chars.lower;
        if (useNum) charset += chars.num;
        if (useSym) charset += chars.sym;

        if (charset === "") {
            result.value = "Select at least one option!";
            return;
        }

        let password = "";
        // Ensure cryptography API randomness
        const array = new Uint32Array(length);
        window.crypto.getRandomValues(array);
        
        for (let i = 0; i < length; i++) {
            password += charset[array[i] % charset.length];
        }

        result.value = password;
    });

    copyBtn.addEventListener('click', () => {
        if (!result.value || result.value === "Select at least one option!") return;
        navigator.clipboard.writeText(result.value).then(() => {
            const orig = copyBtn.innerText;
            copyBtn.innerText = "Copied!";
            setTimeout(() => { copyBtn.innerText = orig; }, 2000);
        });
    });
}

/* ==========================================================================
   TOOLS: SHA-256 GENERATOR
   ========================================================================== */
function initHashGenerator() {
    const input = document.getElementById('hash-input');
    const result = document.getElementById('hash-result');
    const btn = document.getElementById('hash-gen-btn');
    const copyBtn = document.getElementById('hash-copy-btn');

    btn.addEventListener('click', async () => {
        const text = input.value;
        if (!text) {
            result.value = "";
            return;
        }
        
        // Use Web Crypto API
        const msgBuffer = new TextEncoder().encode(text);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        
        result.value = hashHex;
    });

    copyBtn.addEventListener('click', () => {
        if (!result.value) return;
        navigator.clipboard.writeText(result.value).then(() => {
            const orig = copyBtn.innerText;
            copyBtn.innerText = "Copied!";
            setTimeout(() => { copyBtn.innerText = orig; }, 2000);
        });
    });
}

/* ==========================================================================
   TOOLS: URL CHECKER
   ========================================================================== */
function initUrlChecker() {
    const btn = document.getElementById('url-check-btn');
    const input = document.getElementById('url-input');
    const box = document.getElementById('url-result-box');
    const levelText = document.getElementById('url-risk-level');
    const indicators = document.getElementById('url-indicators');

    btn.addEventListener('click', () => {
        let urlStr = input.value.trim();
        if (!urlStr) return;

        // Auto prepend http if missing for URL parser
        if (!urlStr.startsWith('http://') && !urlStr.startsWith('https://')) {
            urlStr = 'http://' + urlStr;
        }

        let url;
        try {
            url = new URL(urlStr);
        } catch (e) {
            box.classList.remove('hidden');
            levelText.innerText = "Risk Level: Invalid URL";
            levelText.style.color = "var(--danger)";
            indicators.innerHTML = "<li>Cannot parse this URL format.</li>";
            return;
        }

        let riskScore = 0;
        let findings = [];

        // 1. Protocol check
        if (url.protocol === 'http:') {
            riskScore += 2;
            findings.push("Uses unencrypted HTTP instead of HTTPS.");
        }

        // 2. IP Address check
        const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
        if (ipRegex.test(url.hostname)) {
            riskScore += 3;
            findings.push("Uses an IP address instead of a domain name.");
        }

        // 3. Excessive subdomains
        const parts = url.hostname.split('.');
        if (parts.length > 4) {
            riskScore += 1;
            findings.push("Contains an excessive number of subdomains.");
        }

        // 4. Unusual characters in hostname
        if (url.hostname.includes('@') || url.hostname.includes('-')) {
            riskScore += 1;
            findings.push("Domain contains hyphens or @ symbols, common in phishing.");
        }

        // 5. Very long URL
        if (url.href.length > 100) {
            riskScore += 1;
            findings.push("URL is unusually long, which can be used to hide true destination.");
        }

        box.classList.remove('hidden');
        indicators.innerHTML = findings.map(f => `<li>${f}</li>`).join('');

        if (riskScore === 0) {
            levelText.innerText = "Risk Level: Low Risk";
            levelText.style.color = "var(--success)";
            indicators.innerHTML = "<li>No immediate suspicious indicators found. (Always remain cautious)</li>";
        } else if (riskScore < 3) {
            levelText.innerText = "Risk Level: Review Carefully";
            levelText.style.color = "var(--warning)";
        } else {
            levelText.innerText = "Risk Level: Suspicious Indicators";
            levelText.style.color = "var(--danger)";
        }
    });
}

/* ==========================================================================
   PHISHING SIMULATOR
   ========================================================================== */
const phishingScenarios = [
    {
        sender: "Security Alert &lt;admin@paypa1.com&gt;",
        subject: "URGENT: Your account has been suspended",
        body: "Dear Customer,<br><br>We detected unusual activity on your account. Your account has been temporarily suspended.<br><br>Click the link below immediately to verify your identity and restore access:<br><br><a href='#' style='color:blue'>http://verify-paypa1-security.com/login</a><br><br>Failure to do so will result in permanent termination.",
        isPhish: true,
        explanation: "This is a phishing attempt.",
        indicators: ["Sender domain is 'paypa1.com' (number 1 instead of L)", "Creates a false sense of urgency", "Generic greeting ('Dear Customer')", "Suspicious link domain"]
    },
    {
        sender: "IT Helpdesk &lt;it@yourcompany.com&gt;",
        subject: "Mandatory Software Update",
        body: "Hello Team,<br><br>Please download and run the attached update tool to patch a critical zero-day vulnerability on your workstation.<br><br>Attachment: <b>Update_Tool_v2.exe</b><br><br>Regards,<br>IT Support",
        isPhish: true,
        explanation: "This is a phishing/malware delivery attempt.",
        indicators: ["Unexpected executable (.exe) attachment", "Bypasses standard patch management systems", "Appeals to authority (IT Dept)"]
    },
    {
        sender: "GitHub &lt;noreply@github.com&gt;",
        subject: "[GitHub] A new public key was added to your account",
        body: "Hey there,<br><br>A new public key was added to your account.<br>If you did not make this change, please review your account security settings immediately.<br><br>Go to https://github.com/settings/keys to manage your keys.<br><br>Thanks,<br>The GitHub Team",
        isPhish: false,
        explanation: "This is a legitimate security notification.",
        indicators: ["Legitimate sender domain", "Directs you to the real website without hiding the link", "Does not ask for password in the email", "Standard automated notification format"]
    },
    {
        sender: "HR Department &lt;hr-portal-external@gmail.com&gt;",
        subject: "Revised Salary Structure Q4",
        body: "Hi,<br><br>Please find the revised salary structure and bonus payouts for Q4 attached.<br><br>Attachment: <b>salary_q4.zip</b><br><br>Best,<br>Human Resources",
        isPhish: true,
        explanation: "This is a targeted phishing (spear-phishing) attempt.",
        indicators: ["Uses a public email provider (gmail.com) for official HR business", "Highly enticing subject (Salary/Bonus)", "ZIP attachment likely contains malware"]
    },
    {
        sender: "Netflix Support &lt;support@netflix.com&gt;",
        subject: "Payment Declined",
        body: "Hi [Your Name],<br><br>We were unable to process your last payment. To keep watching, please update your payment details.<br><br><button style='padding:10px;background:#e50914;color:white;border:none;'>Update Payment</button><br><br>Need help? Contact us at support-netflix@billing-update.com",
        isPhish: true,
        explanation: "This is a phishing attempt.",
        indicators: ["The reply-to/contact email 'billing-update.com' does not match the official domain", "Generic masking of links behind buttons", "Common tactic to steal credit card info"]
    }
];

let currentPhishIndex = 0;
let phishScore = 0;

function initPhishingSimulator() {
    document.getElementById('btn-phishing').onclick = () => checkPhishAnswer(true);
    document.getElementById('btn-legit').onclick = () => checkPhishAnswer(false);
    document.getElementById('btn-next-phish').onclick = nextPhishScenario;
    document.getElementById('btn-restart-phish').onclick = restartPhish;
    
    loadPhishScenario();
}

function loadPhishScenario() {
    const s = phishingScenarios[currentPhishIndex];
    document.getElementById('phish-sender').innerHTML = s.sender;
    document.getElementById('phish-subject').innerHTML = s.subject;
    document.getElementById('phish-body').innerHTML = s.body;
    
    document.getElementById('phishing-actions').classList.remove('hidden');
    document.getElementById('phishing-feedback').classList.add('hidden');
}

function checkPhishAnswer(userSaidPhish) {
    const s = phishingScenarios[currentPhishIndex];
    const isCorrect = userSaidPhish === s.isPhish;
    
    if (isCorrect) phishScore++;

    document.getElementById('phishing-actions').classList.add('hidden');
    
    const feedbackBox = document.getElementById('phishing-feedback');
    const title = document.getElementById('phishing-result-title');
    
    title.innerText = isCorrect ? "Correct!" : "Incorrect.";
    title.style.color = isCorrect ? "var(--success)" : "var(--danger)";
    
    document.getElementById('phishing-explanation').innerText = s.explanation;
    
    const ul = document.getElementById('phishing-indicators');
    ul.innerHTML = s.indicators.map(i => `<li>${i}</li>`).join('');
    
    feedbackBox.classList.remove('hidden');
    updateOverallScore();
}

function nextPhishScenario() {
    currentPhishIndex++;
    if (currentPhishIndex < phishingScenarios.length) {
        loadPhishScenario();
    } else {
        document.getElementById('phishing-active-area').classList.add('hidden');
        document.getElementById('phishing-end-area').classList.remove('hidden');
        document.getElementById('phishing-final-score').innerText = phishScore;
    }
}

function restartPhish() {
    currentPhishIndex = 0;
    phishScore = 0;
    document.getElementById('phishing-end-area').classList.add('hidden');
    document.getElementById('phishing-active-area').classList.remove('hidden');
    loadPhishScenario();
    updateOverallScore();
}


/* ==========================================================================
   CYBER QUIZ
   ========================================================================== */
const quizQuestions = [
    { q: "What is the primary purpose of a firewall?", options: ["To speed up internet connection", "To filter incoming and outgoing network traffic", "To store passwords securely", "To clean viruses from a computer"], ans: 1 },
    { q: "What does HTTPS stand for?", options: ["HyperText Transfer Protocol Secure", "HyperText Transfer Process Standard", "Host Traffic Transmission Protocol Secure", "Hyperlink Transfer Protocol System"], ans: 0 },
    { q: "Which of the following is an example of phishing?", options: ["A legitimate bank statement mailed to your house", "An email claiming you won a lottery, asking for bank details", "Downloading a software update from the official website", "A firewall blocking a malicious connection"], ans: 1 },
    { q: "What is a VPN used for?", options: ["To increase computer CPU speed", "To encrypt internet traffic and hide IP address", "To prevent physical theft of a laptop", "To generate strong passwords"], ans: 1 },
    { q: "What is the most secure way to store passwords?", options: ["In a text file on the desktop", "Written on a sticky note under the keyboard", "Using a reputable Password Manager app", "Using the same password for all accounts to easily remember it"], ans: 2 },
    { q: "Which is a characteristic of a strong password?", options: ["Contains only lowercase letters", "Is less than 6 characters long", "Is a common dictionary word like 'password'", "Combines uppercase, lowercase, numbers, and symbols"], ans: 3 },
    { q: "What does DDoS stand for?", options: ["Distributed Denial of Service", "Direct Data Operational System", "Digital Domain Object Security", "Dynamic Data Organization System"], ans: 0 },
    { q: "What is ransomware?", options: ["Software that optimizes PC performance", "Malware that encrypts your files and demands payment", "A tool used to crack passwords", "A type of secure communication protocol"], ans: 1 },
    { q: "What does Two-Factor Authentication (2FA) do?", options: ["Requires two different people to log in", "Requires a password and a secondary verification method (like an SMS code)", "Allows you to use two passwords", "Doubles your internet speed"], ans: 1 },
    { q: "Why is keeping software updated important?", options: ["It changes the UI colors", "It prevents the computer from getting old", "It patches known security vulnerabilities", "It uses up free hard drive space"], ans: 2 }
];

let currentQuizIndex = 0;
let quizScore = 0;
let selectedOption = null;

function initQuiz() {
    document.getElementById('btn-quiz-next').onclick = nextQuizQuestion;
    document.getElementById('btn-quiz-prev').onclick = prevQuizQuestion;
    document.getElementById('btn-quiz-restart').onclick = restartQuiz;
    loadQuizQuestion();
}

function loadQuizQuestion() {
    const q = quizQuestions[currentQuizIndex];
    document.getElementById('quiz-question').innerText = `${currentQuizIndex + 1}. ${q.q}`;
    
    document.getElementById('quiz-progress-text').innerText = `Question ${currentQuizIndex + 1} of ${quizQuestions.length}`;
    document.getElementById('quiz-progress-fill').style.width = `${((currentQuizIndex) / quizQuestions.length) * 100}%`;

    const optionsDiv = document.getElementById('quiz-options');
    optionsDiv.innerHTML = '';
    selectedOption = null;
    document.getElementById('btn-quiz-next').disabled = true;

    q.options.forEach((opt, index) => {
        const div = document.createElement('div');
        div.className = 'quiz-option';
        div.innerText = opt;
        div.onclick = () => selectQuizOption(div, index);
        optionsDiv.appendChild(div);
    });

    document.getElementById('btn-quiz-prev').disabled = currentQuizIndex === 0;
}

function selectQuizOption(div, index) {
    document.querySelectorAll('.quiz-option').forEach(el => el.classList.remove('selected'));
    div.classList.add('selected');
    selectedOption = index;
    document.getElementById('btn-quiz-next').disabled = false;
}

function nextQuizQuestion() {
    if (selectedOption === quizQuestions[currentQuizIndex].ans) {
        quizScore++;
    }
    
    currentQuizIndex++;
    if (currentQuizIndex < quizQuestions.length) {
        loadQuizQuestion();
    } else {
        finishQuiz();
    }
}

function prevQuizQuestion() {
    if (currentQuizIndex > 0) {
        currentQuizIndex--;
        // For simplicity in this demo, going back doesn't remember the previous answer or adjust score,
        // it just lets you look. Realistically we'd store an array of answers.
        // Reset score calculation for demo purposes.
        quizScore = 0; 
        loadQuizQuestion();
    }
}

function finishQuiz() {
    document.getElementById('quiz-active-area').classList.add('hidden');
    document.getElementById('quiz-end-area').classList.remove('hidden');
    document.getElementById('quiz-final-score').innerText = quizScore;
    
    let msg = "";
    if(quizScore >= 9) msg = "Excellent! You have a strong grasp of cybersecurity fundamentals.";
    else if(quizScore >= 6) msg = "Good job! But there's still room to learn more about protecting yourself.";
    else msg = "You might want to review the Threats section to improve your knowledge.";
    
    document.getElementById('quiz-feedback-msg').innerText = msg;
    updateOverallScore();
}

function restartQuiz() {
    currentQuizIndex = 0;
    quizScore = 0;
    document.getElementById('quiz-end-area').classList.add('hidden');
    document.getElementById('quiz-active-area').classList.remove('hidden');
    loadQuizQuestion();
    updateOverallScore();
}

/* ==========================================================================
   SECURITY CHECKLIST
   ========================================================================== */
const checklistData = [
    "Enable two-factor authentication",
    "Use strong unique passwords",
    "Use a password manager",
    "Keep software updated",
    "Avoid suspicious links",
    "Verify website domains",
    "Backup important files",
    "Secure your Wi-Fi",
    "Review account activity",
    "Avoid unknown downloads"
];

function initChecklist() {
    const container = document.getElementById('checklist-items');
    
    // Load state from local storage
    let savedState = JSON.parse(localStorage.getItem('cyberChecklist')) || Array(10).fill(false);

    checklistData.forEach((itemText, index) => {
        const div = document.createElement('div');
        div.className = `checklist-item ${savedState[index] ? 'completed' : ''}`;
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = savedState[index];
        
        const span = document.createElement('span');
        span.innerText = itemText;

        div.appendChild(checkbox);
        div.appendChild(span);

        // Toggle logic
        div.onclick = (e) => {
            if (e.target !== checkbox) {
                checkbox.checked = !checkbox.checked;
            }
            savedState[index] = checkbox.checked;
            div.className = `checklist-item ${checkbox.checked ? 'completed' : ''}`;
            
            localStorage.setItem('cyberChecklist', JSON.stringify(savedState));
            updateChecklistProgress();
        };

        container.appendChild(div);
    });

    document.getElementById('btn-reset-checklist').onclick = () => {
        localStorage.setItem('cyberChecklist', JSON.stringify(Array(10).fill(false)));
        container.innerHTML = '';
        initChecklist();
        updateChecklistProgress();
    };

    updateChecklistProgress();
}

function updateChecklistProgress() {
    const state = JSON.parse(localStorage.getItem('cyberChecklist')) || Array(10).fill(false);
    const completed = state.filter(Boolean).length;
    const percent = Math.round((completed / 10) * 100);
    
    document.getElementById('checklist-percent').innerText = percent;
    document.getElementById('checklist-progress-fill').style.width = `${percent}%`;
    
    updateOverallScore();
}

/* ==========================================================================
   ROADMAP
   ========================================================================== */
const roadmapData = [
    { title: "CYBERSECURITY BASICS", desc: "Understand core concepts: CIA Triad (Confidentiality, Integrity, Availability), authentication, authorization, and basic security hygiene." },
    { title: "NETWORKING", desc: "Learn how computers communicate. Topics include OSI model, TCP/IP, DNS, HTTP/HTTPS, firewalls, and routers." },
    { title: "LINUX", desc: "Master the Linux command line. Most security tools and servers run on Linux. Learn file permissions, scripting, and system administration." },
    { title: "PROGRAMMING", desc: "Learn to read and write code. Python is highly recommended for scripting. Understand JavaScript and HTML for web security." },
    { title: "WEB SECURITY", desc: "Study common web vulnerabilities like the OWASP Top 10 (SQLi, XSS, CSRF). Learn how web applications are built and broken." },
    { title: "ETHICAL HACKING", desc: "Learn attacker methodologies legally. Study reconnaissance, scanning, gaining access, maintaining access, and covering tracks." },
    { title: "PENETRATION TESTING", desc: "Apply ethical hacking in a structured way to assess systems. Write professional reports and provide remediation advice." },
    { title: "ADVANCED CYBERSECURITY", desc: "Specialize in areas like Malware Analysis, Reverse Engineering, Incident Response, Cloud Security, or Forensics." }
];

function initRoadmap() {
    const timeline = document.getElementById('roadmap-timeline');
    
    roadmapData.forEach((item, i) => {
        const div = document.createElement('div');
        div.className = 'roadmap-item';
        div.innerHTML = `
            <div class="roadmap-content glass-panel">
                <h3>${i + 1}. ${item.title}</h3>
                <div class="roadmap-details">${item.desc}</div>
            </div>
        `;
        
        div.querySelector('.roadmap-content').onclick = function() {
            // Toggle active state
            const isActive = div.classList.contains('active');
            document.querySelectorAll('.roadmap-item').forEach(el => el.classList.remove('active'));
            if (!isActive) div.classList.add('active');
        };
        
        timeline.appendChild(div);
    });
}

/* ==========================================================================
   SECURITY AWARENESS SCORE
   ========================================================================== */
function updateOverallScore() {
    // Score based on: 
    // Phishing (out of 5) -> 33.3% weight
    // Quiz (out of 10) -> 33.3% weight
    // Checklist (out of 10) -> 33.3% weight
    
    let checklistCompleted = 0;
    const state = JSON.parse(localStorage.getItem('cyberChecklist'));
    if (state) {
        checklistCompleted = state.filter(Boolean).length;
    }

    // Treat non-completed sections as 0 for the live calc
    const pScore = (phishScore / 5) * 100 || 0;
    const qScore = (quizScore / 10) * 100 || 0;
    const cScore = (checklistCompleted / 10) * 100 || 0;

    const total = Math.round((pScore + qScore + cScore) / 3);
    
    const circle = document.getElementById('circular-score');
    const valueTxt = document.getElementById('score-value');
    
    valueTxt.innerText = `${total}%`;
    
    // Update conic gradient
    let color = 'var(--danger)';
    if (total > 40) color = 'var(--warning)';
    if (total > 75) color = 'var(--success)';
    
    circle.style.background = `conic-gradient(${color} ${total * 3.6}deg, #222 ${total * 3.6}deg)`;
    valueTxt.style.color = color;
}


/* ==========================================================================
   SCROLL SPY & NAVBAR LOGIC
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = Array.from(navLinks).map(link => {
        const id = link.getAttribute('href').substring(1);
        return document.getElementById(id);
    }).filter(section => section !== null);

    // Navbar scroll background
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Intersection Observer for Scroll Spy
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px', // Trigger when section is in the middle 
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                // Remove active class from all
                navLinks.forEach(link => link.classList.remove('active'));
                // Add active class to corresponding link
                const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // Smooth scroll for nav clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const id = link.getAttribute('href').substring(1);
            const target = document.getElementById(id);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
            // Close mobile menu if open
            if (window.innerWidth <= 1024) {
                document.querySelector('.hamburger').classList.remove('active');
                document.getElementById('nav-links').classList.remove('active');
            }
        });
    });

    // Mobile Hamburger Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.getElementById('nav-links');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
});
