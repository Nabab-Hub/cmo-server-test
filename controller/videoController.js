const path = require("path");

// Supported moods
const moods = [
    "chill",
    "happy",
    "focus",
    "romantic",
    "crystal"
];

const suggestVideo = (req, res) => {
    // Get mood from request body
    const { mood } = req.body;

    // Check if mood was provided
    if (!mood) {
        return res.status(400).json({
            success: false,
            message: "Mood is required"
        });
    }

    // Convert mood to lowercase
    const selectedMood = mood.toLowerCase().trim();

    // Check if mood is supported
    if (!moods.includes(selectedMood)) {
        return res.status(400).json({
            success: false,
            message: "Invalid mood",
            availableMoods: moods
        });
    }

    try {
        // Load the corresponding JSON file
        const videos = require(
            path.join(
                __dirname,
                "..",
                "database",
                `${selectedMood}.json`
            )
        );

        // Check if there are videos
        if (!videos || videos.length === 0) {
            return res.status(404).json({
                success: false,
                message: `No videos found for mood: ${selectedMood}`
            });
        }

        // Generate random index
        const randomIndex = Math.floor(
            Math.random() * videos.length
        );

        // Select random video
        const randomVideo = videos[randomIndex];

        // Send response
        return res.status(200).json({
            success: true,
            mood: selectedMood,
            video: randomVideo
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong while suggesting the video"
        });
    }
};

module.exports = {
    suggestVideo
};