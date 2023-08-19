document.addEventListener('DOMContentLoaded', function () {
  const readPageButton = document.getElementById('readBtn');

  readPageButton.addEventListener('click', async function () {
    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      const [result] = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: readPage,
      });

      const pageText = result.result;

      const utterance = new SpeechSynthesisUtterance(pageText);
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Error:', error);
    }
  });
});

function readPage() {
  return document.body.innerText;
}
