FROM php:8.1-apache

# Install dependencies
RUN apt-get update && apt-get install -y \
    libpq-dev \
    && docker-php-ext-install pdo_mysql \
    && a2enmod rewrite

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy application files
COPY . .

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Copy and set permissions for .env
COPY config/.env .env
RUN chown www-data:www-data .env \
    && chmod 644 .env

# Set permissions for static files, logs, and data
RUN chown -R www-data:www-data /var/www/html/public \
    && chmod -R 755 /var/www/html/public \
    && mkdir -p logs data \
    && chown -R www-data:www-data logs data \
    && chmod -R 755 logs data

# Enable PHP error reporting
RUN echo "display_errors = On" >> /usr/local/etc/php/php.ini \
    && echo "display_startup_errors = On" >> /usr/local/etc/php/php.ini \
    && echo "error_reporting = E_ALL" >> /usr/local/etc/php/php.ini

# Apache configuration
COPY apache-config.conf /etc/apache2/sites-available/000-default.conf

# Expose port
EXPOSE 80

# Start Apache
CMD ["apache2-foreground"]