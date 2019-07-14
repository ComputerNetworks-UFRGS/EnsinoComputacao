FROM tiagonofaro/laravel:v0

WORKDIR /app
COPY ./ /app

# Apache config
ENV APACHE_DOCUMENT_ROOT /app/dist
RUN printf '<VirtualHost *:80>\n \
    DocumentRoot /app/dist\n \
    ErrorLog ${APACHE_LOG_DIR}/error.log\n \
    CustomLog ${APACHE_LOG_DIR}/access.log combined\n \
    <Directory /app/dist/>\n \
        Options Indexes FollowSymLinks MultiViews\n \
        AllowOverride All\n \
        Order allow,deny\n \
        allow from all\n \
    </Directory>\n \
</VirtualHost>' > /etc/apache2/sites-available/000-default.conf \
 && sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf \
 && curl -sL https://deb.nodesource.com/setup_10.x > setup.sh \
 && sh ./setup.sh \
 && apt update \
 && apt install -y nodejs \
 && npm install \
 && npm audit fix \
 && npm rebuild node-sass \
 && npm run build \
 && a2enmod rewrite

EXPOSE 80
