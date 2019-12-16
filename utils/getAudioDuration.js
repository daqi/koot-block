import audioLoader from "./audioLoader";

export default function getAudioDuration(audio, callback) {
  audioLoader(audio, function(audioElm) {
    // Chrome bug: https://bugs.chromium.org/p/chromium/issues/detail?id=642012
    if (audioElm.duration === Infinity) {
      audioElm.currentTime = Number.MAX_SAFE_INTEGER;
      audioElm.ontimeupdate = () => {
        audioElm.ontimeupdate = null;
        callback(audioElm.duration);
        audioElm.currentTime = 0;
      };
    } else {
      callback(audioElm.duration);
    }
  });
}
