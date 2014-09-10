#
# Home.Pi Dockerfile
#
# Pull base image.
FROM dockerfile/ubuntu

MAINTAINER Dennis Schulte "mail@dennis-schulte.de"

# Install Nginx.
RUN apt-get install -y software-properties-common
RUN add-apt-repository -y ppa:nginx/stable
RUN apt-get update
RUN apt-get install -y nginx
RUN echo "\ndaemon off;" >> /etc/nginx/nginx.conf

ADD default_nginx.conf /etc/nginx/sites-available/default
ADD www/ /var/www

# Attach volumes.
VOLUME /etc/nginx/sites-enabled
VOLUME /var/log/nginx

# Set working directory.
WORKDIR /etc/nginx

# Expose ports.
EXPOSE 80

# Define default command.
CMD ["nginx"]

