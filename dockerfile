
FROM php:8.2.12-apache

WORKDIR /var/www/html

COPY . . telegramForm.php/

RUN docker-php-ext-install mysqli pdo pdo_mysql

EXPOSE 80

CMD ["apache2-foreground"]

ENV BOT_TOKEN="8005755711:AAHSNRERi5O0jAosJc1FYkJd6OFxlcwS97U"
ENV CHAT_ID="5269217303"