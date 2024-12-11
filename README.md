# Microservices Application

This project implements a microservices-based architecture using Node.js, Docker, RabbitMQ, and MongoDB. The application comprises the following components:

1. **API Gateway**: Serves as a single entry point for all client requests, acting as a proxy for the `auth`, `order`, and `product` microservices.
2. **Auth Service**: Handles user authentication and authorization.
3. **Product Service**: Manages product data and availability.
4. **Order Service**: Handles order creation and processing.
5. **RabbitMQ**: Facilitates asynchronous communication between the `product` and `order` services using AMQP protocol.
6. **Frontend**, **Admin**: Calling API Gateway.

---

## **Software Architecture**

### **Overview**
- The API Gateway binds all microservices and acts as a proxy for domain-specific requests.
- Each microservice, along with the API Gateway and RabbitMQ, is deployed as a Docker container.
- Communication between the `product` and `order` services is handled using RabbitMQ with two queues:
  - **Orders Queue**: Receives product data published by the `product` service.
  - **Products Queue**: Publishes order details consumed by the `product` service.
- This architecture minimizes the need for direct REST calls to MongoDB, optimizing resource utilization.

### **Workflow**
1. **Product to Order Communication**:
   - The `product` service publishes product data to the `orders` queue.
   - The `order` service consumes data from the `orders` queue, processes it, and stores the result in MongoDB.
2. **Order to Product Communication**:
   - The `order` service publishes ordered product details to the `products` queue.
   - The `product` service consumes data from the `products` queue to update product details and return order information.

---

## **Prerequisites**

Ensure the following tools are installed on your machine:

- **Node.js** and **npm**: For running the application locally.
- **Docker**: For containerizing and running services.
- **RabbitMQ**: For message brokering between services.
- **MongoDB**: Set up your own MongoDB collection with appropriate credentials and security settings.

---

## **Steps to Run**

### **Using Docker**

1. **Build the Docker Images**
   ```bash
   docker-compose build
   ```

2. **Run the Application**
   ```bash
   docker-compose up
   ```

3. **Verify Running Containers**
   Ensure all containers (API Gateway, Auth, Product, Order, and RabbitMQ) are running:
   ```bash
   docker ps
   ```

4. **Access the Application**
   - API Gateway: `http://localhost:3003`
   - RabbitMQ Management UI: `http://localhost:15672`
   - Frontend UI: `http://localhost:5173`,
   - Admin UI: `http://localhost:3030`,



### **Local Development (Optional)**

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies for each service:
   ```bash
   cd backend/<service-name>
   npm install
   ```

3. Start each service:
   ```bash
   npm start
   ```

4. Ensure RabbitMQ and MongoDB are running locally and update `.env` files for each service with appropriate configurations.

---

## **Contributors**

- **Nguyen Hoang Trung Chanh**
- **Nguyen Tuan Kiet**

---

## **Technologies Used**

- **Node.js**: Backend runtime.
- **React.js + Vite**: Frontend.
- **Express.js**: Framework for building REST APIs.
- **MongoDB**: Database for storing application data.
- **RabbitMQ**: Message broker for asynchronous communication.
- **Docker**: Containerization of services.
- **Docker Compose**: Orchestration of multi-container applications.

---

## **License**

This project is licensed under the MIT License. See the LICENSE file for details.

