All .sql files dropped into this folder will be processed by postgres
in alphabetical order. To persist data (aka commit it to the repository),
run the following:

docker exec db pg_dump -C -c --if-exists -U <username> <dbname> > db/<dbname>.sql
