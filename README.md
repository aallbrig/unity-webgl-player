# Unity WebGL Player

This repo contains a dockerized way of running Unity WebGL content.

## Usage
Example Run
``` bash
docker run \
  -e WEBGL_LOADER_URL="Build/unity-webgl-player.loader.js" \
  -e WEBGL_DATA_URL="Build/unity-webgl-player.data" \
  -e WEBGL_FRAMEWORK_URL="Build/unity-webgl-player.framework.js" \
  -e WEBGL_CODE_URL="Build/unity-webgl-player.wasm" \
  -e WEBGL_STREAMING_ASSETS_URL="StreamingAssets" \
  -e COMPANY_NAME="Default Company LLC" \
  -e PRODUCT_NAME="Video Game Title" \
  -e PRODUCT_VERSION="0.0.1" \
  -e PORT="8080" \
  aallbrig/unity-webgl-player
```

### Local Development
Build dockerfile
```bash
docker build . -t aallbrig/unity-webgl-player
```

