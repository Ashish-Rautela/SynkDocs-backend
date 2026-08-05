# SynkDocs Backend Microservices Architecture

> A high-performance, event-driven, production-grade serverless backend for **SynkDocs** (a Google Docs-inspired real-time collaborative document editing platform). Built with Node.js, AWS SAM, Lambda, API Gateway (REST & WebSockets), DynamoDB, EventBridge, SNS, CloudWatch, S3, and GitHub Actions CI/CD.

---

## 📐 Architectural Vision & Principles

SynkDocs backend strictly avoids monolithic design patterns in favor of a decoupled, domain-driven microservices architecture. Key design patterns implemented:

- **Clean Architecture & Dependency Injection**: Every Lambda function isolates input parsing (`handler.js`), business logic (`service.js`), data access (`repository.js`), validation schemas (`validation.js`), and function wiring (`index.js`).
- **Domain Microservices Isolation**: Each microservice (`authservice`, `documentservice`, `sharingservice`, `userservice`, `collaborationservice`, `notificationservice`, `searchservice`) owns its independent SAM deployment template (`template.yaml`).
- **Real-Time Collaboration**: Decoupled WebSocket API Gateway architecture managing active user socket sessions, operation routing, cursor synchronization, and connection state.
- **Asynchronous Event-Driven Messaging**: Core domain actions trigger AWS EventBridge events (`UserRegistered`, `DocumentCreated`, `DocumentDeleted`, `DocumentShared`, `VersionCreated`, `CommentAdded`), enabling decoupled background execution for notifications and audit workflows.
- **Standardized API Contracts & Telemetry**: Every function utilizes a unified JSON response schema, centralized custom error hierarchy, and structured JSON CloudWatch logging.

---

## 📁 Repository Directory Structure

```
SynkDocs_backend/
├── services/
│   ├── authservice/                      # Authentication & Identity Service
│   │   ├── functions/
│   │   │   ├── register/                 # POST /register (Signup & event emit)
│   │   │   ├── login/                    # POST /login (Credential check & JWT issuance)
│   │   │   ├── logout/                   # POST /logout (Session revocation)
│   │   │   ├── refreshToken/             # POST /refresh-token (Issue new access token)
│   │   │   └── verifyToken/              # POST /verify-token (Validate JWT signature)
│   │   ├── template.yaml                 # SAM deployment declaration for Auth Service
│   │   └── package.json
│   │
│   ├── documentservice/                  # Document Lifecycle Management
│   │   ├── functions/
│   │   │   ├── createDocument/           # POST /documents
│   │   │   ├── deleteDocument/           # DELETE /documents/{id}
│   │   │   ├── renameDocument/           # PUT /documents/{id}
│   │   │   ├── getDocument/              # GET /documents/{id}
│   │   │   ├── listDocuments/            # GET /documents
│   │   │   ├── saveSnapshot/             # POST /documents/{id}/snapshot (S3 & DynamoDB)
│   │   │   └── restoreSnapshot/          # POST /documents/{id}/snapshot/restore
│   │   ├── template.yaml
│   │   └── package.json
│   │
│   ├── sharingservice/                   # Access Control & Collaborator Sharing
│   │   ├── functions/
│   │   │   ├── shareDocument/            # POST /documents/share
│   │   │   ├── revokeAccess/             # DELETE /documents/share
│   │   │   ├── updatePermission/         # PUT /documents/permission
│   │   │   └── getCollaborators/         # GET /documents/{id}/collaborators
│   │   ├── template.yaml
│   │   └── package.json
│   │
│   ├── userservice/                      # User Profile & Account Settings
│   │   ├── functions/
│   │   │   ├── getProfile/               # GET /profile
│   │   │   ├── updateProfile/            # PUT /profile
│   │   │   ├── uploadAvatar/             # POST /profile/avatar (Presigned S3 URL)
│   │   │   └── deleteAccount/            # DELETE /profile
│   │   ├── template.yaml
│   │   └── package.json
│   │
│   ├── collaborationservice/             # Real-Time WebSockets Engine
│   │   ├── functions/
│   │   │   ├── connect/                  # $connect WebSocket route
│   │   │   ├── disconnect/               # $disconnect WebSocket route
│   │   │   ├── sendOperation/            # MESSAGE route (Op transform sync)
│   │   │   ├── cursorPosition/           # MESSAGE route (User selection state)
│   │   │   ├── heartbeat/                # PING route (Socket keep-alive)
│   │   │   └── activeUsers/              # GET /documents/{id}/active-users
│   │   ├── template.yaml
│   │   └── package.json
│   │
│   ├── notificationservice/              # Event-Driven Notifications
│   │   ├── functions/
│   │   │   ├── documentShared/           # EventBridge Consumer (DocumentShared)
│   │   │   ├── commentNotification/      # EventBridge Consumer (CommentAdded)
│   │   │   ├── mentionNotification/      # EventBridge Consumer (User Mention)
│   │   │   └── sendEmail/                # SNS Topic Subscriber (Email Dispatcher)
│   │   ├── template.yaml
│   │   └── package.json
│   │
│   └── searchservice/                    # Document Discovery & Indexing
│       ├── functions/
│       │   ├── searchDocuments/          # GET /documents/search
│       │   ├── recentDocuments/          # GET /documents/recent
│       │   └── starredDocuments/         # GET /documents/starred
│       ├── template.yaml
│       └── package.json
│
├── shared/                               # Core Cross-Cutting Libraries & Utilities
│   ├── middleware/                       # JWT Auth & Centralized Error Handlers
│   ├── constants/                        # Domain Events, Roles, HTTP & Error Codes
│   ├── logger/                           # CloudWatch JSON Structured Logger
│   ├── responses/                        # API Gateway Response Synthesizer
│   ├── jwt/                              # Token Generation & Verification Helpers
│   ├── errors/                           # AppError Class & HTTP Custom Exceptions
│   ├── validation/                       # Joi Validator Middleware
│   ├── utils/                            # EventBridge & S3 Presigned SDK Utilities
│   ├── dynamodb/                         # DocumentClient DynamoDB Helper
│   └── package.json
│
├── infra/                                # Infrastructure as Code (IaC) SAM Templates
│   ├── dynamodb/tables.yaml              # Users, Documents, Permissions, Versions, Connections
│   ├── api-gateway/rest-api.yaml         # Synchronous REST API Gateway Resource
│   ├── api-gateway/websocket-api.yaml    # WebSockets Gateway Resource
│   ├── iam/roles.yaml                    # Service Execution Roles
│   ├── eventbridge/event-bus.yaml        # SynkDocs Core Event Bus
│   ├── sns/topics.yaml                   # Notification Topics
│   ├── cloudwatch/dashboards.yaml        # Monitoring Dashboards
│   └── templates/root-template.yaml      # Master SAM Orchestrator Template
│
├── .github/
│   └── workflows/
│       └── ci-cd.yml                     # Automated Build, Test, SAM Validate, SAM Deploy
│
├── package.json
└── README.md
```

---

## 🛠️ Microservices & Lambda Function Reference

Each function is constructed using Clean Architecture:
`index.js` (Wiring) -> `handler.js` (HTTP / Event Adapter) -> `service.js` (Domain Logic) -> `repository.js` (DynamoDB / S3) & `validation.js` (Joi Schema).

### 1. Auth Service (`services/authservice/`)
| Function | Route / Event | Description |
| :--- | :--- | :--- |
| `register` | `POST /register` | Hashes password with bcrypt, stores user record in DynamoDB, publishes `UserRegistered` event to EventBridge. |
| `login` | `POST /login` | Validates credentials against password hash, generates Access JWT (15m) & Refresh JWT (7d). |
| `logout` | `POST /logout` | Invalidates active user session and client token claims. |
| `refreshToken` | `POST /refresh-token` | Validates refresh token signature and issues a new access token pair. |
| `verifyToken` | `POST /verify-token` | Validates active access JWT claims for API Gateway custom authorizers. |

### 2. Document Service (`services/documentservice/`)
| Function | Route / Event | Description |
| :--- | :--- | :--- |
| `createDocument` | `POST /documents` | Initializes document metadata in DynamoDB, assigns `OWNER` role, publishes `DocumentCreated` event. |
| `deleteDocument` | `DELETE /documents/{id}` | Enforces owner authorization, deletes document record, publishes `DocumentDeleted` event. |
| `renameDocument` | `PUT /documents/{id}` | Updates document title and timestamp. |
| `getDocument` | `GET /documents/{id}` | Fetches document details if user possesses `OWNER`, `EDITOR`, `VIEWER`, or `COMMENTER` permission. |
| `listDocuments` | `GET /documents` | Returns paginated list of user-owned and shared documents. |
| `saveSnapshot` | `POST /documents/{id}/snapshot` | Uploads state snapshot JSON to S3 bucket, creates entry in Versions table, publishes `VersionCreated`. |
| `restoreSnapshot` | `POST /documents/{id}/snapshot/restore` | Downloads snapshot from S3 and updates active document content. |

### 3. Sharing Service (`services/sharingservice/`)
| Function | Route / Event | Description |
| :--- | :--- | :--- |
| `shareDocument` | `POST /documents/share` | Grants `EDITOR`/`VIEWER`/`COMMENTER` access to a collaborator, publishes `DocumentShared` event. |
| `revokeAccess` | `DELETE /documents/share` | Removes collaborator access record from Permissions table, publishes `AccessRevoked` event. |
| `updatePermission` | `PUT /documents/permission` | Modifies role of an existing collaborator, publishes `PermissionUpdated` event. |
| `getCollaborators` | `GET /documents/{id}/collaborators` | Lists all users with permission to access the document. |

### 4. User Service (`services/userservice/`)
| Function | Route / Event | Description |
| :--- | :--- | :--- |
| `getProfile` | `GET /profile` | Retrieves authenticated user profile info (excluding password hash). |
| `updateProfile` | `PUT /profile` | Updates user display name and bio. |
| `uploadAvatar` | `POST /profile/avatar` | Generates presigned S3 URL for uploading avatar image. |
| `deleteAccount` | `DELETE /profile` | Deletes user account and associated personal settings. |

### 5. Collaboration Service (`services/collaborationservice/`)
| Function | Route / Event | Description |
| :--- | :--- | :--- |
| `connect` | `WebSocket $connect` | Authenticates socket connection via JWT query parameter, saves session in Connections table. |
| `disconnect` | `WebSocket $disconnect` | Removes connection record from Connections table on client disconnect. |
| `sendOperation` | `WebSocket MESSAGE` | Receives document operational transforms and broadcasts changes to all active session peers. |
| `cursorPosition` | `WebSocket MESSAGE` | Broadcasts collaborator cursor positions and range selections in real-time. |
| `heartbeat` | `WebSocket PING` | Updates `lastSeen` timestamp in Connections table to keep socket alive. |
| `activeUsers` | `GET /documents/{id}/active-users` | Queries currently connected collaborators for a specific document. |

### 6. Notification Service (`services/notificationservice/`)
| Function | Route / Event | Description |
| :--- | :--- | :--- |
| `documentShared` | `EventBridge Rule` | Consumes `DocumentShared` events and publishes payload to Notification SNS Topic. |
| `commentNotification` | `EventBridge Rule` | Consumes `CommentAdded` events and notifies document collaborators. |
| `mentionNotification` | `EventBridge Rule` | Consumes user `@mention` events and triggers target notifications. |
| `sendEmail` | `SNS Topic Trigger` | Processes SNS notification messages and dispatches email alerts via SES/SMTP. |

### 7. Search Service (`services/searchservice/`)
| Function | Route / Event | Description |
| :--- | :--- | :--- |
| `searchDocuments` | `GET /documents/search` | Performs title search across user documents. |
| `recentDocuments` | `GET /documents/recent` | Fetches documents sorted by recent activity timestamp. |
| `starredDocuments` | `GET /documents/starred` | Retrieves documents marked as starred/favorites by the user. |

---

## 🗄️ Database Design (DynamoDB)

The project uses single-purpose, highly indexed DynamoDB tables:

1. **Users Table** (`SynkDocs-Users`)
   - `PK`: `userId` (String)
   - `GSI`: `EmailIndex` (`email` - HASH)
   - Attributes: `email`, `name`, `passwordHash`, `verified`, `createdAt`, `updatedAt`

2. **Documents Table** (`SynkDocs-Documents`)
   - `PK`: `documentId` (String)
   - `GSI`: `OwnerIndex` (`ownerId` - HASH)
   - Attributes: `ownerId`, `title`, `content`, `createdAt`, `updatedAt`

3. **Permissions Table** (`SynkDocs-Permissions`)
   - `PK`: `documentId` (String)
   - `SK`: `userId` (String)
   - `GSI`: `UserPermissionsIndex` (`userId` - HASH)
   - Attributes: `role` (`OWNER` \| `EDITOR` \| `VIEWER` \| `COMMENTER`), `grantedBy`, `createdAt`, `updatedAt`

4. **Versions Table** (`SynkDocs-Versions`)
   - `PK`: `documentId` (String)
   - `SK`: `version` (String)
   - Attributes: `snapshotLocation` (S3 URI), `createdBy`, `createdAt`

5. **Connections Table** (`SynkDocs-Connections`)
   - `PK`: `connectionId` (String)
   - `GSI`: `DocumentConnectionsIndex` (`documentId` - HASH)
   - Attributes: `documentId`, `userId`, `lastSeen`, `connectedAt`

---

## 🔒 Security Architecture

- **Authentication**: JWT (JSON Web Tokens) with short-lived access tokens (15 minutes) and refresh tokens (7 days).
- **Password Security**: Passwords hashed using `bcryptjs` with 10 salt rounds.
- **Input Validation**: Enforced at handler layer using strict `Joi` schemas.
- **Error Handling**: Standardized error response contract prevents leakage of internal stack traces in production:
  ```json
  {
    "success": false,
    "message": "Detailed error message",
    "code": "ERROR_CODE",
    "data": null
  }
  ```
- **Principle of Least Privilege**: IAM roles defined per microservice granting access strictly to necessary DynamoDB tables, S3 buckets, EventBridge buses, and SNS topics.

---

## 🚀 Deployment & CI/CD Guide

### Prerequisites
- [Node.js 18.x+](https://nodejs.org/)
- [AWS CLI](https://aws.amazon.com/cli/) configured with deployment credentials.
- [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html) installed.

### Local Development & SAM Build

1. **Install dependencies**:
   ```bash
   npm install
   cd shared && npm install && cd ..
   ```

2. **Validate SAM templates**:
   ```bash
   sam validate --template infra/templates/root-template.yaml
   ```

3. **Build the serverless stack**:
   ```bash
   sam build --template infra/templates/root-template.yaml
   ```

4. **Deploy manually via SAM**:
   ```bash
   sam deploy --guided --template-file .aws-sam/build/template.yaml
   ```

### GitHub Actions CI/CD Pipeline

The included `.github/workflows/ci-cd.yml` workflow automatically runs on `push` or `pull_request`:
1. **Lint & Test**: Runs automated unit tests across shared libraries and service modules.
2. **SAM Validate**: Validates CloudFormation syntax for root and nested SAM templates.
3. **SAM Build**: Packages Lambda function code and dependencies into build artifacts.
4. **Automated Deployment**:
   - Pushes to `develop` branch automatically deploy to **Staging** (`synkdocs-backend-staging`).
   - Pushes to `main` branch automatically deploy to **Production** (`synkdocs-backend-production`).

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for details.
