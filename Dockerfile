FROM ubuntu:latest

# 環境変数を設定
ENV DEBIAN_FRONTEND=noninteractive

# ApacheとPHPをインストール
RUN apt-get update && apt-get install -y \
    apache2 \
    php \
    libapache2-mod-php \
    php-mysql \
    && rm -rf /var/lib/apt/lists/*

# Apacheの設定
RUN a2enmod rewrite

# カスタムApache設定ファイルをコピー
COPY apache-config.conf /etc/apache2/sites-available/000-default.conf

# Apache設定を有効にする
RUN a2ensite 000-default.conf

# Apacheを前景で実行
CMD ["apache2ctl", "-DFOREGROUND"]

