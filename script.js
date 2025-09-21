class AppPortfolio {
    constructor() {
        this.apps = [];
        this.init();
    }

    async init() {
        this.apps = await this.loadApps();
        this.renderApps();
        this.setupEventListeners();
    }

    async loadApps() {
        const response = await fetch('./apps-data.js');
        const text = await response.text();
        // Extract the array from the JS file
        const match = text.match(/const appsData = (\[[\s\S]*?\]);/);
        if (match) {
            return eval(match[1]);
        }
        return [];
    }


    renderApps() {
        const appsGrid = document.getElementById('appsGrid');
        if (!appsGrid) return;

        appsGrid.innerHTML = '';

        if (this.apps.length === 0) {
            appsGrid.innerHTML = `
                <div class="empty-state">
                    <h3>No apps yet!</h3>
                    <p>Add your first web application using the form below.</p>
                </div>
            `;
            return;
        }

        this.apps.forEach(app => {
            const appCard = this.createAppCard(app);
            appsGrid.appendChild(appCard);
        });
    }

    createAppCard(app) {
        const card = document.createElement('div');
        card.className = 'app-card';
        card.setAttribute('data-app-id', app.id);

        const categoryColors = {
            web: { bg: '#e0e7ff', text: '#3730a3' },
            tool: { bg: '#dcfce7', text: '#166534' },
            game: { bg: '#fef3c7', text: '#92400e' },
            api: { bg: '#fed7e2', text: '#be185d' },
            other: { bg: '#e5e7eb', text: '#374151' }
        };

        const categoryColor = categoryColors[app.category] || categoryColors.other;

        card.innerHTML = `
            <div class="app-content">
                <div class="app-info">
                    <h3>${this.escapeHtml(app.name)}</h3>
                    <span class="app-category" style="background-color: ${categoryColor.bg}; color: ${categoryColor.text};">
                        ${app.category.charAt(0).toUpperCase() + app.category.slice(1)}
                    </span>
                    <p>${this.escapeHtml(app.description)}</p>
                    <div class="app-links">
                        <a href="${this.escapeHtml(app.url)}" target="_blank" class="app-link primary">
                            View App
                        </a>
                    </div>
                </div>
            </div>
            <div class="app-media">
                ${app.image ? `<a href="${this.escapeHtml(app.url)}" target="_blank"><img src="${this.escapeHtml(app.image)}" alt="${this.escapeHtml(app.name)}" onerror="this.style.display='none'; this.parentElement.parentElement.innerHTML='Image not found';"></a>` : 'Add image/GIF'}
            </div>
        `;

        return card;
    }

    setupEventListeners() {
        // No form events needed since we removed the form
    }

    // Method for you to update apps directly in the code
    updateAppById(appId, newData) {
        const appIndex = this.apps.findIndex(app => app.id === appId);
        if (appIndex !== -1) {
            this.apps[appIndex] = { ...this.apps[appIndex], ...newData };
            this.renderApps();
            console.log(`App ${appId} updated successfully`);
        } else {
            console.log(`App with ID ${appId} not found`);
        }
    }

    // Method to list all apps with their IDs for easy reference
    listApps() {
        console.log('Current apps:');
        this.apps.forEach(app => {
            console.log(`ID: ${app.id} | Name: ${app.name} | Category: ${app.category}`);
        });
    }

    // Method to export current apps in data file format
    exportToDataFile() {
        const dataString = `// App Portfolio Data
// Edit this file to add, remove, or update your applications

const appsData = ${JSON.stringify(this.apps, null, 4)};

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = appsData;
}`;

        console.log('Copy this content to apps-data.js:');
        console.log(dataString);

        // Also create a downloadable file
        const blob = new Blob([dataString], { type: 'text/javascript' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'apps-data.js';
        a.click();
        URL.revokeObjectURL(url);
    }



    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, function(m) { return map[m]; });
    }

    exportApps() {
        const dataStr = JSON.stringify(this.apps, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

        const exportFileDefaultName = 'my-apps.json';

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    }

}

let portfolio;

document.addEventListener('DOMContentLoaded', function() {
    portfolio = new AppPortfolio();
});