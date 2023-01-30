[![Codacy Badge](https://app.codacy.com/project/badge/Grade/955dcdb2e6d54a0dac4a6d817f6b24e9)](https://www.codacy.com/gh/VictorHachard/naturopath-naturopath/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=VictorHachard/naturopath-naturopath&amp;utm_campaign=Badge_Grade)

# Naturopath TFE Application

If you want more information there is a report: "naturopath.pdf".

![screenshot](../master/res/naturopath.gif)

## Angular CLI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.6.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build and Deploy with Nginx on Linux

[How to Deploy an Angular app in Production with Nginx](https://arjunphp.com/deploy-angular-app-production-nginx/)

First update the apt-get package lists and then install Nginx using apt-get:

```bash
sudo apt-get update
sudo apt-get install nginx
```

Then open the default file to configure server which is located in /etc/nginx/sites-available/ directory. Delete everything in this configuration file and paste the following content:

```bash
server {
listen 80 default_server;
listen [::]:80 default_server;

    root /var/www/html;
    index index.html index.htm index.nginx-debian.html;
 
    server_name _;
 
    location / {
        try_files $uri $uri/ /index.html =404;
    }
}
```

To make the changes active, restart the web server nginx:

```bash
sudo systemctl restart nginx
sudo systemctl restart nginx
```

Now check the status of Nginx service by running following command, you should get “active” green color text along with other text.

```bash
sudo systemctl status nginx
sudo systemctl status nginx
```

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

When you run the `ng build --prod` command, it creates a `/dist` folder and it places all compiled files inside it. You have to move those files to web server root folder, ex: `/var/www/html`.

```bash
sudo rm -R /var/www/html/*
sudo mv dist/<application>/* /var/www/html/
```

## What I Learned

-   Angular
-   TypeScript

## Authors & Contributors

-   **Hachard Victor** - *Initial work* - [VictorHachard](https://github.com/VictorHachard)

## License

This project is licensed under the MIT License - see the [LICENSE.md](../master/LICENSE) file for details.
