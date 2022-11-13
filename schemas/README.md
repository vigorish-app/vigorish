# Vigorish Database Schemas

This directory contains sql files that have been run to set up the postgres database. The schemas are also used to set up the local database in docker.

Each new schema should be prefixed with a number sequence matching the previous files. This allows us to know the order the schemas were applied in.

## Connecting

To conenct and look at the real database you can run this command:

```
fly pg connect -a postgres-vigorish
```

Note that when you run this command, you are running `psql` remotely and therefore do not have access to local filesystem. So you can't copy data in/out.

If you need access to the file system, look at the deployment section on how to do that.

## Deployment

After the schema has been finalized, this is one way to deploy it:

```sh
# make  sure your local docker postgres container is not running
fly proxy 5432 -a postgres-vigorish
# in a different shell
psql -p 5432 -U postgres -h localhost
Password for user postgres: ****
```

Then in the postgres shell run this command and replace the filename with the latest schema you want to run.

```
postgres=# \ir 001-create-tables.sql
```
