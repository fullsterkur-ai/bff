# BFF

> Backend for Frontend. Connects the services together.

<br />
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#tech-stack">Tech Stack</a></li>
    <li><a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#running-the-service">Running the Service</a></li>
      </ul>
    </li>
    <li><a href="#project-structure">Project Structure</a></li>
  </ol>
</details>

---

## Tech Stack

| <img src="https://raw.githubusercontent.com/github/explore/main/topics/nodejs/nodejs.png" width="60" /> | <img src="https://raw.githubusercontent.com/github/explore/main/topics/express/express.png" width="60" /> | <img src="https://raw.githubusercontent.com/github/explore/main/topics/typescript/typescript.png" width="60" /> |
|:---:|:---:|:---:|
| **Node.js**<br>JavaScript runtime the service runs on. | **Express**<br>Web framework used to build the API that aggregates and routes requests to the underlying microservices. | **TypeScript**<br>Adds static typing on top of JavaScript, catching errors earlier and making the API contracts between the BFF and the microservices clearer. |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/installation)

### Installation

1. Clone the repo
   ```
   git clone https://github.com/fullsterkur-ai/bff.git
   cd bff
   ```
2. Install dependencies
   ```
   pnpm install
   ```

### Running the Service

```
pnpm run dev
```

---

## See Also

- [Main repository README](https://github.com/fullsterkur-ai/J26-SE-342): project overview, architecture, components, and team
- [DEVELOPMENT.md](https://github.com/fullsterkur-ai/J26-SE-342/blob/main/DEVELOPMENT.md): coding conventions and branching/merging strategy

<p align="right">(<a href="#bff">back to top</a>)</p>
