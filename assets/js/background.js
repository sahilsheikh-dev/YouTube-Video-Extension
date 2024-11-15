// Helper function to pause or resume YouTube videos for application change
async function controlYouTubeVideosAppChange(action) {
  try {
    // Query for all YouTube tabs
    const tabs = await chrome.tabs.query({ url: "*://www.youtube.com/*" });
    for (const tab of tabs) {
      console.log(`Injecting script into tab: ${tab.id}`);

      // Ensure the tab is fully loaded
      if (tab.status === "complete") {
        try {
          // Inject content script
          await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["./assets/js/content.js"],
          });

          // Send message to pause/resume video
          chrome.tabs.sendMessage(tab.id, { action });
        } catch (err) {
          console.error(`Error injecting script into tab ${tab.id}:`, err);
        }
      } else {
        console.log(`Tab ${tab.id} is not fully loaded, skipping...`);
      }
    }
  } catch (err) {
    console.error(`Error during ${action} videos:`, err);
  }
}

// Detect window focus changes
chrome.windows.onFocusChanged.addListener(async (windowId) => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    console.log("Chrome lost focus - pausing videos.");
    controlYouTubeVideosAppChange("pauseVideo");
  } else {
    console.log("Chrome regained focus - resuming videos.");
    const [activeTab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    if (activeTab && activeTab.url.includes("youtube.com")) {
      controlYouTubeVideosAppChange("resumeVideo");
    }
  }
});

// Listen for tab activation events
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  try {
    const [activeTab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    console.log(`Tab activated: ${activeTab.id}, URL: ${activeTab.url}`);

    if (activeTab && activeTab.url.includes("youtube.com")) {
      // Inject content script if necessary
      await chrome.scripting.executeScript({
        target: { tabId: activeTab.id },
        files: ["./assets/js/content.js"],
      });

      // Send message to resume the video
      chrome.tabs.sendMessage(activeTab.id, { action: "resumeVideo" });
    } else {
      // Pause videos on other YouTube tabs
      const youtubeTabs = await chrome.tabs.query({
        url: "*://www.youtube.com/*",
      });

      for (const tab of youtubeTabs) {
        if (tab.id !== activeInfo.tabId) {
          await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["./assets/js/content.js"],
          });

          chrome.tabs.sendMessage(tab.id, { action: "pauseVideo" });
        }
      }
    }
  } catch (err) {
    console.error("Error handling tab activation:", err);
  }
});
