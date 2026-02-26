Overview



This is a production-ready backend service that captures request-level metadata including device type, browser, OS, IP address, and geolocation. The system stores structured visit logs in MongoDB for analysis.



It demonstrates backend API development, third-party API integration, secure configuration using environment variables, and cloud deployment with uptime monitoring.



Features



Device, browser, and OS detection using UAParser



IP extraction and geolocation lookup



MongoDB-based persistent visit logging



RESTful API endpoints



Health monitoring route to prevent cold-start issues



Secure environment variable configuration



Cloud deployment (Render backend + Vercel frontend)



| Method | Route             | Description                                 |

| ------ | ----------------- | ------------------------------------------- |

| GET    | `/`               | Tracks and logs visitor metadata            |

| GET    | `/health`         | Health check endpoint for uptime monitoring |

| GET    | `/mysecretvisits` | Returns stored visit logs                   |



Tech Stack



Node.js



Express.js



MongoDB (Mongoose)



UAParser



Axios



Render (Backend Hosting)



Vercel (Frontend Hosting)

Deployment



The backend is deployed on Render with environment-based configuration. Cold-start latency is mitigated using a dedicated health monitoring route.



Architecture



Frontend (Vercel)

→ Backend (Render)

→ MongoDB Atlas

→ External Geo-IP API

