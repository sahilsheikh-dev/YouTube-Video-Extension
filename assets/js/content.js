// Pause or resume video based on tab visibility
document.addEventListener("visibilitychange", () => {
  const video = document.querySelector("video");
  if (document.hidden) {
    // Tab is not visible, pause the video
    if (video && !video.paused) {
      video.pause();
      console.log("Video paused because tab is hidden.");
    }
  } else {
    // Tab is visible, resume the video
    if (video && video.paused) {
      video.play();
      console.log("Video resumed because tab is visible.");
    }
  }
});

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "pauseVideo") {
    const video = document.querySelector("video");
    if (video) {
      video.pause();
      console.log("Video paused.");
    }
  } else if (message.action === "resumeVideo") {
    const video = document.querySelector("video");
    if (video) {
      video.play();
      console.log("Video resumed.");
    }
  }
});
