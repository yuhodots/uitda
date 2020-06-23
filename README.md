## uitda nginx server information

### nginx.conf

~~~
/etc/nginx/nginx.conf
~~~

~~~
user www-data;
worker_processes auto;
pid /run/nginx.pid;
include /etc/nginx/modules-enabled/*.conf;

events {
        worker_connections 800;
}

http {
        ## Basic Settings ##
        sendfile on;
        tcp_nopush on;
        tcp_nodelay on;
        keepalive_timeout 10; # Connection maintaining
        types_hash_max_size 2048;
        server_tokens off; 		# Nginx version hiding
        client_max_body_size 5M;

        include /etc/nginx/mime.types;
        default_type application/octet-stream;

        ## SSL Settings ##
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2; # Dropping SSLv3, ref: POODLE
        ssl_prefer_server_ciphers on;

        ## Logging Settings ##
        access_log /var/log/nginx/access.log;
        error_log /var/log/nginx/error.log;

        ## Gzip Settings ##
        gzip on;

        ## Virtual Host Configs ##
        include /etc/nginx/conf.d/*.conf;
        include /etc/nginx/sites-enabled/*;
}
~~~

### sites-enabled/myapp.conf

~~~
/etc/nginx/sites-enabled/myapp.conf
~~~

~~~
server {
  listen 80 default_server;
  listen [::]:80 default_server;

  server_name uitda.net;

  if ($http_x_forwarded_proto = 'http'){
      return 301 https://$host$request_uri;
  }

  location / {
    root   /home/ubuntu/uitda/frontend/build;
    index  index.html index.htm;
    try_files $uri $uri/ /index.html;
  }

  location /socket.io {
    proxy_pass http://127.0.0.1:3000/socket.io;
  }

  location /api {
    proxy_pass http://127.0.0.1:3000/api;
  }

  location /login {
    proxy_pass http://127.0.0.1:3000/api/login/outlook;
  }

  location /logout {
    proxy_pass http://127.0.0.1:3000/api/logout;
  }
}
~~~

