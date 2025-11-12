// Sidebar functionality
class SidebarManager {
    constructor() {
        this.sidebar = document.getElementById('sidebar');
        this.sidebarToggle = document.getElementById('sidebarToggle');
        this.navItems = document.querySelectorAll('.nav-item');
        this.contentSections = document.querySelectorAll('.content-section');
        this.isCollapsed = false;
        this.isMobile = window.innerWidth <= 768;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.handleResize();
    }

    setupEventListeners() {
        // Sidebar toggle
        this.sidebarToggle.addEventListener('click', () => {
            this.toggleSidebar();
        });

        // Navigation items
        this.navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const section = item.getAttribute('data-section');
                this.showSection(section);
                this.setActiveNav(item);
            });
        });

        // Window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // Close mobile sidebar when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isMobile && 
                !this.sidebar.contains(e.target) && 
                !this.sidebarToggle.contains(e.target)) {
                this.closeMobileSidebar();
            }
        });
    }

    toggleSidebar() {
        if (this.isMobile) {
            this.sidebar.classList.toggle('mobile-open');
        } else {
            this.isCollapsed = !this.isCollapsed;
            this.sidebar.classList.toggle('collapsed', this.isCollapsed);
        }
    }

    closeMobileSidebar() {
        if (this.isMobile) {
            this.sidebar.classList.remove('mobile-open');
        }
    }

    showSection(sectionId) {
        // Hide all sections
        this.contentSections.forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Close mobile sidebar after navigation
        this.closeMobileSidebar();
    }

    setActiveNav(activeItem) {
        // Remove active class from all nav items
        this.navItems.forEach(item => {
            item.classList.remove('active');
        });

        // Add active class to clicked item
        activeItem.classList.add('active');
    }

    handleResize() {
        this.isMobile = window.innerWidth <= 768;
        
        if (this.isMobile) {
            this.sidebar.classList.remove('collapsed');
            this.sidebar.classList.remove('mobile-open');
        } else {
            this.sidebar.classList.remove('mobile-open');
        }
    }
}

// Template management
class TemplateManager {
    constructor() {
        this.templates = {
            // Economic Policies
            'tax-increase': {
                title: "Corporate Tax Increase",
                content: "Increase corporate tax rate by 5% to fund infrastructure projects and reduce budget deficit",
                category: "Economic"
            },
            'minimum-wage': {
                title: "Minimum Wage Adjustment", 
                content: "Raise federal minimum wage by 15% over 2 years, from $7.25 to $8.34 per hour",
                category: "Economic"
            },
            'stimulus': {
                title: "Economic Stimulus Package",
                content: "Implement $500 billion economic stimulus package including direct payments, unemployment benefits, and business loans",
                category: "Economic"
            },

            // Healthcare Policies
            'universal-healthcare': {
                title: "Universal Healthcare Implementation",
                content: "Implement universal healthcare coverage for all citizens with government-funded insurance program",
                category: "Healthcare"
            },
            'prescription-drugs': {
                title: "Prescription Drug Price Control",
                content: "Cap prescription drug prices at 200% of manufacturing cost and allow Medicare to negotiate drug prices",
                category: "Healthcare"
            },
            'mental-health': {
                title: "Mental Health Initiative",
                content: "Increase mental health funding by 50% and expand community mental health services nationwide",
                category: "Healthcare"
            },

            // Environmental Policies
            'carbon-tax': {
                title: "Carbon Tax Implementation",
                content: "Implement carbon tax of $50 per ton of CO2 emissions with revenue recycling to households",
                category: "Environmental"
            },
            'renewable-energy': {
                title: "Renewable Energy Mandate",
                content: "Require 50% renewable energy generation by 2030 through federal renewable portfolio standard",
                category: "Environmental"
            },
            'electric-vehicles': {
                title: "Electric Vehicle Incentives",
                content: "Provide $10,000 tax credit for electric vehicle purchases and expand charging infrastructure",
                category: "Environmental"
            },

            // Education Policies
            'free-tuition': {
                title: "Free College Tuition",
                content: "Make public university tuition free for all students from families earning less than $125,000 annually",
                category: "Education"
            },
            'teacher-pay': {
                title: "Teacher Salary Increase",
                content: "Increase public school teacher salaries by 20% nationwide over 3 years with federal funding support",
                category: "Education"
            },
            'student-debt': {
                title: "Student Loan Forgiveness",
                content: "Forgive up to $50,000 in federal student loan debt for borrowers earning less than $100,000 annually",
                category: "Education"
            },

            // Social Policies
            'universal-basic-income': {
                title: "Universal Basic Income Pilot",
                content: "Implement $1,000 monthly universal basic income pilot program for unemployed citizens in 10 states",
                category: "Social"
            },
            'affordable-housing': {
                title: "Affordable Housing Initiative",
                content: "Invest $100 billion in affordable housing construction and rental assistance programs",
                category: "Social"
            },
            'childcare-support': {
                title: "Universal Childcare Program",
                content: "Provide universal childcare for children under 5 with sliding scale fees based on family income",
                category: "Social"
            },

            // Technology & Innovation
            'broadband-access': {
                title: "Rural Broadband Expansion",
                content: "Invest $50 billion in rural broadband infrastructure to provide high-speed internet access nationwide",
                category: "Technology"
            },
            'ai-regulation': {
                title: "AI Ethics and Regulation Framework",
                content: "Establish comprehensive AI governance framework with ethical guidelines and accountability measures",
                category: "Technology"
            },

            // Immigration Policies
            'immigration-reform': {
                title: "Comprehensive Immigration Reform",
                content: "Provide pathway to citizenship for undocumented immigrants and increase legal immigration quotas by 25%",
                category: "Immigration"
            },
            'refugee-assistance': {
                title: "Refugee Resettlement Program",
                content: "Increase refugee admission ceiling to 125,000 annually and expand resettlement support services",
                category: "Immigration"
            },

            // Criminal Justice
            'police-reform': {
                title: "Police Reform Initiative",
                content: "Implement nationwide police training reform, accountability measures, and community policing programs",
                category: "Criminal Justice"
            },
            'prison-reform': {
                title: "Criminal Justice Reform",
                content: "Reduce mandatory minimum sentences and expand rehabilitation programs to reduce recidivism",
                category: "Criminal Justice"
            }
        };

        this.recentChats = [
            {
                id: 'tax-analysis-1',
                title: 'Corporate Tax Analysis',
                description: 'Analyzed 5% corporate tax increase impact',
                time: '2 hours ago',
                icon: 'fas fa-coins'
            },
            {
                id: 'healthcare-1',
                title: 'Healthcare Policy Simulation',
                description: 'Universal healthcare implementation study',
                time: '1 day ago',
                icon: 'fas fa-heartbeat'
            },
            {
                id: 'carbon-tax-1',
                title: 'Carbon Tax Impact Assessment',
                description: 'Environmental and economic effects analysis',
                time: '3 days ago',
                icon: 'fas fa-leaf'
            },
            {
                id: 'education-reform-1',
                title: 'Education Funding Analysis',
                description: 'Teacher salary increase policy impact',
                time: '1 week ago',
                icon: 'fas fa-graduation-cap'
            },
            {
                id: 'minimum-wage-1',
                title: 'Minimum Wage Impact Study',
                description: '15% minimum wage increase simulation',
                time: '2 weeks ago',
                icon: 'fas fa-dollar-sign'
            }
        ];
    }

    getTemplate(templateId) {
        return this.templates[templateId] || null;
    }

    getAllTemplates() {
        return this.templates;
    }

    getTemplatesByCategory(category) {
        return Object.entries(this.templates)
            .filter(([id, template]) => template.category === category)
            .reduce((acc, [id, template]) => {
                acc[id] = template;
                return acc;
            }, {});
    }

    getRecentChats() {
        return this.recentChats;
    }
}

// Chat management
class ChatManager {
    constructor() {
        this.currentChatId = null;
        this.chatHistory = new Map();
    }

    saveChat(chatId, messages) {
        this.chatHistory.set(chatId, {
            id: chatId,
            messages: messages,
            timestamp: new Date().toISOString()
        });
    }

    loadChat(chatId) {
        return this.chatHistory.get(chatId) || null;
    }

    getAllChats() {
        return Array.from(this.chatHistory.values());
    }

    deleteChat(chatId) {
        this.chatHistory.delete(chatId);
    }
}

// Global instances
let sidebarManager;
let templateManager;
let chatManager;

// Global functions for HTML onclick events
function useTemplate(templateId) {
    const template = templateManager.getTemplate(templateId);
    if (template && window.chatbot) {
        // Switch to dashboard to show chatbot
        sidebarManager.showSection('dashboard');
        sidebarManager.setActiveNav(document.querySelector('[data-section="dashboard"]'));
        
        // Set template content in chat input
        setTimeout(() => {
            const chatInput = document.getElementById('chatInput');
            if (chatInput) {
                chatInput.value = template.content;
                // Trigger analysis
                if (window.chatbot && window.chatbot.sendMessage) {
                    window.chatbot.sendMessage();
                }
            }
        }, 100);
    }
}

function loadChat(chatId) {
    const chat = chatManager.loadChat(chatId);
    if (chat) {
        // Switch to dashboard
        sidebarManager.showSection('dashboard');
        sidebarManager.setActiveNav(document.querySelector('[data-section="dashboard"]'));
        
        // Load chat messages
        setTimeout(() => {
            if (window.chatbot) {
                window.chatbot.loadChatHistory(chat.messages);
            }
        }, 100);
    } else {
        // Show placeholder for demo
        alert(`Loading chat: ${chatId}\n\nThis would restore the previous conversation and analysis results.`);
    }
}

function useQuickExample(type) {
    const examples = {
        tax: "Increase corporate tax rate by 5% to fund infrastructure projects",
        healthcare: "Implement universal healthcare coverage for all citizens",
        environment: "Implement carbon tax of $50 per ton of CO2 emissions"
    };
    
    if (examples[type] && window.chatbot) {
        const chatInput = document.getElementById('chatInput');
        if (chatInput) {
            chatInput.value = examples[type];
            window.chatbot.sendMessage();
        }
    }
}

function sendMessage() {
    if (window.chatbot && window.chatbot.sendMessage) {
        window.chatbot.sendMessage();
    }
}

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    sidebarManager = new SidebarManager();
    templateManager = new TemplateManager();
    chatManager = new ChatManager();
    
    // Add some demo chat history
    chatManager.saveChat('tax-analysis-1', [
        { type: 'user', content: 'Analyze 5% corporate tax increase' },
        { type: 'bot', content: 'Analysis complete: +2.1% GDP impact, revenue increase of $140B annually...' }
    ]);
    
    console.log('Sidebar system initialized');
});

// Export for global access
window.sidebarManager = sidebarManager;
window.templateManager = templateManager;
window.chatManager = chatManager;