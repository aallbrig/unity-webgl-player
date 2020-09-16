#!/usr/bin/env sh
. ./hacks/git-functions.sh

DOCKERHUB_ORG=${DOCKERHUB_ORG:-aallbrig}
DOCKERHUB_REPO=${DOCKERHUB_REPO:-unity-webgl-player}

docker__build_all() {
  git_tag="$(git__get_tag_without_v)"

  docker build . -t "${DOCKERHUB_ORG}/${DOCKERHUB_REPO}:latest" -t "${DOCKERHUB_ORG}/${DOCKERHUB_REPO}:${git_tag}"
}

docker__publish_all() {
  git_tag="$(git__get_tag_without_v)"

  docker push "${DOCKERHUB_ORG}/${DOCKERHUB_REPO}:${git_tag}"
  docker push "${DOCKERHUB_ORG}/${DOCKERHUB_REPO}:latest"
}

docker__run_all() {
  docker network create --driver bridge "${DOCKERHUB_REPO}" || true
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
    -p 8080:8080 \
    --name "${DOCKERHUB_REPO}" \
    --network "${DOCKERHUB_REPO}" \
    "${DOCKERHUB_ORG}/${DOCKERHUB_REPO}"
}

docker__stop_all() {
  docker stop "${DOCKERHUB_REPO}" || true
  docker rm "${DOCKERHUB_REPO}" || true
  docker network rm "${DOCKERHUB_REPO}" || true
}
