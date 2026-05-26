# 🎓 Student CGPA & Probation Tracker

A modern, full-stack monitoring system designed to query, process, and track academic student probation records. Built with an optimized MVC-lite architecture, the application queries structural data directly from a secure cloud relational database layer and presents analytics via a high-performance web dashboard interface.

---

## 🚀 Key Architecture Highlights

* **Frontend Presentation:** High-performance, responsive executive dashboard built with **Tailwind CSS** utilities and handled dynamically via client-side **AlpineJS** reactive state loops. Hosted permanently on the cloud using **Firebase Hosting**.
* **Backend Application Layer:** Built on **Node.js** and **Express**, utilizing an elegant, clean MVC-lite routing directory layout.
* **Database Infrastructure:** Scalable cloud relational storage powered by a **Neon Postgres** instance, fortified with background connection pool event listeners to prevent runtime drop exceptions.
* **DevOps & Containerization:** Fully containerized environment orchestrating application runtimes smoothly across any platform using **Docker** and **Docker Compose**.

---

## 📁 System Folder Tree

```text
Student-CGPA-Probation-Tracker/
│   .firebaserc          # Firebase deployment profile targeting cloud workspace
│   firebase.json        # Static multi-page routing asset rule definitions
│   Dockerfile           # Container layer build blueprint configurations
│   docker-compose.yml   # Multi-service runtime network layer configurations
│   README.md            # Interactive system engineering manual documentation
├───functions/           # Backend Application Directory (Node.js/Express Engine)
│   ├───config/          # Cloud platform credentials & Neon pool handlers
│   ├───controllers/     # Query orchestration & academic filtering algorithms
│   └───routes/          # API route endpoint specifications
└───public/              # Presentation Web Tier Layer (Tailwind/AlpineJS Code)