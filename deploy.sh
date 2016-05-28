#! /bin/sh

# define hosts to deploy to

case $1 in
     -azure)
        hosts=("ciscoHackathon2016.cloudapp.net")
        ;;
    *)
        echo "please run with $0 -azure"
        exit 1
esac

npm install
grunt
for i in ${hosts[@]}; do
    npm install
    grunt
    ssh hackathon@${i} "rm -rf /var/www/html/*";
    scp -r ./dist/* hackathon@${i}:/var/www/html/
done
