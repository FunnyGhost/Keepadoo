   docker stop keepadoo
   docker rm keepadoo
   docker pull utukku/keepadoo:1.0
   docker run --name keepadoo -p 80:80 -d utukku/keepadoo:1.0