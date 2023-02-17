FROM nginx:1.23.1-alpine
EXPOSE 5173
COPY ./docker/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
# COPY --from=build /usr/app/dist /usr/share/nginx/html
COPY ./dist /usr/share/nginx/html