// NIYANTRAK AI Policy Chatbot with Backend Simulation
class PolicyChatbot {
    constructor() {
        this.isOpen = false;
        this.isAnalyzing = false;
        this.conversationHistory = [];
        this.currentAnalysis = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeBackend();
    }

    setupEventListeners() {
        // Input handling
        const chatInput = document.getElementById('chatInput');
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Auto-resize textarea
        chatInput.addEventListener('input', this.autoResizeInput);
    }

    // Mock Backend API Simulation
    initializeBackend() {
        this.policyDatabase = {
            tax: {
                name: "Tax Policy",
                baseImpact: {
                    economic: 0.15,
                    social: 0.08,
                    environmental: 0.02
                }
            },
            healthcare: {
                name: "Healthcare Policy",
                baseImpact: {
                    economic: -0.05,
                    social: 0.25,
                    environmental: 0.01
                }
            },
            education: {
                name: "Education Policy", 
                baseImpact: {
                    economic: 0.12,
                    social: 0.20,
                    environmental: 0.05
                }
            },
            environment: {
                name: "Environmental Policy",
                baseImpact: {
                    economic: -0.08,
                    social: 0.15,
                    environmental: 0.30
                }
            }
        };

        this.aiModels = {
            nlp: this.nlpProcessor.bind(this),
            ml: this.mlPredictor.bind(this),
            agent: this.agentBasedSimulation.bind(this),
            systemDynamics: this.systemDynamicsModel.bind(this)
        };
    }

    // Natural Language Processing
    nlpProcessor(policyText) {
        const keywords = {
            tax: ['tax', 'taxation', 'revenue', 'income tax', 'corporate tax'],
            healthcare: ['healthcare', 'medical', 'hospital', 'health insurance', 'medicare'],
            education: ['education', 'school', 'university', 'student', 'teacher'],
            environment: ['environment', 'climate', 'carbon', 'renewable', 'pollution'],
            economy: ['economy', 'GDP', 'unemployment', 'inflation', 'wages'],
            social: ['welfare', 'social', 'poverty', 'inequality', 'benefits']
        };

        const extractedData = {
            policyType: null,
            percentage: null,
            sector: null,
            affectedGroup: null,
            timeframe: null
        };

        // Extract policy type
        for (const [type, words] of Object.entries(keywords)) {
            if (words.some(word => policyText.toLowerCase().includes(word))) {
                extractedData.policyType = type;
                break;
            }
        }

        // Extract percentage
        const percentageMatch = policyText.match(/(\d+(?:\.\d+)?)\s*%/);
        if (percentageMatch) {
            extractedData.percentage = parseFloat(percentageMatch[1]);
        }

        // Extract numbers for magnitude
        const numberMatch = policyText.match(/(\d+(?:\.\d+)?)/);
        if (numberMatch && !extractedData.percentage) {
            extractedData.percentage = parseFloat(numberMatch[1]);
        }

        return extractedData;
    }

    // Machine Learning Predictor
    mlPredictor(policyData) {
        const basePolicy = this.policyDatabase[policyData.policyType] || this.policyDatabase.tax;
        const multiplier = (policyData.percentage || 10) / 10;

        return {
            gdpChange: (basePolicy.baseImpact.economic * multiplier).toFixed(2),
            unemploymentChange: (basePolicy.baseImpact.economic * -0.5 * multiplier).toFixed(2),
            inflationChange: (basePolicy.baseImpact.economic * 0.3 * multiplier).toFixed(2),
            confidence: Math.min(85 + Math.random() * 10, 95).toFixed(1)
        };
    }

    // Agent-Based Simulation
    agentBasedSimulation(policyData) {
        const agents = {
            lowIncome: Math.random() * 0.4 + 0.1,
            middleIncome: Math.random() * 0.3 + 0.2,
            highIncome: Math.random() * 0.2 + 0.1,
            businesses: Math.random() * 0.25 + 0.15
        };

        return {
            populationImpact: agents,
            behaviorChanges: {
                consumption: ((Math.random() - 0.5) * 20).toFixed(1),
                savings: ((Math.random() - 0.5) * 15).toFixed(1),
                investment: ((Math.random() - 0.5) * 25).toFixed(1)
            }
        };
    }

    // System Dynamics Model
    systemDynamicsModel(policyData) {
        const timeHorizons = [1, 5, 10, 20];
        const impacts = {};

        timeHorizons.forEach(year => {
            const decay = Math.exp(-year * 0.1);
            const growth = 1 + (year * 0.02);
            
            impacts[`year${year}`] = {
                economic: (Math.random() * 20 - 10) * decay * growth,
                social: (Math.random() * 15 - 7.5) * decay * growth,
                environmental: (Math.random() * 12 - 6) * decay * growth
            };
        });

        return impacts;
    }

    // Main Analysis Engine
    async analyzePolicy(policyText) {
        this.showTyping();
        
        // Simulate AI processing time
        await this.delay(2000);

        // Step 1: NLP Processing
        const extractedData = this.aiModels.nlp(policyText);
        
        // Step 2: ML Prediction
        const mlResults = this.aiModels.ml(extractedData);
        
        // Step 3: Agent-Based Simulation
        const agentResults = this.aiModels.agent(extractedData);
        
        // Step 4: System Dynamics
        const systemResults = this.aiModels.systemDynamics(extractedData);

        this.hideTyping();

        const analysis = {
            policy: policyText,
            extractedData,
            results: {
                economic: mlResults,
                social: agentResults,
                environmental: systemResults,
                confidence: mlResults.confidence
            },
            timestamp: new Date().toISOString()
        };

        this.currentAnalysis = analysis;
        return analysis;
    }

    // UI Functions
    openChatbot() {
        const container = document.querySelector('.chatbot-container');
        const toggle = document.getElementById('chatbotToggle');
        
        container.classList.add('active');
        toggle.classList.add('hidden');
        this.isOpen = true;
        
        // Focus on input
        setTimeout(() => {
            document.getElementById('chatInput').focus();
        }, 300);
    }

    closeChatbot() {
        const container = document.querySelector('.chatbot-container');
        const toggle = document.getElementById('chatbotToggle');
        
        container.classList.remove('active');
        toggle.classList.remove('hidden');
        this.isOpen = false;
    }

    toggleChatbot() {
        const container = document.querySelector('.chatbot-container');
        container.classList.toggle('minimized');
    }

    async sendMessage() {
        const input = document.getElementById('chatInput');
        if (!input) {
            console.error('Chat input not found');
            return;
        }
        
        const message = input.value.trim();
        
        if (!message || this.isAnalyzing) return;

        // Add user message to chat
        this.addMessage(message, 'user');
        
        // Clear and reset input field
        input.value = '';
        input.style.height = 'auto';
        input.style.height = '40px'; // Reset to default height
        
        // Ensure input container visibility
        const inputContainer = input.closest('.chat-input-container');
        if (inputContainer) {
            inputContainer.style.display = 'block';
            inputContainer.style.position = 'relative';
        }

        // Check if it's a policy analysis request
        if (this.isPolicyAnalysisRequest(message)) {
            this.isAnalyzing = true;
            
            try {
                const analysis = await this.analyzePolicy(message);
                this.addAnalysisMessage(analysis);
                this.showAnalysisPanel(analysis);
            } catch (error) {
                this.addMessage("Sorry, I encountered an error while analyzing the policy. Please try again.", 'bot');
            }
            
            this.isAnalyzing = false;
        } else {
            // Handle general conversation
            const response = this.generateResponse(message);
            await this.delay(1000);
            this.addMessage(response, 'bot');
        }

        // Ensure layout integrity after message exchange
        this.ensureChatbotLayout();
    }

    isPolicyAnalysisRequest(message) {
        const policyKeywords = ['policy', 'analyze', 'impact', 'effect', 'tax', 'healthcare', 'education', 'environment', 'increase', 'decrease', 'implement'];
        return policyKeywords.some(keyword => message.toLowerCase().includes(keyword));
    }

    addMessage(text, sender) {
        const messagesContainer = document.getElementById('chatMessages');
        if (!messagesContainer) {
            console.error('Chat messages container not found');
            return;
        }
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = sender === 'bot' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        content.innerHTML = `<p>${text}</p>`;
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        
        messagesContainer.appendChild(messageDiv);
        
        // Ensure scroll to bottom
        requestAnimationFrame(() => {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        });
    }

    addAnalysisMessage(analysis) {
        const summary = `I've analyzed your policy: "${analysis.policy}". 
        
The analysis shows:
• Economic Impact: ${analysis.results.economic.gdpChange}% GDP change
• Confidence Level: ${analysis.results.confidence}%
• Policy Type: ${analysis.extractedData.policyType || 'General'}

Click the detailed analysis panel to see comprehensive results across economic, social, and environmental dimensions.`;

        this.addMessage(summary, 'bot');
    }

    showAnalysisPanel(analysis) {
        const panel = document.getElementById('analysisPanel');
        panel.style.display = 'flex';
        this.renderAnalysisTab('economic', analysis);
    }

    closeAnalysisPanel() {
        document.getElementById('analysisPanel').style.display = 'none';
    }

    showTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        
        // Render tab content
        this.renderAnalysisTab(tabName, this.currentAnalysis);
    }

    renderAnalysisTab(tabName, analysis) {
        const tabContent = document.getElementById('tabContent');
        
        switch(tabName) {
            case 'economic':
                tabContent.innerHTML = this.renderEconomicTab(analysis);
                break;
            case 'social':
                tabContent.innerHTML = this.renderSocialTab(analysis);
                break;
            case 'environmental':
                tabContent.innerHTML = this.renderEnvironmentalTab(analysis);
                break;
            case 'recommendations':
                tabContent.innerHTML = this.renderRecommendationsTab(analysis);
                break;
        }
    }

    renderEconomicTab(analysis) {
        const economic = analysis.results.economic;
        return `
            <div class="impact-card">
                <h5>GDP Impact</h5>
                <div class="metric">${economic.gdpChange}%</div>
                <div class="description">Expected change in Gross Domestic Product</div>
                <div class="confidence-bar">
                    <div class="confidence-fill" style="width: ${economic.confidence}%"></div>
                </div>
            </div>
            
            <div class="impact-card">
                <h5>Unemployment Rate</h5>
                <div class="metric">${economic.unemploymentChange}%</div>
                <div class="description">Projected change in unemployment levels</div>
            </div>
            
            <div class="impact-card">
                <h5>Inflation Impact</h5>
                <div class="metric">${economic.inflationChange}%</div>
                <div class="description">Expected inflation rate adjustment</div>
            </div>
            
            <div class="chart-container">
                <div class="chart-title">Economic Indicators Forecast</div>
                <div style="margin: 1rem 0;">
                    <div style="margin-bottom: 0.5rem;">GDP Growth</div>
                    <div class="progress-bar">
                        <div class="progress-fill ${economic.gdpChange > 0 ? 'positive' : 'negative'}" 
                             style="width: ${Math.abs(economic.gdpChange) * 10}%">
                            ${economic.gdpChange}%
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderSocialTab(analysis) {
        const social = analysis.results.social;
        return `
            <div class="impact-card">
                <h5>Population Impact Distribution</h5>
                <div class="description">How different income groups are affected</div>
            </div>
            
            <div class="chart-container">
                <div class="chart-title">Impact by Income Group</div>
                ${Object.entries(social.populationImpact).map(([group, impact]) => `
                    <div style="margin: 1rem 0;">
                        <div style="margin-bottom: 0.5rem;">${group.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</div>
                        <div class="progress-bar">
                            <div class="progress-fill ${impact > 0.2 ? 'positive' : 'neutral'}" 
                                 style="width: ${impact * 100}%">
                                ${(impact * 100).toFixed(1)}%
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="impact-card">
                <h5>Behavioral Changes</h5>
                <div class="description">
                    • Consumption: ${social.behaviorChanges.consumption}% change<br>
                    • Savings: ${social.behaviorChanges.savings}% change<br>
                    • Investment: ${social.behaviorChanges.investment}% change
                </div>
            </div>
        `;
    }

    renderEnvironmentalTab(analysis) {
        const environmental = analysis.results.environmental;
        return `
            <div class="impact-card">
                <h5>Long-term Environmental Impact</h5>
                <div class="description">System dynamics model predictions over time</div>
            </div>
            
            ${Object.entries(environmental).map(([timeframe, impacts]) => `
                <div class="chart-container">
                    <div class="chart-title">${timeframe.replace('year', 'Year ')} Projection</div>
                    <div style="margin: 1rem 0;">
                        <div style="margin-bottom: 0.5rem;">Environmental Score</div>
                        <div class="progress-bar">
                            <div class="progress-fill ${impacts.environmental > 0 ? 'positive' : 'negative'}" 
                                 style="width: ${Math.abs(impacts.environmental) * 5}%">
                                ${impacts.environmental.toFixed(1)}%
                            </div>
                        </div>
                    </div>
                </div>
            `).join('')}
        `;
    }

    renderRecommendationsTab(analysis) {
        return `
            <div class="impact-card">
                <h5>AI-Generated Recommendations</h5>
                <div class="description">
                    Based on the comprehensive analysis of your policy proposal:
                </div>
            </div>
            
            <div class="impact-card">
                <h5>🎯 Optimization Opportunities</h5>
                <div class="description">
                    • Consider phasing implementation over 2-3 years to reduce economic shock<br>
                    • Add targeted support for affected low-income groups<br>
                    • Include monitoring metrics for real-time adjustment
                </div>
            </div>
            
            <div class="impact-card">
                <h5>⚠️ Risk Mitigation</h5>
                <div class="description">
                    • Monitor unemployment levels closely in first 6 months<br>
                    • Prepare contingency measures for unexpected inflation<br>
                    • Establish stakeholder communication plan
                </div>
            </div>
            
            <div class="impact-card">
                <h5>📊 Alternative Scenarios</h5>
                <div class="description">
                    • Reduced implementation: 50% magnitude could achieve 70% of benefits with 40% of risks<br>
                    • Targeted approach: Focus on specific sectors for more controlled impact<br>
                    • Pilot program: Test in select regions before full rollout
                </div>
            </div>
        `;
    }

    generateResponse(message) {
        const responses = {
            greeting: "Hello! I'm NIYANTRAK, your AI policy analysis assistant. I can help you simulate and analyze government policies using advanced AI models.",
            features: "I use a hybrid simulation framework combining Machine Learning, Agent-Based Modeling, and System Dynamics to predict policy outcomes.",
            help: "To get started, describe a policy you'd like to analyze. For example: 'Increase minimum wage by 15%' or 'Implement carbon tax of $50 per ton'.",
            default: "I understand. Could you provide more details about the specific policy you'd like me to analyze? I can examine economic, social, and environmental impacts."
        };

        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            return responses.greeting;
        } else if (lowerMessage.includes('feature') || lowerMessage.includes('how')) {
            return responses.features;
        } else if (lowerMessage.includes('help')) {
            return responses.help;
        } else {
            return responses.default;
        }
    }

    // Quick Action Functions
    startPolicyAnalysis() {
        this.addMessage("Great! Please describe the policy you'd like me to analyze. For example:\n\n• 'Increase corporate tax rate by 5%'\n• 'Implement universal healthcare'\n• 'Reduce education funding by 10%'\n\nI'll analyze the economic, social, and environmental impacts for you.", 'bot');
    }

    showExamples() {
        document.getElementById('templatesModal').style.display = 'flex';
    }

    showFeatures() {
        const featuresText = `🧠 **AI Understanding Layer**
• Natural Language Processing for policy interpretation
• Parameter extraction (sector, magnitude, affected groups)

🔄 **Hybrid Simulation Engine**
• Machine Learning predictions from historical data
• Agent-Based Modeling for behavioral simulation
• System Dynamics for long-term feedback loops

📊 **Policy Impact Analysis**
• Economic impact assessment (GDP, employment, inflation)
• Social impact distribution across demographics
• Environmental outcome predictions
• Confidence scoring and uncertainty quantification`;

        this.addMessage(featuresText, 'bot');
    }

    useTemplate(templateType) {
        const templates = {
            tax: "Increase corporate tax rate by 5% to fund infrastructure projects",
            healthcare: "Implement universal healthcare coverage for all citizens under 65",
            education: "Increase education budget by 20% focusing on STEM programs",
            environment: "Implement carbon tax of $40 per ton of CO2 emissions",
            economy: "Reduce federal interest rate by 0.5% to stimulate economic growth",
            social: "Introduce universal basic income of $1000 per month for unemployed citizens"
        };

        document.getElementById('chatInput').value = templates[templateType];
        this.closeModal('templatesModal');
    }

    closeModal(modalId) {
        document.getElementById(modalId).style.display = 'none';
    }

    // Utility Functions
    showTyping() {
        document.getElementById('typingIndicator').style.display = 'flex';
        const messages = document.getElementById('chatMessages');
        messages.scrollTop = messages.scrollHeight;
    }

    hideTyping() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.style.display = 'none';
        }
    }

    // Method to ensure chatbot layout integrity
    ensureChatbotLayout() {
        const chatbotContainer = document.querySelector('.chatbot-main-container');
        const chatInput = document.getElementById('chatInput');
        const inputContainer = document.querySelector('.chat-input-container');
        
        if (chatbotContainer) {
            chatbotContainer.style.display = 'flex';
            chatbotContainer.style.flexDirection = 'column';
        }
        
        if (inputContainer) {
            inputContainer.style.display = 'block';
            inputContainer.style.flexShrink = '0';
            inputContainer.style.position = 'relative';
            inputContainer.style.zIndex = '10';
        }
        
        if (chatInput) {
            chatInput.style.display = 'block';
            chatInput.disabled = false;
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    autoResizeInput(e) {
        const textarea = e.target;
        if (!textarea) return;
        
        // Reset height to auto to get the correct scrollHeight
        textarea.style.height = 'auto';
        
        // Calculate new height with limits
        const newHeight = Math.min(textarea.scrollHeight, 120); // Max height 120px
        textarea.style.height = newHeight + 'px';
        
        // Ensure the input container remains visible
        const inputContainer = textarea.closest('.chat-input-container');
        if (inputContainer) {
            inputContainer.style.minHeight = '80px';
        }
    }

    // File and Voice Input (Placeholder functions)
    attachFile() {
        alert('File upload feature coming soon! You can currently input policy text directly.');
    }

    voiceInput() {
        if ('webkitSpeechRecognition' in window) {
            const recognition = new webkitSpeechRecognition();
            recognition.onresult = (event) => {
                document.getElementById('chatInput').value = event.results[0][0].transcript;
            };
            recognition.start();
        } else {
            alert('Voice input not supported in your browser. Please type your policy description.');
        }
    }
}

// Global functions for HTML onclick events
let chatbot;

function sendMessage() {
    if (chatbot) {
        chatbot.sendMessage();
    }
}

function useQuickExample(type) {
    if (chatbot) {
        const examples = {
            tax: "Increase corporate tax rate by 5% to fund infrastructure projects",
            healthcare: "Implement universal healthcare coverage for all citizens",
            environment: "Implement carbon tax of $50 per ton of CO2 emissions"
        };
        
        document.getElementById('chatInput').value = examples[type];
        chatbot.sendMessage();
    }
}

// Initialize chatbot when page loads
document.addEventListener('DOMContentLoaded', () => {
    chatbot = new PolicyChatbot();
});