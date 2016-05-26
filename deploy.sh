#! /bin/sh

# define hosts to deploy to

case $1 in
     -dev)
        hosts=("app-host-1_dev.wwtatc.local")
        ;;
    -test)
        hosts=("app-host-1_test.wwtatc.local")
        ;;      
    -prod)
        hosts=("app-host-1_prod.wwtatc.local")
        ;;
    *)
        echo "please run with $0 -dev or $0 -test or $0 -prod"
        exit 1
esac

npm install
grunt
for i in ${hosts[@]}; do
    ssh root@${i} "rm -rf /var/www/lightSystem/public_html/*";
    scp -r ./dist/* root@${i}:/var/www/lightSystem/public_html/
done
