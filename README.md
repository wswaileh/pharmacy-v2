# Lana Pharmacy App

Lana Pharmacy App is a SpringBoot, Angular and MongoDB based POS app for the pharmacy.

## First Time Installation

1. Clone the repo

```bash
git clone https://github.com/wswaileh/pharmacy-v2.git
```
2. build BE jar

```bash
mvn clean package
```

3. Docker Compose

```bash
docker-compose up
```

4. Exec into MongoDB container

```bash
docker exec -it <container> /bin/bash
```

5. Copy DB Dumps into container

```bash
docker cp db-dump/. mycontainerid:/db-dump
```

6. Restore Dump

```bash
mongorestore -d pharmacy db-dump
```

## Update Process

1. Pull new code 

```bash
git pull
```
2. Build changed containers

```bash
docker-compose build
```

2. Shutdown existing containers

```bash
docker-compose down
```

2. Rerun the containers with new code

```bash
docker-compose up
```
