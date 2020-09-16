const loaderUrl = process.env.WEBGL_LOADER_URL;
const config = {
  dataUrl: process.env.WEBGL_DATA_URL,
  frameworkUrl: process.env.WEBGL_FRAMEWORK_URL,
  codeUrl: process.env.WEBGL_CODE_URL,
  streamingAssetsUrl: process.env.WEBGL_STREAMING_ASSETS_URL,
  companyName: process.env.COMPANY_NAME,
  productName: process.env.PRODUCT_NAME,
  productVersion: process.env.PRODUCT_VERSION,
};

const container = document.querySelector("#unity-container");
const canvas = document.querySelector("#unity-canvas");
const loadingBar = document.querySelector("#unity-loading-bar");
const progressBarFull = document.querySelector("#unity-progress-bar-full");

// @ts-ignore
config.devicePixelRatio = 1;
// @ts-ignore
container.className = "unity-mobile";
// @ts-ignore
loadingBar.style.display = "block";

const script = document.createElement("script");
script.src = loaderUrl ? loaderUrl : '';
script.onload = () => {
  // @ts-ignore
  createUnityInstance(canvas, config, (progress: any) => {
    // @ts-ignore
    progressBarFull.style.width = 100 * progress + "%";
  }).then((unityInstance: any) => {
    // @ts-ignore
    loadingBar.style.display = "none";
  }).catch((message: string) => {
    alert(message);
  });
};
document.body.appendChild(script);

