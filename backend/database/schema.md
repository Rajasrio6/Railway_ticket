# Database Schema Design

## Overview
The database will be hosted on **Cloud Firestore**.

## Collections

### `users`
Stores user profile information.
- `uid` (string): Unique Firebase Auth ID (Document ID).
- `email` (string): User email.
- `displayName` (string): User full name.
- `role` (string): 'admin' | 'user'. try to use RBAC.
- `createdAt` (timestamp): Account creation time.

### `trains`
Stores train schedules and details.
- `trainId` (string): Unique Train Number/ID (Document ID).
- `name` (string): Name of the train.
- `source` (string): Station code/name.
- `destination` (string): Station code/name.
- `departureTime` (string/timestamp): ISO string or timestamp.
- `arrivalTime` (string/timestamp): ISO string or timestamp.
- `seatsAvailable` (number): Current available seats (simplified).
- `price` (number): Ticket price.

### `bookings`
Stores booking records.
- `bookingId` (string): Unique Booking ID.
- `userId` (string): Reference to `users`.
- `trainId` (string): Reference to `trains`.
- `passengerName` (string): Name of the passenger.
- `seatNumber` (string): Assigned seat.
- `status` (string): 'confirmed' | 'cancelled' | 'pending'.
- `bookingDate` (timestamp).

### `payments`
Stores payment transactions.
- `paymentId` (string): Unique Payment ID.
- `bookingId` (string): Reference to `bookings`.
- `amount` (number): Amount paid.
- `status` (string): 'success' | 'failed'.
- `method` (string): 'card', 'upi', etc.
- `timestamp` (timestamp).

### `history`
(Optional) Could be a subcollection or just query `bookings` by `userId`.
- We will rely on querying `bookings` collection with `where('userId', '==', uid)` for history to keep data normalized.
