# Eureka Server (Production-Ready)

A hardened Spring Cloud Netflix **Eureka** service-discovery server, packaged for
deployment on AWS (ECS/Fargate, EC2, or EKS).

## What's included

| Concern            | How it's handled                                                            |
|---------------------|-------------------------------------------------------------------------------|
| Auth                | HTTP Basic on the dashboard + registry endpoints, credentials via env vars   |
| Health checks       | Spring Boot Actuator `/actuator/health/liveness` and `/readiness` probes    |
| Container security  | Non-root user, minimal JRE base image, multi-stage build                    |
| Config per env      | `application.yml` (defaults) + `application-prod.yml` (prod profile)        |
| Graceful shutdown   | `server.shutdown=graceful` so in-flight requests finish before SIGTERM      |
| Clustering-ready    | `eureka.client.service-url.defaultZone` accepts a comma-separated peer list |

## Project layout

```
eureka-server/
├── pom.xml
├── Dockerfile
├── docker-compose.yml
├── .env.example
├── src/main/java/com/example/eurekaserver/
│   ├── EurekaServerApplication.java
│   └── config/SecurityConfig.java
├── src/main/resources/
│   ├── application.yml
│   └── application-prod.yml
└── src/test/java/.../EurekaServerApplicationTests.java
```

## 1. Build locally

Requires JDK 17+ and Maven (or use the wrapper if you add one).

```bash
mvn clean package
java -jar target/eureka-server.jar
```

Dashboard: http://localhost:8761 (login `admin` / `changeMe123!` by default — **change this**).

## 2. Build & run with Docker

```bash
cp .env.example .env      # then edit EUREKA_PASSWORD etc.
docker compose up --build
```

The container exposes port `8761` and runs `SPRING_PROFILES_ACTIVE=prod`, which
**requires** `EUREKA_USERNAME` / `EUREKA_PASSWORD` to be set (no insecure default
in prod).

## 3. Push the image to Amazon ECR

```bash
AWS_REGION=us-east-1
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
REPO=eureka-server

aws ecr create-repository --repository-name $REPO --region $AWS_REGION

aws ecr get-login-password --region $AWS_REGION \
  | docker login --username AWS --password-stdin $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

docker build -t $REPO:1.0.0 .
docker tag $REPO:1.0.0 $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$REPO:1.0.0
docker push $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$REPO:1.0.0
```

## 4. Deploy on AWS — two supported paths

### Option A: ECS Fargate (recommended)

1. **Task definition** — use the pushed image, set:
   - Container port: `8761`
   - Environment: `SPRING_PROFILES_ACTIVE=prod`
   - Secrets (from AWS Secrets Manager / SSM Parameter Store, not plain env vars):
     `EUREKA_USERNAME`, `EUREKA_PASSWORD`
   - `EUREKA_HOSTNAME` = the service's internal DNS name (e.g. from Cloud Map)
   - Task health check command:
     `CMD-SHELL,wget -qO- http://127.0.0.1:8761/actuator/health/readiness || exit 1`
   - Memory: 512 MB, CPU: 256–512 (small footprint; scale up if you register hundreds of services)

2. **Service**:
   - Desired count: 2+ for HA, spread across AZs
   - Attach to an internal **Application Load Balancer** (Eureka is typically
     internal-only, not internet-facing) with target group health check path
     `/actuator/health/readiness`
   - For multi-node peer awareness, use **AWS Cloud Map** or a Route 53 private
     hosted zone so each Eureka node can resolve its peers, and set
     `EUREKA_DEFAULT_ZONE` to a comma-separated list of the peers' `/eureka/` URLs.

3. **Security group**: allow port 8761 only from your VPC CIDR / the security
   groups of services that need to register (never expose Eureka publicly).

### Option B: EC2 (single instance or Auto Scaling Group)

```bash
# On the EC2 instance (Amazon Linux 2023 / Ubuntu with Docker installed):
aws ecr get-login-password --region $AWS_REGION \
  | docker login --username AWS --password-stdin $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

docker run -d --name eureka-server --restart unless-stopped \
  -p 8761:8761 \
  -e SPRING_PROFILES_ACTIVE=prod \
  -e EUREKA_USERNAME=admin \
  -e EUREKA_PASSWORD='<from Secrets Manager>' \
  -e EUREKA_HOSTNAME=$(curl -s http://169.254.169.254/latest/meta-data/local-ipv4) \
  $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/eureka-server:1.0.0
```

Put the instance(s) behind an internal NLB/ALB, and use an Auto Scaling Group
across 2+ AZs for resilience. Attach an IAM instance role scoped to
`ecr:GetAuthorizationToken` + pull permissions and (if used)
`secretsmanager:GetSecretValue`.

## 5. Clustering for high availability

Eureka is most resilient as a **peer-aware cluster** (2–3 nodes). Each node's
`EUREKA_DEFAULT_ZONE` should list every *other* node's `/eureka/` endpoint, e.g.:

```
EUREKA_DEFAULT_ZONE=http://eureka-1.internal:8761/eureka/,http://eureka-2.internal:8761/eureka/,http://eureka-3.internal:8761/eureka/
```

and each node needs `EUREKA_REGISTER_WITH_EUREKA=true` / `EUREKA_FETCH_REGISTRY=true`
in that scenario (the defaults in this project are `false`, tuned for a
single-node setup — flip them when you add peers).

## 6. Client-side configuration

Any Spring Boot microservice registering with this server needs:

```yaml
eureka:
  client:
    service-url:
      defaultZone: http://admin:${EUREKA_PASSWORD}@eureka.yourdomain.com:8761/eureka/
```

## Security checklist before going live

- [ ] Change `EUREKA_USERNAME`/`EUREKA_PASSWORD` from defaults; store in Secrets Manager
- [ ] Keep the server on a private subnet / internal load balancer only
- [ ] Enable TLS termination at the ALB/NLB (or add a reverse proxy) — Eureka traffic should not be plaintext over the internet
- [ ] Restrict the security group to VPC-internal traffic
- [ ] Rotate credentials periodically
- [ ] Monitor `/actuator/health` and CloudWatch container logs/metrics

## Notes

This project was scaffolded for you and has not been compiled in this
environment (no network access to download Maven dependencies here). Run
`mvn clean package` locally or in CI to verify the build before deploying.
