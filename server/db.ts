import Database from 'better-sqlite3';

const db = new Database('wishpilot.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    plan TEXT DEFAULT 'free',
    credits INTEGER DEFAULT 3,
    google_access_token TEXT,
    google_refresh_token TEXT,
    stripe_customer_id TEXT,
    referral_code TEXT UNIQUE,
    referred_by TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    relationship TEXT NOT NULL,
    phone TEXT NOT NULL,
    event_type TEXT NOT NULL,
    event_date TEXT NOT NULL,
    preferred_time TEXT DEFAULT '09:00',
    tone TEXT NOT NULL,
    memory_notes TEXT,
    photo_url TEXT,
    google_contact_id TEXT,
    google_event_id TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
  );

  CREATE TABLE IF NOT EXISTS generated_wishes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    message TEXT NOT NULL,
    image_url TEXT,
    status TEXT DEFAULT 'scheduled',
    scheduled_for DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
  );

  CREATE TABLE IF NOT EXISTS admin_settings (
    key TEXT PRIMARY KEY,
    value TEXT
  );

  CREATE TABLE IF NOT EXISTS notifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT DEFAULT 'info',
    read BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
  );
`);

const addColumn = (table: string, columnDef: string) => {
  try {
    db.exec(`ALTER TABLE ${table} ADD COLUMN ${columnDef};`);
  } catch (e) {
    // Column might already exist
  }
};

addColumn('users', 'google_access_token TEXT');
addColumn('users', 'google_refresh_token TEXT');
addColumn('users', 'stripe_customer_id TEXT');
addColumn('users', 'referral_code TEXT UNIQUE');
addColumn('users', 'referred_by TEXT');
addColumn('users', 'subscription_id TEXT');
addColumn('users', 'subscription_status TEXT');
addColumn('users', 'subscription_end_date DATETIME');
addColumn('users', 'payment_gateway TEXT');

addColumn('events', 'google_contact_id TEXT');
addColumn('events', 'google_event_id TEXT');

export default db;
