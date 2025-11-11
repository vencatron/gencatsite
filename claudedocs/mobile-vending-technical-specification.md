# Mobile AI Vending Solution - Technical Specification Document
**Version**: 1.0 MVP
**Date**: 2025-01-06
**Project Code Name**: VendBot MVP
**Status**: Requirements & Feasibility Analysis

---

## Executive Summary

**Core Value Proposition**: "Goes to customers rather than customers finding it"

A mobile, route-based vending solution that brings products directly to customers on a predictable schedule. The MVP focuses on proving the business model with semi-autonomous operation before investing in full autonomy.

**MVP Target**: Single route operation with remote operator, smart locker vending system, mobile app for tracking and transactions, membership-based revenue model.

**Timeline**: 3-6 months to operational pilot
**Budget**: $50,000 - $100,000
**Risk Level**: LOW (proven components, incremental approach)

---

## Table of Contents
1. [System Architecture Overview](#system-architecture-overview)
2. [Hardware Specification & BOM](#hardware-specification--bom)
3. [Software Architecture](#software-architecture)
4. [API Specifications](#api-specifications)
5. [Database Schema](#database-schema)
6. [Mobile App Specification](#mobile-app-specification)
7. [Unit Embedded Systems](#unit-embedded-systems)
8. [AI/ML Systems](#aiml-systems)
9. [Security & Compliance](#security--compliance)
10. [Deployment Architecture](#deployment-architecture)
11. [Development Roadmap](#development-roadmap)

---

## System Architecture Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     CUSTOMER LAYER                          │
│  ┌──────────────┐              ┌──────────────┐            │
│  │ Mobile App   │              │  NFC/QR Pay  │            │
│  │ (iOS/Android)│              │   Terminal   │            │
│  └──────────────┘              └──────────────┘            │
└─────────────────────────────────────────────────────────────┘
                          │                │
                          ▼                ▼
┌─────────────────────────────────────────────────────────────┐
│                   CLOUD BACKEND LAYER                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   API Gateway│  │ Auth Service │  │  Websocket   │      │
│  │  (Express.js)│  │    (JWT)     │  │   Server     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │    Route     │  │  Inventory   │  │   Payment    │      │
│  │  Management  │  │  Management  │  │   Service    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Telemetry   │  │ Notification │  │  Analytics   │      │
│  │   Service    │  │   Service    │  │   Service    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                              │
│  ┌──────────────────────────────────────────────────┐       │
│  │  PostgreSQL + PostGIS  │  Redis Cache            │       │
│  └──────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                   UNIT LAYER (Edge)                          │
│  ┌──────────────────────────────────────────────────┐       │
│  │         Raspberry Pi 4 Controller                │       │
│  │  ┌──────────────┐  ┌──────────────┐             │       │
│  │  │    Locker    │  │   Payment    │             │       │
│  │  │  Controller  │  │   Terminal   │             │       │
│  │  └──────────────┘  └──────────────┘             │       │
│  │  ┌──────────────┐  ┌──────────────┐             │       │
│  │  │  GPS Tracker │  │  Telemetry   │             │       │
│  │  │              │  │   Client     │             │       │
│  │  └──────────────┘  └──────────────┘             │       │
│  └──────────────────────────────────────────────────┘       │
│                                                              │
│  ┌──────────────────────────────────────────────────┐       │
│  │         Electric Golf Cart Platform              │       │
│  │  ┌──────────────┐  ┌──────────────┐             │       │
│  │  │ Smart Locker │  │    Battery   │             │       │
│  │  │  Array (24)  │  │  System 48V  │             │       │
│  │  └──────────────┘  └──────────────┘             │       │
│  └──────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

**Customer Interaction Flow:**
1. Customer opens app → sees unit location & ETA
2. Customer browses products → reserves item (members) or adds to cart
3. Customer receives notification: "Unit arriving in 2 minutes"
4. Customer walks to unit → scans QR code or taps NFC
5. Locker unlocks → customer retrieves item
6. Sensor confirms pickup → transaction completes

**Operator Flow (MVP):**
1. Operator logs into fleet management dashboard
2. Selects route and initiates operation
3. Drives unit via remote control or in-person
4. Monitors transactions and inventory via dashboard
5. Receives alerts for low stock or technical issues

**Backend Processing:**
1. Real-time GPS telemetry → updates customer app ETAs
2. Transaction data → inventory management → restock alerts
3. Analytics engine processes sales data → AI demand predictions
4. Notification service triggers proximity alerts to nearby customers

---

## Hardware Specification & BOM

### Bill of Materials (BOM)

#### **1. Mobile Platform**

| Component | Specification | Vendor/Model | Qty | Unit Cost | Total Cost |
|-----------|---------------|--------------|-----|-----------|------------|
| **Electric Golf Cart** | 48V, 25mph max, 40-mile range | Club Car Carryall 300 | 1 | $12,000 | $12,000 |
| **Custom Enclosure** | Weatherproof fiberglass shell | Custom fabrication | 1 | $3,500 | $3,500 |
| **Awning/Canopy** | Retractable awning for customer interaction | SunSetter Awning | 1 | $800 | $800 |
| **LED Signage** | Programmable LED display (logo/messages) | Adafruit RGB Matrix | 2 | $200 | $400 |
| **Battery Upgrade** | Lithium deep-cycle (extended range) | RELiON RB100-LT | 4 | $850 | $3,400 |
| **Solar Panel** | 200W panel for auxiliary charging | Renogy 200W | 1 | $250 | $250 |
| **Wheel Locks** | Electronic parking brake system | Custom | 1 | $400 | $400 |

**Platform Subtotal**: $20,750

---

#### **2. Vending System (Smart Locker Array)**

| Component | Specification | Vendor/Model | Qty | Unit Cost | Total Cost |
|-----------|---------------|--------------|-----|-----------|------------|
| **Locker Modules** | 24 compartments (3 sizes: S/M/L) | Parcel Pending Luxer One (modified) | 1 | $8,000 | $8,000 |
| **Electronic Locks** | 12V solenoid locks with status sensors | SDTC Cabinet Lock | 24 | $35 | $840 |
| **Compartment Sensors** | IR beam break to detect item removal | Adafruit IR Break Beam | 24 | $12 | $288 |
| **Lock Controller** | Relay board for lock control | 16-channel relay module | 2 | $25 | $50 |
| **RFID Module** | RFID for inventory tracking (optional) | RC522 RFID Module | 1 | $15 | $15 |
| **Lighting** | Interior LED strips for visibility | LED strip 12V | 1 | $40 | $40 |

**Vending System Subtotal**: $9,233

---

#### **3. Electronics & Compute**

| Component | Specification | Vendor/Model | Qty | Unit Cost | Total Cost |
|-----------|---------------|--------------|-----|-----------|------------|
| **Main Controller** | Raspberry Pi 4 (8GB RAM) | Raspberry Pi 4 Model B | 1 | $75 | $75 |
| **Backup Controller** | Raspberry Pi Pico (failsafe) | Raspberry Pi Pico | 1 | $5 | $5 |
| **GPS Module** | High-precision GPS with cellular | Hologram Nova 4G LTE | 1 | $99 | $99 |
| **4G/LTE Modem** | Cellular connectivity | Quectel EC25 4G Module | 1 | $45 | $45 |
| **WiFi Module** | High-power WiFi for hotspot | Alfa AWUS036ACH | 1 | $45 | $45 |
| **Power Management** | 12V→5V DC-DC converters | DROK Buck Converter | 3 | $15 | $45 |
| **UPS Battery** | Backup power for electronics | Talentcell 12V 6000mAh | 1 | $30 | $30 |
| **Cooling Fan** | Active cooling for Pi | Noctua 40mm 12V Fan | 2 | $15 | $30 |
| **Enclosure** | Weatherproof electronics box | Bud Industries Enclosure | 1 | $50 | $50 |

**Electronics Subtotal**: $424

---

#### **4. Payment & Customer Interface**

| Component | Specification | Vendor/Model | Qty | Unit Cost | Total Cost |
|-----------|---------------|--------------|-----|-----------|------------|
| **NFC/Contactless Reader** | Supports Apple Pay, Google Pay | Square Contactless Reader | 1 | $49 | $49 |
| **QR Code Scanner** | 2D barcode scanner | Tera Barcode Scanner | 1 | $35 | $35 |
| **Touchscreen Display** | 10" outdoor-readable display (optional) | Waveshare 10.1" HDMI LCD | 1 | $120 | $120 |
| **Speaker** | Audio feedback (beeps, alerts) | USB Powered Speaker | 1 | $25 | $25 |
| **Camera** | Security camera (monitor transactions) | Wyze Cam v3 | 2 | $35 | $70 |
| **Emergency Button** | Physical help button | Industrial E-Stop Button | 1 | $15 | $15 |

**Payment/Interface Subtotal**: $314

---

#### **5. Sensors & Safety (Future Autonomy Ready)**

*Note: Not required for MVP, but included for upgrade path planning*

| Component | Specification | Vendor/Model | Qty | Unit Cost | Total Cost |
|-----------|---------------|--------------|-----|-----------|------------|
| **LIDAR** | 360° laser rangefinder (10m range) | Slamtec RPLidar A2 | 1 | $450 | $450 |
| **Ultrasonic Sensors** | Close-range obstacle detection | HC-SR04 Ultrasonic | 6 | $5 | $30 |
| **IMU** | 9-axis inertial measurement unit | BNO055 Absolute IMU | 1 | $35 | $35 |
| **Wheel Encoders** | Track distance/speed | Optical Rotary Encoder | 2 | $20 | $40 |
| **Front/Rear Cameras** | Stereo vision cameras | Arducam Synchronized Stereo | 1 | $150 | $150 |

**Sensors Subtotal (Phase 2)**: $705 *(Not included in MVP budget)*

---

#### **6. Miscellaneous**

| Component | Specification | Vendor/Model | Qty | Unit Cost | Total Cost |
|-----------|---------------|--------------|-----|-----------|------------|
| **Wiring & Connectors** | Automotive-grade wiring harness | Bulk wire + connectors | 1 | $200 | $200 |
| **Mounting Hardware** | Brackets, bolts, vibration dampers | McMaster-Carr | 1 | $150 | $150 |
| **Weatherproofing** | Sealant, gaskets, cable grommets | 3M Sealant Kit | 1 | $100 | $100 |
| **Tools & Test Equipment** | Multimeter, crimpers, heat gun | Various | 1 | $250 | $250 |
| **Spare Parts** | Extra locks, sensors, cables | Various | 1 | $300 | $300 |

**Miscellaneous Subtotal**: $1,000

---

### **TOTAL HARDWARE COST (MVP)**: **$31,721**

### **Hardware Cost with Contingency (+20%)**: **$38,065**

---

### Hardware Specifications Summary

**Physical Dimensions:**
- **Length**: 120" (10 ft) - golf cart body
- **Width**: 48" (4 ft)
- **Height**: 72" (6 ft) with enclosure
- **Weight**: ~1,200 lbs (loaded)
- **Payload Capacity**: 500 lbs (products + equipment)

**Power System:**
- **Primary Battery**: 48V lithium deep-cycle (8 kWh capacity)
- **Range**: 40-50 miles per charge (outdoor operation)
- **Charge Time**: 4-6 hours (standard charger)
- **Solar Supplement**: 200W panel (adds ~10-15% range in sunny conditions)
- **Electronics Power**: 12V DC bus (converted from 48V)

**Environmental:**
- **Operating Temperature**: 32°F - 95°F (0°C - 35°C)
- **Weather Resistance**: IP65 rated (dust-tight, water-resistant)
- **Storage Temperature**: 0°F - 110°F (-18°C - 43°C)

**Locker Configuration:**
- **Small Compartments**: 8 units (8"W x 8"H x 12"D) - drinks, snacks
- **Medium Compartments**: 12 units (12"W x 12"H x 12"D) - meals, multi-packs
- **Large Compartments**: 4 units (16"W x 16"H x 16"D) - bulk items

**Connectivity:**
- **Primary**: 4G LTE (Hologram Nova with multi-carrier SIM)
- **Backup**: WiFi hotspot
- **GPS**: High-precision (<3m accuracy)
- **Bandwidth**: 5GB/month estimated (telemetry + video monitoring)

---

## Software Architecture

### Technology Stack

#### **Backend (Cloud Services)**

**Runtime & Framework:**
- **Language**: TypeScript (Node.js v18+)
- **Framework**: Express.js 4.18+ (your existing stack ✅)
- **API Style**: RESTful + WebSocket for real-time updates

**Database:**
- **Primary**: PostgreSQL 15+ (your existing stack ✅)
- **Extensions**: PostGIS (geospatial queries for route optimization)
- **ORM**: Drizzle ORM (your existing stack ✅)
- **Cache**: Redis 7+ (session storage, real-time location data)
- **Queue**: BullMQ (async jobs: notifications, analytics)

**Authentication:**
- **Strategy**: JWT access tokens + refresh tokens (your existing pattern ✅)
- **Implementation**: bcrypt for password hashing (your existing stack ✅)

**Payment Processing:**
- **Provider**: Stripe (PCI-compliant, proven)
- **Integration**: Stripe Terminal for contactless readers

**File Storage:**
- **Provider**: AWS S3 or Cloudflare R2 (product images, receipts)

**Hosting:**
- **Platform**: Railway, Render, or AWS (your preference)
- **CDN**: Cloudflare (static assets, API caching)

---

#### **Mobile App (Customer-Facing)**

**Framework:**
- **Language**: TypeScript
- **Framework**: React Native 0.73+ (Expo for rapid development)
- **Navigation**: React Navigation 6+
- **State Management**: Zustand or React Context (lightweight)

**Key Libraries:**
- **Maps**: react-native-maps (Google Maps or Mapbox)
- **Notifications**: Firebase Cloud Messaging
- **Payment**: Stripe React Native SDK
- **Geolocation**: react-native-geolocation-service
- **Camera**: react-native-camera (QR code scanning)
- **HTTP Client**: Axios with retry logic
- **Offline Storage**: AsyncStorage or MMKV

**Platforms:**
- iOS 14+ (via App Store)
- Android 10+ (via Google Play)

---

#### **Unit Embedded Software**

**Main Controller (Raspberry Pi 4):**
- **OS**: Raspberry Pi OS Lite (Debian-based, headless)
- **Language**: Python 3.11+
- **Key Libraries**:
  - `RPi.GPIO` - Control locks, sensors, relays
  - `gpiozero` - Simplified GPIO interface
  - `pyserial` - GPS/modem communication
  - `requests` - HTTP client for API calls
  - `websocket-client` - Real-time connection to backend
  - `opencv-python` - Camera processing (security monitoring)

**Services (systemd):**
- `locker-controller.service` - Manage lock/unlock operations
- `telemetry-client.service` - GPS tracking, status reporting
- `payment-terminal.service` - NFC/QR payment processing
- `watchdog.service` - Health monitoring, auto-restart on failures

**Failsafe Controller (Raspberry Pi Pico):**
- **Language**: MicroPython or C++
- **Purpose**: Emergency stop, basic locker override if main controller fails

---

### Microservices Architecture

**Service Breakdown:**

```
api-gateway/              # Main Express.js entry point
├── routes/
│   ├── auth.routes.ts
│   ├── routes.routes.ts
│   ├── inventory.routes.ts
│   ├── telemetry.routes.ts
│   ├── payments.routes.ts
│   └── users.routes.ts
├── middleware/
│   ├── auth.middleware.ts
│   ├── validation.middleware.ts
│   └── rate-limit.middleware.ts
└── server.ts

services/
├── auth-service/         # JWT, user management (reuse existing ✅)
├── route-service/        # Route planning, scheduling, optimization
├── inventory-service/    # Stock management, demand prediction
├── telemetry-service/    # GPS tracking, unit status, alerts
├── payment-service/      # Stripe integration, transaction processing
├── notification-service/ # Push notifications, SMS (Twilio)
├── analytics-service/    # Sales data, reporting, AI training
└── websocket-service/    # Real-time updates (location, availability)

shared/
├── schema.ts             # Database schema (Drizzle ORM ✅)
├── types.ts              # Shared TypeScript types
└── utils.ts              # Common utilities
```

---

## API Specifications

### RESTful API Endpoints

**Base URL**: `https://api.vendbot.com/v1`

---

#### **Authentication Endpoints** *(Reuse existing stack)*

```typescript
POST   /auth/register
POST   /auth/login
POST   /auth/logout
POST   /auth/refresh
GET    /auth/me
```

---

#### **User Management**

```typescript
GET    /users/me                    # Get current user profile
PUT    /users/me                    # Update profile
POST   /users/me/payment-methods    # Add payment method
DELETE /users/me/payment-methods/:id
GET    /users/me/membership         # Get membership status
POST   /users/me/membership/upgrade # Upgrade membership tier
DELETE /users/me/membership         # Cancel membership
```

**Example Response - GET /users/me:**
```json
{
  "id": "usr_abc123",
  "email": "user@example.com",
  "name": "John Doe",
  "phone": "+1234567890",
  "membershipTier": "premium",
  "memberSince": "2025-01-01T00:00:00Z",
  "favoriteProducts": ["prd_xyz789", "prd_abc456"],
  "purchaseHistory": [...],
  "savedPaymentMethods": [
    {
      "id": "pm_xyz",
      "type": "card",
      "last4": "4242",
      "brand": "visa"
    }
  ]
}
```

---

#### **Route Management**

```typescript
GET    /routes                      # Get all active routes
GET    /routes/:id                  # Get specific route details
GET    /routes/:id/schedule         # Get today's schedule
GET    /routes/nearby?lat=X&lng=Y&radius=M  # Find routes near user
GET    /routes/:id/current-location # Real-time unit location
GET    /routes/:id/eta?lat=X&lng=Y  # ETA to user's location
```

**Example Response - GET /routes/:id:**
```json
{
  "id": "rte_campus_main",
  "name": "Tech Campus Loop",
  "unitId": "unit_001",
  "status": "active",
  "currentLocation": {
    "lat": 37.7749,
    "lng": -122.4194,
    "accuracy": 5,
    "timestamp": "2025-01-06T14:30:00Z"
  },
  "schedule": [
    {
      "stopId": "stop_bldgA_lobby",
      "name": "Building A Lobby",
      "location": {"lat": 37.7750, "lng": -122.4195},
      "arrivalTime": "09:00",
      "departureTime": "09:15",
      "status": "completed"
    },
    {
      "stopId": "stop_bldgB_cafe",
      "name": "Building B Cafeteria",
      "location": {"lat": 37.7755, "lng": -122.4200},
      "arrivalTime": "09:30",
      "departureTime": "09:45",
      "status": "en_route",
      "eta": "2025-01-06T14:35:00Z"
    }
  ],
  "nextStop": {
    "stopId": "stop_bldgB_cafe",
    "eta": "5 minutes"
  }
}
```

---

#### **Inventory Management**

```typescript
GET    /inventory/units/:unitId     # Get unit's current inventory
GET    /inventory/products          # Get all available products
GET    /inventory/products/:id      # Get product details
POST   /inventory/reserve           # Reserve item (members only)
DELETE /inventory/reserve/:id       # Cancel reservation
GET    /inventory/availability/:productId?unitId=X  # Check availability
```

**Example Request - POST /inventory/reserve:**
```json
{
  "productId": "prd_cold_brew_lg",
  "unitId": "unit_001",
  "stopId": "stop_bldgB_cafe",
  "pickupTime": "2025-01-06T15:00:00Z"
}
```

**Example Response:**
```json
{
  "reservationId": "rsv_abc123",
  "productId": "prd_cold_brew_lg",
  "unitId": "unit_001",
  "stopId": "stop_bldgB_cafe",
  "pickupWindow": {
    "start": "2025-01-06T14:55:00Z",
    "end": "2025-01-06T15:10:00Z"
  },
  "lockerNumber": 12,
  "unlockCode": "548293",
  "expiresAt": "2025-01-06T15:10:00Z",
  "status": "confirmed"
}
```

---

#### **Payment & Transactions**

```typescript
POST   /payments/create-intent      # Create Stripe payment intent
POST   /payments/confirm            # Confirm payment
GET    /payments/transactions       # Get user's transaction history
GET    /payments/transactions/:id   # Get transaction details
POST   /payments/refund/:id         # Request refund
```

**Example Request - POST /payments/create-intent:**
```json
{
  "items": [
    {"productId": "prd_cold_brew_lg", "quantity": 1}
  ],
  "unitId": "unit_001",
  "paymentMethodId": "pm_xyz"
}
```

**Example Response:**
```json
{
  "clientSecret": "pi_xyz_secret_abc",
  "amount": 650,
  "currency": "usd",
  "transactionId": "txn_abc123"
}
```

---

#### **Telemetry (Unit → Backend)**

```typescript
POST   /telemetry/location          # Unit reports GPS position
POST   /telemetry/status            # Unit reports health status
POST   /telemetry/transaction       # Unit reports completed transaction
POST   /telemetry/alert             # Unit reports issue/alert
GET    /telemetry/units/:id         # Get unit status (admin)
```

**Example Request - POST /telemetry/location:**
```json
{
  "unitId": "unit_001",
  "location": {
    "lat": 37.7749,
    "lng": -122.4194,
    "accuracy": 5,
    "speed": 8.5,
    "heading": 180
  },
  "timestamp": "2025-01-06T14:30:00Z",
  "batteryLevel": 78,
  "cellSignal": -75
}
```

---

#### **Notifications**

```typescript
POST   /notifications/subscribe     # Register device for push notifications
DELETE /notifications/unsubscribe
PUT    /notifications/preferences   # Update notification settings
```

---

### WebSocket API

**Connection**: `wss://api.vendbot.com/v1/ws`

**Channels:**
```typescript
// Customer subscribes to unit updates
SUBSCRIBE route:{routeId}

// Real-time location updates
MESSAGE route:campus_main
{
  "type": "location_update",
  "unitId": "unit_001",
  "location": {"lat": 37.7749, "lng": -122.4194},
  "eta": "3 minutes",
  "nextStop": "Building B"
}

// Inventory updates
MESSAGE route:campus_main
{
  "type": "inventory_update",
  "productId": "prd_cold_brew_lg",
  "available": 5,
  "status": "low_stock"
}

// Unit arrival notification
MESSAGE route:campus_main
{
  "type": "arrival",
  "stopId": "stop_bldgB_cafe",
  "message": "Unit has arrived at Building B Cafeteria"
}
```

---

## Database Schema

**Extension to Your Existing Schema** (`shared/schema.ts`)

```typescript
import { pgTable, text, integer, decimal, timestamp, boolean, jsonb, varchar, unique } from 'drizzle-orm/pg-core';

// Reuse existing users table ✅
// Extend with new fields for vending

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  phone: varchar('phone', { length: 20 }),
  passwordHash: text('password_hash').notNull(),
  role: text('role').notNull().default('customer'), // customer, operator, admin
  membershipTier: text('membership_tier').default('free'), // free, basic, premium
  memberSince: timestamp('member_since'),
  stripeCustomerId: text('stripe_customer_id'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// New tables for vending system

export const units = pgTable('units', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  status: text('status').notNull().default('offline'), // offline, idle, active, maintenance, error
  currentRouteId: text('current_route_id').references(() => routes.id),
  batteryLevel: integer('battery_level'), // 0-100%
  lastLocation: jsonb('last_location').$type<{
    lat: number;
    lng: number;
    accuracy: number;
    timestamp: string;
  }>(),
  lastSeen: timestamp('last_seen'),
  totalDistanceTraveled: decimal('total_distance_traveled', { precision: 10, scale: 2 }), // miles
  totalTransactions: integer('total_transactions').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const routes = pgTable('routes', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  status: text('status').notNull().default('active'), // active, paused, archived
  schedule: jsonb('schedule').$type<{
    daysOfWeek: number[]; // 0-6 (Sun-Sat)
    startTime: string; // HH:MM
    endTime: string; // HH:MM
  }>(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const stops = pgTable('stops', {
  id: text('id').primaryKey(),
  routeId: text('route_id').notNull().references(() => routes.id),
  name: text('name').notNull(),
  location: jsonb('location').notNull().$type<{
    lat: number;
    lng: number;
  }>(),
  order: integer('order').notNull(), // Sequence in route
  scheduledArrival: text('scheduled_arrival'), // HH:MM
  scheduledDeparture: text('scheduled_departure'), // HH:MM
  dwellTime: integer('dwell_time').default(15), // minutes
  createdAt: timestamp('created_at').defaultNow(),
});

export const products = pgTable('products', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  category: text('category').notNull(), // beverage, snack, meal, personal_care, etc.
  price: decimal('price', { precision: 10, scale: 2 }).notNull(), // cents
  cost: decimal('cost', { precision: 10, scale: 2 }), // wholesale cost
  imageUrl: text('image_url'),
  barcode: varchar('barcode', { length: 50 }),
  sku: varchar('sku', { length: 50 }).unique(),
  size: text('size'), // S, M, L or specific dimensions
  requiresRefrigeration: boolean('requires_refrigeration').default(false),
  memberOnly: boolean('member_only').default(false),
  active: boolean('active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const inventory = pgTable('inventory', {
  id: text('id').primaryKey(),
  unitId: text('unit_id').notNull().references(() => units.id),
  productId: text('product_id').notNull().references(() => products.id),
  lockerNumber: integer('locker_number').notNull(), // 1-24
  quantity: integer('quantity').notNull().default(1), // Typically 1 per locker
  status: text('status').notNull().default('available'), // available, reserved, sold, expired
  expiresAt: timestamp('expires_at'), // For perishable items
  lastRestocked: timestamp('last_restocked').defaultNow(),
}, (table) => ({
  uniqueUnitLocker: unique().on(table.unitId, table.lockerNumber),
}));

export const reservations = pgTable('reservations', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  unitId: text('unit_id').notNull().references(() => units.id),
  productId: text('product_id').notNull().references(() => products.id),
  stopId: text('stop_id').notNull().references(() => stops.id),
  inventoryId: text('inventory_id').notNull().references(() => inventory.id),
  lockerNumber: integer('locker_number').notNull(),
  unlockCode: varchar('unlock_code', { length: 10 }).notNull(),
  status: text('status').notNull().default('pending'), // pending, confirmed, picked_up, expired, cancelled
  pickupWindow: jsonb('pickup_window').notNull().$type<{
    start: string;
    end: string;
  }>(),
  pickedUpAt: timestamp('picked_up_at'),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const transactions = pgTable('transactions', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id), // Null for guest purchases
  unitId: text('unit_id').notNull().references(() => units.id),
  reservationId: text('reservation_id').references(() => reservations.id),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(), // Total in cents
  tax: decimal('tax', { precision: 10, scale: 2 }).default('0'),
  discount: decimal('discount', { precision: 10, scale: 2 }).default('0'),
  paymentMethod: text('payment_method').notNull(), // card, nfc, qr_code
  stripePaymentIntentId: text('stripe_payment_intent_id'),
  status: text('status').notNull().default('pending'), // pending, completed, failed, refunded
  items: jsonb('items').notNull().$type<{
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }[]>(),
  location: jsonb('location').$type<{
    lat: number;
    lng: number;
  }>(),
  completedAt: timestamp('completed_at'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const telemetry = pgTable('telemetry', {
  id: text('id').primaryKey(),
  unitId: text('unit_id').notNull().references(() => units.id),
  timestamp: timestamp('timestamp').notNull().defaultNow(),
  location: jsonb('location').$type<{
    lat: number;
    lng: number;
    accuracy: number;
    speed: number;
    heading: number;
  }>(),
  batteryLevel: integer('battery_level'),
  cellSignal: integer('cell_signal'), // dBm
  temperature: decimal('temperature', { precision: 5, scale: 2 }), // Internal temp (°C)
  doorStatus: text('door_status'), // open, closed
  errors: jsonb('errors').$type<string[]>(),
  metrics: jsonb('metrics').$type<{
    cpuUsage: number;
    memoryUsage: number;
    diskUsage: number;
  }>(),
});

export const notifications = pgTable('notifications', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  type: text('type').notNull(), // proximity, arrival, reservation_reminder, low_stock, promotion
  title: text('title').notNull(),
  message: text('message').notNull(),
  data: jsonb('data').$type<Record<string, any>>(),
  read: boolean('read').default(false),
  sentAt: timestamp('sent_at'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const analytics = pgTable('analytics', {
  id: text('id').primaryKey(),
  date: timestamp('date').notNull(),
  unitId: text('unit_id').references(() => units.id),
  routeId: text('route_id').references(() => routes.id),
  stopId: text('stop_id').references(() => stops.id),
  metric: text('metric').notNull(), // revenue, transactions, avg_transaction_value, inventory_turnover
  value: decimal('value', { precision: 15, scale: 2 }).notNull(),
  metadata: jsonb('metadata').$type<Record<string, any>>(),
  createdAt: timestamp('created_at').defaultNow(),
});
```

---

## Mobile App Specification

### Screen Hierarchy

```
App
├── Auth Flow
│   ├── Welcome Screen
│   ├── Login Screen
│   ├── Register Screen
│   └── Forgot Password Screen
│
├── Main Tabs (Bottom Navigation)
│   ├── Map Tab
│   │   ├── Map View (real-time unit tracking)
│   │   ├── Route List
│   │   └── Route Details
│   │
│   ├── Shop Tab
│   │   ├── Product Catalog
│   │   ├── Product Details
│   │   ├── Cart
│   │   └── Checkout
│   │
│   ├── Orders Tab
│   │   ├── Active Reservations
│   │   ├── Order History
│   │   └── Order Details
│   │
│   └── Profile Tab
│       ├── Account Settings
│       ├── Membership Management
│       ├── Payment Methods
│       ├── Notification Preferences
│       └── Help & Support
│
└── Modals/Overlays
    ├── Reservation Confirmation
    ├── Unlock Code Display
    ├── Payment Processing
    └── Proximity Notification
```

---

### Key Features

#### **1. Map View (Home Screen)**

**Purpose**: Real-time tracking of mobile vending units

**Components:**
- Interactive map centered on user's location
- Unit marker with custom icon (shows unit status)
- Animated movement as unit travels route
- Route polyline showing scheduled path
- Stop markers along route
- ETA bubble above unit marker
- "Near Me" button to find closest unit
- Filter by product availability

**User Flow:**
1. User opens app → sees map with nearby units
2. Taps on unit marker → shows route details + ETA
3. Taps "Reserve Item" → navigates to Shop tab with pre-selected unit
4. Receives push notification when unit is 5 minutes away

**Technical Implementation:**
- `react-native-maps` with Google Maps or Mapbox
- WebSocket connection for real-time location updates (every 10 seconds)
- Local state management with Zustand
- Animated marker transitions using `react-native-reanimated`

---

#### **2. Product Catalog & Shopping**

**Purpose**: Browse products, make reservations, purchase items

**Components:**
- Product grid/list with images, prices, availability
- Filter by category, unit, dietary preferences
- Search functionality
- Product detail modal (description, nutrition info, reviews)
- "Add to Cart" or "Reserve for Pickup" buttons
- Cart summary with total

**Member Benefits Display:**
- Show member discounts prominently
- "Members Only" badges on exclusive products
- "Upgrade to Premium" CTA for free users

**User Flow:**
1. User browses products → filters by unit or category
2. Adds item to cart → selects pickup stop
3. Proceeds to checkout → confirms payment method
4. Receives reservation confirmation with unlock code
5. Arrives at unit → scans QR or enters code → retrieves item

**Technical Implementation:**
- Product data fetched from `/inventory/products` API
- Real-time availability via WebSocket
- Stripe SDK for payment processing
- AsyncStorage for cart persistence (offline capability)

---

#### **3. Reservation Management**

**Purpose**: Track active reservations and pickup windows

**Components:**
- Active reservations card (countdown timer to pickup window)
- Unlock code display (large, easy to read)
- QR code for scanning at unit
- Pickup location map with directions
- "Cancel Reservation" button (with refund policy)
- Order history list

**Notifications:**
- "Unit arriving in 5 minutes" (proximity alert)
- "Your pickup window is open" (when unit arrives at stop)
- "Pickup window closing in 2 minutes" (urgency alert)
- "Reservation expired" (if not picked up)

**Technical Implementation:**
- Countdown timer using `react-native-countdown-circle-timer`
- QR code generation with `react-native-qrcode-svg`
- Push notifications via Firebase Cloud Messaging
- Background location tracking (opt-in) for proximity alerts

---

#### **4. Membership & Profile**

**Purpose**: Manage account, membership, and payment methods

**Components:**
- Membership tier display with benefits breakdown
- "Upgrade Membership" flow (Stripe subscription)
- Saved payment methods list (add/remove)
- Notification preferences (proximity alerts, promotions)
- Purchase history with receipts
- Referral program (invite friends)
- Settings (dark mode, language, units)

**Membership Tiers:**
- **Free**: Route tracking, basic catalog access
- **Basic ($9.99/mo)**: Reservations, 10% discount, priority notifications
- **Premium ($19.99/mo)**: Reservations + custom requests, 20% discount, exclusive products, first access to new items

**Technical Implementation:**
- Stripe billing portal for subscription management
- Secure payment method storage (Stripe tokens, no raw card data)
- User preferences stored locally + synced to backend

---

### Design System (Mobile App)

**Color Palette** (from your existing site):
- Primary: `#b19373` (warm nude/sand)
- Secondary: `#a89f94` (neutral taupe)
- Accent: `#e68c73` (soft blush/terracotta)
- Neutral: `#988c84` (warm gray)
- Background: `#fafaf9` (off-white)
- Text: `#1a1a1a` (near black)

**Typography:**
- Headings: Freight Serif Pro or Playfair Display
- Body: Inter (clean, readable on mobile)
- UI Elements: Inter

**Components:**
- Cards with subtle shadows and rounded corners (8px radius)
- Buttons: Solid primary color, high contrast text
- Input fields: Outlined with focus states
- Navigation: Bottom tab bar (iOS-style)

---

## Unit Embedded Systems

### Raspberry Pi Software Architecture

**Operating System**: Raspberry Pi OS Lite (64-bit, headless)

**System Services** (managed by `systemd`):

---

#### **1. Locker Controller Service**

**File**: `/opt/vendbot/locker-controller/main.py`

**Responsibilities:**
- Control electronic locks (solenoid activation via GPIO)
- Monitor compartment sensors (IR beam break detection)
- Handle unlock requests from backend
- Report inventory changes (item removed)
- Emergency unlock (hardware override button)

**Key Functions:**
```python
class LockerController:
    def unlock(self, locker_number: int, duration: int = 5):
        """Unlock locker for specified duration (seconds)"""

    def check_status(self, locker_number: int) -> LockerStatus:
        """Check if locker is locked/unlocked, item present/removed"""

    def emergency_unlock_all(self):
        """Unlock all lockers (emergency button pressed)"""

    def get_inventory_snapshot(self) -> dict:
        """Return current state of all lockers"""
```

**GPIO Mapping**:
- Locks: GPIO pins 2-25 (24 lockers via relay modules)
- Sensors: GPIO pins 26-49 (IR beam break sensors)
- Emergency button: GPIO pin 50 (pull-down resistor)

---

#### **2. Telemetry Client Service**

**File**: `/opt/vendbot/telemetry/client.py`

**Responsibilities:**
- Read GPS coordinates (via serial UART from GPS module)
- Monitor battery level (via I2C from battery management system)
- Monitor system health (CPU temp, disk space, memory)
- Report to backend via HTTPS every 10 seconds
- Maintain WebSocket connection for real-time commands
- Log telemetry data locally (fallback if offline)

**Key Functions:**
```python
class TelemetryClient:
    def get_location(self) -> Location:
        """Read GPS coordinates from module"""

    def get_battery_level(self) -> int:
        """Read battery percentage (0-100)"""

    def get_system_metrics(self) -> SystemMetrics:
        """CPU, memory, disk, temperature"""

    def report_to_backend(self, data: dict):
        """POST to /telemetry/location endpoint"""

    def handle_command(self, command: dict):
        """Handle commands from backend (e.g., remote unlock)"""
```

**GPS Parsing**:
- Protocol: NMEA 0183 via serial
- Library: `pynmea2` for parsing GPGGA sentences
- Update rate: 1Hz (every second)

---

#### **3. Payment Terminal Service**

**File**: `/opt/vendbot/payment/terminal.py`

**Responsibilities:**
- Interface with NFC reader (via USB)
- Process QR code scans (via USB barcode scanner)
- Communicate with Stripe Terminal API
- Display payment status on screen (optional touchscreen)
- Handle offline payment queue (sync when online)

**Key Functions:**
```python
class PaymentTerminal:
    def scan_qr_code(self) -> str:
        """Wait for QR code scan, return unlock code or payment URL"""

    def process_nfc_payment(self, amount: int) -> PaymentResult:
        """Handle Apple Pay/Google Pay transaction via Stripe"""

    def verify_unlock_code(self, code: str) -> bool:
        """Validate unlock code against backend"""

    def offline_queue_transaction(self, transaction: dict):
        """Store transaction locally, sync when online"""
```

**Stripe Terminal Integration**:
- Reader: Square Contactless Reader or Stripe Reader
- SDK: `stripe-terminal-python` library
- Offline mode: Queue transactions, sync when connection restored

---

#### **4. Watchdog Service**

**File**: `/opt/vendbot/watchdog/monitor.py`

**Responsibilities:**
- Monitor health of all services (locker, telemetry, payment)
- Restart services if they crash
- Alert backend if critical failures occur
- Trigger failsafe mode (unlock all lockers) if system unrecoverable

**Key Functions:**
```python
class Watchdog:
    def check_service_health(self, service_name: str) -> bool:
        """Ping service, check if responsive"""

    def restart_service(self, service_name: str):
        """systemctl restart <service>"""

    def alert_backend(self, alert: dict):
        """POST to /telemetry/alert endpoint"""

    def trigger_failsafe(self):
        """Unlock all lockers, send SOS to backend"""
```

---

### Network Configuration

**Primary Connection**: 4G LTE (Hologram Nova with multi-carrier SIM)

**Backup Connection**: WiFi hotspot (auto-connect to known networks)

**VPN**: WireGuard tunnel to backend (secure communication)

**Firewall**: `ufw` (only allow outbound HTTPS, inbound SSH from specific IPs)

**Remote Access**: SSH over Tailscale (zero-config VPN for remote troubleshooting)

---

### Data Storage (Local)

**SQLite Database**: `/var/vendbot/local.db`

**Tables:**
- `telemetry_queue` - GPS/battery data waiting to sync
- `transactions_queue` - Offline transactions
- `inventory_cache` - Last known inventory state
- `logs` - System logs (rotated daily)

**Log Files**: `/var/log/vendbot/`
- `locker-controller.log`
- `telemetry.log`
- `payment.log`
- `watchdog.log`

---

### Security

**SSH**: Key-based authentication only, no password login

**User Permissions**: Services run as unprivileged user `vendbot`

**File Encryption**: Sensitive data (API keys, Stripe secrets) encrypted with `cryptography` library

**Automatic Updates**: `unattended-upgrades` for OS security patches

**Tamper Detection**: GPIO-connected door sensor alerts backend if enclosure opened

---

## AI/ML Systems

### 1. Demand Prediction Model

**Purpose**: Predict what products to stock at each stop based on historical data

**Approach**: Time-series forecasting with XGBoost

**Input Features:**
- Time of day (hour)
- Day of week (Mon-Sun)
- Stop location (latitude, longitude, encoded as grid cells)
- Weather (temperature, precipitation, via OpenWeather API)
- Historical sales (rolling averages: 7-day, 14-day, 30-day)
- Events calendar (local events, holidays)
- Product category
- Price point

**Output**: Predicted demand (units sold) for each product at each stop

**Training Data**: `transactions` table (historical sales)

**Tech Stack:**
- Python: `scikit-learn`, `xgboost`, `pandas`
- Training frequency: Weekly (retrain model with new data)
- Hosting: Separate analytics service (can run on AWS Lambda for cost efficiency)

**Example Query:**
```sql
-- Extract training data
SELECT
  t.created_at::date as date,
  EXTRACT(hour FROM t.created_at) as hour,
  EXTRACT(dow FROM t.created_at) as day_of_week,
  s.id as stop_id,
  s.location->>'lat' as lat,
  s.location->>'lng' as lng,
  jsonb_array_elements(t.items)->>'productId' as product_id,
  COUNT(*) as units_sold
FROM transactions t
JOIN units u ON t.unit_id = u.id
JOIN routes r ON u.current_route_id = r.id
JOIN stops s ON s.route_id = r.id
WHERE t.status = 'completed'
GROUP BY date, hour, day_of_week, stop_id, lat, lng, product_id
ORDER BY date DESC;
```

---

### 2. Route Optimization

**Purpose**: Dynamically adjust route order based on demand and member requests

**Approach**: Genetic algorithm or reinforcement learning

**Constraints:**
- Minimize total travel time
- Respect scheduled stop windows (9am-5pm)
- Honor member reservation requests (must stop at requested location)
- Battery range (must return to charging station)

**Tech Stack:**
- Python: `numpy`, `scipy`, `OR-Tools` (Google's optimization library)
- Integration: Route service queries optimizer before finalizing daily schedule

**MVP Simplification**: Use fixed routes, add dynamic optimization in Phase 2

---

### 3. Personalized Recommendations

**Purpose**: Suggest products to users based on purchase history

**Approach**: Collaborative filtering (user-based)

**Algorithm:**
1. Find similar users (users who bought similar products)
2. Recommend products those similar users bought
3. Weight by recency and frequency

**Tech Stack:**
- Python: `scikit-learn` (cosine similarity)
- Real-time inference: Lightweight model served via API endpoint

**Example:**
- User A frequently buys cold brew coffee
- User B also buys cold brew + protein bars
- Recommend protein bars to User A

**MVP Simplification**: Simple "Frequently Bought Together" logic, add ML in Phase 2

---

### 4. Computer Vision (Phase 2 - Autonomous Navigation)

**Purpose**: Object detection for obstacle avoidance

**Approach**: Pre-trained YOLO (You Only Look Once) model

**Tech Stack:**
- Framework: TensorFlow Lite or PyTorch Mobile (optimized for edge devices)
- Hardware: NVIDIA Jetson Orin Nano (GPU acceleration)
- Classes: Person, bicycle, car, dog, etc.

**Integration**: Navigation system subscribes to object detection events, adjusts path

**MVP**: Not required for semi-autonomous MVP

---

## Security & Compliance

### Data Security

**Encryption:**
- **In Transit**: TLS 1.3 for all API communication (HTTPS)
- **At Rest**: PostgreSQL encryption for sensitive fields (payment data)
- **Backups**: Encrypted backups to AWS S3 with KMS

**Authentication:**
- JWT access tokens (15-minute expiry)
- Refresh tokens (7-day expiry, httpOnly cookies)
- bcrypt password hashing (10 rounds)
- Rate limiting on auth endpoints (5 attempts per 15 minutes)

**Payment Security:**
- PCI-DSS Level 1 compliance via Stripe
- Never store raw card numbers (use Stripe tokens)
- 3D Secure (SCA) for European customers

**API Security:**
- API key authentication for unit-to-backend communication
- IP whitelisting for admin endpoints
- CORS configured for mobile app domains only
- Input validation and sanitization (prevent SQL injection, XSS)

---

### Privacy

**GDPR Compliance:**
- User consent for location tracking (opt-in)
- Data portability (export user data via API)
- Right to deletion (purge user account and associated data)
- Privacy policy and terms of service

**Data Retention:**
- Transaction data: 7 years (tax compliance)
- Telemetry data: 90 days (rolling window)
- Logs: 30 days

**Anonymization:**
- Analytics aggregated by day/stop (no individual user tracking)
- IP addresses hashed before storage

---

### Physical Security

**Unit Security:**
- Locked enclosure for electronics (tamper-evident seals)
- Door sensor alerts backend if opened without authorization
- Cameras monitor customer interaction area (security footage)
- GPS tracking (unit location always known)

**Locker Security:**
- Electronic locks with unique unlock codes per transaction
- Codes expire after pickup window (15 minutes)
- Manual override key (held by operator)

---

### Regulatory Compliance

**Autonomous Vehicle Regulations:**
- **MVP**: Semi-autonomous (remote-operated) does NOT require AV permits in most jurisdictions
- **Phase 2**: Research local regulations for sidewalk robots
  - San Francisco: Permit required, 3mph speed limit
  - Many campuses: Private property, no permit needed

**Food Safety (if selling perishables):**
- Food handler's license for operators
- Refrigeration monitoring (temperature logs)
- Expiration date tracking in inventory system
- HACCP compliance (Hazard Analysis Critical Control Points)

**Business Licenses:**
- Mobile food vendor permit (varies by city)
- Sales tax collection (integrate with Stripe Tax)

**Insurance:**
- General liability insurance ($1M-$2M coverage)
- Product liability (if selling food)
- Cyber liability (data breaches)

---

## Deployment Architecture

### Cloud Infrastructure

**Hosting Provider**: Railway (recommended) or AWS

**Services:**

```
┌─────────────────────────────────────────────────────┐
│                    Cloudflare                       │
│  - CDN for static assets                            │
│  - DDoS protection                                  │
│  - SSL/TLS termination                              │
└─────────────────────────────────────────────────────┘
                        ▼
┌─────────────────────────────────────────────────────┐
│              Load Balancer (Railway)                │
└─────────────────────────────────────────────────────┘
                        ▼
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│  API Gateway     │  │  WebSocket       │  │  Static Assets   │
│  (Express.js)    │  │  Server          │  │  (S3/R2)         │
│  3 instances     │  │  2 instances     │  │                  │
└──────────────────┘  └──────────────────┘  └──────────────────┘
         │                     │
         ▼                     ▼
┌─────────────────────────────────────────────────────┐
│              PostgreSQL (Managed)                   │
│  - Primary + Read Replica                           │
│  - Automated backups (daily)                        │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│              Redis (Managed)                        │
│  - Session storage                                  │
│  - Real-time location cache                         │
│  - Rate limiting                                    │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│              BullMQ (Background Jobs)               │
│  - Notification queue                               │
│  - Analytics processing                             │
│  - Demand prediction model training                 │
└─────────────────────────────────────────────────────┘
```

**Estimated Costs (Monthly, 100 users, 1 unit):**
- Railway Hobby Plan: $5/mo (backend hosting)
- PostgreSQL (Railway): $10/mo
- Redis (Railway): $5/mo
- Cloudflare: Free tier
- AWS S3: $5/mo (storage)
- Stripe: 2.9% + $0.30 per transaction
- **Total**: ~$30/mo + transaction fees

---

### CI/CD Pipeline

**Source Control**: Git (GitHub or GitLab)

**Branch Strategy:**
- `main` - Production
- `develop` - Staging
- `feature/*` - Feature branches

**Automated Testing:**
- Unit tests: Jest (backend), Jest + React Testing Library (mobile)
- Integration tests: Supertest (API endpoints)
- E2E tests: Playwright (admin dashboard)

**Deployment:**
1. Push to `develop` → triggers staging deployment (Railway preview environment)
2. Merge to `main` → triggers production deployment
3. Database migrations run automatically (Drizzle Kit)
4. Mobile app: Manual builds via Expo EAS, submit to App Store/Google Play

**Monitoring:**
- Application monitoring: Sentry (error tracking)
- Infrastructure monitoring: Railway dashboard
- Uptime monitoring: UptimeRobot
- Logging: Structured logs with Winston, aggregated in Railway

---

### Backup & Disaster Recovery

**Database Backups:**
- Automated daily backups (Railway managed PostgreSQL)
- Point-in-time recovery (7 days)
- Weekly backups to S3 (long-term retention)

**Disaster Recovery Plan:**
1. Database failure: Restore from latest backup (RTO: 1 hour)
2. Application crash: Auto-restart via Railway (RTO: 1 minute)
3. Complete infrastructure failure: Redeploy to backup region (RTO: 4 hours)

**Unit Failure:**
- Unit goes offline: Operator receives alert, dispatches technician
- Critical hardware failure: Swap with backup unit (keep 1 spare)

---

## Development Roadmap

### Phase 1: MVP (Months 1-6) - $50k-$100k

**Goal**: Prove business model with semi-autonomous operation

**Milestones:**

**Month 1-2: Hardware Procurement & Assembly**
- Order golf cart and components
- Custom enclosure fabrication
- Assemble locker system
- Install electronics and sensors
- Test all systems in lab environment

**Month 2-3: Backend Development**
- Set up cloud infrastructure (Railway + PostgreSQL)
- Develop API endpoints (auth, routes, inventory, telemetry)
- Integrate Stripe payment processing
- Build admin dashboard (route management, analytics)
- Deploy to staging environment

**Month 3-4: Mobile App Development**
- Design UI/UX in Figma
- Build React Native app (map view, product catalog, reservations)
- Integrate APIs and WebSocket
- Implement push notifications
- TestFlight/Google Play beta testing

**Month 4-5: Unit Software Development**
- Raspberry Pi setup and configuration
- Locker controller service
- Telemetry client service
- Payment terminal integration
- End-to-end testing (unit ↔ backend ↔ app)

**Month 5-6: Pilot Operations**
- Secure pilot location (corporate campus or university)
- Regulatory approvals (business license, permits)
- Stock initial inventory (15-20 SKUs)
- Recruit beta testers (50-100 users)
- Run daily routes (2-3 stops, 4-hour window)
- Collect feedback and iterate

**Success Metrics:**
- >100 transactions per week
- >30% conversion rate (app users → purchasers)
- >$8 average transaction value
- >20% member sign-up rate
- <5% technical failure rate (locker malfunctions, payment errors)

---

### Phase 2: Autonomy & Expansion (Months 7-18) - $150k-$300k

**Goal**: Add autonomous navigation, expand to multiple routes

**Milestones:**

**Months 7-9: Autonomous Navigation**
- Install sensor suite (LIDAR, cameras, IMU)
- Install NVIDIA Jetson compute module
- Implement ROS navigation stack
- Test autonomous route-following in controlled environment
- Supervised autonomous operation (operator monitors remotely)

**Months 9-12: Multi-Route Expansion**
- Add 2-3 additional routes (same city)
- Acquire second unit (or retrofit existing)
- Hire additional operators (remote supervision)
- Expand product catalog (add refrigeration, 30-40 SKUs)
- Implement AI demand prediction

**Months 12-18: Business Development**
- B2B partnerships (corporate campus contracts)
- Marketing campaign (social media, local press)
- Referral program (customer acquisition)
- Optimize unit economics (reduce costs, increase revenue)
- Fundraising (Seed round, $500k-$1M)

**Success Metrics:**
- 3 routes operational
- >500 transactions per week (across all routes)
- >$50k monthly revenue
- >40% member retention rate
- Unit economics: Positive contribution margin

---

### Phase 3: Scale (Months 19-36) - $500k+

**Goal**: National expansion, fleet management, franchise model

**Milestones:**

**Months 19-24: Fleet Management**
- Deploy 5-10 units across multiple cities
- Build centralized fleet management platform
- Hire operations team (route planners, restocking, maintenance)
- Full autonomy (no operator supervision)
- Indoor navigation capabilities (malls, office buildings)

**Months 24-30: Franchise/Licensing**
- Develop franchise playbook
- Recruit franchise partners
- Provide turnkey solution (hardware + software)
- Revenue share model (royalties on transactions)

**Months 30-36: National Expansion**
- 50+ units operational
- Top 20 U.S. markets
- Strategic partnerships (Starbucks, Coca-Cola, local brands)
- Series A fundraising ($5M-$10M)

---

## Appendix

### Key Assumptions

**Customer Behavior:**
- 70% of users will use the app (not walk-ups)
- Average transaction value: $8-$12
- Member conversion rate: 20-30% of active users
- Repeat purchase rate: 3-4x per week for members

**Operations:**
- Single route can serve 200-500 customers per day
- 3-4 stops per hour achievable
- 8-10 hours operation per day (includes charging time)
- 1 operator can manage 1-2 units (remote supervision)

**Economics:**
- Unit cost: $40k-$60k (including hardware + software)
- Operating cost: $5k-$8k per month (operator, inventory, insurance, maintenance)
- Revenue: $15k-$25k per month (200 transactions/week @ $12 avg)
- Break-even: 6-12 months per unit

---

### Risk Mitigation

**Technical Risks:**
- **Hardware failure**: Keep spare components, maintenance contracts
- **Software bugs**: Automated testing, staged rollouts, rollback capability
- **Connectivity loss**: Offline mode, local queuing

**Business Risks:**
- **Low demand**: Pilot testing, flexible inventory, marketing campaigns
- **Regulatory blocks**: Legal consultation, permits secured before launch
- **Competition**: Focus on "goes to customers" differentiator, partnerships

**Operational Risks:**
- **Theft/vandalism**: Cameras, GPS tracking, insurance
- **Inventory spoilage**: Start with shelf-stable items, add perishables slowly
- **Weather**: Weatherproofing, cancel routes in extreme conditions

---

### Next Steps

**Immediate Actions:**
1. Validate assumptions with customer surveys (target audience)
2. Secure pilot location (campus or corporate park)
3. Order long-lead-time items (golf cart, custom enclosure)
4. Set up cloud infrastructure (Railway, PostgreSQL, Stripe)
5. Begin mobile app design (Figma wireframes)

**Decision Points:**
- [ ] Confirm budget allocation ($50k-$100k for MVP)
- [ ] Choose pilot environment (outdoor campus preferred)
- [ ] Refrigeration needed for MVP? (Recommend: No)
- [ ] Build vs. partner for hardware platform? (Recommend: Build with COTS components)
- [ ] Timeline pressure (6 months acceptable?)

---

**Document Version**: 1.0
**Last Updated**: 2025-01-06
**Authors**: Claude (AI), Ronnie Duarte (Project Lead)
**Status**: Draft for Review

---

## Questions for Next Discussion

1. **Budget Confirmation**: Is $50k-$100k feasible for MVP, or need to trim further?
2. **Pilot Location**: Do you have a target campus/corporate park in mind?
3. **Team**: Are you building this solo, or do you have a technical co-founder/team?
4. **Timeline**: Is 6 months to pilot acceptable, or need faster launch?
5. **Focus**: Any aspects of this spec you want to dive deeper into (hardware, software, business model)?

This technical specification provides a comprehensive blueprint for building the mobile AI vending solution. The next step is to validate assumptions, refine based on your feedback, and begin execution!
