!function(){var t=null,n=!1,o={startButton:document.querySelector("button[data-start]"),stopButton:document.querySelector("button[data-stop]")};function a(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}o.startButton.addEventListener("click",function(){n||(n=!0,o.startButton.disabled=!0,a(),t=setInterval(a,1e3))}),o.stopButton.addEventListener("click",function(){n&&(n=!1,clearInterval(t),o.startButton.disabled=!1)})}();
//# sourceMappingURL=01-color-switcher.63b31274.js.map
