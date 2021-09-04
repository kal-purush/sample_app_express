# current_dir=$PWD;
framework_names=("spring");

for i in {1..10}; do
    for framework_name in ${framework_names[@]}; do
        curl "https://${framework_name}-cispa.herokuapp.com/";
        payload_number=(50000 70000 270000 560000 2710000 5560000) ; #nodejs
        for t in ${payload_number[@]}; do
            request_number=(100 200 400 500 1000) ;
            for r in ${request_number[@]}; do
                ./wrk -t1 -c50 -d60s -R$r "https://${framework_name}-cispa.herokuapp.com/" 1 50 $framework_name $t 0 $i $r &
                sleep 10;
                if [ $t = 0 ]; then
                    ./wrk -t1 -c50 -d5s -R2000 "https://${framework_name}-cispa.herokuapp.com/?id=${t}" 1 50 $framework_name $t 1 $i $r >> "heroku/${framework_name}_${t}.txt" &
                else
                    ./wrk -t1 -c50 -d5s -R$r "https://${framework_name}-cispa.herokuapp.com/?id=${t}" 1 50 $framework_name $t 1 $i $r >> "heroku/${framework_name}_${t}_${r}.txt" &
                fi
                echo "Going to sleep";
                sleep 120;
            done
        done
    done
done