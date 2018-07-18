sshpass  -p $1 ssh -o StrictHostKeyChecking=no root@174.138.8.175 <<-'ENDSSH'
   docker stop keepadoo
   docker rm keepadoo
   docker pull utukku/keepadoo:1.0
   docker run --name keepadoo -p 80:80 -d utukku/keepadoo:1.0
ENDSSH