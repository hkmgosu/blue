# price project

This project uses Quarkus, the Supersonic Subatomic Java Framework

If you want to learn more about Quarkus, please visit its website: https://quarkus.io/ .

## QUARKUS - GET STARTED

1. You need an IDE VSCode!
2. You need a a JDK 8 or 11+ (any distribution) Optionally get GraalVM 21.0.0 for native compilation
3. You need Apache Maven 3.6.2+ or Gradle
4. Start Coding with Quarkus 1.13.3.Final [announce|changelog]

## Required Extensions of VSCode

1. DMN Editor version 0.9.0 or higher

<img src="https://github.com/Blue-Express/price-rule-engine/blob/develop/img/DMN.jpg" width="480" />

2. BPMN Editor version 0.9.0 or higher

<img src="https://github.com/Blue-Express/price-rule-engine/blob/develop/img/BPMN.jpg" width="480" />

## Running the application in dev mode

You can run your application in dev mode that enables live coding using:
```shell script
./mvnw compile quarkus:dev
```

> **_NOTE:_**  Quarkus now ships with a Dev UI, which is available in dev mode only at http://localhost:8080/q/dev/.

## Packaging and running the application

The application can be packaged using:
```shell script
./mvnw package
```
It produces the `quarkus-run.jar` file in the `target/quarkus-app/` directory.
Be aware that it’s not an _über-jar_ as the dependencies are copied into the `target/quarkus-app/lib/` directory.

If you want to build an _über-jar_, execute the following command:
```shell script
./mvnw package -Dquarkus.package.type=uber-jar
```

The application is now runnable using `java -jar target/quarkus-app/quarkus-run.jar`.

## Creating a native executable

You can create a native executable using: 
```shell script
./mvnw package -Pnative
```

Or, if you don't have GraalVM installed, you can run the native executable build in a container using: 
```shell script
./mvnw package -Pnative -Dquarkus.native.container-build=true
```

You can then execute your native executable with: `./target/price-1.0.0-SNAPSHOT-runner`

If you want to learn more about building native executables, please consult https://quarkus.io/guides/maven-tooling.html.

## Provided examples

### RESTEasy JAX-RS example

REST is easy peasy with this Hello World RESTEasy resource.

[Related guide section...](https://quarkus.io/guides/getting-started#the-jax-rs-resources)

# LOCAL ENV WINDOWS
    1. INSTALL QUARKUS
         https://quarkus.io/get-started/
# SOME PROBLEMS
1. JAVA_HOME environment variable is not set.
     https://confluence.atlassian.com/doc/setting-the-java_home-variable-in-windows-8895.html
     