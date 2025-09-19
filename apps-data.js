// App Portfolio Data
// Edit this file to add, remove, or update your applications

const appsData = [
    {
        id: 1,
        name: "Skill Match",
        description: "Self assessment and find out more about you, and your most matched career path.",
        url: "https://tienduc120.github.io/skillmatch/",
        image: "/assets/images/skillmatch.png",
        category: "web",
        dateAdded: "20250919"
    },
    {
        id: 2,
        name: "Bubble Me",
        description: "A mobile version for self assessment.",
        url: "https://tienduc120.github.io/bubbleme/",
        image: "/assets/images/bubbleme.png",
        category: "web",
        dateAdded: "20250919"
    },
    {
        id: 3,
        name: "Store Heatmap",
        description: "A tool for capture customer behavior inside a store, mostly for optimize store layout.",
        url: "https://tienduc120.github.io/store-heatmap/",
        image: "/assets/images/store-heatmap.png",
        category: "web",
        dateAdded: "20250919"
    }
    // Add more apps here following the same structure:
    // {
    //     id: 4,
    //     name: "Your New App",
    //     description: "Description of your new app",
    //     url: "https://your-app-url.com",
    //     image: "./assets/images/apps/web/newapp.png",
    //     category: "web", // web, tool, game, api, other
    //     dateAdded: new Date().toISOString()
    // }
];

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = appsData;
}