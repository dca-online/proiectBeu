
FROM php:8.2.12-apache

WORKDIR /var/www/html

COPY . . telegramForm.php/

RUN docker-php-ext-install mysqli pdo pdo_mysql

EXPOSE 80

CMD ["apache2-foreground"]
