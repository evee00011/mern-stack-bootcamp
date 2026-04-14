# mern-stack-bootcamp
Full-stack technical spikes: MongoDB, Express, React, and Node.js. Focus on systematic learning and implementation.

In this spike, I implemented a full-stack MERN notes application featuring JWT authentication, CRUD operations, and a responsive UI using Tailwind CSS. My implementation process focused on establishing a secure Express backend with MongoDB and integrating it with a React frontend using Axios interceptors for token management. I followed a structured Git workflow, conducting all feature development in the `develop` branch before transitioning to `release` for final debugging and eventually merging into `main` for deployment. During development, I encountered several challenges with asynchronous state synchronization and "race conditions" where the UI attempted to render user data before the API call completed; I resolved these by implementing conditional rendering and optional chaining. This spike reinforced the importance of strict input validation and taught me how to manage global state and side effects effectively using `useEffect`, ultimately strengthening my ability to build cohesive, high-performance web applications.

These are some screenshots of the completed application:

<img width="735" height="244" alt="Screenshot 2026-04-14 at 3 47 39 PM" src="https://github.com/user-attachments/assets/98ed4aea-92c6-46e0-bf0e-507658d6440f" />

<img width="728" height="254" alt="Screenshot 2026-04-14 at 3 49 05 PM" src="https://github.com/user-attachments/assets/5e4cda0d-da21-47e2-a385-828e7df2eeed" />
<img width="301" height="503" alt="Screenshot 2026-04-14 at 3 47 51 PM" src="https://github.com/user-attachments/assets/5f73da47-a037-4358-baed-eb812bec51b3" />

<img width="696" height="243" alt="Screenshot 2026-04-14 at 3 49 25 PM" src="https://github.com/user-attachments/assets/fe1526d9-7037-4387-94d7-59fa2f8dfcd9" />

