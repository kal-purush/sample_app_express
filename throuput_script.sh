current_dir=$PWD;
# # cd /path/to/your/command/dir;special command ARGS;
# framework_name="nodejs";
# for i in {1..10}; do
#     for con in {1..40}; do
#         heroku config:set WEB_CONCURRENCY=$con;
#         sleep 20;
#         cd /Users/masudulhasanmasudbhuiyan/Music/testWrk2/wrk2
#         ./wrk -t12 -c400 -d5s -R10000 "https://nodejs-cispa.herokuapp.com/"  12 400 $framework_name $con 0 $i 10000 >> "heroku_free_dyno/${framework_name}_$con.txt";
#         sleep 10;
#         cd $current_dir;
#     done     
# done
framework_names=("nodejs");

for i in {1..10}; do
    for framework_name in ${framework_names[@]}; do
        curl "https://${framework_name}-cispa.herokuapp.com/";
        # payload_number=(60000 500000 3070000 4340000 9490000 10000000) ; #nodejs
        payload_number=(60000 500000 3070000 4340000) ; #nodejs
        for t in ${payload_number[@]}; do
            request_number=(100 200 400 500 1000) ;
            for r in ${request_number[@]}; do
                for ((con=2; con<38; con+=5)); do
                    heroku config:set WEB_CONCURRENCY=$con;
                    sleep 20;
                    cd /Users/masudulhasanmasudbhuiyan/Music/testWrk2/wrk2;
                    ./wrk -t1 -c50 -d60s -R$r "https://${framework_name}-cispa.herokuapp.com/" $con 50 $framework_name $t 0 $i $r &
                    sleep 10;
                    if [ $t = 0 ]; then
                        ./wrk -t1 -c50 -d5s -R2000 "https://${framework_name}-cispa.herokuapp.com/?id=${t}" $con 50 $framework_name $t 1 $i $r >> "heroku/${framework_name}_${t}.txt" &
                    else
                        ./wrk -t1 -c50 -d5s -R$r "https://${framework_name}-cispa.herokuapp.com/?id=${t}" $con 50 $framework_name $t 1 $i $r >> "heroku/${framework_name}_${t}_${r}.txt" &
                    fi
                    echo "Going to sleep";
                    sleep 120;
                    cd $current_dir;
                done
            done
        done
    done
done