/*
  write js for popup functions like below features
          1. Popup with Controls
          Add a browser action popup to let users control the behavior of the extension.
          Enable/disable auto-pause and auto-resume.
          Control playback speed (e.g., 1x, 1.5x, 2x).
          Toggle mute/unmute for YouTube videos.

          2. Smart Auto-Pause
          Detect whether the video is being actively watched (e.g., via mouse or keyboard activity on the page). Only auto-pause if there's no activity for a certain duration.
          Use JavaScript event listeners (mousemove, keydown) in content.js to detect activity.
          Implement a timer that pauses the video after a period of inactivity.

          3. Notifications
          Show desktop notifications when:
          A video is paused or resumed.
          The user leaves the tab while the video is playing.

          4. Sync Settings Across Devices
          Allow users to sync their preferences (e.g., enable/disable auto-pause) across devices using Chrome's storage.sync API.

          IMP - 5. Background Audio Mode
          Add an option to keep YouTube videos playing even when the tab is inactive (useful for music playlists).

          IMP - 6. Customizable Pause/Resume Behavior
          Allow users to customize:
          Whether to pause/resume on tab switch.
          Whether to mute/unmute instead of pausing.

          7. Video Stats Overlay
          Display video playback stats (e.g., duration, current time, remaining time) on top of the video.

          8. Ad Skip Automation
          Automatically skip YouTube ads after the "Skip Ad" button becomes visible.

          9. Analytics Dashboard
          Create a dashboard to show usage statistics:
          How many videos were paused/resumed.
          Total time spent watching YouTube.
 */

/*
  SAMPLE CODE - Enabler and disabler for Tab/App Switch Auto Play/Pause and Auto Skip YouTube Add
          document.addEventListener("DOMContentLoaded", () => {
            const tabToggle = document.getElementById("tab-auto-toggle");
            const appToggle = document.getElementById("app-auto-toggle");
            const adSkipToggle = document.getElementById("ad-skip-toggle");

            // Load saved settings
            chrome.storage.sync.get(
              ["tabAutoPause", "appAutoPause", "adSkipperEnabled"],
              (data) => {
                tabToggle.checked = data.tabAutoPause ?? true;
                appToggle.checked = data.appAutoPause ?? true;
                adSkipToggle.checked = data.adSkipperEnabled ?? true;
              }
            );

            // Save settings on toggle change
            tabToggle.addEventListener("change", () => {
              chrome.storage.sync.set({ tabAutoPause: tabToggle.checked });
              chrome.storage.sync.get("tabAutoPause", async (settings) => {
                console.log(settings.tabAutoPause);
              });
            });

            appToggle.addEventListener("change", () => {
              chrome.storage.sync.set({ appAutoPause: appToggle.checked });
              chrome.storage.sync.get("appAutoPause", async (settings) => {
                console.log(settings.appAutoPause);
              });
            });

            adSkipToggle.addEventListener("change", () => {
              chrome.storage.sync.set({ adSkipperEnabled: adSkipToggle.checked });
              chrome.storage.sync.get("adSkipperEnabled", async (settings) => {
                console.log(settings.adSkipperEnabled);
              });
            });
          });
*/
