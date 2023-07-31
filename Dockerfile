# Dockerfile frontend
# build environment
FROM node:lts-slim as build
WORKDIR /build
COPY . .

# production environment
FROM nginx:stable-alpine-slim
COPY --from=build /build/build/ /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/
EXPOSE 4200
CMD ["nginx", "-g", "daemon off;"]
