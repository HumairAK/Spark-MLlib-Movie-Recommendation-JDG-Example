docker-compose exec infinispan1 infinispan-server/bin/ispn-cli.sh  -c --controller=localhost:9990 --command="/subsystem=datagrid-infinispan/cache-container=clustered/distributed-cache=default:read-attribute(name=number-of-entries)"

